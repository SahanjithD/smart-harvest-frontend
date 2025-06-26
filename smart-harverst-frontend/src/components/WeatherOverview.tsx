import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/weatherService';
import { weatherCodes } from '../types/weather';
import type { WeatherData } from '../types/weather';

const WeatherOverview: React.FC = () => {
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
    const interval = setInterval(loadWeatherData, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        {error || 'Unable to load weather data'}
      </div>
    );
  }

  const getWeatherIcon = (code: number) => {
    return weatherCodes[code]?.icon || '❓';
  };

  const getWeatherLabel = (code: number) => {
    return weatherCodes[code]?.label || 'Unknown';
  };

  return (
    <div className="space-y-4">
      {/* Current Weather */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Current Conditions</h3>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-4xl mr-3">{getWeatherIcon(weatherData.current.weatherCode)}</span>
            <div>
              <p className="text-2xl font-bold">{weatherData.current.temperature}°C</p>
              <p className="text-gray-600">{getWeatherLabel(weatherData.current.weatherCode)}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Humidity: {weatherData.current.relativeHumidity}%</p>
            <p className="text-sm text-gray-600">Wind: {weatherData.current.windSpeed} km/h</p>
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-3">5-Day Forecast</h3>
        <div className="grid grid-cols-5 gap-2">
          {weatherData.daily.time.slice(0, 5).map((date, index) => (
            <div key={date} className="text-center p-2">
              <p className="text-sm font-medium">
                {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <p className="text-2xl my-1">{getWeatherIcon(weatherData.daily.weatherCode[index])}</p>
              <p className="text-sm font-medium">
                {Math.round(weatherData.daily.temperature2mMax[index])}°
                <span className="text-gray-500 mx-1">/</span>
                {Math.round(weatherData.daily.temperature2mMin[index])}°
              </p>
              <p className="text-xs text-gray-500">
                {weatherData.daily.precipitationProbabilityMax[index]}% rain
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Farm Impact Alert */}
      {weatherData.daily.precipitationProbabilityMax[0] > 70 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              ⚠️
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Weather Alert</h3>
              <p className="text-sm text-yellow-700 mt-1">
                High probability of rain today. Consider adjusting watering schedules and outdoor tasks.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherOverview;
