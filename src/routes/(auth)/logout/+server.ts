import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

export async function POST(event: RequestEvent) {
	if (!event.locals.session) {
		return error(401);
	}

	await auth.invalidateSession(event.locals.session.id);
	const sessionCookie = auth.createBlankSessionCookie();
	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
	redirect(302, '/login');
}
