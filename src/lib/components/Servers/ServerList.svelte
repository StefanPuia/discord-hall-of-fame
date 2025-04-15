<script lang="ts">
	import { Grid, Text } from '@svelteuidev/core';
	import GuildCard from '$lib/components/Guild/GuildCard.svelte';
	import type { DiscordGuild } from '$lib/types';

	export let guilds: DiscordGuild[] = [];
</script>

{#if guilds.length}
	<Text size="xl" mb="xl">Choose which server to manage:</Text>

	<Grid>
		{#each guilds ?? [] as guild}
			<Grid.Col span={3}>
				<GuildCard {guild} />
			</Grid.Col>
		{/each}
	</Grid>
{:else}
	No servers available. You must be an administrator of a server that the bot is also in.
{/if}
