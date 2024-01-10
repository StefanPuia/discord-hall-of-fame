<script lang="ts">
	import { Anchor, Grid } from '@svelteuidev/core';
	import SkeletonCard from '$lib/components/HallOfFame/SkeletonCard.svelte';
	import type { HofMessage } from '$lib/types';
	import MessageCard from '$lib/components/HallOfFame/MessageCard.svelte';

	export let serverId: string;
	export let messages: HofMessage[];
</script>

<Grid spacing={20}>
	<Grid.Col span={4}>
		<Anchor href={`/${serverId}/new`}>
			<SkeletonCard />
		</Anchor>
	</Grid.Col>
	{#each messages as message}
		<Grid.Col span={4}>
			<Anchor href={`/${serverId}/${message.databaseId}`}>
				<MessageCard {message} />
			</Anchor>
		</Grid.Col>
	{/each}
</Grid>