import { Collection, MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private';
import { building } from '$app/environment';
import type { DiscordGuild } from '$lib/types';
import { generateIdFromEntropySize } from 'lucia';

export interface UserDoc {
	_id: string;
	discordId: string;
}

export interface ServerDoc {
	_id: string;
	discordId: string;
	hofChannelId: string;
}

interface NewPostDoc {
	discordId: string;
	date: string;
	file: string;
	title: string;
	channel: string;
}

export interface PostDoc extends NewPostDoc {
	_id: string;
	created: string;
	deleted?: string;
}

export interface SessionDoc {
	_id: string;
	expires_at: Date;
	user_id: string;
	guilds: DiscordGuild[];
}

class Database {
	private static instance: MongoClient;

	private static getConnectionString() {
		if (building) {
			return 'mongodb://root:root@localhost:27017/';
		}
		return env.MONGODB_CONNECTION_STRING!;
	}

	public static get() {
		if (!Database.instance) {
			Database.instance = new MongoClient(Database.getConnectionString());
			Database.instance.connect().catch(console.error);
		}
		return Database.instance.db(env.MONGODB_DATABASE);
	}
}

export const User = Database.get().collection('users') as Collection<UserDoc>;
export const Server = Database.get().collection('servers') as Collection<ServerDoc>;
export const Post = Database.get().collection('posts') as Collection<PostDoc>;
export const Session = Database.get().collection('sessions') as Collection<SessionDoc>;

export const getServer = (discordId: string) => Server.findOne({ discordId });
export const getPostByDiscordId = (discordId: string) => Post.findOne({ discordId });
export const getPostsByChannel = (channelId: string) =>
	Post.find({
		channel: channelId,
		deleted: { $exists: false }
	});
export const createPost = (post: NewPostDoc) =>
	Post.insertOne({
		...post,
		_id: generateIdFromEntropySize(10),
		created: new Date().toISOString()
	});
export const deletePost = (discordId: string) =>
	Post.updateOne({ discordId }, { $set: { deleted: new Date().toISOString() } });
