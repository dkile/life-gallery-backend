import { Server, IncomingMessage, ServerResponse } from "http";
import { Repository } from "typeorm";

import { Post } from "../../entity/post";
import { User } from "../../entity/user";

interface Repositories {
  post: Repository<Post>;
  user: Repository<User>;
}

declare module "fastify" {
  export interface FastifyInstance<
    HttpServer = Server,
    HttpRequest = IncomingMessage,
    HttpResponse = ServerResponse
  > {
    db: Repositories;
  }
}
