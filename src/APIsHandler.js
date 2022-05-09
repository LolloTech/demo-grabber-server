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
    return new Result(false, null);
  }

  async defaultHandler (req, res) {
    res.status(500).json({ res: 'internalServerError' });
  }

  listen () {
    return this.app.listen(this.port, this.responseFunction);
  }
}

export { APIsHandler }
