import knex from 'knex';
import serverconfig from './serverconfig';

const mysqlknex = knex(serverconfig.knex);

export default mysqlknex;
