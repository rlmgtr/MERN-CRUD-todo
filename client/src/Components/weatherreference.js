import React, { useState, useEffect } from 'react';
import { wAPI_URL, wAPI_KEY } from '../APIs/WeatherAPI';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [day, setDay] = useState('');
  const [date, setDate] = useState('');
  const [icon, setIcon] = useState('');
  const [weatherInfo, setWeatherInfo] = useState('');
  const [location, setLocation] = useState({ lat: null, lon: null });

  // Function to get location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Get weather using location
  const getWeatherByLocation = async () => {
    try {
      const response = await axios.get(`${wAPI_URL}?lat=${location.lat}&lon=${location.lon}&appid=${wAPI_KEY}`);
      const weatherData = response.data;
      console.log("Weather Data:", weatherData);

      setDay(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
      setDate(new Date().toLocaleDateString());
      setIcon(`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`);
      setWeatherInfo(weatherData.weather[0].description);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Automatically get weather if location is available
  useEffect(() => {
    if (location.lat && location.lon) {
      getWeatherByLocation();
    }
  }, [location]);

  // Get weather by city name
  const readWeather = async () => {
    try {
      const response = await axios.get(`${wAPI_URL}?q=${city}&appid=${wAPI_KEY}`);
      const weatherData = response.data;
      console.log("Weather Data:", weatherData);

      setDay(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
      setDate(new Date().toLocaleDateString());
      setIcon(`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`);
      setWeatherInfo(weatherData.weather[0].description);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div>
      <div className='Weather'> 
        <div>Weather Here</div>

        <input 
          type='text' 
          name='city' 
          placeholder='Search City' 
          value={city} 
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={readWeather}>Get Weather</button>
        <button onClick={getLocation}>Get My Location's Weather</button>

        <ul>
          <li>{day}</li>
          <li>{date}</li>
          <li>{icon && <img src={icon} alt="Weather Icon" />}</li>
          <li>{weatherInfo}</li>
        </ul>
      </div>
    </div>
  );
}

export default Weather;
