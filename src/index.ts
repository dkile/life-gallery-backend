// src/index.ts
import fastify from "fastify";
import { ServerType } from "./types/type";
import registerRouter from "./routers/register";
import imageRouter from "./routers/image";
import fallbackRouter from "./routers/fallback";

const PORT = process.env.PORT || "3000";
const server: ServerType = fastify({
  logger: { level: "info", file: "./server.log" }
});

server.register(registerRouter);
server.register(imageRouter);
server.register(fallbackRouter);

server.listen(+PORT, "0.0.0.0", (err) => {
  if (err) throw err;
});
