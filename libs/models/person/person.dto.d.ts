import { SkillDto } from "../skill/skill.dto";
import { Person } from "./person";

export interface PersonDto extends Person {
  skills: SkillDto[]
}