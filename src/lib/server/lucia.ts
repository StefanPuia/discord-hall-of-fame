import { Lucia } from 'lucia';
import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';
import { Discord } from 'arctic';
import { env } from '$env/dynamic/private';
import { Session, User } from '$lib/server/database';

const adapter = new MongodbAdapter(Session, User);

export const auth = new Lucia(adapter, {
	getUserAttributes: (data) => {
		return {
			discordId: data.discordId
		};
	},
	getSessionAttributes: (data) => {
		return {
			guilds: data.guilds
		};
	}
});

export const discordAuth = new Discord(
	env.DISCORD_CLIENT_ID,
	env.DISCORD_CLIENT_SECRET,
	`${env.BASE_URL}/login/discord/callback`
);
export const DISCORD_SCOPES = ['identify', 'guilds'];
