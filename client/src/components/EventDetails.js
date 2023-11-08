import React, { useState } from 'react';
import { Typography, Box, Paper, Button , Divider } from '@mui/material';

// Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import RouteIcon from '@mui/icons-material/Route';

const commonAttributes = new Set([
  "time",
  "type",
  "link",
])
const blacklistedAttributes = new Set([
  "actType"
])

function getEventAttributes (event) {
  const uniqueAttributes = Object.keys(event).filter(key => !commonAttributes.has(key) && !blacklistedAttributes.has(key));
  return [...uniqueAttributes];
}

function secondsToTimeString (seconds) {
  return new Date(seconds * 1000).toISOString().slice(11, 19)
}

// TEMP: mock data
const event = {
  time: "20.0",
  type:"actend",
  link: "7742288_0",
  person: "p_9031",
  actType: "taxi interaction",
  test1: "hello",
  test2: "world",
  test3: "!!!",
  test4: "this is a ",
  test5: "test!",
}

export default function LinkDetails() {
  const [showMore, setShowMore] = useState(false);
  const attributesToShow = getEventAttributes(event);
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
            Time: {secondsToTimeString (event.time)}
          </Typography>
        </Box>

        {/* Type */}
        <Box sx={{display: "flex", alignItems: "center"}} paddingX={1}>
          <LightbulbIcon />
          <Typography align="left" variant="subtitle1" paddingX={1}>
            Type: {event.type}
          </Typography>
        </Box>

        {/* Link */}
        <Box sx={{display: "flex", alignItems: "center"}} paddingX={1}>
          <RouteIcon />
          <Typography align="left" variant="subtitle1" paddingX={1}>
            Location Link: {event.link}
          </Typography>
        </Box>

        <Divider textAlign="left" style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />

        {/* Initial attributes */}
        {initialAttributes.map(attr => (
          <Typography key={attr} align="left" variant="subtitle1" marginLeft="1rem">
            {attr}: {event[attr]}
          </Typography>
        ))}

        {/* Show More button and Extra attributes */}
        {showMore &&
          extraAttributes.map(attr => (
            <Typography key={attr} align="left" variant="subtitle1" marginLeft="1rem">
              {attr}: {event[attr]}
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