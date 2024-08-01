import express from 'express';
import cors from 'cors';
import db from './db.js';
import {
  queryLogsPerHour,
  queryLogsPerMinute,
  queryLogsPerDay,
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
    const query =
      'INSERT into logs (id, timestamp, name, value) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [id, timestamp, name, value];

    const result = await db.query(query, values);

    // result.rows[0] contains the newly inserted row
    return res.status(201).json(result.rows[0]);
  } catch (e) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const server = app.listen(5000, () => {
  console.log('metrics app running');
});

export default { app, server };
