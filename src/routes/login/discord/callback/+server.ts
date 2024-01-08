import { auth, discordAuth } from '$lib/server/lucia.js';
import { OAuthRequestError } from '@lucia-auth/oauth';
import { error } from '@sveltejs/kit';
import { REST, Routes } from 'discord.js';
import { discordGuildMapper } from '$lib/mappers';
import { getBotGuilds } from '$lib/server/discord-bot';

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
			getExistingUser,
			discordUser,
			createUser,
			discordTokens: { accessToken }
		} = await discordAuth.validateCallback(code);

		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) return existingUser;
			return await createUser({
				attributes: {
					username: discordUser.username,
					discriminator: discordUser.discriminator
				}
			});
		};

		const rest = new REST({ authPrefix: 'Bearer' }).setToken(accessToken);
		const guilds = await rest.get(Routes.userGuilds()) as DiscordGuild[];
		const botGuilds = await getBotGuilds();

		const user = await getUser();
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {
				guilds: guilds.map(discordGuildMapper).filter(g => botGuilds.find(bg => bg.id === g.id))
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
