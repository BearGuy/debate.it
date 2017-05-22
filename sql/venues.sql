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