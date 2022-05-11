import chai from 'chai';
import chaiHttp from 'chai-http';
import { Server } from '../../src/Server.js';
import mocha from "mocha";

const describe = mocha.describe;
const before = mocha.before;
const after = mocha.after;
const it = mocha.it;
const server = new Server();

chai.use(chaiHttp);

describe('POST /login', () => {
  before(() => {
    server.setupEndpoints();
    server.listen();
  });
  describe('Without parameters', () => {
    it('it should gently respond with 401', function (done) { // <= Pass in done callback
      chai
        .request(server.getExpressApp())
        .post('/login')
        .end((err, res) => {
          done();
          res.should.be.status(401);
        });
    });
  });
  describe('With existing user', () => {
    it('it should gently respond with token and 200', function (done) { // <= Pass in done callback
      const reqObj = {
        username: 'admin',
        password: 'administrator'
      };
      chai
        .request(server.getExpressApp())
        .post('/login')
        .send(reqObj)
        .end((err, res) => {
          done();
          res.should.be.status(200);
          res.body.completedOperation.should.be.equal(true);
        });
    });
  });
  describe('With NOT existing user', () => {
    it('it should gently respond with fail and 401', function (done) { // <= Pass in done callback
      const reqObj = {
        username: 'pippo',
        password: 'pluto'
      };
      chai
        .request(server.getExpressApp())
        .post('/login')
        .send(reqObj)
        .end((err, res) => {
          done();
          res.should.be.status(401);
          res.body.completedOperation.should.be.equal(false);
        });
    });
  });
  after(() => {
    server.close();
  })
});
