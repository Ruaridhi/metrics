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

  const [error, setError] = useState(false);

  useEffect(() => {
    if (metric.id) {
      const sendLogs = async () => {
        await postLogs();
      };
      sendLogs();
    }
  }, [metric]);

  const postLogs = async () => {
    try {
      await axios.post('http://localhost:5000/logs', {
        id: metric.id,
        timestamp: metric.timestamp,
        name: metric.name,
        value: metric.value,
      });
      setError(false);
    } catch (e) {
      setError(e);
    }
  };

  function randomDate() {
    // forces month to be July
    let month = 7;
    // forces month to be 2024
    let year = 2024;
    //generates random date between 1-31
    let date = Math.floor(Math.random() * (31 - 30 + 1)) + 30;
    // generates random hour between 0-23
    let hours = Math.floor(Math.random() * 24);
    // generates random minute between 0-59
    let minutes = Math.floor(Math.random() * 60);

    let randomDate = new Date(year, month - 1, date, hours, minutes);

    let formattedDate =
      randomDate.toISOString().slice(0, 19).replace('T', ' ') + '.000 +0200';

    return formattedDate;
  }

  const handleSendErrorLog = async () => {
    setMetric({
      id: v4(),
      timestamp: randomDate(),
      name: 'error',
      value: 'error msg',
    });
  };

  const handleSendLog = async () => {
    setMetric({
      id: v4(),
      timestamp: randomDate(),
      name: 'log',
      value: 'log msg',
    });
  };

  const handleSendWarningLog = async () => {
    setMetric({
      id: v4(),
      timestamp: randomDate(),
      name: 'warning',
      value: 'warning msg',
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
            onClick={handleSendErrorLog}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Send Test Error Log
          </button>
          <button
            onClick={handleSendLog}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Send Test Log
          </button>
          <button
            onClick={handleSendWarningLog}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
          >
            Send Test Warning Log
          </button>
        </div>
        {error && (
          <div className="mt-4 text-red-600">
            Error occurred: {error.message}
          </div>
        )}
      </div>
    </div>
  );
}
