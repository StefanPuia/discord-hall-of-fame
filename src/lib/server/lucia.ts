import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { unstorage } from '@lucia-auth/adapter-session-unstorage';
import { createStorage } from 'unstorage';
import { betterSqlite3 } from '@lucia-auth/adapter-sqlite';
import sqlite from 'better-sqlite3';
import { discord } from '@lucia-auth/oauth/providers';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, HOSTNAME } from '$env/static/private';

const storage = createStorage();
const db = sqlite('main.db');

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
	}
});

export const discordAuth = discord(auth, {
	clientId: DISCORD_CLIENT_ID,
	clientSecret: DISCORD_CLIENT_SECRET,
	redirectUri: `${HOSTNAME}/login/discord/callback`
});

export type Auth = typeof auth;
