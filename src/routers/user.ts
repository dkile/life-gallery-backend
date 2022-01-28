import { FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { ServerType } from "../types/type";
import fp from "fastify-plugin";
import { findUserById, getAllUsers } from "../service/UserService";
import { getAllPostByUserId, getPostById } from "../service/PostService";
import { Post } from "../entity/post";
import { User } from "../entity/user";

const customizeUser = (user: User) => ({
  id: user?.id,
  full_name: user?.full_name,
  nick_name: user?.nick_name,
  created_at: user?.created_at,
  updated_at: user?.updated_at
});

const customizePost = (post: Post) => ({
  id: post.id,
  title: post.title,
  content: post.content,
  image_link: post.image_link,
  created_at: post.created_at,
  updated_at: post.updated_at
});

const userRouter = fp(async (server: ServerType, opts: FastifyPluginOptions) => {
  server.get("/users", async (req: FastifyRequest<any>, res: FastifyReply) => {
    try {
      console.log("-------------------users finding------------------");
      const users = await getAllUsers(server);
      console.log(users);
      if (!users) {
        console.log("no users");
        res.send("no users");
      }
      const customizedUsers = users.map((user) => customizeUser(user));

      res.send({
        users: customizedUsers
      });
    } catch (err) {
      console.log(err);
    }
  });

  server.get("/users/:userId", async (req: FastifyRequest<any>, res: FastifyReply) => {
    try {
      console.log("-------------------user finding------------------");
      const id = Number(req.params.userId);
      const user = (await findUserById(server, id)) as User;
      if (!user) {
        server.log.info("no user");
        res.send("no user");
      }
      const customizedUser = customizeUser(user);
      res.send(customizedUser);
    } catch (err) {
      server.log.info(err);
    }
  });

  server.get("/users/:userId/posts", async (req: FastifyRequest<any>, res: FastifyReply) => {
    try {
      const id = Number(req.params.userId);
      const posts = await getAllPostByUserId(server, id);
      if (!posts) {
        server.log.info("no posts");
        res.send("no posts");
      }
      const customizedPosts = posts.map((post) => customizePost(post));
      res.send({
        posts: customizedPosts
      });
    } catch (err) {
      server.log.info(err);
    }
  });

  server.get("/users/:userId/posts/:postId", async (req: FastifyRequest<any>, res: FastifyReply) => {
    try {
      const postId = Number(req.params.postId);
      const post = (await getPostById(server, postId)) as Post;
      if (!post) {
        server.log.info("no post");
        res.send("no post");
      }
      const customizedPost = customizePost(post);

      res.send(customizedPost);
    } catch (err) {
      server.log.info(err);
    }
  });
});

export default userRouter;
