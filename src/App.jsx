import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WiDaySunny, WiRain, WiCloudy, WiSnow } from 'react-icons/wi';
import WeatherChart from './components/WeatherChart';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import Loading from './components/Loading';

const OPENWEATHER_API_KEY = '2694fe397b12c8f7379a520f481924af';
const WEATHERSTACK_API_KEY = 'dfe4eedca9ec24fba9d6e5412e95c7f0';
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHERSTACK_BASE_URL = 'https://api.weatherstack.com';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState('metric');
  const [city, setCity] = useState('');
  const [usingFallbackAPI, setUsingFallbackAPI] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        error => {
          setError('Location access denied. Please search for a city.');
          setLoading(false);
        }
      );
    }
  }, []);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);
      
      try {
        // Try OpenWeather API first
        const [weatherRes, forecastRes] = await Promise.all([
          axios.get(`${OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${OPENWEATHER_API_KEY}`),
          axios.get(`${OPENWEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${OPENWEATHER_API_KEY}`)
        ]);
        
        const weatherData = weatherRes.data;
        const forecastData = forecastRes.data;
        
        // Ensure no Symbol objects in the data
        setWeather(JSON.parse(JSON.stringify(weatherData)));
        setForecast(JSON.parse(JSON.stringify(forecastData)));
        setUsingFallbackAPI(false);
      } catch (openWeatherError) {
        // If OpenWeather fails, try WeatherStack API
        const weatherstackRes = await axios.get(
          `${WEATHERSTACK_BASE_URL}/current?access_key=${WEATHERSTACK_API_KEY}&query=${lat},${lon}&units=${units === 'metric' ? 'm' : 'f'}`
        );
        
        // Transform WeatherStack data and ensure no Symbol objects
        const transformedData = JSON.parse(
          JSON.stringify(transformWeatherStackData(weatherstackRes.data))
        );
        setWeather(transformedData);
        setForecast(null); // WeatherStack free tier doesn't include forecast
        setUsingFallbackAPI(true);
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please try again later.');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const transformWeatherStackData = (weatherstackData) => {
    return {
      name: weatherstackData.location.name,
      sys: {
        country: weatherstackData.location.country
      },
      main: {
        temp: weatherstackData.current.temperature,
        humidity: weatherstackData.current.humidity
      },
      wind: {
        speed: weatherstackData.current.wind_speed
      },
      weather: [{
        description: weatherstackData.current.weather_descriptions[0],
        icon: getWeatherStackIcon(weatherstackData.current.weather_code)
      }],
      coord: {
        lat: weatherstackData.location.lat,
        lon: weatherstackData.location.lon
      }
    };
  };

  const getWeatherStackIcon = (code) => {
    const codeMap = {
      113: '01d', // Clear/Sunny
      116: '02d', // Partly cloudy
      119: '03d', // Cloudy
      122: '04d', // Overcast
      176: '09d', // Light rain
      200: '11d', // Thundery
      248: '50d', // Fog
    };
    return codeMap[code] || '01d';
  };

  const searchCity = async (searchTerm) => {
    try {
      setLoading(true);
      setError(null);

      try {
        // Try OpenWeather API first
        const geoRes = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=${OPENWEATHER_API_KEY}`
        );
        
        if (geoRes.data.length > 0) {
          const { lat, lon } = geoRes.data[0];
          await fetchWeatherByCoords(lat, lon);
          setCity(searchTerm);
        } else {
          throw new Error('City not found in OpenWeather');
        }
      } catch (openWeatherError) {
        // If OpenWeather fails, try WeatherStack API
        const weatherstackRes = await axios.get(
          `${WEATHERSTACK_BASE_URL}/current?access_key=${WEATHERSTACK_API_KEY}&query=${searchTerm}`
        );
        
        if (weatherstackRes.data.success === false) {
          throw new Error('City not found in WeatherStack');
        }
        
        const transformedData = JSON.parse(
          JSON.stringify(transformWeatherStackData(weatherstackRes.data))
        );
        setWeather(transformedData);
        setForecast(null);
        setCity(searchTerm);
        setUsingFallbackAPI(true);
      }
    } catch (err) {
      setError('City not found. Please try a different location.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnits = () => {
    setUnits(prev => prev === 'metric' ? 'imperial' : 'metric');
    if (weather) {
      fetchWeatherByCoords(weather.coord.lat, weather.coord.lon);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-weather-primary">
            WeatherSphere
          </h1>
          <p className="mt-2 text-gray-600">
            Your Real-Time Weather Dashboard
          </p>
          {usingFallbackAPI && (
            <p className="mt-2 text-sm text-orange-500">
              Using backup weather service. Some features may be limited.
            </p>
          )}
        </div>

        <SearchBar onSearch={searchCity} />
        
        <button
          onClick={toggleUnits}
          className="mb-4 px-4 py-2 bg-weather-secondary text-white rounded hover:bg-weather-primary transition-colors"
        >
          Switch to {units === 'metric' ? '°F' : '°C'}
        </button>

        {error ? (
          <div className="text-red-500 text-center p-4">{error}</div>
        ) : (
          weather && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CurrentWeather weather={weather} units={units} />
              {!usingFallbackAPI && <WeatherChart forecast={forecast} units={units} />}
              {!usingFallbackAPI && <Forecast forecast={forecast} units={units} />}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;