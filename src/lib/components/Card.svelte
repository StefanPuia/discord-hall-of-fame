<script lang="ts">
	import PlaceholderImage from '$lib/components/App/_PlaceholderImage.svelte';
	import type { Snippet } from 'svelte';

	let {
		placeholder,
		img,
		title,
		subtitle
	}: {
		placeholder?: Snippet;
		img?: string;
		title: string;
		subtitle?: string | Snippet;
	} = $props();
</script>

<div class="flex flex-col gap-2 bg-neutral-700 w-full rounded-sm">
	<div class="aspect-video w-full rounded-t-sm">
		{#if !img || placeholder}
			<div
				class="bg-neutral-900 w-full h-full flex items-center justify-center opacity-80 rounded-t-sm"
			>
				{#if placeholder}
					{@render placeholder()}
				{:else}
					<PlaceholderImage />
				{/if}
			</div>
		{:else}
			<img src={img} alt={title} class="object-cover h-full aspect-video" />
		{/if}
	</div>
	<div class="p-4 flex flex-col gap-1">
		<span>{title}</span>
		{#if subtitle}
			{#if typeof subtitle === 'string'}
				<span class="text-xs">{subtitle}</span>
			{:else}
				{@render subtitle()}
			{/if}
		{/if}
	</div>
</div>
