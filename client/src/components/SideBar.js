import React from 'react';
import { Box, Paper, Grid, Button, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom'
import RouteIcon from '@mui/icons-material/Route';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsCarFilledTwoToneIcon from '@mui/icons-material/DirectionsCarFilledTwoTone';

const sideBarData = [
  {
    title: 'Events by Link',
    icon: RouteIcon,
    url: '/search/bylink',
  },
  {
    title: 'Events by Person',
    icon: PersonIcon,
    url: '/search/byperson',
  },
  {
    title: 'Events by Time',
    icon: AccessTimeIcon,
    url: '/search/bytime',
  },
  {
    title: 'Search for Link',
    icon: SearchIcon,
    url: '/search/forlink',
  },
];

const websiteName = "Transportation Events Project"

/**
 * Acts as a way for users to brose the site. Intended to always be displayed on the left
 * @returns {JSX.Element} A SideBar component.
 */
export default function SideBar() {
  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Paper elevation={10} sx={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: theme.palette.background.paper, padding: '0.5rem' }}>
        <Grid container rowSpacing={1} direction="column" justifyContent="center" alignItems="center">
          <Grid item container direction="column" justifyContent="center" alignItems="center">
            <Grid item>
            <Link to="/">
              <DirectionsCarFilledTwoToneIcon color="primary" style={{width: "7rem", height: "7rem"}} />
            </Link>
            </Grid>
            <Grid item>
            <Typography align="center" variant="h4" style={{fontSize: "1.2rem"}}>
                {websiteName}
            </Typography>
            </Grid>
          </Grid>

          {sideBarData.map((item, index) => (
            <Grid item key={index} sx={{ width: '100%' }}>
              <Link to={item.url}>
                <Button variant="contained" startIcon={<item.icon />} fullWidth>
                  {item.title}
                </Button>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Box style={{backgroundColor: "#808080", padding: "0.5rem"}}>
        <Typography align="center" variant="subtitle1" style={{fontSize: "0.8rem"}}>
            Made for the SCSU Fall 2023 Hackathon
        </Typography>
      </Box>
    </Box>
  );
}