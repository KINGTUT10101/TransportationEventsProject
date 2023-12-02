import dayjs from 'dayjs';
import { Typography, Grid, Pagination, Button, Divider } from '@mui/material';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import axios from "axios";
import React from "react";

import EventDetails from "../components/EventDetails"
import WaitModal from '../components/WaitModal';

const itemsPerPage = 32

function convertToSeconds (dayjsObj) {
  let seconds = dayjsObj.hour () * 60**2
  seconds += dayjsObj.minute () * 60
  seconds += dayjsObj.second ()

  return seconds
}

/**
 * Allows users to search for events within a time range
 * @returns {JSX.Element} A EventsByTime component.
 */
export default function EventsByTime() {
  const [waiting, setWaiting] = React.useState(false);
  const [startTime, setStartTime] = React.useState(dayjs ().set('hour', 9).set('minute', 0).set('second', 0));
  const [endTime, setEndTime] = React.useState(dayjs ().set('hour', 17).set('minute', 0).set('second', 0));
  const [eventsData, setEventsData] = React.useState([]);
  const [totalEvents, setTotalEvents] = React.useState(0);
  const [page, setPage] = React.useState(1)

  async function getData () {
    setWaiting (true)

    let startSecond = convertToSeconds (startTime)
    let endSecond = convertToSeconds (endTime)
    
    await axios.get(`/api/range?min=${startSecond}&max=${endSecond}&page=${page}&count=${itemsPerPage}`).then((response) => {
      setEventsData(response.data);
    }).catch ((err) => {
      alert ("Error fetching content (please check that the time range is correct)\n" + err)
      setEventsData ([])
    })

    setWaiting (false)
  }

  async function newSearch () {
    setWaiting (true)

    let startSecond = convertToSeconds (startTime)
    let endSecond = convertToSeconds (endTime)

    await axios.get(`/api/count/range?min=${startSecond}&max=${endSecond}`).then((response) => {
      setTotalEvents(response.data.count);
      getData ()
    }).catch ((err) => {
      alert ("Error fetching content count (please check that the time range is correct)\n" + err)
      setEventsData ([])
    })

    setWaiting (false)
  }

  async function nextPage (event, value) {
    setPage (value)
    window.scrollTo(0, 0)
    getData ()
  }
  
  return (
    <div>
      <Typography variant="h4" align="center" paddingBottom={1}>
        Search for events within a time frame
      </Typography>

      {/* Make sure we check if the first time is before the second and error if true */}
      <div style={{display: "flex", gap: "0.75rem", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        <MobileTimePicker
          label="Start time"
          id="searchTerms"
          margin="normal"
          views={['hours', 'minutes', 'seconds']}
          style={{width: "50%"}}
          value={startTime}
          onChange={(newValue)=>setStartTime(newValue)}
        />
        <MobileTimePicker
          label="End time"
          id="searchTerms"
          margin="normal"
          views={['hours', 'minutes', 'seconds']}
          style={{width: "50%"}}
          value={endTime}
          onChange={(newValue)=>setEndTime(newValue)}
        />
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <Button
          variant="contained"
          onClick={newSearch}
        >
          Search
        </Button>
      </div>

      {
        eventsData.length > 0 &&
        <div>
          <Divider style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />

          <Grid container padding={2} alignItems="flex-start" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 16 }} justifyContent="center">
            {eventsData.map((item) => (
              <Grid item xs={2} sm={3} md={4}>
                <EventDetails data={item} />
              </Grid>
            ))}
          </Grid>
          <Pagination count={Math.ceil (totalEvents / itemsPerPage)} page={page} onChange={nextPage} variant="outlined" shape="rounded" style={{display: "flex", justifyContent: "center", paddingTop: "1rem"}} />
        </div>
      }

      <WaitModal open={waiting} />
    </div>
  )
}