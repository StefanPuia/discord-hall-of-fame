import type { Adapter, InitializeAdapter, KeySchema, SessionSchema, UserSchema } from 'lucia';
import { service } from './database';

export const swaAdapter: InitializeAdapter<Adapter> = () => ({
	getUser: (userId) => handleRequestSingle<UserSchema>(`/user/id/${encodeURIComponent(userId)}`),
	setUser: async (user) => service.post(`/user`, user),
	updateUser: () => Promise.reject('noop updateUser'),
	deleteUser: () => Promise.reject('noop deleteUser'),

	getKey: (keyId) => handleRequestSingle<KeySchema>(`/user_key/id/${encodeURIComponent(keyId)}`),
	getKeysByUserId: (userId) =>
		handleRequestMulti<KeySchema>(`/user_key/user_id/${encodeURIComponent(userId)}`),
	setKey: (key) => service.post(`/user_key`, key),
	updateKey: () => Promise.reject('noop updateKey'),
	deleteKey: () => Promise.reject('noop deleteKey'),
	deleteKeysByUserId: () => Promise.reject('noop deleteKeysByUserId'),

	getSession: getSession,
	getSessionsByUserId: (userId) =>
		handleRequestMulti<SessionSchema>(`/user_session/user_id/${encodeURIComponent(userId)}`),
	setSession: (session: SessionSchema) => service.post(`/user_session`, session),
	updateSession: async (sessionId, partialSession) => {
		const session = await getSession(sessionId);
		await service.patch(`/user_session/id/${encodeURIComponent(sessionId)}`, {
			...session,
			...partialSession
		});
	},
	deleteSession: (sessionId: string) =>
		service.delete(`/user_session/id/${encodeURIComponent(sessionId)}`),
	deleteSessionsByUserId: (userId: string) =>
		service.delete(`/user_session/user_id/${encodeURIComponent(userId)}`)
});

const getSession = (sessionId: string) =>
	handleRequestSingle<SessionSchema>(`/user_session/id/${encodeURIComponent(sessionId)}`);

async function handleRequestSingle<T>(url: string): Promise<T> {
	const res = await service.get<T[]>(url);
	return res.data?.[0];
}

async function handleRequestMulti<T>(url: string): Promise<T[]> {
	const res = await service.get<T[]>(url);
	return res.data;
}
