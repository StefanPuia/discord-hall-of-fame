import { writable } from 'svelte/store';
import type { DiscordGuild } from '$lib/types';

export const userStore = writable<null | { id: string; guilds: DiscordGuild[] }>(null);
