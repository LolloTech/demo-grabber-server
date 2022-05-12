import chai from 'chai';
import chaiHttp from 'chai-http';
import { Server } from '../../src/Server.js';
import mocha from "mocha";
const should = chai.should();
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
  describe('GIVEN no parameters', () => {
    it('it should gently respond with 401', function (done) { // <= Pass in done callback
      chai
        .request(server.getExpressApp())
        .post('/login')
        .end((err, res) => {
          res.should.be.status(401);
          done();
        });
    });
  });
  describe('GIVEN existing user', () => {
    it('it SHOULD gently respond with token and 200', function (done) { // <= Pass in done callback
      const reqObj = {
        username: 'apitest',
        password: 'api'
      };
      chai
        .request(server.getExpressApp())
        .post('/login')
        .send(reqObj)
        .end((err, res) => {
          res.should.be.status(200);
          res.body.completedOperation.should.be.equal(true);
          done();
        });
    });
  });
  describe('GIVEN non existing user', () => {
    it('it SHOULD gently respond with fail and 401', function (done) { // <= Pass in done callback
      const reqObj = {
        username: 'pippo',
        password: 'pluto'
      };
      chai
        .request(server.getExpressApp())
        .post('/login')
        .send(reqObj)
        .end((err, res) => {
          res.should.be.status(401);
          res.body.completedOperation.should.be.equal(false);
          done();
        });
    });
  });
  after(() => {
    server.close();
  })
});
describe('POST /changePassword', () => {
  before(() => {
    server.setupEndpoints();
    server.listen();
  });
  describe('GIVEN no parameters', () => {
    it('it SHOULD gently respond with 401', function (done) { // <= Pass in done callback
      chai
        .request(server.getExpressApp())
        .post('/changePassword')
        .end((err, res) => {
          res.should.be.status(401);
          done();
        });
    });
  });
  describe('GIVEN existing user', () => {
    it('it SHOULD gently respond with token and 200', function (done) { // <= Pass in done callback
      const reqObj = {
        username: 'apitest',
        oldPassword: 'api',
        newPassword: 'api'
      };
      chai
        .request(server.getExpressApp())
        .post('/changePassword')
        .send(reqObj)
        .end((err, res) => {
          res.should.be.status(200);
          res.body.completedOperation.should.be.equal(true);
          done();
        });
    });
  });
  describe('GIVEN NON existing user', () => {
    it('it SHOULD gently respond with fail and 401', function (done) { // <= Pass in done callback
      const reqObj = {
        username: 'pippo',
        oldPassword: 'pluto',
        newPassword: 'topolino'
      };
      chai
        .request(server.getExpressApp())
        .post('/changePassword')
        .send(reqObj)
        .end((err, res) => {
          res.should.be.status(401);
          res.body.completedOperation.should.be.equal(false);
          done();
        });
    });
  });
  describe('GIVEN existing user but wrong old password', () => {
    it('it SHOULD gently respond with fail and 401', function (done) { // <= Pass in done callback
      const reqObj = {
        username: 'apitest',
        oldPassword: 'pluto',
        newPassword: 'api'
      };
      chai
        .request(server.getExpressApp())
        .post('/changePassword')
        .send(reqObj)
        .end((err, res) => {
          res.should.be.status(401);
          res.body.completedOperation.should.be.equal(false);
          done();
        });
    });
  });
  after(() => {
    server.close();
  })
});
