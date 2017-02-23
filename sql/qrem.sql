DROP DATABASE IF EXISTS qrem;
CREATE DATABASE qrem;

\c qrem;

CREATE TABLE venues (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  address VARCHAR,
  city VARCHAR,
  province VARCHAR,
  country VARCHAR,
  lat NUMERIC,
  long NUMERIC
);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  email VARCHAR,
  username VARCHAR,
  password VARCHAR
);

CREATE TABLE organizations (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  owner INT,
  description VARCHAR,

  FOREIGN KEY (owner) references users (ID)
);

CREATE TABLE events (
  ID SERIAL PRIMARY KEY,
  name NOT NULL VARCHAR,
  description VARCHAR,
  item_url VARCHAR,
  image_url VARCHAR,
  category VARCHAR,
  venue_id INT,
  organization_id INT, 
  startTime TIMESTAMP WITH TIME ZONE,
  endTime TIMESTAMP WITH TIME ZONE,
  created_by INT,
  created_at TIMESTAMP,
  update_at TIMESTAMP,
  
  FOREIGN KEY (venue_id) references venues (ID),
  FOREIGN KEY (organization_id) references organizations (ID),
  FOREIGN KEY (created_by) references users (ID)

);
