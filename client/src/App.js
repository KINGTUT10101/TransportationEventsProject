import { Routes, Route } from "react-router-dom"
import Container from "@mui/material/Container"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Header from "./components/Header"
import Footer from "./components/Footer"

// Pages
import Home from "./pages/Home"
import Search from "./pages/Search"
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
        <Header />
        <Container sx={{ pb: '2rem', wordWrap: 'break-word' }} style={{flex: 1}}>
          <Routes>
            <Route path="/search/bylink" element={ <EventsByLink /> } />
            <Route path="/search/byperson" element={ <EventsByPerson /> } />
            <Route path="/search/bytime" element={ <EventsByTime /> } />
            <Route path="/search/forlink" element={ <SearchForLink /> } />
            <Route path="/search" element={ <Search /> } />
            <Route path="/" element={ <Home /> } />
            <Route path="*" element={ <NotFound /> } />
          </Routes>
        </Container>
        <Footer />
      </ThemeProvider>
      </div>
    </div>
  )
}

export default App