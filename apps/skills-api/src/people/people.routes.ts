import { PersonModel } from '@mr/models';
import { Plugin, RequestHandler } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { QueryBuilder } from 'objection';

const joinLevelBuilder = (builder: QueryBuilder<PersonModel>) => {
  builder
    .join('people_skills as pk', 'pk.skillId', 'skills.id')
    .select('skills.*', 'pk.level as level', 'pk.id as levelId');
};

const getPeople: RequestHandler = () => {
  return PersonModel.query().eager('skills(joinLevel)', {
    joinLevel: joinLevelBuilder,
  });
};

const getPersonById: RequestHandler = request => {
  return PersonModel.query()
    .findById(request.params.id)
    .eager('skills(joinLevel)', {
      joinLevel: joinLevelBuilder,
    });
};

export const peopleRoutesPlugin: Plugin<Server, IncomingMessage, ServerResponse, {}> = (fastify, _opts, done) => {
  fastify.get('/', getPeople);
  fastify.get('/:id', getPersonById);

  done();
};
