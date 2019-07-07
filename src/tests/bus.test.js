import chai, { should, expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before } from 'mocha';
import server from '../index';
import bus from './dummy/bus';
import User from './dummy/user';
import Utils from './utils';

chai.use(chaiHttp);
should();

const route = '/api/v1';
const { user } = new User();
const utils = new Utils(server);

describe('Create bus', () => {
  before('Create User Account', (done) => {
    utils
      .postUser(`${route}/auth/signup`, user)
      .then(() => {
        done();
      })
      .catch(err => done(err));
  });

  describe('POST /bus', () => {
    it('Admin should be able to create a bus', (done) => {
      utils.post(`${route}/bus`, bus)
        .then((res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');

          const { status, data } = res.body;
          expect(status).to.equal(res.status);
          expect(data).to.be.an('object');

          done();
        })
        .catch(err => done(err));
    });
  });
});
