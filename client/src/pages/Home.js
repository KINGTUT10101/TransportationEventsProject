import { Grid, Typography } from "@mui/material"

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
        <LinkDetails />
      </Typography>
    </div>
  )
}