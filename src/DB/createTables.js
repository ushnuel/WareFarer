import DB from '.';

const dropUsers = 'DROP TABLE IF EXISTS users CASCADE';
const createUser = `
CREATE TABLE IF NOT EXISTS users
(
    id bigserial NOT NULL,
    email character varying(250) NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    is_admin boolean DEFAULT TRUE,
    CONSTRAINT p_key PRIMARY KEY (id)
)
`;

const dropBus = 'DROP TABLE IF EXISTS buses CASCADE';
const createBus = `
CREATE TABLE IF NOT EXISTS buses
(
    id bigserial NOT NULL,
    number_plate character varying(20) NOT NULL,
    manufacturer character varying(30) NOT NULL,
    model character varying(50) NOT NULL,
    year character varying(15) NOT NULL,
    capacity integer NOT NULL,
    CONSTRAINT bus_key PRIMARY KEY (id)
);
`;

const dropBookings = 'DROP TABLE IF EXISTS bookings CASCADE';
const createBookings = `
CREATE TABLE IF NOT EXISTS bookings
(
     id bigserial NOT NULL,
    user_id bigserial NOT NULL,
    trip_id bigserial NOT NULL,
    created_on timestamp(6) with time zone,
    CONSTRAINT booking_pkey PRIMARY KEY (id),
    CONSTRAINT tripfkey FOREIGN KEY (trip_id)
        REFERENCES trips (id),
    CONSTRAINT userfkey FOREIGN KEY (user_id)
        REFERENCES users (id)
);
`;

const dropTrips = 'DROP TABLE IF EXISTS trips CASCADE';
const createTrips = `
CREATE TABLE IF NOT EXISTS trips
(
    id bigserial NOT NULL,
    bus_id bigserial NOT NULL,
    origin character varying(100) NOT NULL,
    destination character varying(100) NOT NULL,
    trip_date timestamp(6) with time zone NOT NULL,
    fare money NOT NULL,
    status character varying(50),
    CONSTRAINT pkey PRIMARY KEY (id),
    CONSTRAINT busfkey FOREIGN KEY (bus_id)
        REFERENCES buses (id)
);
`;

class CreateTables {
  static async create() {
    await DB.query(dropUsers);
    await DB.query(dropBus);
    await DB.query(dropBookings);
    await DB.query(dropTrips);

    await DB.query(createUser);
    await DB.query(createBus);
    await DB.query(createTrips);
    await DB.query(createBookings);
  }
}

CreateTables.create().catch(err => console.log(err));
