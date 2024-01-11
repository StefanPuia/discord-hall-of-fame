export const load = ({ params, data }) => {
	return {
		serverId: params.serverId,
		postId: params.postId,
		message: data.message
	};
};
