import chai, { should, expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import server from '../index';
import User from './dummy/user';
import Utils from './utils';

chai.use(chaiHttp);
should();

const route = '/api/v1/auth';
const utils = new Utils(server);
const { user, invalidUser } = new User();

describe('User Authentication', () => {
  describe('POST auth/signup', () => {
    it('User should be able to create account', (done) => {
      utils
        .postUser(`${route}/signup`, user)
        .then((res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');

          const { status, data } = res.body;
          expect(status).to.equal(res.status);
          expect(data).to.be.an('object');
          expect(data).not.to.have.property('password');
          expect(data).to.have.property('id');
          expect(data).to.have.property('token');

          const { email } = data;
          expect(email).to.eql(user.email);

          done();
        })
        .catch(err => done(err));
    });
  });

  describe('POST auth/signin', () => {
    it('User should be able to sign in', (done) => {
      utils
        .postUser(`${route}/signin`, user)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          const { data, status } = res.body;
          expect(status).to.eql(res.status);
          expect(data).to.be.an('object');

          const { email } = data;
          expect(email).to.eql(user.email);

          done();
        })
        .catch(err => done(err));
    });

    it('Throw error if no user is found', (done) => {
      utils
        .postUser(`${route}/signin`, invalidUser, false)
        .then((res) => {
          res.should.have.status(404);
          const { status } = res.body;
          expect(status).to.equal(res.status);
          done();
        })
        .catch(err => done(err));
    });
  });
});
