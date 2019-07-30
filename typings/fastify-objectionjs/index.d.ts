
import {IncomingMessage, Server, ServerResponse} from 'http';
import {
  DefaultQuery,
  DefaultParams,
  DefaultHeaders,
  FastifyMiddleware,
  FastifyRequest,
  FastifyReply,
  Plugin,
  DefaultBody,
} from 'fastify';

import objection from 'objection';
import knex from 'knex';

declare namespace fastifyObjectionjs {
  interface Options {}
}

declare module 'fastify' {
  interface FastifyInstance<HttpServer = Server, HttpRequest = IncomingMessage, HttpResponse = ServerResponse> {
    foo: number;
    objection: {
      knexConnection: knex.ConnectionConfig,
      models: { [key: string]: typeof objection.Model }
    };
  }
}

declare let fastifyObjectionjs2: Plugin<Server, IncomingMessage, ServerResponse, fastifyObjectionjs.Options>;

export = fastifyObjectionjs2;