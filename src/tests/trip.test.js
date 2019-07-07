import chai, { should, expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before } from 'mocha';
import server from '../index';
import { Trip, User } from './dummy';
import Utils from './utils';

should();
chai.use(chaiHttp);
const route = '/api/v1';
const utils = new Utils(server);
const { user } = new User();

describe('ADMIN CREATE AND GET TRIP(S) TEST', () => {
  before('Create user account', (done) => {
    utils
      .postUser(`${route}/auth/signup`, user)
      .then(() => {
        done();
      })
      .catch(err => done(err));
  });

  describe('POST /trips', () => {
    it('Admin should be able to create a trip', (done) => {
      utils
        .post(`${route}/trips`, Trip)
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

    xit('Throw error if user is not an admin', (done) => {
      utils
        .post(`${route}/trips`, Trip)
        .then((res) => {
          res.should.have.status(403);
          const { status } = res.body;
          expect(status).to.equal(res.status);
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /trips', () => {
    it('Admin and users should be able to see all trips', (done) => {
      utils
        .get(`${route}/trips`, Trip)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');

          const { status, data } = res.body;
          expect(status).to.equal(res.status);
          // eslint-disable-next-line no-unused-expressions
          expect(data).to.be.an('array').and.not.empty;

          done();
        })
        .catch(err => done(err));
    });
  });
});
