<script lang="ts">
	import { Anchor, Image } from '@svelteuidev/core';
	import type { DiscordGuild } from '$lib/types';

	export let guild: DiscordGuild | undefined;
</script>

{#if guild}
	<div class="guild">
		<Image
			radius="xl"
			src="https://cdn.discordapp.com/icons/{guild.id}/{guild.icon}.webp"
			alt="Icon"
			width={32}
			height={32}
		/>
		<Anchor href={`/${guild.id}`}>{guild.name}</Anchor>
	</div>
{/if}

<style>
	.guild {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		gap: 0.5rem;
	}
</style>
