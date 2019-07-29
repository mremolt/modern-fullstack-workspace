import { Model } from 'objection';
import { Skill } from './skill';

import skillSchemaJson from './skill.schema.json';

export class SkillModel extends Model implements Skill {
  static get tableName(): string {
    return 'skills';
  }

  public static jsonSchema = skillSchemaJson;

  public readonly id!: number;
  public name: string = '';
}
