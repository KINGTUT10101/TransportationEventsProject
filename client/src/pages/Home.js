import { Grid, Typography, Divider } from "@mui/material"

import EventDetails from "../components/EventDetails"

/**
 * The main page of the website. Shows recent announcements and featured content
 * @returns {JSX.Element} A Home component.
 */
export default function Home() {
  return (
    <div>
      <Typography variant="h4" align="center" paddingBottom={1}>
        Welcome to the Transportation Events Project!
      </Typography>
      <Typography variant="subtitle2" align="center" paddingBottom={3}>
        Choose an option on the left to begin
      </Typography>
    </div>
  )
}