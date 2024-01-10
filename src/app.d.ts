// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

/// <reference types="svelte-adapter-azure-swa" />
/// <reference types="lucia" />
/// <reference types="./lib/types" />

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
}

export {};
