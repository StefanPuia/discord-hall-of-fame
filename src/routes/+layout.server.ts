import type { LayoutServerLoad } from './$types';
import type { AxiosError } from 'axios';

export const load: LayoutServerLoad = async ({ locals }) => {
	try {
		const session = await locals.auth.validate();
		if (session) {
			return {
				user: {
					id: session.user.userId,
					guilds: session.guilds
				}
			};
		}
	} catch (e: unknown) {
		const err = e as AxiosError;
		console.log(err?.response?.data ?? err.response ?? err.message ?? err);
	}
};
