// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

/// <reference types="svelte-adapter-azure-swa" />
/// <reference types="lucia" />
/// <reference types="./lib/types" />

import type { DiscordGuild } from '$lib/types';

declare global {
	namespace App {
		interface Error {
			code?: string;
		}

		interface Locals {
			user: (import('lucia').User & DatabaseUserAttributes) | null;
			session: (import('lucia').Session & DatabaseSessionAttributes) | null;
		}

		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
		DatabaseSessionAttributes: DatabaseSessionAttributes;
	}
}

interface DatabaseUserAttributes {
	discordId: string;
}

interface DatabaseSessionAttributes {
	guilds: DiscordGuild[];
}

export {};
