// src/decorators/db.ts
import fp from "fastify-plugin";
import { createConnection, getConnectionOptions } from "typeorm";
import { Gallery } from "../modules/gallery/entity";
import { Post } from "../modules/post/entity";
import { User } from "../modules/user/entity";

export default fp(async (fastify) => {
  try {
    const connectionOptions = await getConnectionOptions();
    const connection = await createConnection(connectionOptions);

    fastify.decorate("db", {
      user: connection.getRepository(User),
      gallery: connection.getRepository(Gallery),
      post: connection.getRepository(Post)
    });
  } catch (error) {
    console.log(error);
  }
});
