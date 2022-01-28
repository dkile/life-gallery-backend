import { FastifyInstance } from "fastify";
import { User } from "../entity/user";

export const getAllUsers = async (server: FastifyInstance) => {
  const users = await server.db.user.find();
  return users;
};

export const getUserWithRecentPosts = async (
  server: FastifyInstance,
  user_id: number,
  post_number: number
) => {
  const posts = await server.db.post.find({
    where: { user: user_id },
    relations: ["user"],
    order: { created_at: "DESC" },
    take: post_number
  });
  const user = await server.db.user.findOne(user_id);

  return { ...user, recent_post_images: posts.map((post) => post.image_link) };
};

export const findUserByKakaoId = async (server: FastifyInstance, kakao_id: string) => {
  const user = await server.db.user.findOne({ kakao_id });
  return user;
};

export const findUserById = async (server: FastifyInstance, id: number) => {
  const user = await server.db.user.findOne(id);
  return user;
};

export const saveUser = async (server: FastifyInstance, user: User) => {
  await server.db.user.save(user);
};
