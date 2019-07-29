import { Skill } from "./skill";

export interface SkillDto extends Skill {
  level: string;
}