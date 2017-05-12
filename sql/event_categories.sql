CREATE TABLE event_categories (
	UUID SERIAL PRIMARY KEY,
	event INT references events (ID),
	category INT references categories (ID)
);