import type { AuthRequest } from 'lucia';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { unstorage } from '@lucia-auth/adapter-session-unstorage';
import { createStorage } from 'unstorage';
import { discord } from '@lucia-auth/oauth/providers';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, HOSTNAME } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

const userStorage = createStorage();
const sessionStorage = createStorage();

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: (params) => ({
		...unstorage(sessionStorage)(params),
		getUser: (userId) => userStorage.getItem(`user:${userId}`),
		setUser: (user) => userStorage.setItem(`user:${user.id}`, user),
		updateUser: () => Promise.reject('noop updateUser'),
		deleteUser: () => Promise.reject('noop deleteUser'),
		getKey: (keyId) => userStorage.getItem(`key:${keyId}`),
		getKeysByUserId: () => Promise.reject('noop getKeysByUserId'),
		setKey: () => Promise.reject('noop setKey'),
		updateKey: () => Promise.reject('noop updateKey'),
		deleteKey: () => Promise.reject('noop deleteKey'),
		deleteKeysByUserId: () => Promise.reject('noop deleteKeysByUserId')
	}),
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
