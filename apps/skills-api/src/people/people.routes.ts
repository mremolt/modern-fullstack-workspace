import { Plugin, RequestHandler } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { QueryBuilder } from 'objection';

import { PersonModel } from './person.model';

const joinLevelBuilder = (builder: QueryBuilder<PersonModel>) => {
  builder
    .join('people_skills as pk', 'pk.skillId', 'skills.id')
    .select('skills.*', 'pk.level as level', 'pk.id as levelId');
};

const getPeople: RequestHandler = async () => {
  return PersonModel.query().eager('skills(joinLevel)', {
    joinLevel: joinLevelBuilder,
  });
};

const getPersonById: RequestHandler = async request => {
  return PersonModel.query()
    .findById(request.params.id)
    .eager('skills(joinLevel)', {
      joinLevel: joinLevelBuilder,
    });
};

const insertPerson: RequestHandler = async request => {
  const person = { ...request.body };

  return PersonModel.query().insert(person);
};

const updatePerson: RequestHandler = async request => {
  const id = Number(request.body.id);
  const person = { ...request.body, id };

  return PersonModel.query().patchAndFetchById(id, person);
};

const deletePerson: RequestHandler = async request => {
  const id = Number(request.params.id);
  return PersonModel.query().deleteById(id);
};

export const peopleRoutesPlugin: Plugin<Server, IncomingMessage, ServerResponse, {}> = (fastify, _opts, done) => {
  fastify.get('/', getPeople);
  fastify.get('/:id', getPersonById);
  fastify.put('/:id', updatePerson);
  fastify.delete('/:id', deletePerson);
  fastify.post('/', insertPerson);

  done();
};
