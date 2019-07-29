import { PersonModel } from '@mr/models';
import { Plugin, RequestHandler } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

const getPeople: RequestHandler = () => {
  return PersonModel.query();
};

const getPersonById: RequestHandler = request => {
  return PersonModel.query()
    .findById(request.params.id)
    .eager('skills(joinLevel)', {
      joinLevel: builder => {
        builder.join('people_skills as pk', 'pk.skillId', 'skills.id').select('skills.*', 'pk.level as level');
      },
    });
};

export const peopleRoutesPlugin: Plugin<Server, IncomingMessage, ServerResponse, {}> = (fastify, _opts, done) => {
  fastify.get('/', getPeople);
  fastify.get('/:id', getPersonById);

  done();
};
