<script lang="ts">
	import HallOfFameGrid from '$lib/components/HallOfFame/HallOfFameGrid.svelte';
	import type { PageData } from './$types';
	import { Grid } from '@svelteuidev/core';
	import SkeletonCard from '$lib/components/HallOfFame/SkeletonCard.svelte';

	export let data: PageData;
</script>

{#await data.messages}
	<Grid spacing={20}>
		<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars-->
		{#each { length: 5 } as _}
			<Grid.Col span={4}>
				<SkeletonCard />
			</Grid.Col>
		{/each}
	</Grid>
{:then messages}
	<HallOfFameGrid serverId={data.serverId} {messages} />
{/await}
