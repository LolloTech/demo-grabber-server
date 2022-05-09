'use strict';

import express from 'express';
import { APIsHandler } from './APIsHandler.js';

class Server {
  constructor () {
    this._app = express();
    this._apisHandler = new APIsHandler();
    this._port = 3003;
    this.responseFunction = () => {
      console.log(`Listening on port ${this._port}`);
    };
  }

  setupEndpoints () {
    const { _app } = this;
    _app.use(express.json());
    _app.use(express.urlencoded({ extended: true }));

    _app.post('/login/', (res, req) => {
      const result = this._apisHandler.loginHandler(res);

      result.isOk ? res.status(200).json({ res: result.payload }) : res.status(401).json({ res: 'unauth' });
    });

    _app.use(this._apisHandler.defaultHandler);
  }

  listen () {
    return this._app.listen(this._port, this.responseFunction);
  }
}

export { Server };
