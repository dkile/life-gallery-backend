import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { Post } from "../entity/post";
import { User } from "../entity/user";
import { savePost } from "../service/PostService";
import { findUserById, saveUser } from "../service/UserService";

export default fp(async (server: FastifyInstance) => {
  const saveSamplePost = async (user_id: number) => {
    const user = await findUserById(server, user_id);

    if (user) {
      for (let i = 0; i < 10; i++) {
        const post = new Post();
        post.image_link =
          "https://life-gallery-image.s3.ap-northeast-2.amazonaws.com/1643216952604e23ff7de48b71bc0.jpg";
        post.draft_state = 4;
        post.title = `Sample_post ${i}`;
        post.content = `Sample post's content ${i}`;
        post.user = user;

        await savePost(server, post);
      }
    }
  };
});
