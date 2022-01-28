import { FastifyInstance } from "fastify";
import { User } from "../entity/user";

export const getAllUsers = async (server: FastifyInstance) => {
  const users = await server.db.user.find();
  return users;
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
