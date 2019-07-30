import { Plugin, RequestHandler } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { SkillModel } from './skill.model';

const getSkills: RequestHandler = () => {
  return SkillModel.query();
};

const getSkillById: RequestHandler = request => {
  return SkillModel.query().findById(request.params.id);
};

export const skillsRoutesPlugin: Plugin<Server, IncomingMessage, ServerResponse, {}> = (fastify, _opts, done) => {
  fastify.get('/', getSkills);
  fastify.get('/:id', getSkillById);

  done();
};
