/*
  NOTE: You need at least 4 GB of RAM to import the event data, since it is not chunked
  Use this command to run the script: node --max-old-space-size=4096 transferToDB.js
*/

import pkg from 'pg';
import fs from 'fs';
import xml2js from 'xml2js';

import typeMap from './typeMap.js';
import commonColumnMap from './commonColumnMap.js';
import specialColumnMap from './specialColumnMap.js';

async function processXmlData() {
  console.log ("Starting the program...")

  // Connect to pgSQL
  const { Pool } = pkg;
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'transportProject',
    password: 'password',
    port: 5432,
  });

  pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });

  const client = await pool.connect();

  console.log ("Connected to the database!")
  console.log ("Reading XML file...")

  try {
    const xmlFilePath = '../../raw_data/events.xml' // XML file path
    // const xmlFilePath = '../../raw_data/testEvents.xml' // XML file path
    const xmlData = fs.readFileSync(xmlFilePath, 'utf-8'); // Read the XML file

    // Parse XML using streaming parser
    const parser = new xml2js.Parser();
    parser.parseString(xmlData, async (err, result) => {
      console.log ("XML file read successfully")
      
      try {
        if (err) {
          console.error('Error parsing XML:', err);
          return;
        }

        const eventsArr = result.events.event; // Contains all the items in the XML structure
        let line = 1;

        console.log('Starting import...');

        for (const { $: eventData } of eventsArr) {
          let commonColumnNames = [], commonColumnValues = []
          let specialColumnNames = [], specialColumnValues = []
          let columnNums
          let eventType = eventData.type
          let childTableName = typeMap[eventData.type]
          let parentQueryResult, childQueryResult

          if (!childTableName)
            throw "Undefined event type:\n" + JSON.stringify (eventData, null, 2)
          
          console.log (line, eventType, childTableName)
          line += 1

          // Iterate over the attributes
          for (let [key, value] of Object.entries(eventData)) {
            // Map the key to the database alias
            if (Object.hasOwn(commonColumnMap, key)) {
              let mappedKey = commonColumnMap[key]
              commonColumnNames.push (mappedKey)
              commonColumnValues.push (value)
            }
            else if (Object.hasOwn(specialColumnMap[eventType], key)) {
              let mappedKey = specialColumnMap[eventType][key]
              specialColumnNames.push (mappedKey)
              specialColumnValues.push (value)
            }
            else {
              throw "Undefined column '" + key + "' for type '" + eventType + "':\n" +  + JSON.stringify (eventData, null, 2)
            }
          }

          try {
            // Insert into parent events_data table
            columnNums = commonColumnNames.map((_, index) => `$${index + 1}`).join (", ")
            parentQueryResult = await client.query(
              `INSERT INTO event_data (${commonColumnNames.join (", ")}) VALUES (${columnNums}) RETURNING event_id`,
              commonColumnValues,
            );
          }
          catch (err) {
            console.log ("Error importing data into parent table")
            console.log (err)
            process.exit (-1)
          }

          try {
            // Add foreign key to child data
            specialColumnNames.push ("event_id")
            specialColumnValues.push (parentQueryResult.rows[0].event_id)

            // Insert into child table
            columnNums = specialColumnNames.map((_, index) => `$${index + 1}`).join (", ")
            childQueryResult = await client.query(
              `INSERT INTO ${childTableName} (${specialColumnNames.join (", ")}) VALUES (${columnNums})`,
              specialColumnValues,
            );
          }
          catch (err) {
            console.log ("Error importing data into child table '" + childTableName + "'")
            console.log (err)
            process.exit (-1)
          }
        }
      } catch (err) {
        console.error(err);
        process.exit(-1);
      } finally {
        client.release();
        await pool.end();
        process.exit();
      }
    });
  } catch (err) {
    console.error(err);
    process.exit(-1);
  }
}

processXmlData();
