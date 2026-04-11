<script lang="ts">
	import { Button, Heading } from 'flowbite-svelte';
	import { resolve } from '$app/paths';
</script>

<Heading tag="h2">Sign in</Heading>
<div class="mt-4">
	<Button color="purple" href={resolve('/login/discord')}>Sign in with Discord</Button>
</div>
