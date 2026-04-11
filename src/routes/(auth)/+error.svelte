<script lang="ts">
	import { page } from '$app/state';
	import { Button, Input, Label } from 'flowbite-svelte';
</script>

<h1>{page.status}</h1>

<p>{page.error?.message}</p>

{#if page.error?.code === 'SERVER_NOT_CONFIGURED' && page.data.isOwner}
	<div class="pt-12 flex flex-col items-center">
		<form action="/server-config" method="post" class="w-full max-w-md">
			<div class="flex flex-col gap-xs">
				<div class="mb-6">
					<Label for="serverId" class="mb-2 block">Server ID</Label>
					<Input id="serverId" placeholder="serverId" name="serverId" type="text" />
				</div>
				<div class="mb-6">
					<Label for="channelId" class="mb-2 block">Channel ID</Label>
					<Input id="channelId" placeholder="channelId" name="channelId" type="text" />
				</div>
				<Button type="submit">Configure server</Button>
			</div>
		</form>
	</div>
{/if}
