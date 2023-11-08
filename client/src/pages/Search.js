import { Link } from 'react-router-dom'
import { Typography, Button } from '@mui/material';

/**
 * Offers navigation options to the other search pages
 * @returns {JSX.Element} A Search component.
 */
export default function Search() {
  return (
    <div>
      <Typography variant="h4" align="center" paddingBottom={1}>
        Search Menu
      </Typography>
      <Typography variant="subtitle2" align="center" paddingBottom={4}>
        Please select an option below
      </Typography>

      <div style={{display: "flex", gap: "0.75rem", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        <Link to="bylink">
          <Button variant="contained">
            Search for Events by Link
          </Button>
        </Link>
        <Link to="byperson">
          <Button variant="contained">
            Search for Events by Person
          </Button>
        </Link>
        <Link to="bytime">
          <Button variant="contained">
            Search for Events in a Time Range
          </Button>
        </Link>
        <Link to="forlink">
          <Button variant="contained">
            Search for a specific link's data
          </Button>
        </Link>
      </div>
    </div>
  )
}