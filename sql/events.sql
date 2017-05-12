CREATE TABLE events (
  ID SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  description VARCHAR,
  item_url VARCHAR,
  image_url VARCHAR,
  -- event_category_id INT,
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

  -- FOREIGN KEY (event_category_id) references event_categories (ID),
  FOREIGN KEY (venue_id) references venues (ID),
  FOREIGN KEY (organization_id) references organizations (ID),
  FOREIGN KEY (created_by) references users (ID)
);