import chai, { should, expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import server from '../index';
import bus from './dummy/bus';

chai.use(chaiHttp);
should();

const route = '/api/v1';

xdescribe('Create bus', () => {
  describe('POST /bus', () => {
    it('Admin should be able to create a bus', (done) => {
      chai
        .request(server)
        .post(`${route}/bus`)
        .send(bus)
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
