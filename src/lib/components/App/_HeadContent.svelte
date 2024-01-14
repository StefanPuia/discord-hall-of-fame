<script lang="ts">
	import { enhance } from '$app/forms';
	import Logo from './_Logo.svelte';
	import { Anchor, Burger, Button, Group, Text } from '@svelteuidev/core';
	import { userStore } from '$lib/stores';
	import { page } from '$app/stores';
	import GuildCard from '$lib/components/Guild/GuildCard.svelte';
	import type { DiscordGuild } from '$lib/types';

	export let opened: boolean;
	export let toggleOpen: () => void;

	let guild: DiscordGuild | null | undefined;

	$: {
		let serverId = $page.params.serverId;
		guild = $userStore && $userStore.guilds.find((g) => g.id === `${serverId}`);
	}
</script>

<Group override={{ height: '100%', px: 20 }} position="apart">
	<Burger {opened} on:click={toggleOpen} override={{ d: 'block', '@sm': { d: 'none' } }} />
	<Anchor
		underline={false}
		href="/"
		override={{ '&:hover': { textDecoration: 'none !important' } }}
	>
		<Group>
			<Logo size={35} />
			<Text color="blue" size="xl" override={{ d: 'none', '@sm': { d: 'block' } }}>
				Hall of Fame
			</Text>
			{#if guild}
				<GuildCard {guild} />
			{/if}
		</Group>
	</Anchor>
	{#if $userStore}
		<Group>
			<form method="post" action="/?/logout" use:enhance on:submit={() => ($userStore = null)}>
				<Button type="submit">Sign out</Button>
			</form>
		</Group>
	{/if}
</Group>
