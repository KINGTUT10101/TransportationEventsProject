import React, { useState } from 'react';
import { Typography, Box, Paper, Button, Divider } from '@mui/material';

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

export default function LinkDetails({ data }) {
  const [showMore, setShowMore] = useState(false);
  const attributesToShow = getEventAttributes(data);
  const initialAttributes = attributesToShow.slice(0, 5);
  const extraAttributes = attributesToShow.slice(5);

  const handleShowMore = () => {
    setShowMore(!showMore);
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
          initialAttributes.length > 0 &&
          <Divider style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
        }

        {/* Initial attributes */}
        {initialAttributes.map(attr => (
          <Typography key={attr} align="left" variant="subtitle1" marginLeft="1rem">
            {attr}: {data[attr]}
          </Typography>
        ))}

        {/* Show More button and Extra attributes */}
        {showMore &&
          extraAttributes.map(attr => (
            <Typography key={attr} align="left" variant="subtitle1" marginLeft="1rem">
              {attr}: {data[attr]}
            </Typography>
          ))}
        {extraAttributes.length > 0 && (
          <Button onClick={handleShowMore}>
            {showMore ? 'Show Less' : 'Show More'}
          </Button>
        )}
      </Paper>
    </div>
  );
}