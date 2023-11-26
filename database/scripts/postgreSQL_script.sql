CREATE TABLE node (
	node_id TEXT PRIMARY KEY,
	x DECIMAL,
	y DECIMAL
);

CREATE TABLE links_metadata (
	links_metadata_id TEXT PRIMARY KEY,
	effective_cell_size DECIMAL,
	effective_lane_width DECIMAL,
	capperiod TEXT
);

CREATE TABLE link (
	link_id TEXT PRIMARY KEY,
	links_metadata_id TEXT,
	from_node TEXT,
	to_node TEXT,
	freespeed DECIMAL,
	capacity DECIMAL,
	permlanes DECIMAL,
	oneway BOOLEAN,
	modes TEXT,
	link_length DECIMAL,
	FOREIGN KEY (links_metadata_id) REFERENCES links_metadata(links_metadata_id),
	FOREIGN KEY (from_node) REFERENCES node(node_id),
	FOREIGN KEY (to_node) REFERENCES node(node_id)
);

CREATE TABLE event_data (
	event_id SERIAL PRIMARY KEY,
	event_time DECIMAL NOT NULL,
	person TEXT,
	vehicle TEXT,
	event_type TEXT
);
CREATE TABLE act_start (
	event_id INT,
	FOREIGN KEY (event_id) REFERENCES event_data(event_id),
	act_type TEXT,
	x DECIMAL,
	y DECIMAL,
	link_id TEXT,
	FOREIGN KEY (link_id) REFERENCES link(link_id)
);
CREATE TABLE act_end (
	event_id INT,
	FOREIGN KEY (event_id) REFERENCES event_data(event_id),
	act_type TEXT,
	link_id TEXT,
	FOREIGN KEY (link_id) REFERENCES link(link_id)
);
CREATE TABLE dvrp_task (
	event_id INT,
	FOREIGN KEY (event_id) REFERENCES event_data(event_id),
	dvrp_vehicle TEXT,
	task_type TEXT,
	task_index TEXT,
	dvrp_mode TEXT,
	link_id TEXT,
	FOREIGN KEY (link_id) REFERENCES link(link_id)
);
CREATE TABLE enter_left_link (
	event_id INT,
	FOREIGN KEY (event_id) REFERENCES event_data(event_id),
	is_start BOOLEAN,
	link_id TEXT,
	FOREIGN KEY (link_id) REFERENCES link(link_id)
);
CREATE TABLE arrival_departure (
	event_id INT,
	FOREIGN KEY (event_id) REFERENCES event_data(event_id),
	legmode TEXT,
	is_start BOOLEAN,
	link_id TEXT,
	FOREIGN KEY (link_id) REFERENCES link(link_id)
);
CREATE TABLE vehicle_traffic (
	event_id INT,
	FOREIGN KEY (event_id) REFERENCES event_data(event_id),
	relative_position DECIMAL,
	network_mode TEXT,
	is_start BOOLEAN,
	link_id TEXT,
	FOREIGN KEY (link_id) REFERENCES link(link_id)
);
CREATE TABLE travelled (
	event_id INT,
	FOREIGN KEY (event_id) REFERENCES event_data(event_id),
	mode TEXT,
	distance DECIMAL
);
CREATE TABLE transit_driver_starts (
	event_id INT,
	FOREIGN KEY (event_id) REFERENCES event_data(event_id),
	driver_id TEXT,
	vehicle_id TEXT,
	departure_id TEXT,
	transit_line_id TEXT,
	transit_route_id TEXT
);
CREATE TABLE passenger_pick_drop (
	event_id INT,
	FOREIGN KEY (event_id) REFERENCES event_data(event_id),
	request TEXT,
	mode TEXT,
	is_start BOOLEAN
);
CREATE TABLE vehicle_facility (
	event_id INT,
	FOREIGN KEY (event_id) REFERENCES event_data(event_id),
	time_delay DECIMAL,
	facility TEXT
);
CREATE TABLE person_vehicle (
	event_id INT,
	FOREIGN KEY (event_id) REFERENCES event_data(event_id),
	is_start BOOLEAN
);
CREATE TABLE waiting_for_pt (
	event_id INT,
	FOREIGN KEY (event_id) REFERENCES event_data(event_id),
	destination_stop DECIMAL,
	at_stop DECIMAL,
	agent TEXT
);
CREATE TABLE person_money (
	event_id INT,
	FOREIGN KEY (event_id) REFERENCES event_data(event_id),
	transaction_partner TEXT,
	amount DECIMAL,
	purpose TEXT
);