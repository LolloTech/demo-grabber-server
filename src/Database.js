'use strict'
import knex from 'knex';
import config from '../db/knexfile.cjs'
import bcrypt from 'bcryptjs'

class Database {
  constructor () {
    this.db = knex(config.development);
  }

  findByUsername (username) {
    return this.db('users').where({ username: username });
  }

  async findByUsernameAndPassword (username, password) {
    if (username == null || password == null) {
      return false;
    }
    const user = await this.db('users').where({ username: username }).catch((e) => console.error(e));
    const userEncryptedPass = (user.length && user[0].password) || '';
    const result = await bcrypt.compare(password, userEncryptedPass);

    return result;
  }
}

export { Database };
