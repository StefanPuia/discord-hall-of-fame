<script lang="ts">
	import GuildCard from '$lib/components/Guild/GuildCard.svelte';
	import type { DiscordGuild } from '$lib/types';

	let { guilds }: { guilds: DiscordGuild[] } = $props();
</script>

{#if guilds.length}
	<div class="mb-4 text-lg">Choose which server to manage:</div>

	<div class="flex flex-row gap-x-8 gap-y-4 flex-wrap">
		{#each guilds ?? [] as guild (guild.id)}
			<GuildCard {guild} />
		{/each}
	</div>
{:else}
	<div class="mb-4 text-lg">
		No servers available. You must be an administrator of a server that the bot is also in.
	</div>
{/if}
