import express from "express";
import db from "./databaseConn.js";
import typeMap from "./typeMap.js"

const router = express.Router();

process.on('uncaughtException', function (err) {
  console.log(err);
});

/**
 * Used to get the special attributes for an event
 * @function /api/specialEventData/:eventType/:eventID
 * @category Routes
 * @route {GET} /api/specialEventData/{eventType}/{eventID}
 * @routeparam {String} eventType The type of event requested
 * @routeparam {String} eventID The ID of a particular event
 * @returns An array of the requested event attributes or a string containing an error message
 */
router.get('/specialEventData/:eventType/:eventID', async (req, res) => {
  try{
    const eid = req.params.eventID; // Event ID
    const sourceTable = typeMap[req.params.eventType] // Source table for special columns

    const result = await db.query(`SELECT *
                                   FROM ${sourceTable}
                                   WHERE event_id = $1
                                   LIMIT 1;`,[eid]);
    if (result.rows.length === 0) res.status(404).send('Not Found');
    else res.status(200).send(result.rows[0]);
  }catch (error) {
    console.error('Error', error);
    res.status(500).send('Server error');
  }
});

/**
 * Gets a page of event data associated with a person ID
 * @function /api/person/:personID
 * @category Routes
 * @route {GET} /api/person/{personID}?page={page}&count={count}
 * @routeparam {String} :personID The ID of a particular person
 * @queryparam {number} page The page that the data is being fetched for. Offsets the result from the database
 * @queryparam {number} count The number of comments to fetch from the database, aka, the number of items per page
 * @returns An array of event data or a string containing an error message
 */
router.get('/person/:personID', async (req, res) => {
  try{
    // Get the page and offset for the query
    if(!parseInt(req.query.count) || req.query.count<0) req.query.count = 20;
    const limit = req.query.count;
    if(!parseInt(req.query.page) || req.query.page<1) req.query.page = 1;
    const offset = req.query.count*(req.query.page - 1);

    const pid = req.params.personID;

    const result = await db.query(`SELECT *
                                   FROM event_data
                                   WHERE person = $1
                                   ORDER BY event_time, event_id
                                   LIMIT $2 OFFSET $3;`,[pid,limit,offset]);
    if (result.rows.length === 0) res.status(404).send('Not Found');
    else res.status(200).send(result.rows);
  }catch (error) {
    console.error('Error', error);
    res.status(500).send('Server error');
  }
});

/**
 * Counts the number of events associated with a person ID
 * @function /api/count/person/:personID
 * @category Routes
 * @route {GET} /api/count/person/{personID}
 * @routeparam {String} The ID of a particular person
 * @returns An array containing the number of events associated with a person ID or a string containing an error message
 */
router.get('/count/person/:personID', async (req, res) => {
  try{
    const pid = req.params.personID;

    const result = await db.query(`SELECT COUNT(*)
                                   FROM event_data
                                   WHERE person = $1;`,[pid]);
    if (result.rows.length === 0) res.status(404).send('Not Found');
    else res.status(200).send(result.rows[0]);
  }catch (error) {
    console.error('Error', error);
    res.status(500).send('Server error');
  }
});

/**
 * Gets a page of event data associated with a link ID
 * @function /api/event/:linkID
 * @category Routes
 * @route {GET} /api/event/{linkID}?page={page}&count={count}
 * @routeparam {String} :linkID The ID of a particular link
 * @queryparam {number} page The page that the data is being fetched for. Offsets the result from the database
 * @queryparam {number} count The number of comments to fetch from the database, aka, the number of items per page
 * @returns An array of event data or a string containing an error message
 */
router.get('/event/:linkID', async (req, res) => {
  try{
    // Get the page and offset for the query
    if(!parseInt(req.query.count) || req.query.count<0) req.query.count = 20;
    const limit = req.query.count;
    if(!parseInt(req.query.page) || req.query.page<1) req.query.page = 1;
    const offset = req.query.count*(req.query.page - 1);
    
    const lid = req.params.linkID;
    
    const result = await db.query(`SELECT *
                                   FROM event_data
                                   WHERE link_id = $1
                                   ORDER BY event_time, event_id
                                   LIMIT $2 OFFSET $3;`,[lid,limit,offset]);
    if (result.rows.length === 0) res.status(404).send('Not Found');
    else res.status(200).send(result.rows);
  }catch (error) {
    console.error('Error', error);
    res.status(500).send('Server error');
  }
});

/**
 * Counts the number of events associated with a link ID
 * @function /api/count/event/:linkID
 * @category Routes
 * @route {GET} /api/count/event/{linkID}
 * @routeparam {String} The ID of a particular link
 * @returns An array containing the number of events associated with a link ID or a string containing an error message
 */
router.get('/count/event/:linkID', async (req, res) => {
  try{
    const lid = req.params.linkID;
    
    const result = await db.query(`SELECT COUNT(*)
                                   FROM event_data
                                   WHERE link_id = $1;`,[lid]);
    if (result.rows.length === 0) res.status(404).send('Not Found');
    else res.status(200).send(result.rows[0]);
  }catch (error) {
    console.error('Error', error);
    res.status(500).send('Server error');
  }
});

/**
 * Gets the data of a specific link
 * @function /api/link/:linkID
 * @category Routes
 * @route {GET} /api/link/{linkID}
 * @routeparam {String} :linkID The ID of a particular link
 * @returns An array of link data or a string containing an error message
 */
router.get('/link/:linkID', async (req, res) => {
  try{
    const lid = req.params.linkID;

    const result = await db.query(`SELECT *
                                   FROM link
                                   WHERE link_id = $1`,[lid]);
    if (result.rows.length === 0) res.status(404).send('Not Found');
    else res.status(200).send(result.rows[0]);
  }catch (error) {
    console.error('Error', error);
    res.status(500).send('Server error');
  }
});

/**
 * Gets a page of event data associated with a time range
 * @function /api/range
 * @category Routes
 * @route {GET} /api/range?min={min}&max={max}&page={page}&count={count}
 * @queryparam {number} min The time in seconds where the time range begins
 * @queryparam {number} max The time in seconds where the time range ends
 * @queryparam {number} page The page that the data is being fetched for. Offsets the result from the database
 * @queryparam {number} count The number of comments to fetch from the database, aka, the number of items per page
 * @returns An array of event data or a string containing an error message
 */
router.get('/range', async (req, res) => {
  try{
    // Get the page and offset for the query
    if(!parseInt(req.query.count) || req.query.count<0) req.query.count = 20;
    const limit = req.query.count;
    if(!parseInt(req.query.page) || req.query.page<1) req.query.page = 1;
    const offset = req.query.count*(req.query.page - 1);
    
    //getting the range
    if(!parseInt(req.query.min) || req.query.min<0) req.query.min = '0';
    const min = req.query.min;
    if(!parseInt(req.query.max) || req.query.max<1) req.query.max = '86400';
    const max = req.query.max;
    
    const result = await db.query(`SELECT * 
                                   FROM event_data
                                   WHERE event_time BETWEEN $1 AND $2
                                   ORDER BY event_time, event_id
                                   LIMIT $3 OFFSET $4;`,[min,max,limit,offset]);
    if (result.rows.length === 0) res.status(404).send('Not Found');
    else res.status(200).send(result.rows);
  }catch (error) {
    console.error('Error', error);
    res.status(500).send('Server error');
  }
});

/**
 * Counts the number of events associated with a time range
 * @function /api/count/range
 * @category Routes
 * @route {GET} /api/count/range?min={min}&max={max}
 * @queryparam {number} min The time in seconds where the time range begins
 * @queryparam {number} max The time in seconds where the time range ends
 * @returns An array containing the number of events associated with a time range or a string containing an error message
 */
router.get('/count/range', async (req, res) => {
  try{
    //getting the range
    if(!parseInt(req.query.min) || req.query.min<0) req.query.min = '0';
    const min = req.query.min;
    if(!parseInt(req.query.max) || req.query.max<1) req.query.max = '86400';
    const max = req.query.max;
    
    const result = await db.query(`SELECT COUNT(*)
                                   FROM event_data
                                   WHERE event_time BETWEEN $1 AND $2;`,[min,max]);
    if (result.rows.length === 0) res.status(404).send('Not Found');
    else res.status(200).send(result.rows[0]);
  }catch (error) {
    console.error('Error', error);
    res.status(500).send('Server error');
  }
});

export default router
