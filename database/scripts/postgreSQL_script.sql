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
	type TEXT NOT NULL,
	link_id TEXT REFERENCES link,
	person TEXT,
	vehicle TEXT,
	event_type TEXT
);
CREATE TABLE act_start (
	event_id INT,
	FOREIGN KEY (event_id) REFERENCES event_data(event_id),
	act_type TEXT,
	x DECIMAL,
	y DECIMAL
);
CREATE TABLE act_end (
	event_id INT,
	FOREIGN KEY (event_id) REFERENCES event_data(event_id),
	act_type TEXT
);
CREATE TABLE dvrp_task (
	event_id INT,
	FOREIGN KEY (event_id) REFERENCES event_data(event_id),
	dvrp_vehicle TEXT,
	task_type TEXT,
	task_index TEXT,
	dvrp_mode TEXT
);
CREATE TABLE arrival_departure (
	event_id INT,
	FOREIGN KEY (event_id) REFERENCES event_data(event_id),
	legmode TEXT
);
CREATE TABLE vehicle_traffic (
	event_id INT,
	FOREIGN KEY (event_id) REFERENCES event_data(event_id),
	relative_position DECIMAL,
	network_mode TEXT
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
	mode TEXT
);
CREATE TABLE vehicle_facility (
	event_id INT,
	FOREIGN KEY (event_id) REFERENCES event_data(event_id),
	time_delay DECIMAL,
	facility TEXT
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

CREATE VIEW megapersonview AS
SELECT a.*,act_end.act_type AS actend_type,act_start.act_type AS actstart_type,
	act_start.x,act_start.y,arrival_departure.legmode,
	dvrp_task.dvrp_vehicle,dvrp_task.task_type,dvrp_task.task_index,
	dvrp_task.dvrp_mode,passenger_pick_drop.request,
	passenger_pick_drop.mode AS passenger_mode,person_money.transaction_partner,
	person_money.amount,person_money.purpose,travelled.mode AS travel_mode,
	travelled.distance,vehicle_traffic.relative_position,vehicle_traffic.network_mode,
	waiting_for_pt.destination_stop,waiting_for_pt.at_stop,waiting_for_pt.agent
FROM event_data a LEFT JOIN act_end ON (a.event_id = act_end.event_id)
	 LEFT JOIN act_start ON (a.event_id = act_start.event_id)
	 LEFT JOIN arrival_departure ON (a.event_id = arrival_departure.event_id)
	 LEFT JOIN dvrp_task ON (a.event_id = dvrp_task.event_id)
	 LEFT JOIN passenger_pick_drop ON (a.event_id = passenger_pick_drop.event_id)
	 LEFT JOIN person_money ON (a.event_id = person_money.event_id)
	 LEFT JOIN travelled ON (a.event_id = travelled.event_id)
	 LEFT JOIN vehicle_traffic ON (a.event_id = vehicle_traffic.event_id)
	 LEFT JOIN waiting_for_pt ON (a.event_id = waiting_for_pt.event_id)

CREATE VIEW megalinkview AS
SELECT a.*,act_end.act_type AS actend_type,act_start.act_type AS actstart_type,
	act_start.x,act_start.y,arrival_departure.legmode,dvrp_task.dvrp_vehicle,
	dvrp_task.task_type,dvrp_task.task_index,dvrp_task.dvrp_mode,
	vehicle_traffic.relative_position,vehicle_traffic.network_mode
FROM event_data a LEFT JOIN act_end ON (a.event_id = act_end.event_id)
	 LEFT JOIN act_start ON (a.event_id = act_start.event_id)
	 LEFT JOIN arrival_departure ON (a.event_id = arrival_departure.event_id)
	 LEFT JOIN dvrp_task ON (a.event_id = dvrp_task.event_id)
	 LEFT JOIN vehicle_traffic ON (a.event_id = vehicle_traffic.event_id)
