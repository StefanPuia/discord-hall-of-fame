<script lang="ts">
	import PlaceholderImage from '$lib/components/App/_PlaceholderImage.svelte';
</script>

<div class="flex flex-col gap-2 w-full">
	<div class="aspect-video w-full rounded-t-sm">
		<div role="status" class="animate-pulse h-full">
			<div class="flex w-full h-full items-center justify-center rounded-sm dark:bg-neutral-700">
				<PlaceholderImage />
			</div>
			<!----> <span class="sr-only">Loading...</span>
		</div>
	</div>
	<div class="p-4">
		<div role="status" class="space-y-2.5 animate-pulse max-w-md">
			<div class="flex items-center space-x-2 rtl:space-x-reverse w-full">
				<div class="rounded-full bg-neutral-200 dark:bg-neutral-700 h-2.5 w-32"></div>
				<div class="rounded-full bg-neutral-300 dark:bg-neutral-600 h-2.5 w-24"></div>
				<div class="rounded-full bg-neutral-300 dark:bg-neutral-600 h-2.5 w-full"></div>
			</div>
			<div class="flex items-center space-x-2 rtl:space-x-reverse w-11/12">
				<div class="rounded-full bg-neutral-200 dark:bg-neutral-700 h-2.5 w-full"></div>
				<div class="rounded-full bg-neutral-300 dark:bg-neutral-600 h-2.5 w-full"></div>
				<div class="rounded-full bg-neutral-300 dark:bg-neutral-600 h-2.5 w-24"></div>
			</div>
			<div class="flex items-center space-x-2 rtl:space-x-reverse w-9/12">
				<div class="rounded-full bg-neutral-300 dark:bg-neutral-600 h-2.5 w-full"></div>
				<div class="rounded-full bg-neutral-200 dark:bg-neutral-700 h-2.5 w-80"></div>
				<div class="rounded-full bg-neutral-300 dark:bg-neutral-600 h-2.5 w-full"></div>
			</div>
			<span class="sr-only">Loading...</span>
		</div>
	</div>
</div>
