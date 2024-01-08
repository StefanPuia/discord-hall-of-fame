import { auth } from '$lib/server/lucia';
import { prepareStylesSSR } from '@svelteuidev/core';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(async ({ event, resolve }) => {
	// we can pass `event` because we used the SvelteKit middleware
	event.locals.auth = auth.handleRequest(event);
	return resolve(event);
}, prepareStylesSSR);
