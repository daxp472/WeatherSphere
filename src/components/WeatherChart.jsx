import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function WeatherChart({ forecast, units }) {
  if (!forecast) return null;

  const dailyData = forecast.list.filter((item, index) => index % 8 === 0);
  
  const data = {
    labels: dailyData.map(item => 
      new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })
    ),
    datasets: [
      {
        label: `Temperature (${units === 'metric' ? '°C' : '°F'})`,
        data: dailyData.map(item => Math.round(item.main.temp)),
        borderColor: 'rgb(0, 102, 138)',
        backgroundColor: 'rgba(0, 102, 138, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '7-Day Temperature Forecast',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <Line options={options} data={data} />
    </div>
  );
}

export default WeatherChart;