'use strict'

import Express from "express"

class Server {
    constructor() {
        this.app = Express();
        this.port = 3003;
        this.responseFunction = () => { console.log(`Listening on port ${this.port}`); }
    }

    listen() {
        return this.app.listen(this.port, this.responseFunction);
    }
}

export { Server };