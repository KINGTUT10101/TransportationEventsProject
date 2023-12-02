import { Typography, TextField, Grid, Pagination, Button, Divider } from '@mui/material';
import axios from "axios";
import React, { useEffect } from "react";

import EventDetails from "../components/EventDetails"
import WaitModal from '../components/WaitModal';

const itemsPerPage = 16

/**
 * Allows users to search for events by a person ID
 * @returns {JSX.Element} A EventsByPerson component.
 */
export default function EventsByPerson() {
  const [waiting, setWaiting] = React.useState(false);
  const [personID, setPersonID] = React.useState("");
  const [eventsData, setEventsData] = React.useState([]);
  const [totalEvents, setTotalEvents] = React.useState(0);
  const [page, setPage] = React.useState(1)
  const [firstRender, setFirstRender] = React.useState(true)

  async function getData () {
    setWaiting (true)

    // Retrieves a page of event data
    await axios.get(`/api/person/${encodeURIComponent(personID)}?page=${page}&count=${itemsPerPage}`).then((response) => {
      setEventsData(response.data);
    }).catch ((err) => {
      alert ("Error fetching content (please check that the ID is correct)\n" + err)
      setEventsData ([])
    })

    setWaiting (false)
  }

  async function newSearch () {
    setWaiting (true)

    // Retrieves the total number of items for the search
    await axios.get(`/api/count/person/${personID}`).then((response) => {
      setTotalEvents(response.data.count);

      if (page === 1) {
        getData () // The hook won't run if the page doesn't change, so we must do it manually
      }
      else {
        setPage (1)
        // Data will update automatically in the useEffect hook
      }
      
    }).catch ((err) => {
      alert ("Error fetching content count (please check that the time range is correct)\n" + err)
      setEventsData ([])
    })

    setWaiting (false)
  }

  async function nextPage (event, value) {
    setPage (value)
    // Data will update automatically in the useEffect hook
    // This fixes a bug where users had to click the page twice to update the data
  }

  React.useEffect (()=>{
    if (firstRender){
      setFirstRender (false)
    }
    else {
      getData ()
    }
  }, [page])

  React.useEffect (()=>{
    if (!waiting) {
      window.scrollTo(0, 0)
    }
  }, [waiting])
  
  return (
    <div>
      <Typography variant="h4" align="center" paddingBottom={1}>
        Search for events by person
      </Typography>

      <div style={{display: "flex", gap: "0.75rem", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        <TextField
          fullWidth
          label="Person ID"
          id="searchTerms"
          margin="normal"
          autoFocus
          style={{maxWidth: "40rem"}}
          onChange={(event)=>setPersonID(event.target.value)}
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
              <Grid item xs={2} sm={3} md={4} key={item.event_id}>
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
