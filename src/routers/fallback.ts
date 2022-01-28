import { basicRequestBody, ServerType } from "../types/type";
import { FastifyRequest, FastifyReply, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";
import { getDraftPostByKakaoId, savePost } from "../service/PostService";
import { findUserByKakaoId } from "../service/UserService";
import { User } from "../entity/user";

const fallbackRouter = fp(async (server: ServerType, opts: FastifyPluginOptions) => {
  server.post("/fallback", async (req: FastifyRequest<any>, res: FastifyReply) => {
    server.log.info("---------------------------------------------------");
    server.log.info(req.body);
    server.log.info("---------------------------------------------------");

    const requestBody: basicRequestBody = req.body;
    const recentPost = await getDraftPostByKakaoId(server, requestBody.userRequest.user.id);
    const utterance = requestBody.userRequest.utterance;
    if (!recentPost) {
      return {
        version: "2.0",
        template: {
          outputs: [
            {
              simpleText: "작품 등록 먼저 해주세요. 잘가요."
            }
          ]
        }
      };
    }
    const postState = recentPost?.draft_state;
    if (postState === 1) {
      recentPost.title = utterance;
      recentPost.draft_state = 2;
      await savePost(server, recentPost);
      res.send({
        version: "2.0",
        template: {
          outputs: [
            {
              simpleText: "제목을 입력받았습니다. 글귀를 입력해주세요."
            }
          ]
        }
      });
    } else if (postState === 2) {
      recentPost.content = utterance;
      recentPost.draft_state = 3;
      await savePost(server, recentPost);
      res.send({
        version: "2.0",
        template: {
          outputs: [
            {
              simpleText: "글귀를 입력받았습니다. 업로드 하시려면 업로드 버튼을 눌러주세요."
            },
            {
              basicCard: {
                title: recentPost.title,
                description: recentPost.content,
                thumbnail: recentPost.image_link,
                buttons: [
                  {
                    label: "업로드",
                    action: "message",
                    messageText: "업로드 할게요"
                  }
                ]
              }
            }
          ]
        }
      });
    } else if (postState === 3) {
      recentPost.draft_state = 4;
      await savePost(server, recentPost);
      const user = (await findUserByKakaoId(server, requestBody.userRequest.user.id)) as User;
      res.send({
        version: "2.0",
        template: {
          outputs: [
            {
              simpleText: "업로드가 완료되었습니다."
            },
            {
              basicCard: {
                title: recentPost.title,
                description: recentPost.content,
                thumbnail: recentPost.image_link,
                buttons: [
                  {
                    label: "쟉품 확인하러 가기",
                    action: "webLink",
                    webLinkUrl: `https://life-gallery.netlify.app/${user.id}`
                  }
                ]
              }
            }
          ]
        }
      });
    }
  });
});

export default fallbackRouter;
