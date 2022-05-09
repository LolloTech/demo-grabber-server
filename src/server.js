'use strict';

import express from 'express';
import { APIsHandler } from './APIsHandler.js';

class Server {
  constructor () {
    this.app = express();
    this._apisHandler = new APIsHandler();
    this.port = 3003;
    this.responseFunction = () => {
      console.log(`Listening on port ${this.port}`);
    };
  }

  setupEndpoints () {
    const { app } = this;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.post('/login/', this._apisHandler.loginHandler);
    app.use(this._apisHandler.defaultHandler);
  }

  listen () {
    return this.app.listen(this.port, this.responseFunction);
  }
}

export { Server };
