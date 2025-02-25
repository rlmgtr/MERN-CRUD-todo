import React, { useEffect, useState } from 'react';
import { wAPI_URL, wAPI_KEY } from '../APIs/WeatherAPI';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [displayCity, setDisplayCity] = useState('Manila'); // New state for display
  const [day, setDay] = useState('');
  const [date, setDate] = useState('');
  const [icon, setIcon] = useState('');
  const [weatherInfo, setWeatherInfo] = useState('');
  const [temperature, setTemperature] = useState('');
  const [location, setLocation] = useState('');

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      alert('Geolocation Feature is not supported by your browser.');
    }
  };

  const getWeatherByLocation = async () => {
    try {
      const response = await axios.get(
        `${wAPI_URL}?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${wAPI_KEY}`
      );
      const weatherData = response.data;
      console.log('Weather Data by Location:', weatherData);

      setDay(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
      setDate(new Date().toLocaleDateString());
      setIcon(
        `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
      );
      setWeatherInfo(weatherData.weather[0].description);
      setTemperature(`${weatherData.main.temp}°C`);
      setDisplayCity(weatherData.name); // Update city name
    } catch (error) {
      console.error('Error fetching weather data by location:', error);
    }
  };

  const getWeatherByCity = async (cityName) => {
    try {
      const response = await axios.get(
        `${wAPI_URL}?q=${cityName}&units=metric&appid=${wAPI_KEY}`
      );
      const weatherData = response.data;
      console.log('Weather Data by City:', weatherData);

      setDay(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
      setDate(new Date().toLocaleDateString());
      setIcon(
        `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
      );
      setWeatherInfo(weatherData.weather[0].description);
      setTemperature(`${weatherData.main.temp}°C`);
      setDisplayCity(weatherData.name); // Update city name
    } catch (error) {
      console.error('Error fetching weather data by city:', error);
      alert('City not found or API issue. Please try again.');
    }
  };

  const readWeather = async () => {
    if (city.trim() === '') {
      alert('Please enter a city name.');
      return;
    }
    await getWeatherByCity(city);
  };

  // On initial load, show Metro Manila weather
  useEffect(() => {
    getWeatherByCity('Manila');
  }, []);

  // Fetch weather by location if location changes
  useEffect(() => {
    if (location.lat && location.lon) {
      getWeatherByLocation();
    }
  }, [location]);

  return (
    <div>
      <div className="Weather">
        <h2>Weather App</h2>
        <p>Today's Weather in: <strong>{displayCity}</strong></p>

        <input
          type="text"
          name="city"
          placeholder="Search City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={readWeather}>Get Weather</button>
        <button onClick={getLocation}>Get Current Location's Weather</button>

        <ul>
          <li>{day}</li>
          <li>{date}</li>
          <li>{icon && <img src={icon} alt="Weather Icon" />}</li>
          <li>{weatherInfo}</li>
          <li>{temperature}</li>
        </ul>
      </div>
    </div>
  );
};

export default Weather;
