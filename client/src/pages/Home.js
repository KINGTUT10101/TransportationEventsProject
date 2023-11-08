import { Grid, Typography, Divider } from "@mui/material"

import EventDetails from "../components/EventDetails"
import LinkDetails from "../components/LinkDetails"

/**
 * The main page of the website. Shows recent announcements and featured content
 * @returns {JSX.Element} A Home component.
 */
export default function Home() {
  return (
    <div>
      <Typography variant="h4" align="center" paddingBottom={4}>
        Welcome to the Transportation Events Project!
      </Typography>

      <Grid container padding={2} alignItems="flex-start" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 16 }} justifyContent="center">
        {Array.from(Array(8)).map((_, index) => (
          <Grid item xs={2} sm={3} md={4}>
            <EventDetails />
          </Grid>
        ))}
      </Grid>

      <Divider style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />

      <Grid container padding={2} alignItems="flex-start" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 16 }} justifyContent="center">
        {Array.from(Array(8)).map((_, index) => (
          <Grid item xs={2} sm={3} md={4}>
            <LinkDetails />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}