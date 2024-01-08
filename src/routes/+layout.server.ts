import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		return {
			user: {
				id: session.user.userId,
				name: session.user.discordUsername,
				guilds: session.guilds
			}
		};
	}
};
