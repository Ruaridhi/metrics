import request from 'supertest';
import { app, startServer, stopServer } from '../index.js';
import * as queries from '../queries.js';

jest.mock('../queries', () => ({
  addLog: jest.fn(),
  queryLogsPerDay: jest.fn(),
  queryLogsPerHour: jest.fn(),
  queryLogsPerMinute: jest.fn(),
}));

let testServer;

beforeAll(() => {
  testServer = startServer(5001); // Use a different port to avoid conflicts
});

afterAll(() => {
  stopServer();
});

describe('Metrics controller', () => {
  describe('GET /logs', () => {
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

  describe('POST /logs', () => {
    it('should add a log to the database', async () => {
      const mockLog = {
        id: '12345',
        timestamp: '2024-07-30 10:30:00.000 +0200',
        name: 'log',
        value: 'Test log message',
      };

      queries.addLog.mockResolvedValue({
        rows: [
          {
            id: '12345',
            timestamp: '2024-07-30 10:30:00.000 +0200',
            name: 'log',
            value: 'Test log message',
          },
        ],
      });

      const res = await request(app)
        .post('/logs')
        .send(mockLog)
        .set('Accept', 'application/json');

      expect(res.status).toBe(201);
    });
  });
});
