import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyObjectionjs from 'fastify-objectionjs';

import { PersonModel } from '@mr/models';

import knexfile from '../knexfile';
import { peopleRoutesPlugin } from './people/people.routes';
import { skillsRoutesPlugin } from './skills/skills.routes';

const server = fastify({
  logger: true,
});

server.register(fastifyCors, {});

server.register(fastifyObjectionjs, {
  knexConfig: knexfile.development,
  models: [PersonModel],
});

server.register(peopleRoutesPlugin, { prefix: '/v1/people' });
server.register(skillsRoutesPlugin, { prefix: '/v1/skills' });

server.get('/', async (_request, _reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await server.listen(3000);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
