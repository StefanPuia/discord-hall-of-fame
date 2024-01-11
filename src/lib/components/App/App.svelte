<script>
	import { AppShell, Container, Header } from '@svelteuidev/core';
	import HeadContent from './_HeadContent.svelte';

	let opened = false;

	function toggleOpened() {
		opened = !opened;
	}
</script>

<AppShell fixed={false}>
	<Header slot="header" height={60}>
		<HeadContent {opened} toggleOpen={toggleOpened} />
	</Header>
	<Container>
		<slot />
	</Container>
</AppShell>
