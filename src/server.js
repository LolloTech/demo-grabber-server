'use strict';

import express from 'express';
import jwt from 'jsonwebtoken'
const privateKey = '0xDEADBEEF';
let databaseInstance;

class Server {
  constructor (databaseInstanceP) {
    this.app = express();
    this.port = 3003;
    databaseInstance = databaseInstanceP;
    this.responseFunction = () => {
      console.log(`Listening on port ${this.port}`);
    };
  }

  async _loginHandler (req, res) {
    const username = (req.body && req.body.username) || null;
    const password = (req.body && req.body.password) || null;
    const successfulUserPresence = await databaseInstance.findByUsernameAndPassword(username, password);

    let token;

    if (successfulUserPresence) {
      const user = await databaseInstance.findByUsername(username);

      token = jwt.sign({ id: user[0].id }, privateKey, {
        expiresIn: 60 // 60 seconds, test purpose
      });
      return res.status(200).json({ res: token });
    }
    return res.status(401).json({ res: 'unauth' });
  }

  async _defaultHandler (req, res) {
    res.status(500).json({ res: 'internalServerError' });
  }

  setupEndpoints () {
    const { app } = this;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.post('/login/', this._loginHandler);
    app.use(this._defaultHandler);
  }

  listen () {
    return this.app.listen(this.port, this.responseFunction);
  }
}

export { Server };
