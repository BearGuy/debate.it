--qrem

-- DROP DATABASE IF EXISTS qrem;
-- CREATE DATABASE qrem;

-- \c qrem;

DROP TABLE IF EXISTS venues;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS organizations;
DROP TABLE IF EXISTS events;

CREATE TABLE venues (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  address VARCHAR,
  city VARCHAR,
  province VARCHAR,
  country VARCHAR,
  lat NUMERIC,
  long NUMERIC,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL,
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL,

  event_ids INT[],
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE organizations (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  owner INT,
  description VARCHAR,

  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),

  FOREIGN KEY (owner) references users (ID)
);

CREATE TABLE events (
  ID SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  description VARCHAR,
  item_url VARCHAR,
  image_url VARCHAR,
  category VARCHAR,
  venue_id INT,
  organization_id INT,
  capacity INT,
  interested INT,
  attending INT,
  startTime TIMESTAMP WITH TIME ZONE,
  endTime TIMESTAMP WITH TIME ZONE,
  created_by INT,

  created_at TIMESTAMP DEFAULT now(),
  update_at TIMESTAMP DEFAULT now(),

  FOREIGN KEY (venue_id) references venues (ID),
  FOREIGN KEY (organization_id) references organizations (ID),
  FOREIGN KEY (created_by) references users (ID)
);
