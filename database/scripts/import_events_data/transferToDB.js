import pkg from 'pg';
import fs from 'fs';
import xml2js from 'xml2js';

import typeMap from './typeMap.js'
import commonColumnMap from './commonColumnMap.js'
import specialColumnMap from './specialColumnMap.js';
import { stringify } from 'querystring';

//Connect to pgSQL
const { Pool } = pkg;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
});
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})
const client = await pool.connect()

// const xmlFilePath = '../raw_data/events.xml' // XML file path
const xmlFilePath = 'testData.xml' // XML file path
const xmlData = fs.readFileSync(xmlFilePath, 'utf-8') // Read the XML file

async function main () {
  // Parse XML using streaming parser
  const parser = new xml2js.Parser();
  parser.parseString(xmlData, async (err, result) => {
    if (err) {
      console.error('Error parsing XML:', err);
      return;
    }

    const events = result.events.event // Contains all the items in the XML structure
    let line = 1

    async function insertEventData (eventData) {
      try {
        let columnNames = []
        let columnData = []

        console.log (line)
        line += 1

        // Iterate over the attributes
        for (let [key, value] of Object.entries(eventData)) {
          columnNames.push (key)
          columnData.push (value)
        }

        // Insert into parent event_data table
        let columnValNums = columnNames.map((_, index) => `$${index + 1}`).join (", ")

        // console.log (JSON.stringify(columnNames, null, 2))
        // console.log (JSON.stringify(columnData, null, 2))
        // console.log (columnValNums)
        const result = await client.query(
          `INSERT INTO test_data (${columnNames.join (", ")}) VALUES (${columnValNums})`,
          columnData,
        )

        console.log ("Result:", JSON.stringify (result))
      }
      catch (err) {
        console.log (err)
        throw err
      }
    }

    // events.forEach(async ({ $: eventData }) => {
      for (let [key, value] of Object.entries(events)) {
        await insertEventData (value.$).catch(console.error)
        .then(() => console.log('We do cleanup here'))
      }
      // events.forEach (async (event)=>await insertEventData (event))
  })

  client.release()
  await pool.end ()
  process.exit ()
}

await main ()

  //     return

      // let columnNames = []
      // let columnData = []

      // console.log (line)
      // line += 1

      // // Iterate over the attributes
      // for (let [key, value] of Object.entries(eventData)) {
      //   columnNames.push (key)
      //   columnData.push (value)
      // }

      // // Insert into parent event_data table
      // let columnValNums = columnNames.map((_, index) => `$${index + 1}`).join (", ")

      // console.log (JSON.stringify(columnNames, null, 2))
      // console.log (JSON.stringify(columnData, null, 2))
      // console.log (columnValNums)

      // throw ("hhh")

      // const result = await client.query(
      //   `INSERT INTO test_data (${columnNames.join (", ")}) VALUES (${columnValNums})`,
      //   columnData,
      //   (err, res) => {
      //     console.log (err, res)
      // })

      // process.exit ()

      // if (result.rows.length === 0) console.log ("EXIT")
      // else console.log ("TEST")

      // console.log ("Result:", JSON.stringify (result.rows))

  //     // Insert into child table
  //   });
  // });

  // client.release()
  // await pool.end ()
  // process.exit ()