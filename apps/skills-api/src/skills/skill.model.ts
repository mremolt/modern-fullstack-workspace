import { Skill, skillSchema } from '@mr/models';
import { Model } from 'objection';

export class SkillModel extends Model implements Skill {
  static get tableName(): string {
    return 'skills';
  }

  public static jsonSchema = skillSchema;

  public readonly id!: number;
  public name: string = '';
}
