import { Config } from 'knex';
 
declare let config: { [key: string]: Config };

export = config;