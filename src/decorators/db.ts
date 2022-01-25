// src/decorators/db.ts
import fp from "fastify-plugin";
import { createConnection, getConnectionOptions } from "typeorm";
import { Post } from "../entity/post";
import { User } from "../entity/user";

export default fp(async (fastify) => {
  try {
    const connectionOptions = await getConnectionOptions();
    const connection = await createConnection(connectionOptions);

    fastify.decorate("db", {
      user: connection.getRepository(User),
      post: connection.getRepository(Post)
    });
  } catch (error) {
    console.log(error);
  }
});
