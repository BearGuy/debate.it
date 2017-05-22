CREATE TABLE organization_members (
  ID SERIAL PRIMARY KEY,
  organization INT,
  member INT,
  role VARCHAR,
  read BOOLEAN,
  write BOOLEAN,

  FOREIGN KEY (organization) references organizations (ID)
  FOREIGN KEY (member) references users (ID)
);