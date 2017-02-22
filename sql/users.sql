DROP TABLE IF EXISTS users

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  email VARCHAR,
  username VARCHAR,
  password VARCHAR,
  created_at TIMESTAMP default current_timestamp
  updated_at TIMESTAMP default current_timestamp
);