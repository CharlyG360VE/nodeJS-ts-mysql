import mysql from 'mysql';
import keys from './keys';

const db = mysql.createPool( keys.database );

export default db;