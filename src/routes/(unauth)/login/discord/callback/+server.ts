import { auth, discordAuth } from '$lib/server/lucia.js';
import { type RequestEvent } from '@sveltejs/kit';
import { PermissionsBitField, REST, Routes } from 'discord.js';
import { getBotGuilds } from '$lib/server/discord-bot';
import type { DiscordGuild } from '$lib/types';
import { User, type UserDoc } from '$lib/server/database';
import { generateIdFromEntropySize } from 'lucia';
import { OAuth2RequestError } from 'arctic';

const getUser = async (discordUser: DiscordUser): Promise<UserDoc> => {
	const existingUser = await User.findOne({ discord_id: discordUser.id });

	if (!existingUser) {
		const userId = generateIdFromEntropySize(10);

		const newUser: UserDoc = {
			_id: userId,
			discordId: discordUser.id
		};
		await User.insertOne(newUser);
		return newUser;
	}
	return existingUser;
};


export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('discord_oauth_state') ?? null;

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await discordAuth.validateAuthorizationCode(code, null);
		const rest = new REST({ authPrefix: 'Bearer' }).setToken(tokens.accessToken());
		const discordUser = (await rest.get(Routes.user())) as DiscordUser;
		const guilds = (await rest.get(Routes.userGuilds())) as DiscordGuild[];
		const botGuilds = await getBotGuilds();
		const commonGuilds = guilds
			.filter(isAdministrator)
			.filter(isBotAlsoInGuild(botGuilds));

		const user = await getUser(discordUser);

		const session = await auth.createSession(user._id, { guilds: commonGuilds });
		const sessionCookie = auth.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		if (e instanceof OAuth2RequestError) {
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}

interface DiscordUser {
	id: string;
}

const isBotAlsoInGuild = (botGuilds: DiscordGuild[]) => (guild: DiscordGuild) =>
	!!botGuilds.find((bg) => bg.id === guild.id);
const isAdministrator = (guild: DiscordGuild) =>
	new PermissionsBitField(guild.permissions).has(PermissionsBitField.Flags.Administrator);
