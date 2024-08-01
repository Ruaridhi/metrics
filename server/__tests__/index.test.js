import request from 'supertest';
import app, { server } from '../index.js';
import * as queries from '../queries.js';

jest.mock('../queries');

afterAll((done) => {
  server.close(done);
});

describe('GET /logs', () => {
  it('should test that if param equals day then results are grouped by day', async () => {
    const mockResults = {
      rows: [
        { name: 'log', date: '2024-06-01', count: '10' },
        { name: 'error', date: '2024-06-01', count: '5' },
        { name: 'warn', date: '2024-06-01', count: '10' },
        { name: 'log', date: '2024-06-02', count: '10' },
        { name: 'error', date: '2024-06-02', count: '5' },
        { name: 'warn', date: '2024-06-02', count: '10' },
        { name: 'warn', date: '2024-06-03', count: '10' },
      ],
    };

    queries.queryLogsPerDay.mockResolvedValue(mockResults);

    const res = await request(app).get('/logs?period=day');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        label: 'log',
        data: [
          { date: '2024-06-01', count: 10 },
          { date: '2024-06-02', count: 10 },
        ],
      },
      {
        label: 'error',
        data: [
          { date: '2024-06-01', count: 5 },
          { date: '2024-06-02', count: 5 },
        ],
      },
      {
        label: 'warn',
        data: [
          { date: '2024-06-01', count: 10 },
          { date: '2024-06-02', count: 10 },
          { date: '2024-06-03', count: 10 },
        ],
      },
    ]);
  });

  it('should test that if param equals hour then results are grouped by hour', async () => {
    const mockResults = {
      rows: [
        {
          name: 'log',
          date: 'Sat Jun 01 2024 10:00:00 GMT+0200 (Central European Summer Time)',
          count: '1',
        },
        {
          name: 'error',
          date: 'Sat Jun 01 2024 12:00:00 GMT+0200 (Central European Summer Time)',
          count: '1',
        },
        {
          name: 'warn',
          date: 'Mon Jun 03 2024 11:00:00 GMT+0200 (Central European Summer Time)',
          count: '1',
        },
        {
          name: 'log',
          date: 'Tue Jun 04 2024 14:00:00 GMT+0200 (Central European Summer Time)',
          count: '1',
        },
      ],
    };

    queries.queryLogsPerHour.mockResolvedValue(mockResults);

    const res = await request(app).get('/logs?period=hour');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        label: 'log',
        data: [
          {
            date: 'Sat Jun 01 2024 10:00:00 GMT+0200 (Central European Summer Time)',
            count: 1,
          },
          {
            date: 'Tue Jun 04 2024 14:00:00 GMT+0200 (Central European Summer Time)',
            count: 1,
          },
        ],
      },
      {
        label: 'error',
        data: [
          {
            date: 'Sat Jun 01 2024 12:00:00 GMT+0200 (Central European Summer Time)',
            count: 1,
          },
        ],
      },
      {
        label: 'warn',
        data: [
          {
            date: 'Mon Jun 03 2024 11:00:00 GMT+0200 (Central European Summer Time)',
            count: 1,
          },
        ],
      },
    ]);
  });

  it('should test that if param equals minute then results are grouped by minute', async () => {
    const mockResults = {
      rows: [
        {
          name: 'log',
          date: 'Sat Jun 01 2024 10:00:00 GMT+0200 (Central European Summer Time)',
          count: '1',
        },
        {
          name: 'error',
          date: 'Sat Jun 01 2024 12:00:00 GMT+0200 (Central European Summer Time)',
          count: '1',
        },
        {
          name: 'error',
          date: 'Sat Jun 01 2024 12:02:00 GMT+0200 (Central European Summer Time)',
          count: '1',
        },
        {
          name: 'warn',
          date: 'Mon Jun 03 2024 11:00:00 GMT+0200 (Central European Summer Time)',
          count: '1',
        },
        {
          name: 'log',
          date: 'Tue Jun 04 2024 14:00:00 GMT+0200 (Central European Summer Time)',
          count: '1',
        },
        {
          name: 'log',
          date: 'Tue Jun 04 2024 14:01:00 GMT+0200 (Central European Summer Time)',
          count: '1',
        },
      ],
    };

    queries.queryLogsPerMinute.mockResolvedValue(mockResults);

    const res = await request(app).get('/logs?period=minute');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        label: 'log',
        data: [
          {
            date: 'Sat Jun 01 2024 10:00:00 GMT+0200 (Central European Summer Time)',
            count: 1,
          },
          {
            date: 'Tue Jun 04 2024 14:00:00 GMT+0200 (Central European Summer Time)',
            count: 1,
          },
          {
            date: 'Tue Jun 04 2024 14:01:00 GMT+0200 (Central European Summer Time)',
            count: 1,
          },
        ],
      },
      {
        label: 'error',
        data: [
          {
            date: 'Sat Jun 01 2024 12:00:00 GMT+0200 (Central European Summer Time)',
            count: 1,
          },
          {
            date: 'Sat Jun 01 2024 12:02:00 GMT+0200 (Central European Summer Time)',
            count: 1,
          },
        ],
      },
      {
        label: 'warn',
        data: [
          {
            date: 'Mon Jun 03 2024 11:00:00 GMT+0200 (Central European Summer Time)',
            count: 1,
          },
        ],
      },
    ]);
  });

  it('should return 400 when given invalid query', async () => {
    const res = await request(app).get('/logs?period=invalid');
    expect(res.status).toBe(400);
    expect(res.text).toBe('query not valid');
  });

  it('should handle internal server errors', async () => {
    queries.queryLogsPerDay.mockRejectedValueOnce(new Error('network error'));

    const res = await request(app).get('/logs?period=day');
    expect(res.status).toBe(500);
    expect(res.text).toBe('Internal Server Error');
  });
});
