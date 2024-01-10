import { AuthRequest, lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { unstorage } from '@lucia-auth/adapter-session-unstorage';
import { createStorage } from 'unstorage';
import { betterSqlite3 } from '@lucia-auth/adapter-sqlite';
import { discord } from '@lucia-auth/oauth/providers';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, HOSTNAME } from '$env/static/private';
import { db } from '$lib/server/repository';
import { redirect } from '@sveltejs/kit';

const storage = createStorage();

const userAdapter = betterSqlite3(db, {
	user: 'user',
	key: 'user_key',
	session: 'user_session'
});

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: {
		user: userAdapter, // any normal adapter for storing users/keys
		session: unstorage(storage)
	},
	getUserAttributes: (data) => {
		return {
			discordUsername: data.username
		};
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
	redirectUri: `${HOSTNAME}/login/discord/callback`,
	scope: ['identify', 'guilds']
});

export type Auth = typeof auth;
