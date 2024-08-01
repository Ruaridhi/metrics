// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import { server } from './server'; // Import the MSW server
// import { rest } from 'msw';
// import AddMetric from './AddMetric';

// beforeAll(() => server.listen());

// afterEach(() => server.resetHandlers());

// afterAll(() => server.close());

// test('renders AddMetric component and sends error log', async () => {
//   render(<AddMetric />);

//   const errorButton = screen.getByText('Send Test Error Log');
//   fireEvent.click(errorButton);

//   await waitFor(() => {
//     expect(screen.queryByText(/Error occurred:/)).toBeNull();
//   });
// });

// test('handles error on sending log', async () => {
//   server.use(
//     rest.post('http://localhost:5000/logs', (req, res, ctx) => {
//       return res(
//         ctx.status(500),
//         ctx.json({ message: 'Internal Server Error' })
//       );
//     })
//   );

//   render(<AddMetric />);

//   const errorButton = screen.getByText('Send Test Error Log');
//   fireEvent.click(errorButton);

//   await waitFor(() => {
//     expect(screen.getByText(/Error occurred:/)).toBeInTheDocument();
//   });
// });

// test('renders AddMetric component and sends warning log', async () => {
//   render(<AddMetric />);

//   const warningButton = screen.getByText('Send Test Warning Log');
//   fireEvent.click(warningButton);

//   await waitFor(() => {
//     expect(screen.queryByText(/Error occurred:/)).toBeNull();
//   });
// });

// test('renders AddMetric component and sends log', async () => {
//   render(<AddMetric />);

//   const logButton = screen.getByText('Send Test Log');
//   fireEvent.click(logButton);

//   await waitFor(() => {
//     expect(screen.queryByText(/Error occurred:/)).toBeNull();
//   });
// });
