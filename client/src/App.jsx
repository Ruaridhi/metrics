import { React } from 'react';
import './App.css';
import TimeLine from './components/TimeLine';
import AddMetric from './components/AddMetrics';

function App() {
  return (
    <div className="App">
      <AddMetric />
      <TimeLine />
    </div>
  );
}

export default App;
