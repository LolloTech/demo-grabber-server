'use strict';

import jwt from 'jsonwebtoken';
import { Database } from './Database.js'
const privateKey = '0xDEADBEEF';

class APIsHandler {
  constructor () {
    this._databaseInstance = new Database();

    // Binding async functions to current this
    this.loginHandler = this.loginHandler.bind(this);
  }

  async loginHandler (req, res) {
    const username = (req.body && req.body.username) || null;
    const password = (req.body && req.body.password) || null;
    const successfulUserPresence = await this._databaseInstance.findByUsernameAndPassword(username, password);

    let token;

    if (successfulUserPresence) {
      const user = await this._databaseInstance.findByUsername(username);

      token = jwt.sign({ id: user[0].id }, privateKey, {
        expiresIn: 60 // 60 seconds, test purpose
      });
      return res.status(200).json({ res: token });
    }
    return res.status(401).json({ res: 'unauth' });
  }

  async defaultHandler (req, res) {
    res.status(500).json({ res: 'internalServerError' });
  }

  listen () {
    return this.app.listen(this.port, this.responseFunction);
  }
}
export { APIsHandler }
