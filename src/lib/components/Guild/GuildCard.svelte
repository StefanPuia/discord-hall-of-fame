<script lang="ts">
	import { Avatar } from 'flowbite-svelte';
	import type { DiscordGuild } from '$lib/types';
	import { resolve } from '$app/paths';

	let { guild }: { guild: DiscordGuild | undefined } = $props();
</script>

{#if guild}
	<a href={resolve(`/${guild.id}`)}>
		<div class="flex items-center space-x-4">
			<Avatar
				src="https://cdn.discordapp.com/icons/{guild.id}/{guild.icon}.webp"
				size="sm"
				cornerStyle="rounded"
				alt="{guild.name} guild avatar"
			/>
			<div class="space-y-1">
				<div>{guild.name}</div>
			</div>
		</div>
	</a>
{/if}
