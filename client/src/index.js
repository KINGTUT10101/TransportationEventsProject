import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

ReactDOM.render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </LocalizationProvider>,
  document.getElementById("root")
);