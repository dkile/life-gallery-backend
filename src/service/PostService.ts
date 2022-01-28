import { FastifyInstance } from "fastify";
import { Post } from "../entity/post";
import { PostQueryCondition } from "../types/type";

export const getAllPostByUserId = async (server: FastifyInstance, user_id: number, joinUser?: boolean) => {
  const posts = await server.db.post.find({
    where: { user: user_id },
    relations: joinUser ? ["user"] : undefined
  });
  return posts;
};

export const getAllPostByCondition = async (server: FastifyInstance, condition?: PostQueryCondition) => {
  const posts = await server.db.post.find({
    where: { user: { ...condition } },
    relations: ["user"]
  });
  return posts;
};

export const getDraftPostByUser = async (server: FastifyInstance, user_id: number) => {
  const user = await server.db.user.findOne(user_id, { relations: ["draft_post"] });
  return user?.draft_post;
};

export const getDraftPostByKakaoId = async (server: FastifyInstance, kakao_id: string) => {
  const user = await server.db.user.find({ where: { kakao_id }, relations: ["draft_post"] });
  if (user.length === 0) {
    server.log.error(`No such user with kakao id: ${kakao_id}.`);
    return undefined;
  }
  return user[0].draft_post;
};

export const getPostById = async (server: FastifyInstance, post_id: number) => {
  const post = await server.db.post.findOne(post_id);
  return post;
};

export const savePost = async (server: FastifyInstance, post: Post) => {
  await server.db.post.save(post);
};
