<script lang="ts">
	import { Box, Anchor, Text, Stack } from '@svelteuidev/core';

</script>

<Stack>
	<Box css={{ p: '$mdPX', br: '$lg', userSelect: 'none' }}>
		<Text align="center">Navbar</Text>
	</Box>
	<Anchor href="/">Home Page</Anchor>
	<Anchor href="/test">Test Page</Anchor>
</Stack>