--qrem

DROP DATABASE IF EXISTS qrem;
CREATE DATABASE qrem;

\c qrem;

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
  postal VARCHAR,
  lat NUMERIC,
  long NUMERIC,
  accessability BOOLEAN,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

INSERT INTO venues (title, address, city, province, country, postal, lat, long) VALUES ('Joseph S. Stauffer Library', '101 Union St W', 'Kingston', 'ON', 'ca','K7L 2N9', 44.228499, 76.496111);
INSERT INTO venues (title, address, city, province, country, postal, lat, long) VALUES ('Queens Athletic and Recreation Center', '284 Earl St', 'Kingston', 'ON', 'ca', 'K7L 3N6', 44.229558, 76.494855);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL,
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL,

  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

INSERT INTO users (email, username, password) VALUES ('sarah@queensevents.ca', 'Sara', 'creator');
INSERT INTO users (email, username, password) VALUES ('stephen@queensevents.ca', 'Stephen', 'dev');
INSERT INTO users (email, username, password) VALUES ('mackenzie@queensevents.ca', 'Mackenzie', 'manager');


CREATE TABLE organizations (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  owner INT,
  members INT,
  description VARCHAR,
  website_url VARCHAR,
  fb_page_url VARCHAR,
  phone VARCHAR,

  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),

  FOREIGN KEY (owner) references users (ID)
);

INSERT INTO organizations (title, owner, members, description, website_url) VALUES ('Queens Events', 1, 1, 'A lovely org devoted to marketing and help manage events!', 'http://queensevents.ca');

-- INSERT INTO organizations (title, owner, description)

CREATE TABLE organization_members (
  ID SERIAL PRIMARY KEY,
  organization INT,
  member INT,
  role VARCHAR,
  read BOOLEAN,
  write BOOLEAN,

  created_at TIMESTAMP DEFAULT now(),
  update_at TIMESTAMP DEFAULT now(),

  FOREIGN KEY (organization) references organizations (ID),
  FOREIGN KEY (member) references users (ID)
);

CREATE TABLE events (
  ID SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  description VARCHAR,
  item_url VARCHAR,
  fb_event_url VARCHAR,
  image_url VARCHAR,
  venue_id INT,
  organization_id INT,
  sub_events BOOLEAN,
  cost NUMERIC,
  capacity INT,
  interested INT,
  attending INT,
  all_day BOOLEAN,
  recurring BOOLEAN,
  startTime TIMESTAMP WITH TIME ZONE,
  endTime TIMESTAMP WITH TIME ZONE,
  created_by INT,

  created_at TIMESTAMP DEFAULT now(),
  update_at TIMESTAMP DEFAULT now(),

  FOREIGN KEY (venue_id) references venues (ID),
  FOREIGN KEY (organization_id) references organizations (ID),
  FOREIGN KEY (created_by) references users (ID)
);

CREATE TABLE event_categories (
  UUID SERIAL PRIMARY KEY,
  event INT references events (ID),
  category INT references categories (ID),

  created_at TIMESTAMP DEFAULT now(),
  update_at TIMESTAMP DEFAULT now()
);

CREATE TABLE event_times (
  ID SERIAL PRIMARY KEY,
  minute INT,
  hour INT,
  day INT,
  month INT,
  year INT,
  startTime TIMESTAMP WITH TIME ZONE,
  endTime TIMESTAMP WITH TIME ZONE
);


CREATE TABLE sub_events (
  ID SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  description VARCHAR,
  item_url VARCHAR,
  image_url VARCHAR,
  category_id INT,
  venue_id INT,
  capacity INT,
  interested INT,
  attending INT,
  startTime TIMESTAMP WITH TIME ZONE,
  endTime TIMESTAMP WITH TIME ZONE,

  main_event INT references events (ID),

  created_at TIMESTAMP DEFAULT now(),
  update_at TIMESTAMP DEFAULT now(),

  FOREIGN KEY (venue_id) references venues (ID)
);
