import { Grid, Typography } from "@mui/material"

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
    </div>
  )
}