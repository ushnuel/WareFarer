/* eslint-disable camelcase */
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

const { admin1 } = new User();
const utils = new Utils(server);
const route = '/api/v1';
let newBooking = {};

describe('USER OR ADMIN BOOKING TESTS', () => {
  before('Sign up as admin', (done) => {
    utils
      .postUser(`${route}/auth/signup`, admin1)
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

  xdescribe('User can delete his or her booking', () => {
    it('DELETE /bookings/<:bookingId>/', (done) => {
      utils
        .delete(`${route}/bookings/${newBooking.id}`, booking)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          const { status, data } = res.body;
          expect(status).to.equal(res.status);
          const { message } = data;
          expect(message).to.be.eql('Booking deleted successfully');
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('Throw error if invalid booking id is provided for delete', () => {
    it('DELETE /bookings/<:bookingId>/', (done) => {
      utils
        .delete(`${route}/bookings/${newBooking.id + 1}`, booking)
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

  describe('User can change seat number after booking', () => {
    it('PATCH /bookings/<:bookingId>/seat_number', (done) => {
      const newSeat = Number(newBooking.seat_number) + 1;
      const obj = { seat_number: newSeat };
      utils
        .patch(`${route}/bookings/${newBooking.id}`, obj)
        .then((res) => {
          res.body.should.have.status(200);
          const { data } = res.body;
          const { seat_number } = data;
          expect(seat_number).not.eql(booking.seat_number);
          expect(seat_number).to.eql(newSeat);
          done();
        })
        .catch(err => done(err));
    });
  });
});
