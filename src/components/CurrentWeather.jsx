import React from 'react';
import { WiThermometer, WiHumidity, WiStrongWind } from 'react-icons/wi';

function CurrentWeather({ weather, units }) {
  const temp = Math.round(weather.main.temp);
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const windSpeed = units === 'metric' ? 
    `${weather.wind.speed} m/s` : 
    `${Math.round(weather.wind.speed)} mph`;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-weather-primary mb-4">
        {weather.name}, {weather.sys.country}
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <WiThermometer className="text-4xl text-weather-secondary" />
          <div>
            <p className="text-3xl font-bold">{temp}{tempUnit}</p>
            <p className="text-gray-500">Temperature</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <WiHumidity className="text-4xl text-weather-secondary" />
          <div>
            <p className="text-3xl font-bold">{weather.main.humidity}%</p>
            <p className="text-gray-500">Humidity</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <WiStrongWind className="text-4xl text-weather-secondary" />
          <div>
            <p className="text-3xl font-bold">{windSpeed}</p>
            <p className="text-gray-500">Wind Speed</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <img 
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="w-16 h-16"
          />
          <p className="capitalize">{weather.weather[0].description}</p>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;