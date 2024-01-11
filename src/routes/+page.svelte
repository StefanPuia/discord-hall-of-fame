<script lang="ts">
	import { Anchor, Box } from '@svelteuidev/core';
	import ServerList from '$lib/components/Servers/ServerList.svelte';
	import { userStore } from '$lib/stores';
</script>

{#if $userStore}
	<ServerList />
{:else}
	<h1>Sign in</h1>
	<Box mt="md">
		<Anchor href="/login/discord">Sign in with Discord</Anchor>
	</Box>
{/if}
