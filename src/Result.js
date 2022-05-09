'use strict';

class Result {
  constructor (isOk, payload) {
    this._isOk = isOk;
    this._payload = payload;
  }
}

export { Result }
