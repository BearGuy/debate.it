CREATE TABLE categories (
  ID SERIAL PRIMARY KEY,
  type VARCHAR,
  description VARCHAR,

  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

INSERT INTO categories (type, description) VALUES ('concerts', 'Events that are concerts');
INSERT INTO categories (type, description) VALUES ('movies', 'Events that are movies');
INSERT INTO categories (type, description) VALUES ('adult_socials', 'Events that are adult socials');
INSERT INTO categories (type, description) VALUES ('all_ages_socials', 'Events that are for all_ages');
INSERT INTO categories (type, description) VALUES ('arts_and_theater', 'Events that celebrate arts and theater!');
INSERT INTO categories (type, description) VALUES ('educational', 'Events that are educational');
INSERT INTO categories (type, description) VALUES ('health', 'Events that are reinforce a healthy lifestlye');
INSERT INTO categories (type, description) VALUES ('sports', 'Events that get your blood moving');