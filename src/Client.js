'use strict'
import {createFetch, base, accept, parse, method} from 'http-client'
import {ClientInterface} from './ClientInterface.js'
import fetch from 'node-fetch';

class Client extends ClientInterface {
    async fetch(url, method, headers = {'Content-Type': 'application/json'}, body= {}) {
        const init = {
            method: method,
            headers: headers
        };

        if(method === "POST") {
            init.body = body
        }

        return await fetch(
            url,
            init
        );
    }
}

export { Client };