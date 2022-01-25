import { FastifyInstance } from "fastify";

export const getPostsByUser = async (server: FastifyInstance, user_id: number) => {
  const posts = await server.db.post.find({ where: { user: user_id } });
  return posts;
};

export const getDraftPostByUser = async (server: FastifyInstance, user_id: number) => {
  const user = await server.db.user.findOne(user_id);
  return user?.draft_post;
};
