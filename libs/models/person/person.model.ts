import { Model } from 'objection';
import { Person } from './person';

import { SkillModel } from '../skill/skill.model';
import personSchemaJson from './person.schema.json';

export class PersonModel extends Model implements Person {
  static get tableName(): string {
    return 'people';
  }

  public static jsonSchema = personSchemaJson;

  public static relationMappings = {
    skills: {
      join: {
        from: 'people.id',
        through: {
          // persons_movies is the join table.
          from: 'people_skills.personId',
          to: 'people_skills.skillId',
        },
        to: 'skills.id',
      },
      modelClass: SkillModel,
      relation: Model.ManyToManyRelation,
    },
  };

  public readonly id!: number;
  public firstName: string = '';
  public lastName: string = '';
  public email?: string = '';
}
