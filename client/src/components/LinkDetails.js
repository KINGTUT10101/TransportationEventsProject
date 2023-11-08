import { Typography, Paper, Box } from '@mui/material';

// Icons
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PinDropIcon from '@mui/icons-material/PinDrop';
import StraightenIcon from '@mui/icons-material/Straighten';
import GroupsIcon from '@mui/icons-material/Groups';
import SendIcon from '@mui/icons-material/Send';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

export default function LinkDetails () {
  return (
    <div>
      <Paper elevation={20} style={{padding: "0.5rem"}}>
        <Typography align="center" variant="h5">
          Link Details
        </Typography>

        {/* ID */}
        <Box sx={{display: "flex", alignItems: "center"}} paddingX={1}>
          <FingerprintIcon />
          <Typography align="left" variant="subtitle1" paddingX={1}>
            ID: 44422996
          </Typography>
        </Box>

        {/* From */}
        <Box sx={{display: "flex", alignItems: "center"}} paddingX={1}>
          <LocationOnIcon />
          <Typography align="left" variant="subtitle1" paddingX={1}>
            From Node ID: 551212
          </Typography>
        </Box>

        {/* To */}
        <Box sx={{display: "flex", alignItems: "center"}} paddingX={1}>
          <PinDropIcon />
          <Typography align="left" variant="subtitle1" paddingX={1}>
            To Node ID: 774343
          </Typography>
        </Box>

        {/* Length */}
        <Box sx={{display: "flex", alignItems: "center"}} paddingX={1}>
          <StraightenIcon />
          <Typography align="left" variant="subtitle1" paddingX={1}>
            Length: 453 units
          </Typography>
        </Box>

        {/* Freespeed */}
        <Box sx={{display: "flex", alignItems: "center"}} paddingX={1}>
          <StraightenIcon />
          <Typography align="left" variant="subtitle1" paddingX={1}>
            Freespeed: 33 units/time
          </Typography>
        </Box>

        {/* Capacity */}
        <Box sx={{display: "flex", alignItems: "center"}} paddingX={1}>
          <GroupsIcon />
          <Typography align="left" variant="subtitle1" paddingX={1}>
            Max capacity: 466
          </Typography>
        </Box>

        {/* Permlanes */}
        <Box sx={{display: "flex", alignItems: "center"}} paddingX={1}>
          <SendIcon />
          <Typography align="left" variant="subtitle1" paddingX={1}>
            Number of permlanes: 1
          </Typography>
        </Box>

        {/* Oneway */}
        <Box sx={{display: "flex", alignItems: "center"}} paddingX={1}>
          <MultipleStopIcon />
          <Typography align="left" variant="subtitle1" paddingX={1}>
            Oneway: Yes
          </Typography>
        </Box>

        {/* Modes */}
        <Box sx={{display: "flex", alignItems: "center"}} paddingX={1}>
          <DirectionsCarIcon />
          <Typography align="left" variant="subtitle1" paddingX={1}>
            Mode: car
          </Typography>
        </Box>
      </Paper>
    </div>
  )
}