'use strict';

import {Server} from './server.js';
import {Client} from './client.js';
class Main {
	constructor() {
		this.server = new Server();
		this.client = new Client();
	}

	async main() {
		const result = await this.client.fetch('https://cat-fact.herokuapp.com/facts', 'GET');

		console.log(await result.json());
		this.server.listen();
	}
}

await new Main().main();
