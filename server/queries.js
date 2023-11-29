import express from "express";
import db from "./databaseConn.js";

const router = express.Router();

process.on('uncaughtException', function (err) {
  console.log(err);
});

/*a. Search events by person ID to return all events for a specific person. Display the 
  events on the screen and choose an appropriate number of attributes to show.
  Events should be sorted out by time.*/
router.get('/person/:personID', async (req, res) => {
  try{
    const pid = req.params.personID;

    //Calculate where we start taking the events + error handling
    if(!parseInt(req.query.count) || req.query.count<0) req.query.count = 20;
    const limit = req.query.count;
    if(!parseInt(req.query.page) || req.query.page<1) req.query.page = 1;
    const offset = req.query.count*(req.query.page-1);

    const result = await db.query(`SELECT *
                                   FROM megapersonview
                                   WHERE person = $1
                                   ORDER BY event_time
                                   LIMIT $2 OFFSET $3;`,[pid,limit,offset]);
    if (result.rows.length === 0) res.status(404).send('Not Found');
    else res.status(200).send(result.rows);
  }catch (error) {
    console.error('Error', error);
    res.status(500).send('Server error');
  }
});

/*b. Search events by link ID to return all events for that specific link. Events should 
  be sorted out by time.*/
router.get('/event/:linkID', async (req, res) => {
  try{
    const lid = req.params.linkID;
    
    const result = await db.query(`SELECT *
                                   FROM megalinkview
                                   WHERE link_id = $1
                                   ORDER BY event_time;`,[lid]);
    if (result.rows.length === 0) res.status(404).send('Not Found');
    else res.status(200).send(result.rows);
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
    else res.status(200).send(result.rows);
  }catch (error) {
    console.error('Error', error);
    res.status(500).send('Server error');
  }
});

/*d. Get all the events in a specific time range (e.g., between 7:00 and 8:00 AM) for a 
  specific link ID.*/
//api/range?min={min}&max={max}
router.get('/range', async (req, res) => {
  try{
    //getting the range
    if(!parseInt(req.query.min) || req.query.min<0) req.query.min = '0';
    const min = req.query.min;
    if(!parseInt(req.query.max) || req.query.max<1) req.query.max = '86400';
    const max = req.query.max;
    
    const result = await db.query(`SELECT * 
                                   FROM megaview
                                   WHERE event_time BETWEEN $1 AND $2
                                   ORDER BY event_time;`,[min,max]);
    if (result.rows.length === 0) res.status(404).send('Not Found');
    else res.status(200).send(result.rows);
  }catch (error) {
    console.error('Error', error);
    res.status(500).send('Server error');
  }
});

export default router
