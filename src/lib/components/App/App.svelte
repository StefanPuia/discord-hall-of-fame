<script>
	import { AppShell, Container, Header, Navbar, ShellSection } from '@svelteuidev/core';
	import HeadContent from './_HeadContent.svelte';
	//import NavContent from './_NavContent.svelte';

	let opened = false;
	function toggleOpened() {
		opened = !opened;
	}
</script>

<AppShell
	fixed={false}
>
<!--	<Navbar-->
<!--		slot="navbar"-->
<!--		hidden={!opened}-->
<!--		hiddenBreakpoint="sm"-->
<!--		width={{ base: '100%', sm: 300 }}-->
<!--		height={500}-->
<!--		fixed={false}-->
<!--	>-->
<!--		<ShellSection grow>-->
<!--			<NavContent />-->
<!--		</ShellSection>-->
<!--	</Navbar>-->
	<Header
		slot="header"
		height={60}
	>
		<HeadContent {opened} toggleOpen={toggleOpened} />
	</Header>
	<Container>
		<slot/>
	</Container>
</AppShell>

<style>
	.content {
			margin-top: 5rem;
	}
</style>