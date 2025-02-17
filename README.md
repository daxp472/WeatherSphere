# WeatherSphere
================

Real-Time Weather Dashboard
---------------------------

WeatherSphere is an intuitive weather dashboard that provides real-time weather updates, a 7-day forecast, and dynamic UI elements based on live conditions. Built with React, OpenWeather API, and Chart.js, this app ensures a seamless and engaging user experience.

**Deployed at:** https://weather-sphere-1.netlify.app

## Features

* Live Weather Updates – Get real-time weather data for your current location.
* City Search – Check weather conditions for any city worldwide.
* 7-Day Forecast – View temperature trends with an interactive graph (Chart.js).
* Dynamic UI – Background and icons change based on weather conditions.
* Unit Conversion – Toggle between Celsius (°C) and Fahrenheit (°F).
* Responsive Design – Clean and modern UI powered by Tailwind CSS.

## Tech Stack

* Frontend: React, Tailwind CSS
* API: OpenWeather API
* Data Visualization: Chart.js

## Screenshots

(Coming Soon!)

Stay tuned for UI previews!

## Installation & Setup

Clone the repository and install dependencies:

```bash
# Clone the repo
git clone https://github.com/daxp472/weathersphere.git
cd weathersphere

# Install dependencies
npm install

# Create a .env file and add your API key
REACT_APP_WEATHER_API=your_api_key_here

# Start the development server
npm run dev
```

## API Usage

This app uses the OpenWeather API for fetching live weather data. Ensure you have an API key from OpenWeather and add it to your .env file as shown above.

Example API request:

https://api.openweathermap.org/data/2.5/weather?q=Ahmedabad&appid=YOUR_API_KEY

## Roadmap & Future Enhancements

* Hourly Forecasts – More detailed breakdowns of weather conditions.
* Weather Alerts – Notify users about severe weather conditions.
* Dark Mode – A sleek dark theme for better usability.

## Contributing

We welcome contributions! Feel free to fork, improve, and submit pull requests. Let's make WeatherSphere even better!

## License

This project is open-source under the MIT License.

Stay ahead of the weather with WeatherSphere!