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

    _app.post('/login/', async (req, res) => {
      const result = await this._apisHandler.loginHandler(req);

      result.completedOperation ? res.status(200).json(result) : res.status(401).json(result);
    });

    _app.use(async (req, res) => {
      res.status(500).json(await this._apisHandler.defaultHandler(req));
    });
  }

  listen () {
    return this._app.listen(this._port, this.responseFunction);
  }
}

export { Server };
