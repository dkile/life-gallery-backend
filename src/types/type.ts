import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

export type ServerType = FastifyInstance<Server, IncomingMessage, ServerResponse>;

export interface PostQueryCondition {
  user_id?: number;
  kakao_id?: string;
  nick_name?: string;
}

export interface basicRequestBody {
  level: number;
  time: number;
  pid: number;
  hostname: string;
  bot: {
    id: string;
    name: string;
  };
  intent: {
    id: string;
    name: string;
    extra: {
      reason: {
        code: number;
        message: string;
      };
    };
  };
  action: {
    id: string;
    name: string;
    params: {};
    detailParams: {};
    clientExtra: {};
  };
  userRequest: {
    block: {
      id: string;
      name: string;
    };
    user: {
      id: string;
      type: string;
      properties: {
        botUserKey: string;
        isFriend: boolean;
        plusfriendUserKey: string;
        bot_user_key: string;
        plusfriend_user_key: string;
      };
    };
    utterance: string;
    params: {
      surface: string;
    };
    lang: string;
    timezone: string;
  };
  contexts: [];
}

export interface imageRequestBody extends Omit<basicRequestBody, "contexts"> {
  action: {
    id: string;
    name: string;
    params: { secureimage: string };
    detailParams: {
      secureimage: {
        groupName: string;
        origin: string;
        value: string;
      };
    };
    clientExtra: {};
  };
  contexts: [
    {
      name: string;
      lifespan: number;
      ttl: number;
      params: {
        secureimage: {
          value: string;
          resolvedValue: string;
        };
      };
    }
  ];
}
