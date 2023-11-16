import { Typography, TextField, Grid, Pagination } from '@mui/material';

import EventDetails from "../components/EventDetails"

/**
 * Allows users to search for events by a person ID
 * @returns {JSX.Element} A EventsByPerson component.
 */
export default function EventsByPerson() {
  return (
    <div>
      <Typography variant="h4" align="center" paddingBottom={1}>
        Search for events by person
      </Typography>

      <div style={{display: "flex", gap: "0.75rem", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        <TextField fullWidth label="Person ID" id="searchTerms" margin="normal" autoFocus style={{maxWidth: "40rem"}} />
      </div>

      <Grid container padding={2} alignItems="flex-start" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 16 }} justifyContent="center">
        {Array.from(Array(8)).map((_, index) => (
          <Grid item xs={2} sm={3} md={4}>
            <EventDetails />
          </Grid>
        ))}
      </Grid>

      <Pagination count={10} variant="outlined" shape="rounded" style={{display: "flex", justifyContent: "center", paddingTop: "1rem"}} />
    </div>
  )
}