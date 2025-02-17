import React from 'react';

function Forecast({ forecast, units }) {
  if (!forecast) return null;

  const dailyData = forecast.list.filter((item, index) => index % 8 === 0);

  return (
    <div className="col-span-full bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-weather-primary mb-4">7-Day Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {dailyData.map((day) => (
          <div key={day.dt} className="text-center p-4 border rounded-lg">
            <p className="font-semibold">
              {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="mx-auto w-12 h-12"
            />
            <p className="text-lg font-bold">
              {Math.round(day.main.temp)}°{units === 'metric' ? 'C' : 'F'}
            </p>
            <p className="text-sm text-gray-500 capitalize">
              {day.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;