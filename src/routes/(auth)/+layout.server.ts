import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { isUserOwner } from '$lib/server/discord-bot';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(302, '/login');
	}
	return {
		guilds: locals.session?.guilds ?? [],
		isOwner: isUserOwner(locals.user)
	};
};
