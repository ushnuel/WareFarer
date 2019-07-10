/* eslint-disable no-unused-expressions */
import chai, { should, expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before } from 'mocha';
import server from '..';
import Utils from './utils';
import {
  User, trip, bus, booking,
} from './dummy';

chai.use(chaiHttp);
should();

const { user } = new User();
const utils = new Utils(server);
const route = '/api/v1/';
let newBooking = {};

describe('USER OR ADMIN BOOKING TESTS', () => {
  before('Sign up as admin', (done) => {
    utils
      .postUser(`${route}/auth/signup`, user)
      .then(() => {
        utils
          .post(`${route}/bus`, bus)
          .then((res) => {
            const { id } = res.body.data;
            trip.bus_id = id;
            booking.bus_id = id;
          })
          .then(() => {
            utils
              .post(`${route}/trips`, trip)
              .then((res) => {
                const { id } = res.body.data;
                booking.trip_id = id;
                done();
              })
              .catch(err => done(err));
          });
      })
      .catch(err => done(err));
  });

  describe('User or Admin Book a seat number', () => {
    it('POST /bookings', (done) => {
      utils
        .post(`${route}/bookings`, booking)
        .then((res) => {
          res.body.should.be.an('object');
          res.should.have.status(201);

          const { status, data } = res.body;
          expect(status).to.equal(res.status);
          expect(data).to.be.an('object');
          expect(data).to.have.property('bus_id');
          expect(data).to.have.property('user_id');
          expect(data).to.have.property('trip_id');

          newBooking = { ...data };
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('User can delete his or her booking', () => {
    it('DELETE /bookings/<:bookingId>/', (done) => {
      utils
        .delete(`${route}/bookings/${newBooking}`, booking)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          const { status } = res.body;
          expect(status).to.equal(res.status);
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('Throw error if invalid booking id is provided for delete', () => {
    it('POST /bookings/<:bookingId>/', (done) => {
      utils
        .delete(`${route}/bookings/237`, booking)
        .then((res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          const { status } = res.body;
          expect(status).to.equal(res.status);
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('User or Admin should see all trips', () => {
    it('GET /bookings', (done) => {
      utils
        .get(`${route}/bookings`, booking)
        .then((res) => {
          res.body.should.be.an('object');
          res.should.have.status(200);

          const { data, status } = res.body;
          expect(data).to.be.an('array').and.not.empty;
          expect(status).to.be.equal(res.status);
          done();
        })
        .catch(err => done(err));
    });
  });
});
