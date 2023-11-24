import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import query from './queries.js';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 5000;
const app = express();
let corsOptions = {
  origin: `http://localhost:${PORT}`
};

// Replace __dirname with a similar variable using the new ES Modules syntax
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors(corsOptions));
app.use (express.json ())
app.use(express.urlencoded({ extended: true }));
dotenv.config({ path: './config/config.env' });
// app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// A simple test to make sure the backend is working
app.get('/api/test', (req, res) => {
  res.send('Server running');
});

//Queries and login
app.use('/api', query);

// Serves the static frontend content
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
