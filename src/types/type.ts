import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

export type ServerType = FastifyInstance<Server, IncomingMessage, ServerResponse>;
