CREATE TABLE Node (
	"node id" INT PRIMARY KEY,
	x DECIMAL,
	y DECIMAL
);

CREATE TABLE Link (
	"link id" VARCHAR(255) PRIMARY KEY,
	from INT,
	to INT,
	freespeed DECIMAL,
	capacity DECIMAL,
	permlanes DECIMAL,
	oneway BOOLEAN,
	modes TEXT,
	FOREIGN KEY (from) REFERENCES Node("node id"),
	FOREIGN KEY (to) REFERENCES Node("node id")
);

CREATE TABLE "event" (
	eventID SERIAL PRIMARY KEY,
	time DECIMAL NOT NULL,
	person VARCHAR(255),
	vehicle VARCHAR(255)
);
CREATE TABLE actEnd (
	eventID INT,
	FOREIGN KEY (eventID) REFERENCES "event"(eventID),
	type VARCHAR(255)
);
CREATE TABLE dvrpTask (
	eventID INT,
	FOREIGN KEY (eventID) REFERENCES "event"(eventID),
	dvrpVehicle VARCHAR(255),
	taskType VARCHAR(255),
	taskIndex VARCHAR(255),
	dvrpMode VARCHAR
);
CREATE TABLE EnterLeftLink (
	eventID INT,
	FOREIGN KEY (eventID) REFERENCES "event"(eventID),
	start BOOLEAN
);
CREATE TABLE actStart (
	eventID INT,
	FOREIGN KEY (eventID) REFERENCES "event"(eventID),
	type VARCHAR(255),
	x DECIMAL,
	y DECIMAL
);
CREATE TABLE arrivalDeparture (
eventID INT,
FOREIGN KEY (eventID) REFERENCES "event"(eventID),
legmode VARCHAR(255),
start BOOLEAN
);
CREATE TABLE vehicleTraffic (
eventID INT,
FOREIGN KEY (eventID) REFERENCES "event"(eventID),
relativePosition DECIMAL,
networkMode VARCHAR(255),
start BOOLEAN
);
CREATE TABLE travelled (
eventID INT,
FOREIGN KEY (eventID) REFERENCES "event"(eventID),
mode VARCHAR(255),
distance DECIMAL
);
CREATE TABLE transitDriverStarts (
eventID INT,
FOREIGN KEY (eventID) REFERENCES "event"(eventID),
driverId VARCHAR(255),
vehicleId VARCHAR(255),
departureId VARCHAR(255),
transitLineId VARCHAR(255),
transitRouteId VARCHAR(255)
);
CREATE TABLE passengerPickDrop (
eventID INT,
FOREIGN KEY (eventID) REFERENCES "event"(eventID),
request VARCHAR(255),
mode VARCHAR(255),
start BOOLEAN
);
CREATE TABLE vehicleFacility (
eventID INT,
FOREIGN KEY (eventID) REFERENCES "event"(eventID),
delay DECIMAL,
facility VARCHAR(255)
);
CREATE TABLE personVehicle (
eventID INT,
FOREIGN KEY (eventID) REFERENCES "event"(eventID),
start BOOLEAN
);
CREATE TABLE waitingForPt (
eventID INT,
FOREIGN KEY (eventID) REFERENCES "event"(eventID),
destinationStop DECIMAL,
atStop DECIMAL,
agent VARCHAR(255)
);
CREATE TABLE personMoney (
eventID INT,
FOREIGN KEY (eventID) REFERENCES "event"(eventID),
transactionPartner VARCHAR(255),
amount DECIMAL,
purpose VARCHAR(255)
);