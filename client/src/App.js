import { Routes, Route } from "react-router-dom"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Grid, Box } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';

// Components
import SideBar from "./components/SideBar";

// Pages
import Home from "./pages/Home"
import EventsByLink from "./pages/EventsByLink"
import EventsByPerson from "./pages/EventsByPerson"
import EventsByTime from "./pages/EventsByTime"
import SearchForLink from "./pages/SearchForLink"
import NotFound from "./pages/NotFound"

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

let style = {
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "space-between"
}

function App() {
  return (
    <div className="App">
      <div style={style}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Grid container spacing={0} style={{height: "100vh"}}>
          <Grid item xs={3} md={2}>
            <SideBar />
          </Grid>
          <Grid item xs={9} md={10}>
            <Box sx={{padding: "1rem"}}>
              <Routes>
                <Route path="/search/bylink" element={ <EventsByLink /> } />
                <Route path="/search/byperson" element={ <EventsByPerson /> } />
                <Route path="/search/bytime" element={ <EventsByTime /> } />
                <Route path="/search/forlink" element={ <SearchForLink /> } />
                <Route path="/" element={ <Home /> } />
                <Route path="*" element={ <NotFound /> } />
              </Routes>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      </div>
    </div>
  )
}

export default App