import React, { useMemo, useState } from 'react';
import useGetMetrics from '../hooks/useGetMetrics';
import Loading from './Loading';
import Error from './Error';
import { Chart } from 'react-charts';

const MetricsChart = () => {
  const [timePeriod, setTimePeriod] = useState('day');

  const primaryAxis = useMemo(
    () => ({
      getValue: (datum) => datum.date,
    }),
    []
  );

  const secondaryAxes = useMemo(
    () => [
      {
        getValue: (datum) => datum.count,
        min: 0,
      },
    ],
    []
  );

  const { metrics, loading, error } = useGetMetrics(timePeriod);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error msg={error.message} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-blue-600">
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md w-full max-w-4xl mx-4 md:mx-8 lg:mx-16">
        <h1 class="mb-10 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Metrics logs per
          <span className="text-blue-600 dark:text-blue-500">
            {' '}
            {timePeriod}
          </span>
        </h1>
        <div className="flex items-center mb-">
          <label className="block mb-2 pr-4 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
            Choose time period:
          </label>
          <select
            className="max-w-sm mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {
              setTimePeriod(e.target.value);
            }}
            name="times"
            defaultValue="day"
            id="time-dd"
          >
            <option value="minute">Minute</option>
            <option value="hour">Hour</option>
            <option value="day">Day</option>
          </select>
        </div>

        {metrics.length > 0 ? (
          <div className="w-[600px] h-[300px] mt-4">
            <Chart
              id="metrics-chart"
              options={{ data: metrics, primaryAxis, secondaryAxes }}
              config={{ responsive: true }}
              alt={`Metrics chart showing data per ${' '} ${timePeriod}`}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MetricsChart;
