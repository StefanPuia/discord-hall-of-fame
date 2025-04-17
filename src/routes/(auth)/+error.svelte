<script lang="ts">
	import { page } from '$app/state';
	import { Button, Flex, TextInput } from '@svelteuidev/core';
</script>

<h1>{page.status}</h1>

<p>{page.error?.message}</p>

{#if page.error?.code === 'SERVER_NOT_CONFIGURED' && page.data.isOwner}
	<div class="configure">
		<form action="/server-config" method="post">
			<Flex gap="xs">
				<TextInput name="serverId" placeholder="serverId" />
				<TextInput name="channelId" placeholder="channelId" />
				<Button type="submit">Configure server</Button>
			</Flex>
		</form>
	</div>
{/if}

<style>
	.configure {
		padding-top: 2em;
	}
</style>
