import { auth, discordAuth } from '$lib/server/lucia.js';
import { OAuthRequestError } from '@lucia-auth/oauth';
import { error } from '@sveltejs/kit';
import { PermissionsBitField, REST, Routes } from 'discord.js';
import { getBotGuilds } from '$lib/server/discord-bot';
import type { DiscordGuild } from '$lib/types';
import { discordGuildMapper } from '$lib/mappers';

export const GET = async ({ url, cookies, locals }) => {
	const storedState = cookies.get('discord_oauth_state');
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');
	// validate state
	if (!storedState || !state || storedState !== state || !code) {
		return error(400, 'invalid state');
	}
	try {
		const {
			discordUser,
			createUser,
			discordTokens: { accessToken }
		} = await discordAuth.validateCallback(code);

		const getUser = async () => {
			const existingUser = await auth.getUser(discordUser.id);
			if (existingUser) return existingUser;
			return await createUser({
				userId: discordUser.id,
				attributes: {
					isEditor: false
				}
			});
		};

		const rest = new REST({ authPrefix: 'Bearer' }).setToken(accessToken);
		const guilds = (await rest.get(Routes.userGuilds())) as DiscordGuild[];
		const botGuilds = await getBotGuilds();
		const commonGuilds = guilds
			.filter(isAdministrator)
			.filter(isBotAlsoInGuild(botGuilds))
			.map(discordGuildMapper);

		console.log();

		const user = await getUser();
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {
				guilds: commonGuilds
			}
		});
		locals.auth.setSession(session);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		if (e instanceof OAuthRequestError) {
			throw error(400, 'invalid authorization code');
		}
		console.log(e);
		throw error(500);
	}
};

const isBotAlsoInGuild = (botGuilds: DiscordGuild[]) => (guild: DiscordGuild) =>
	!!botGuilds.find((bg) => bg.id === guild.id);
const isAdministrator = (guild: DiscordGuild) =>
	new PermissionsBitField(guild.permissions).has(PermissionsBitField.Flags.Administrator);
