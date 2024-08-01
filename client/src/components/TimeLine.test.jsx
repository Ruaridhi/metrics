import React from 'react';
import { render, screen } from '@testing-library/react';
import TimeLine from './TimeLine.jsx';
import { server } from './mocks/server.js';

describe('Timeline', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('initially renders timeline to show day metrics', async () => {
    render(<TimeLine />);

    await waitFor(() => {
      expect(screen.getByRole('combobox')).toHaveValue('day');
      expect(
        screen.getByAltText(/metrics chart showing data per day/i)
      ).toBeInTheDocument();
    });
  });

  it('on hour select renders timeline to show hour metrics', async () => {
    render(<TimeLine />);

    const user = userEvent.setup();

    user.selectOptions(screen.getByRole('combobox'), 'hour');

    await waitFor(() => {
      expect(screen.getByRole('option', { value: 'hour' }).selected).toBe(true);
      expect(screen.getByRole('combobox')).toHaveValue('hour');
      expect(
        screen.getByAltText(/metrics chart showing data per hour/i)
      ).toBeInTheDocument();
    });
  });

  it('on minute select renders timeline to show minute metrics', async () => {
    render(<TimeLine />);

    user.selectOptions(screen.getByRole('combobox'), 'minute');

    await waitFor(() => {
      expect(screen.getByRole('option', { value: 'minute' }).selected).toBe(
        true
      );
      expect(screen.getByRole('combobox')).toHaveValue('minute');
      expect(
        screen.getByAltText(/metrics chart showing data per minutes/i)
      ).toBeInTheDocument();
    });
  });

  it('shows an error', async () => {
    server.use(
      rest.get('http://localhost:5000/logs', (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ message: 'Invalid request' }));
      })
    );

    render(<TimeLine />);

    //waitFor keeps querying the DOM at regular intervals until the provided assertion
    //passes or a timeout is reached. It's a more powerful and flexible alternative to using setTimeout in tests.
    await waitFor(() => {
      expect(
        screen.getByText(/Error occurred: Invalid request/i)
      ).toBeInTheDocument();
    });
  });

  it('render loading', async () => {
    render(<TimeLine />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
      expect(
        screen.getByAltText(/metrics chart showing data per day/i)
      ).toBeInTheDocument();
    });
  });
});
