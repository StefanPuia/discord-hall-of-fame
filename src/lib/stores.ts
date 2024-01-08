import { writable } from 'svelte/store';


export const userStore = writable<null | { id: string, guilds: DiscordGuild[] }>(null);