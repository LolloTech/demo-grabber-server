import sinon from 'sinon';
import { Database } from '../src/Database.js'
import { APIsHandler } from '../src/APIsHandler.js';
import assert from 'assert';

describe('APIsHandler unit tests', function () {
  it('loginHandler, should give back a valid token', async () => {
    const obj = { body: { username: 'dummy', password: '1234' } };
    const mock = sinon
      .mock(Database.prototype)
      .expects('findByUsernameAndPassword')
      .withExactArgs('dummy', '1234')
      .returns([])
      .atLeast(1);
    const mock2 = sinon
      .mock(Database.prototype)
      .expects('findByUsername')
      .withExactArgs('dummy')
      .returns([{ id: '1' }])
      .atLeast(1);
    const _sut = new APIsHandler();
    const result = await _sut.loginHandler(obj);

    assert.notDeepEqual(result, null);
    assert.deepEqual(result.completedOperation, true);
    // Removing mocks for next tests
    Database.prototype.findByUsernameAndPassword.restore();
    Database.prototype.findByUsername.restore();
  });
  it('loginHandler, should give back an operation not completed', async () => {
    const obj = { body: { username: 'dummy', password: '1234' } };
    const _sut = new APIsHandler();
    const result = await _sut.loginHandler(obj);

    assert.deepEqual(result.completedOperation, false);
  });
});
