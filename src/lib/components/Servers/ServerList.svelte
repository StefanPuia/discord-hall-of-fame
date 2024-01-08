<script lang="ts">
	import { Anchor, Grid, Image } from '@svelteuidev/core';
	import { userStore } from '$lib/stores';
</script>

<Grid>
	{#each $userStore?.guilds ?? [] as guild}
		<Grid.Col span={3}>
			<div class="guild">
				<Image radius="xl" src="https://cdn.discordapp.com/icons/{guild.id}/{guild.icon}.webp" alt="Icon" width={32} height={32}/>
				<Anchor href={`/${guild.id}`}>{guild.name}</Anchor>
			</div>
		</Grid.Col>
	{/each}
</Grid>

<style>
	.guild {
			display: flex;
      flex-wrap: nowrap;
      align-items: center;
			gap: 0.5rem;
	}
</style>