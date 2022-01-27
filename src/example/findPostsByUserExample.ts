import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { User } from "../entity/user";
import { getAllPostByCondition, getAllPostByUserId } from "../service/PostService";
import { saveUser } from "../service/UserService";

export default fp(async (server: FastifyInstance) => {
  const posts = await getAllPostByCondition(server, {
    kakao_id: "e46f4afaec76646ab41e1b94392882edf166153c725816e8a9cd091c07666929aa"
  });
  // const posts = await getAllPostByUser(server, 1, true);
  console.log(posts);
});
