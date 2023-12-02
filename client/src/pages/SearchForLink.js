import { Typography, TextField, Button, Divider } from '@mui/material';
import axios from "axios";
import React from "react";
import LinkDetails from '../components/LinkDetails';
import WaitModal from '../components/WaitModal';

/**
 * Allows users to find details about a specific link by searching for its ID
 * @returns {JSX.Element} A SearchForLink component.
 */
export default function SearchForLink() {
  const [waiting, setWaiting] = React.useState(false); // Shows the loading modal
  const [linkID, setLinkID] = React.useState(""); // The search bar text
  const [linkData, setLinkData] = React.useState(null); // The data returned from the server

  async function getData () {
    setWaiting (true)

    // Retrieves the link data
    await axios.get(`/api/link/${linkID}`).then((response) => {
      setLinkData(response.data);
    }).catch ((err) => {
      alert ("Error fetching content (please check that the ID is correct)\n" + err)
      setLinkData (null)
    })

    setWaiting (false)
  }

  return (
    <div>
      <Typography variant="h4" align="center" paddingBottom={1}>
        Search for a link
      </Typography>

      {/* We should autofill link IDs here if we have time */}
      <div style={{display: "flex", gap: "0.75rem", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        <TextField
          fullWidth
          label="Link ID"
          id="searchTerms"
          margin="normal"
          autoFocus
          style={{maxWidth: "40rem"}}
          onChange={(event)=>setLinkID(event.target.value)}
        />
        <div style={{display: "flex", justifyContent: "center"}}>
          <Button
            variant="contained"
            onClick={getData}
          >
            Search
          </Button>
        </div>

        <Divider style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />

        {
          linkData !== null &&
          <LinkDetails data={linkData} />
        }

        <WaitModal open={waiting} />
      </div>
    </div>
  )
}
