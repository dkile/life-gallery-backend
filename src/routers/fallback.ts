import { ServerType } from "../types/type";
import { FastifyRequest, FastifyReply } from "fastify";

const fallbackRouter = async (server: ServerType) => {
  server.post("/fallback", async (req: FastifyRequest, res: FastifyReply) => {
    server.log.info("---------------------------------------------------");
    server.log.info(req.body);
    server.log.info("---------------------------------------------------");
    res.send({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: "잘가요. 즐거웠어요. 다음에 다시 만나요."
          }
        ]
      }
    });
  });
};

export default fallbackRouter;
