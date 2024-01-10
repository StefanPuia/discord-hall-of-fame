<script lang="ts">
	import { Grid } from '@svelteuidev/core';
	import { userStore } from '$lib/stores';
	import GuildCard from '$lib/components/Guild/GuildCard.svelte';
</script>

<Grid>
	{#each $userStore?.guilds ?? [] as guild}
		<Grid.Col span={3}>
			<GuildCard {guild} />
		</Grid.Col>
	{/each}
</Grid>

