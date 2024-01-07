<script lang="ts">
	import { enhance } from "$app/forms";
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

{#if data.user}
	<h1>Profile</h1>
	<p>User id: {data.user.id}</p>
	<p>GitHub username: {data.user.name}</p>
	<form method="post" action="?/logout" use:enhance>
		<input type="submit" value="Sign out" />
	</form>
{:else}
	<h1>Sign in</h1>
	<a href="/login/discord">Sign in with Discord</a>
{/if}