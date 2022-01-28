// src/index.ts
import fastify from "fastify";
import { ServerType } from "./types/type";
import registerRouter from "./routers/register";
import imageRouter from "./routers/image";
import fallbackRouter from "./routers/fallback";
import db from "./decorators/db";
import { config } from "dotenv";
import userRouter from "./routers/user";

config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT || "3000";
const server: ServerType = fastify({
  logger: {
    level: "info",
    file: "./server.log",
    prettyPrint: {
      translateTime: "HH:MM:ss Z",
      ignore: "pid,hostname"
    }
  }
});

server.register(db);
server.register(registerRouter);
server.register(imageRouter);
server.register(fallbackRouter);
server.register(userRouter, {
  prefix: "/users"
});

server.listen(+PORT, "0.0.0.0", (err) => {
  if (err) throw err;
});
