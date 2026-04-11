<script lang="ts">
	import '../app.css';
	import HeadContent from '$lib/components/App/_HeadContent.svelte';
</script>

<svelte:head>
	<title>Hall of Fame</title>
</svelte:head>

<HeadContent />
<div class="container max-w-5xl place-self-center p-8">
	<slot />
</div>
