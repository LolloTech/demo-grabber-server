'use strict';

import express from 'express';
import { APIsHandler } from './APIsHandler.js';

class Server {
  constructor () {
    this.app = express();
    this._apisHandler = new APIsHandler();
    this._port = 3003;
    this.httpServerInstance = null;
    this.responseFunction = () => {
      console.log(`Listening on port ${this._port}`);
    };
  }

  setupEndpoints () {
    const { app } = this;
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.post('/login/', async (req, res) => {
      const result = await this._apisHandler.loginHandler(req);

      result.completedOperation ? res.status(200).json(result) : res.status(401).json(result);
    });

    app.use(async (req, res) => {
      res.status(500).json(await this._apisHandler.defaultHandler(req));
    });
  }

  listen () {
    this.httpServerInstance = this.app.listen(this._port, this.responseFunction);

    return this.httpServerInstance;
  }

  close () {
    return this.httpServerInstance.close();
  }

  getExpressApp () {
    return this.app;
  }
}

export { Server };
