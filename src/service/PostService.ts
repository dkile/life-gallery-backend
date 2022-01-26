import { FastifyInstance } from "fastify";
import { Post } from "../entity/post";

export const getPostsByUser = async (server: FastifyInstance, user_id: number) => {
  const posts = await server.db.post.find({ where: { user: user_id } });
  return posts;
};

export const getDraftPostByUser = async (server: FastifyInstance, user_id: number) => {
  const user = await server.db.user.findOne(user_id);
  return user?.draft_post;
};

export const getDraftPostByKakaoId = async (server: FastifyInstance, kakao_id: string) => {
  const user = await server.db.user.find({ where: { kakao_id } });
  server.log.info(`User at post service is ${user.map((u) => u.kakao_id)}`);
  if (user.length === 0) {
    server.log.error(`No such user with kakao id: ${kakao_id}.`);
    return undefined;
  }
  return user[0].draft_post;
};

export const savePost = async (server: FastifyInstance, post: Post) => {
  await server.db.post.save(post);
};
