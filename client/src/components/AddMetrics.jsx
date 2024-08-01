import { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import axios from 'axios';

export default function AddMetric() {
  const [metric, setMetric] = useState({
    id: '',
    timestamp: '',
    name: '',
    value: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (metric.id) {
      const sendLogs = async () => {
        try {
          await axios.post('http://localhost:5000/logs', {
            id: metric.id,
            timestamp: metric.timestamp,
            name: metric.name,
            value: metric.value,
          });
          setError('');
        } catch (e) {
          setError(e);
        }
      };
      sendLogs();
    }
  }, [metric.id]); // Depend only on metric.id

  const randomDate = () => {
    // Generates a random date and date between 30 July 2024 and 31 July 2024
    const month = 7;
    const year = 2024;
    const date = Math.random() < 0.5 ? 30 : 31; // Randomly pick between 30 and 31
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);

    const randomDate = new Date(year, month - 1, date, hours, minutes);

    const formattedDate =
      randomDate.toISOString().slice(0, 19).replace('T', ' ') + '.000 +0200';
    return formattedDate;
  };

  const handleSendMetric = (name) => async () => {
    setMetric({
      id: v4(),
      timestamp: randomDate(),
      name: name,
      value: `${name} msg`,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-blue-600">
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md w-full max-w-4xl mx-4 md:mx-8 lg:mx-16">
        <h1 className="mb-10 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Send Test Logs
        </h1>
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={handleSendMetric('error')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Send Test Error Log
          </button>
          <button
            onClick={handleSendMetric('log')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Send Test Log
          </button>
          <button
            onClick={handleSendMetric('warning')}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
          >
            Send Test Warning Log
          </button>
        </div>
        {error && (
          <div className="mt-4 text-red-600">Error occurred: {error}</div>
        )}
      </div>
    </div>
  );
}
