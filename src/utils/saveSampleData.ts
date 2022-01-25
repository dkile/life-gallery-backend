import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { User } from "../entity/user";
import { saveUser } from "../service/user";

export default fp(async (server: FastifyInstance) => {
  const user = new User();
  user.full_name = " ";
  user.kakao_id = "sampleKakaoId";
  user.nick_name = "빠른거북이01";
  user.user_state = 0;
  await saveUser(server, user);
});
