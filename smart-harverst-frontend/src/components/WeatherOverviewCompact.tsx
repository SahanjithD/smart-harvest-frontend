import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/weatherService';
import { weatherCodes } from '../types/weather';
import type { WeatherData } from '../types/weather';

const WeatherOverviewCompact: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        const data = await fetchWeatherData();
        setWeatherData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load weather data');
        setLoading(false);
      }
    };

    loadWeatherData();
    // Refresh weather data every 30 minutes
    const weatherInterval = setInterval(loadWeatherData, 30 * 60 * 1000);
    
    return () => {
      clearInterval(weatherInterval);
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
        <div className="flex items-center justify-center h-16">
          <div className="w-8 h-8 border-2 border-emerald-500 border-dashed rounded-full animate-spin mr-2"></div>
          <p className="text-emerald-700 text-sm">Loading weather...</p>
        </div>
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="text-center text-red-500">
          <p>Could not load weather data</p>
        </div>
      </div>
    );
  }

  // Get current weather code description
  const currentWeatherCode = weatherData.current.weatherCode;
  const weatherDescription = weatherCodes[currentWeatherCode]?.label || 'Unknown';
  const weatherIcon = weatherCodes[currentWeatherCode]?.icon || '🌡️';

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-5xl mr-3">
            {weatherIcon}
          </div>
          <div>
            <p className="text-xl font-semibold">{weatherData.current.temperature}°C</p>
            <p className="text-sm text-gray-600">{weatherDescription}</p>
          </div>
        </div>
        <div className="text-right text-sm text-gray-600">
          <p>Humidity: {weatherData.current.relativeHumidity}%</p>
          <p>Wind: {weatherData.current.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherOverviewCompact;
