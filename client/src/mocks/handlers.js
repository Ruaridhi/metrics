import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:5000/logs', (req, res, ctx) => {
    const timePeriod = req.url.searchParams.get('period');
    let data = [];

    if (timePeriod === 'day') {
      data = [
        {
          label: 'error',
          data: [
            { date: '2024-05-31T22:00:00.000Z', count: 6 },
            { date: '2024-06-02T22:00:00.000Z', count: 1 },
            { date: '2024-06-19T22:00:00.000Z', count: 2 },
          ],
        },
        {
          label: 'log',
          data: [
            { date: '2024-05-31T22:00:00.000Z', count: 2 },
            { date: '2024-06-02T22:00:00.000Z', count: 2 },
            { date: '2024-06-04T22:00:00.000Z', count: 1 },
            { date: '2024-06-06T22:00:00.000Z', count: 1 },
            { date: '2024-06-07T22:00:00.000Z', count: 1 },
            { date: '2024-06-09T22:00:00.000Z', count: 2 },
            { date: '2024-06-19T22:00:00.000Z', count: 1 },
          ],
        },
        {
          label: 'warn',
          data: [
            { date: '2024-05-31T22:00:00.000Z', count: 2 },
            { date: '2024-06-04T22:00:00.000Z', count: 1 },
            { date: '2024-06-05T22:00:00.000Z', count: 1 },
            { date: '2024-06-19T22:00:00.000Z', count: 1 },
          ],
        },
      ];
    }

    return res(ctx.delay(500), ctx.json(data));
  }),

  rest.post('http://localhost:5000/logs', (req, res, ctx) => {
    const { id, timestamp, name, value } = req.body;

    if (id && timestamp && name && value) {
      return res(ctx.status(200));
    } else {
      return res(ctx.status(400), ctx.json({ message: 'Invalid log data' }));
    }
  }),
];
