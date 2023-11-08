import { Typography, TextField, Pagination } from '@mui/material';
import LinkDetails from '../components/EventDetails';

/**
 * Allows users to find details about a specific link by searching for its ID
 * @returns {JSX.Element} A SearchForLink component.
 */
export default function SearchForLink() {
  return (
    <div>
      <Typography variant="h4" align="center" paddingBottom={1}>
        Search for a link
      </Typography>

      {/* We should autofill link IDs here if we have time */}
      <div style={{display: "flex", gap: "0.75rem", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        <TextField fullWidth label="Link ID" id="searchTerms" margin="normal" autoFocus />
        <LinkDetails />
      </div>

      <Pagination count={10} variant="outlined" shape="rounded" style={{display: "flex", justifyContent: "center", paddingTop: "1rem"}} />
    </div>
  )
}