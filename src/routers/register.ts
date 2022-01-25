import { ServerType, registerRequestBody } from "../types/type";
import { FastifyRequest, FastifyReply } from "fastify";
import { findUserByKakaoId } from "../service/user";

const registerRouter = async (server: ServerType) => {
  server.post("/register", async (req: FastifyRequest<any>, res: FastifyReply) => {
    const requestBody: registerRequestBody = req.body;

    server.log.info("----------------------REGISTER----------------------");
    server.log.info(requestBody);
    server.log.info("---------------------------------------------------");

    const user = await findUserByKakaoId(server, requestBody.userRequest.user.id);
    if (!user) {
      res.send({
        version: "2.0",
        template: {
          outputs: [
            {
              simpleText:
                "작품 등록 절차를 진행합니다. 개인 정보 제공 동의 후 이미지 업로드 단계로 넘어갑니다. 개인 정보 제공에 동의하시겠습니까?"
            }
          ],
          quickReplies: [
            {
              label: "개인 정보 제공 동의",
              action: "block",
              messageText: "개인 정보 제공에 동의할게요",
              blockId: "61ee39c2bce5c65875ef3a2e" // image upload block
            },
            {
              label: "개인 정보 제공 비동의",
              action: "message",
              messageText: "개인 정보 제공에 동의하지 않아요."
            }
          ]
        }
      });
    } else {
      res.send({
        version: "2.0",
        template: {
          outputs: [
            {
              basicCard: {
                thumbnail: {
                  imageUrl: "https://og-image.vercel.app/Welcome%20to%20life%20gallery.png"
                },
                buttons: [
                  {
                    action: "block",
                    label: "이미지 업로드",
                    blockId: "61ee39c2bce5c65875ef3a2e"
                  }
                ]
              }
            }
          ]
        }
      });
    }
  });
};

export default registerRouter;
