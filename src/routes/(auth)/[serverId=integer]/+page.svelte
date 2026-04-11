<script lang="ts">
	import SkeletonCard from '$lib/components/HallOfFame/SkeletonCard.svelte';
	import type { HofMessage } from '$lib/types';
	import { resolve } from '$app/paths';
	import NewMessageCard from '$lib/components/HallOfFame/NewMessageCard.svelte';
	import MessageCard from '$lib/components/HallOfFame/MessageCard.svelte';

	export let data: { messages: Promise<HofMessage[]>; serverId: string };
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
	{#await data.messages}
		{#each { length: 5 } as _, i (i)}
			<SkeletonCard />
		{/each}
	{:then messages}
		<a href={resolve(`/${data.serverId}/new`)}>
			<NewMessageCard />
		</a>
		{#each messages as message (message.discordId)}
			<a href={resolve(`/${data.serverId}/${message.discordId}`)}>
				<MessageCard {message} />
			</a>
		{/each}
	{/await}
</div>
