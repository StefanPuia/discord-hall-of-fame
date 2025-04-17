import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = (event) => {
	if (event.locals.user) {
		redirect(302, '/');
	}
};
