import express from "express";
import db from "./databaseConn.js";
import typeMap from "./typeMap.js"

const router = express.Router();

process.on('uncaughtException', function (err) {
  console.log(err);
});

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

/*a. Search events by person ID to return all events for a specific person. Display the 
  events on the screen and choose an appropriate number of attributes to show.
  Events should be sorted out by time.*/
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

/*b. Search events by link ID to return all events for that specific link. Events should 
  be sorted out by time.*/
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

/*c. Given a link ID, show the link details like freespeed, capacity and modes.*/
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

/*d. Get all the events in a specific time range (e.g., between 7:00 and 8:00 AM) for a 
  specific link ID.*/
//api/range?min={min}&max={max}&page={page}&count={count}
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
