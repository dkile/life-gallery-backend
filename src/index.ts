// src/index.ts
import fastify, { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

const articleBlockId = "9jtk2wrd31htcy87vbw77dot";
const PORT = process.env.PORT || "3000";
const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
  logger: { level: "info", file: "./server.log" }
});

// test code
server.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
  return { hello: "world" };
});

server.post("/image", async (request: FastifyRequest, reply: FastifyReply) => {
  console.log(request.body);
  return {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: "이미지 등록이 완료되었습니다."
          }
        }
      ],
      quickReplies: [
        {
          action: "block",
          messageText: "글귀를 입력해주세요.",
          blockId: articleBlockId
        }
      ]
    }
  };
});

server.post("/article", async (request: FastifyRequest, reply: FastifyReply) => {
  console.log(request.body);
  return {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: "글귀 등록이 완료되었습니다."
          }
        }
      ]
    }
  };
});

server.listen(+PORT, "0.0.0.0", (err) => {
  if (err) throw err;
});
