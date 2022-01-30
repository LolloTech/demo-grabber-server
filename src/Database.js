'use strict'
import knex from 'knex';
import config from '../db/knexfile.cjs'
import bcrypt from 'bcryptjs'

class Database {
  constructor () {
    this.db = knex(config.development);
  }

  findByUsername (usrname) {
    return this.db('users').where({ username: usrname });
  }

  async findByUsernameAndPassword (usrname, pssword) {
    const user = await this.db('users').where({ username: usrname }).catch((e) => console.log(e));
    const userEncryptedPass = (user.length && user[0].password) || '';
    const result = await bcrypt.compare(pssword, userEncryptedPass);

    return result;
  }
}

export { Database };
