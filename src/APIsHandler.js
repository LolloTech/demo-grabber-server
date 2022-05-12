'use strict';

import jwt from 'jsonwebtoken';
import { Database } from './Database.js'
import { Result } from './Result.js';
const privateKey = '0xDEADBEEF';

class APIsHandler {
  constructor () {
    this._databaseInstance = new Database();

    // Binding async functions to current this
    this.loginHandler = this.loginHandler.bind(this);
  }

  async loginHandler (payload) {
    const username = (payload.body && payload.body.username) || null;
    const password = (payload.body && payload.body.password) || null;
    const successfulUserPresence = await this._databaseInstance.findByUsernameAndPassword(username, password);

    let token;

    if (successfulUserPresence) {
      const user = await this._databaseInstance.findByUsername(username);

      token = jwt.sign({ id: user[0].id }, privateKey, {
        expiresIn: 60 // 60 seconds, test purpose
      });
      return new Result(true, token);
    }
    return new Result(false, {});
  }

  async changePassword (payload) {
    const username = (payload.body && payload.body.username) || null;
    const oldPassword = (payload.body && payload.body.oldPassword) || null;
    const newPassword = (payload.body && payload.body.newPassword) || null;
    const operationSuccess = await this._databaseInstance.changePassword(username, oldPassword, newPassword)

    if (operationSuccess) {
      return new Result(true, { res: 'passChanged' });
    }
    return new Result(false, { res: 'error' });
  }

  async defaultHandler (req, res) {
    return new Result(false, { error: 'Internal Server Error' });
  }

  listen () {
    return this.app.listen(this.port, this.responseFunction);
  }
}

export { APIsHandler }
