<script lang="ts">
	import { Anchor, Grid } from '@svelteuidev/core';
	import SkeletonCard from '$lib/components/HallOfFame/SkeletonCard.svelte';
	import CombinedCard from '$lib/components/HallOfFame/CombinedCard.svelte';

	export let serverId: string;
	export let messages: HofMessagePair[];
</script>

<Grid spacing={20}>
	<Grid.Col span={4}>
		<Anchor href={`/${serverId}/new`}>
			<SkeletonCard />
		</Anchor>
	</Grid.Col>
	{#each messages as messagePair}
		<Grid.Col span={4}>
			<Anchor href={`/${serverId}/${messagePair.db.id}`}>
				<CombinedCard message={messagePair} />
			</Anchor>
		</Grid.Col>
	{/each}
</Grid>