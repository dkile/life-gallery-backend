import { FastifyInstance } from "fastify";

export const findUserByKakaoId = async (server: FastifyInstance, kakao_id: string) => {
  const user = await server.db.user.findOne({ kakao_id });
  return user;
};
