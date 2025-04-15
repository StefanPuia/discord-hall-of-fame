import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { generateState } from 'arctic';
import { DISCORD_SCOPES, discordAuth } from '$lib/server/lucia';

export function GET(event: RequestEvent): Promise<Response> {
	const state = generateState();
	const url = discordAuth.createAuthorizationURL(state, null, DISCORD_SCOPES);

	event.cookies.set('discord_oauth_state', state, {
		path: '/',
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});

	redirect(302, url.toString());
}
