<script lang="ts">
	import { Anchor } from '@svelteuidev/core';
	import ServerList from '$lib/components/Servers/ServerList.svelte';
	import { userStore } from '$lib/stores';
</script>

{#if $userStore}
	<ServerList />
{:else}
	<h1>Sign in</h1>
	<Anchor href="/login/discord">Sign in with Discord</Anchor>
{/if}
