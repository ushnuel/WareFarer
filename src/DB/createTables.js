import DB from '.';

const dropUsers = 'DROP TABLE IF EXISTS users CASCADE';
const createUser = `
CREATE TABLE IF NOT EXISTS users
(
    id bigserial NOT NULL,
    email character varying(250) NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    password character varying(100) NOT NULL,
    is_admin boolean DEFAULT FALSE,
    CONSTRAINT p_key PRIMARY KEY (id)
)
`;

const dropBus = 'DROP TABLE IF EXISTS buses CASCADE';
const createBus = `
CREATE TABLE IF NOT EXISTS buses
(
    id bigserial NOT NULL,
    user_id bigserial NOT NULL,
    number_plate character varying(20),
    manufacturer character varying(30),
    model character varying(50) NOT NULL,
    year character varying(15),
    capacity integer,
    CONSTRAINT bus_key PRIMARY KEY (id),
    CONSTRAINT userfkey FOREIGN KEY (user_id)
        REFERENCES users (id)
);
`;

const dropBookings = 'DROP TABLE IF EXISTS bookings CASCADE';
const createBookings = `
CREATE TABLE IF NOT EXISTS bookings
(
    id bigserial NOT NULL,
    user_id bigserial NOT NULL,
    bus_id bigserial NOT NULL,
    trip_id bigserial NOT NULL,
    trip_date timestamp(6) with time zone NOT NULL,
    seat_number integer,
    CONSTRAINT booking_pkey PRIMARY KEY (id),
    CONSTRAINT busfkey FOREIGN KEY (bus_id)
        REFERENCES buses (id),
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
    user_id bigserial NOT NULL,
    bus_id bigserial NOT NULL,
    origin character varying(100) NOT NULL,
    destination character varying(100) NOT NULL,
    created_on timestamp(6),
    fare money NOT NULL,
    status character varying(50) DEFAULT 'active',    
    CONSTRAINT pkey PRIMARY KEY (id),
    CONSTRAINT busfkey FOREIGN KEY (bus_id)
        REFERENCES buses (id),
    CONSTRAINT userfkey FOREIGN KEY (user_id)
        REFERENCES users (id)
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
