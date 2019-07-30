import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyObjectionjs from 'fastify-objectionjs';

import knexfile from '../knexfile';
import { peopleRoutesPlugin } from './people/people.routes';
import { PersonModel } from './people/person.model';
import { SkillModel } from './skills/skill.model';
import { skillsRoutesPlugin } from './skills/skills.routes';

const server = fastify({
  logger: true,
});

server.register(fastifyCors, {});

server.register(fastifyObjectionjs, {
  knexConfig: knexfile.development,
  models: [PersonModel, SkillModel],
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
