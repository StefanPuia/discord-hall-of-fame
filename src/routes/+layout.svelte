<script lang="ts">
	import { SvelteUIProvider } from '@svelteuidev/core';
	import App from '$lib/components/App/App.svelte';
</script>

<svelte:head>
	<title>Hall of Fame</title>
</svelte:head>

<SvelteUIProvider themeObserver="dark" withNormalizeCSS withGlobalStyles>
	<App>
		<slot />
	</App>
</SvelteUIProvider>

<style>
	:global(a) {
		text-decoration: none !important;
	}
</style>
