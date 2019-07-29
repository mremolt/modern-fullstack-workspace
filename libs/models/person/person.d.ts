/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type Id = number;
export type Firstname = string;
export type Lastname = string;
export type Email = string;

export interface Person {
  id: Id;
  firstName: Firstname;
  lastName: Lastname;
  email?: Email;
}
