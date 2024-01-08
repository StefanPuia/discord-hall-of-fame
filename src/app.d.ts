// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

/// <reference types="svelte-adapter-azure-swa" />
/// <reference types="lucia" />

declare global {
	namespace App {
		// interface Error {}

		interface Locals {
			auth: import('lucia').AuthRequest;
		}

		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type DatabaseUserAttributes = {
			username: string;
			discriminator: string;
		};
		type DatabaseSessionAttributes = {
			guilds: DiscordGuild[]
		};
	}

	type DiscordGuild = {
		id: string;
		name: string;
		icon: string;
	}

	type HofMessage = {
		id: string;
		title: string;
		date: Date;
		image: string;
	}

	type HofMessagePair = {
		db: HofMessage,
		discord?: HofMessage
		// sync: boolean;
	}
}

export {};
