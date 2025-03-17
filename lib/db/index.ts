import { Db } from '../../types/db';
import * as mysql from '../dbs/mysql';
import * as firebase from '../dbs/firebase';

const { DB_TYPE = 'mysql' } = process.env;

const db: Db = DB_TYPE === 'firebase' ? firebase : mysql;

export default db; 