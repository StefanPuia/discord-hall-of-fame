import type { AuthRequest } from 'lucia';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { discord } from '@lucia-auth/oauth/providers';
import { BASE_URL, DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { swaAdapter } from '$lib/server/lucia-swa-db-adapter';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: swaAdapter,
	getUserAttributes: () => {
		return {};
	},
	getSessionAttributes: (data) => {
		return {
			guilds: data.guilds
		};
	}
});

export const requireAuth = async (auth: AuthRequest) => {
	const session = await auth.validate();
	if (!session) {
		throw redirect(302, '/');
	}
};

export const discordAuth = discord(auth, {
	clientId: DISCORD_CLIENT_ID,
	clientSecret: DISCORD_CLIENT_SECRET,
	redirectUri: `${BASE_URL}/login/discord/callback`,
	scope: ['identify', 'guilds']
});

export type Auth = typeof auth;
