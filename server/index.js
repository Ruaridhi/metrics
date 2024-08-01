import express from 'express';
import cors from 'cors';
import db from './db.js';
import {
  queryLogsPerHour,
  queryLogsPerMinute,
  queryLogsPerDay,
  addLog,
} from './queries.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/logs', async (req, res) => {
  try {
    let results = [];
    if (req.query.period === 'day') {
      results = await queryLogsPerDay();
    } else if (req.query.period === 'hour') {
      results = await queryLogsPerHour();
    } else if (req.query.period === 'minute') {
      results = await queryLogsPerMinute();
    } else {
      return res.status(400).send('query not valid');
    }
    const series = [];

    for (const row of results.rows) {
      const index = series.findIndex((s) => s.label === row.name);

      if (index === -1) {
        series.push({
          label: row.name,
          data: [{ date: row.date, count: Number(row.count) }],
        });
      } else {
        series[index].data.push({ date: row.date, count: Number(row.count) });
      }
    }

    return res.json(series);
  } catch (e) {
    return res.status(500).send('Internal Server Error');
  }
});

app.post('/logs', async (req, res) => {
  const { id, timestamp, name, value } = req.body;

  if (!id || !timestamp || !name || !value) {
    return res.status(400).send('Bad Request: Missing required fields');
  }
  try {
    const result = await addLog();

    // result.rows[0] contains the newly inserted row
    return res.status(201).json(result.rows[0]);
  } catch (e) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

let server;
const startServer = (port = 5000) => {
  server = app.listen(port, () => {
    console.log(`metrics app running on port ${port}`);
  });
  return server;
};

const stopServer = () => {
  if (server) {
    server.close();
  }
};

export { app, startServer, stopServer };
