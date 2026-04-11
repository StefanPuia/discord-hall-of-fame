<script lang="ts">
	import { Button, Navbar, NavBrand } from 'flowbite-svelte';
	import Logo from './_Logo.svelte';
	import { page } from '$app/state';
	import GuildCard from '$lib/components/Guild/GuildCard.svelte';
	import type { DiscordGuild } from '$lib/types';

	let serverId = $derived(page.params.serverId);
	let guild: DiscordGuild | undefined = $derived(
		(page.data.guilds as DiscordGuild[] | undefined)?.find((g) => g.id === `${serverId}`)
	);
</script>

<!--suppress JSUnusedGlobalSymbols -->
<Navbar fluid class="border-b border-b-neutral-500">
	<NavBrand href="/" class="flex items-center gap-2">
		<Logo size={36} />
		<span class="self-center text-xl font-semibold whitespace-nowrap hidden sm:block"
			>Hall of Fame</span
		>
	</NavBrand>
	{#if page.data.guilds !== undefined}
		{#if guild}
			<GuildCard {guild} />
		{/if}
		<div class="flex md:order-2">
			<form method="post" action="/logout">
				<Button type="submit">Sign out</Button>
			</form>
		</div>
	{/if}
</Navbar>
