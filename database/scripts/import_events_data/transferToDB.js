import pkg from 'pg';
import fs from 'fs';
import xml2js from 'xml2js';

import typeMap from './typeMap.js';
import commonColumnMap from './commonColumnMap.js';
import specialColumnMap from './specialColumnMap.js';

async function processXmlData() {
  // Connect to pgSQL
  const { Pool } = pkg;
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
  });

  pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });

  const client = await pool.connect();

  try {
    const xmlFilePath = 'testData.xml'; // XML file path
    const xmlData = fs.readFileSync(xmlFilePath, 'utf-8'); // Read the XML file

    // Parse XML using streaming parser
    const parser = new xml2js.Parser();
    parser.parseString(xmlData, async (err, result) => {
      try {
        if (err) {
          console.error('Error parsing XML:', err);
          return;
        }

        const eventsArr = result.events.event; // Contains all the items in the XML structure
        let line = 1;

        console.log('Starting import...');

        for (const { $: eventData } of eventsArr) {
          let columnNames = []
          let columnData = []
          
          console.log (line)
          line += 1

          // Iterate over the attributes
          for (let [key, value] of Object.entries(eventData)) {
            columnNames.push (key)
            columnData.push (value)
          }
          let columnValNums = columnNames.map((_, index) => `$${index + 1}`).join (", ")
          
          const queryResult = await client.query(
            `INSERT INTO test_data (${columnNames.join (", ")}) VALUES (${columnValNums})`,
            columnData,
          );
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
