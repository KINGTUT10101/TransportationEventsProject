import dayjs from 'dayjs';
import { Typography, Grid, Pagination } from '@mui/material';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

import EventDetails from "../components/EventDetails"

/**
 * Allows users to search for events within a time range
 * @returns {JSX.Element} A EventsByTime component.
 */
export default function EventsByTime() {
  return (
    <div>
      <Typography variant="h4" align="center" paddingBottom={1}>
        Search for events within a time frame
      </Typography>

      {/* Make sure we check if the first time is before the second and error if true */}
      <div style={{display: "flex", gap: "0.75rem", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        <MobileTimePicker label="Start time" id="searchTerms" margin="normal" defaultValue={dayjs('2000-01-1T12:00')} style={{width: "50%"}} />
        <MobileTimePicker label="End time" id="searchTerms" margin="normal" defaultValue={dayjs('2000-01-1T12:00')} style={{width: "50%"}} />
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