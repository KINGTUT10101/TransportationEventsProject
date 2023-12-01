import { Typography, TextField, Grid, Pagination, Button, Divider } from '@mui/material';
import axios from "axios";
import React from "react";

import EventDetails from "../components/EventDetails"
import WaitModal from '../components/WaitModal';

/**
 * Allows users to search for events by a person ID
 * @returns {JSX.Element} A EventsByPerson component.
 */
export default function EventsByPerson() {
  const [waiting, setWaiting] = React.useState(false);
  const [personID, setPersonID] = React.useState("");
  const [eventsData, setEventsData] = React.useState([]);

  async function getData () {
    setWaiting (true)
    
    await axios.get(`/api/person/${personID}`).then((response) => {
      setEventsData(response.data);
    }).catch ((err) => {
      alert ("Error fetching content (please check that the ID is correct)\n" + err)
      setEventsData ([])
    })

    setWaiting (false)
  }
  
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
          onClick={getData}
        >
          Search
        </Button>
      </div>

      <Divider style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />

      <Grid container padding={2} alignItems="flex-start" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 16 }} justifyContent="center">
        {eventsData.map((item) => (
          <Grid item xs={2} sm={3} md={4}>
            <EventDetails data={item} />
          </Grid>
        ))}
      </Grid>

      <Pagination count={10} variant="outlined" shape="rounded" style={{display: "flex", justifyContent: "center", paddingTop: "1rem"}} />
    
      <WaitModal open={waiting} />
    </div>
  )
}