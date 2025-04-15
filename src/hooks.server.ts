import { prepareStylesSSR } from '@svelteuidev/core';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import type { RegisteredDatabaseSessionAttributes, RegisteredDatabaseUserAttributes, Session, User } from 'lucia';

const luciaHandle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(auth.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await auth.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = auth.createSessionCookie(session.id);
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	if (!session) {
		const sessionCookie = auth.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}

	event.locals.user = user as User & RegisteredDatabaseUserAttributes;
	event.locals.session = session as Session & RegisteredDatabaseSessionAttributes;
	return resolve(event);
};

export const handle = sequence(luciaHandle, prepareStylesSSR);
