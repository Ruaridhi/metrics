import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useGetMetrics(timePeriod) {
  const [metrics, setMetrics] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMetrics = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/logs?period=${timePeriod}`
        );

        const data = response.data;

        const arrOfMetrics = [];

        for (const series of data) {
          const s = {
            label: series.label,
            data: series.data.map((entry) => {
              return { date: new Date(entry.date), count: entry.count };
            }),
          };
          arrOfMetrics.push(s);
        }
        setMetrics(arrOfMetrics);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getMetrics();
  }, [timePeriod]);

  return { metrics, loading, error };
}
