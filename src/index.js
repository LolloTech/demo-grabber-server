'use strict';

import { Server } from './server.js';
import { Client } from './client.js';
import { Database } from './Database.js'

class Main {
  constructor () {
    const databaseInstance = new Database();

    this.server = new Server(databaseInstance);
    this.client = new Client();
  }

  async main () {
    const result = await this.client.fetch('https://cat-fact.herokuapp.com/facts', 'GET');

    console.log(await result.json());
    this.server.setupEndpoints();
    this.server.listen();
  }
}

export default new Main().main();
