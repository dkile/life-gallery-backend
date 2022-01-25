import { ServerType } from "../types/type";
import { FastifyRequest, FastifyReply } from "fastify";

const imageRouter = async (server: ServerType) => {
  server.post("/image", async (req: FastifyRequest, res: FastifyReply) => {
    res.send({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: "이미지 등록이 완료되었습니다. 글귀를 입력해주세요."
            }
          }
        ]
      }
    });
  });
};

export default imageRouter;
