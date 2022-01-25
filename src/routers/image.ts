import { ServerType, imageRequestBody } from "../types/type";
import { FastifyRequest, FastifyReply } from "fastify";
import { findUserByKakaoId, saveUser } from "../service/user";
import { User } from "../entity/user";

const imageRouter = async (server: ServerType) => {
  server.post("/image", async (req: FastifyRequest<any>, res: FastifyReply) => {
    const requestBody: imageRequestBody = req.body;

    server.log.info("----------------------IMAGE------------------------");
    server.log.info(requestBody);
    server.log.info("---------------------------------------------------");

    const user = await findUserByKakaoId(server, requestBody.userRequest.user.id);
    if (!user) {
      const newUser = new User();
      newUser.kakao_id = requestBody.userRequest.user.id;
      newUser.full_name = " ";
      newUser.nick_name = " ";
      newUser.user_state = 1;
      await saveUser(server, newUser);
    }
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
