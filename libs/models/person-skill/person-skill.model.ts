import { Model } from 'objection';

import { PersonSkill } from './person-skill';
import personSkillSchemaJson from './person-skill.schema.json';

export class PersonSkillModel extends Model implements PersonSkill {
  static get tableName(): string {
    return 'people_skills';
  }

  public static jsonSchema = personSkillSchemaJson;

  public readonly id!: number;
  public personId!: number;
  public skillId!: number;
  public level: string = '';
}
