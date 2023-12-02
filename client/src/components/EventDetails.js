import React, { useState } from 'react';
import axios from "axios";
import { Typography, Box, Paper, Button, Divider, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import RouteIcon from '@mui/icons-material/Route';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';

const commonAttributes = new Set([
  "event_time",
  "event_type",
])
const blacklistedAttributes = new Set([
  "link_id",
  "person",
  "vehicle",
  "event_id"
])
const specialAttributeLimit = 0

/**
 * Extracts event attributes that are not common or blacklisted into an array
 * @param {Object} event Contains the attributes of an event
 * @returns {Array} An array of attribute name strings
 */
function getEventAttributes (event) {
  const uniqueAttributes = Object.keys(event).filter(key => !commonAttributes.has(key) && !blacklistedAttributes.has(key) && event[key] !== null);
  return [...uniqueAttributes];
}

/**
 * Converts a time value into a string
 * @param {Number} seconds The time in seconds 
 * @returns {String} The time in HH:MM:SS format
 */
function secondsToTimeString (seconds) {
  return new Date(seconds * 1000).toISOString().slice(11, 19)
}

// TODO: only display the common attributes at first. When a user hits "show more", make a request to get the rest of the data
// This would reduce the amount of null values in the initial request
export default function LinkDetails({ data }) {
  const [showMore, setShowMore] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [specialData, setSpecialData] = useState(null)
  const [initialAttributes, setInitialAttributes] = useState([]);
  const [extraAttributes, setExtraAttributes] = useState([]);
  const [showToast, setShowToast] = useState (false)

  function handleShowMore () {
    setShowMore(!showMore); // Toggle the show more button
  };

  async function handleLoadMore () {
    setLoadMore (true) // Disable the load more button

    let { event_type, event_id } = data
    
    await axios.get(`/api/specialEventData/${encodeURIComponent(event_type)}/${event_id}`).then((response) => {
      setSpecialData (response.data)
      let specialAttributes = getEventAttributes(response.data)
      setInitialAttributes (specialAttributes.slice(0, specialAttributeLimit))
      setExtraAttributes (specialAttributes.slice(specialAttributeLimit))

      if (specialAttributes.length === 0) {
        setShowToast (true)
      }

      setShowMore (true)

    }).catch ((err) => {
      alert ("Error fetching data\n" + err)
      setInitialAttributes ([])
      setExtraAttributes ([])
    })
  };

  return (
    <div>
      <Paper elevation={20} style={{ padding: '0.5rem' }}>
        <Typography align="center" variant="h5">
          Event Details
        </Typography>

        {/* Time */}
        <Box sx={{display: "flex", alignItems: "center"}} paddingX={1}>
          <AccessTimeIcon />
          <Typography align="left" variant="subtitle1" paddingX={1}>
            Time: {secondsToTimeString (data.event_time)}
          </Typography>
        </Box>

        {/* Type */}
        <Box sx={{display: "flex", alignItems: "center"}} paddingX={1}>
          <LightbulbIcon />
          <Typography align="left" variant="subtitle1" paddingX={1}>
            Type: {data.event_type}
          </Typography>
        </Box>

        {/* Link */}
        {
          data.link_id !== undefined && data.link_id !== null &&
          <Box sx={{display: "flex", alignItems: "center"}} paddingX={1}>
            <RouteIcon />
            <Typography align="left" variant="subtitle1" paddingX={1}>
              Location Link: {data.link_id}
            </Typography>
          </Box>
        }

        {/* Person */}
        {
          data.person !== undefined && data.person !== null &&
          <Box sx={{display: "flex", alignItems: "center"}} paddingX={1}>
            <PersonIcon />
            <Typography align="left" variant="subtitle1" paddingX={1}>
              Person: {data.person}
            </Typography>
          </Box>
        }

        {/* Vehicle */}
        {
          data.vehicle !== undefined && data.vehicle !== null &&
          <Box sx={{display: "flex", alignItems: "center"}} paddingX={1}>
            <DirectionsCarFilledIcon />
            <Typography align="left" variant="subtitle1" paddingX={1}>
              Vehicle: {data.vehicle}
            </Typography>
          </Box>
        }

        {
          showMore &&
          <Divider style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
        }

        {/* Initial attributes */}
        {initialAttributes.map(attr => (
          <Typography key={attr} align="left" variant="subtitle1" marginLeft="1rem">
            {attr}: {specialData[attr]}
          </Typography>
        ))}

        {/* Extra attributes */}
        {showMore &&
          extraAttributes.map(attr => (
            <Typography key={attr} align="left" variant="subtitle1" marginLeft="1rem">
              {attr}: {specialData[attr]}
            </Typography>
          ))
        }

        {/* Show more button */}
        {extraAttributes.length > 0 && (
          <Button onClick={handleShowMore}>
            {showMore ? 'Show Less' : 'Show More'}
          </Button>
        )}

        {/* Load more button */}
        {!loadMore && (
          <Button onClick={handleLoadMore}>
            Load More
          </Button>
        )}
      </Paper>
      
      {/* Toast */}
      <Snackbar
        open={showToast}
        autoHideDuration={1000}
        onClose={()=>setShowToast(false)}
        message="No more data to show!"
      />
    </div>
  );
}