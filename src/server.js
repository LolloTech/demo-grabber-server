'use strict';

import express from 'express';
import jwt from 'jsonwebtoken'
const privateKey = 'ABCDEF';

class Server {
  constructor () {
    this.app = express();
    this.port = 3003;
    this.responseFunction = () => {
      console.log(`Listening on port ${this.port}`);
    };
  }

  _loginHandler (req, res) {
    const flag = true;
    let token;

    if (flag) {
      token = jwt.sign({ id: '0' }, privateKey, {
        expiresIn: 86400 // 24 hours
      });
      return res.status(200).json({ res: token });
    }
    return res.status(401).json({ res: 'unauth' });
  }

  setupEndpoints () {
    const { app } = this;

    app.post('/login/', this._loginHandler);
  }

  listen () {
    return this.app.listen(this.port, this.responseFunction);
  }
}

export { Server };
