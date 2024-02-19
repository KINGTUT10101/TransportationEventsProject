# Transportation Events Project

The final project for Database Theory and Design. It provides an easy way for users to view a set of events data for a transportation system.

![image](https://github.com/KINGTUT10101/TransportationEventsProject/assets/45105509/3f2a56a1-f5d8-4420-9ee1-e1c35f83a3b4)
![image](https://github.com/KINGTUT10101/TransportationEventsProject/assets/45105509/26370aa5-981e-436e-9232-7291269b97a9)

## Installation

Make sure [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) is installed

Run “git clone [https://github.com/KINGTUT10101/TransportationEventsProject.git”](https://github.com/KINGTUT10101/TransportationEventsProject.git”)

Run “cd TransportationEventsProject”

Run “npm install”

Run “cd client”

Run "npm install" again

Run "cd ../server"

Run "npm install" once again

## Creating the database

Download and install [pgAdmin](https://www.pgadmin.org/download/)

Create a database named "transportProject" with the password set to "password"

Run the database creation [script](https://github.com/KINGTUT10101/TransportationEventsProject/blob/main/database/scripts/postgreSQL_script.sql)

Import the CSV files found in the [database/raw_data](https://github.com/KINGTUT10101/TransportationEventsProject/tree/main/database/raw_data) folder

Download the events XML file from D2L and place it into the database/raw_data folder

Run "cd database/scripts/import_events_data"

Run "node --max-old-space-size=4096 transferToDB.js"

Wait for the script to finish. It may take a while

## Running the project

Run “npm run dev” in the project's root directory

Connect to localhost:3000 in your browser

## Running the frontend

Run “npm run client” in the project's root directory

Connect to localhost:3000 in your browser

## Building the frontend

(It's recommended that you do this before running the backend. This will update the static frontend files that the backend will return to you)

Run "npm run build" in the project's root directory

## Running the backend

Run “npm run server” in the project's root directory

Connect to localhost:5000 in your browser
