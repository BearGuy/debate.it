CREATE TABLE organizations (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  owner INT,
  description VARCHAR,

  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),

  FOREIGN KEY (owner) references users (ID)
);