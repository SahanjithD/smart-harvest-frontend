import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/weatherService';
import { weatherCodes } from '../types/weather';
import type { WeatherData } from '../types/weather';

const WeatherOverview: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

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
    
    // Update current time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60 * 1000);
    
    return () => {
      clearInterval(weatherInterval);
      clearInterval(timeInterval);
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-sm rounded-xl p-8 animate-pulse">
        <div className="flex flex-col items-center justify-center h-40">
          <div className="w-16 h-16 border-4 border-emerald-500 border-dashed rounded-full animate-spin mb-4"></div>
          <p className="text-emerald-700 font-medium">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-red-800">Weather Data Unavailable</h3>
            <p className="mt-2 text-red-700">{error || 'Unable to load weather data for your farm'}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getWeatherIcon = (code: number, large = false) => {
    const iconClass = large ? 'text-5xl md:text-6xl' : 'text-2xl';
    return <span className={iconClass}>{weatherCodes[code]?.icon || '❓'}</span>;
  };

  const getWeatherLabel = (code: number) => {
    return weatherCodes[code]?.label || 'Unknown';
  };
  
  const getWeatherBackground = (code: number, time: string) => {
    const hour = new Date(time).getHours();
    const isNight = hour < 6 || hour >= 19;
    
    // Weather condition backgrounds
    switch(true) {
      case [0, 1].includes(code): // Clear
        return isNight 
          ? 'from-indigo-900 via-blue-900 to-indigo-800' // Clear night
          : 'from-blue-400 via-sky-500 to-blue-500'; // Clear day
      
      case [2, 3].includes(code): // Partly cloudy/Overcast
        return isNight 
          ? 'from-gray-800 via-gray-900 to-slate-900' // Cloudy night
          : 'from-blue-300 via-sky-400 to-gray-400'; // Cloudy day
      
      case [45, 48].includes(code): // Fog
        return 'from-gray-300 via-gray-400 to-gray-500';
      
      case code >= 51 && code <= 65: // Rain
        return 'from-gray-600 via-slate-700 to-gray-800';
      
      case code >= 71 && code <= 77: // Snow
        return 'from-slate-100 via-slate-200 to-gray-300';
      
      case code >= 80 && code <= 82: // Rain showers
        return 'from-blue-700 via-blue-600 to-slate-700';
      
      case code >= 95: // Thunderstorm
        return 'from-gray-900 via-slate-800 to-gray-900';
      
      default:
        return 'from-blue-400 via-sky-500 to-blue-500';
    }
  };
  
  const formatTemperature = (temp: number) => {
    return `${Math.round(temp)}°C`;
  };
  
  const formatWindSpeed = (speed: number) => {
    if (speed < 20) return 'Light breeze';
    if (speed < 40) return 'Moderate wind';
    return 'Strong wind';
  };
  
  const formatPrecipitation = (probability: number) => {
    if (probability < 30) return 'Low chance';
    if (probability < 70) return 'Moderate chance';
    return 'High chance';
  };
  
  const getTimeOfDay = () => {
    const hour = currentTime.getHours();
    if (hour < 6) return 'early morning';
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    if (hour < 21) return 'evening';
    return 'night';
  };
  
  const getFarmingTip = (weatherCode: number, precipProb: number, temp: number) => {
    if (precipProb > 70) {
      return "Consider postponing outdoor tasks and monitoring drainage systems.";
    }
    
    if (temp > 30) {
      return "High temperatures expected. Ensure crops are adequately watered.";
    }
    
    if (temp < 5) {
      return "Cold temperatures expected. Consider protecting sensitive crops.";
    }
    
    if ([45, 48].includes(weatherCode)) {
      return "Foggy conditions may affect visibility. Plan indoor tasks if possible.";
    }
    
    if (weatherCode >= 95) {
      return "Thunderstorms expected. Secure equipment and postpone outdoor work.";
    }
    
    return "Weather conditions look favorable for standard farming operations.";
  };

  return (
    <div className="space-y-6">
      {/* Current Weather - Modern Card */}
      <div className={`bg-gradient-to-r ${getWeatherBackground(weatherData.current.weatherCode, weatherData.current.time)} text-white rounded-xl overflow-hidden shadow-lg transition-all duration-500`}>
        <div className="flex flex-col md:flex-row p-6">
          {/* Current conditions */}
          <div className="flex-1 mb-4 md:mb-0">
            <div className="flex items-start">
              <div className="mr-4">
                {getWeatherIcon(weatherData.current.weatherCode, true)}
              </div>
              <div>
                <h3 className="text-xl font-semibold opacity-90">Good {getTimeOfDay()}</h3>
                <div className="mt-1 flex items-baseline">
                  <span className="text-4xl font-bold">{formatTemperature(weatherData.current.temperature)}</span>
                  <span className="ml-2 text-lg opacity-90">{getWeatherLabel(weatherData.current.weatherCode)}</span>
                </div>
                <p className="mt-1 text-sm opacity-75">Last updated: {new Date(weatherData.current.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-xs opacity-75">Humidity</p>
                <p className="text-lg font-semibold">{weatherData.current.relativeHumidity}%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-xs opacity-75">Wind</p>
                <p className="text-lg font-semibold">{weatherData.current.windSpeed} km/h</p>
                <p className="text-xs">{formatWindSpeed(weatherData.current.windSpeed)}</p>
              </div>
            </div>
          </div>
          
          {/* Farming tip */}
          <div className="md:ml-6 md:border-l md:border-white/20 md:pl-6 flex-1">
            <h3 className="text-lg font-semibold opacity-90">Farm Advisor</h3>
            <p className="mt-2 opacity-80">
              {getFarmingTip(
                weatherData.current.weatherCode, 
                weatherData.daily.precipitationProbabilityMax[0], 
                weatherData.current.temperature
              )}
            </p>
            
            <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex justify-between items-center">
                <p className="text-sm opacity-75">Precipitation</p>
                <p className="text-sm font-medium">{weatherData.daily.precipitationProbabilityMax[0]}%</p>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${weatherData.daily.precipitationProbabilityMax[0]}%` }}
                ></div>
              </div>
              <p className="mt-1 text-xs opacity-75">
                {formatPrecipitation(weatherData.daily.precipitationProbabilityMax[0])} of rain today
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast - Modern Cards */}
      <div className="bg-white rounded-xl p-6 shadow-md overflow-hidden">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">5-Day Forecast</h3>
        <div className="grid grid-cols-5 gap-3 overflow-x-auto">
          {weatherData.daily.time.slice(0, 5).map((date, index) => {
            const day = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
            const isToday = index === 0;
            return (
              <div 
                key={date} 
                className={`rounded-lg p-3 transition-all ${
                  isToday 
                    ? 'bg-gradient-to-b from-blue-50 to-blue-100 border border-blue-200' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="text-center">
                  <p className={`text-sm font-semibold ${isToday ? 'text-blue-600' : 'text-gray-600'}`}>
                    {day}
                  </p>
                  <div className="my-2">
                    {getWeatherIcon(weatherData.daily.weatherCode[index])}
                  </div>
                  <p className="text-sm font-medium">
                    <span className="text-gray-800">{Math.round(weatherData.daily.temperature2mMax[index])}°</span>
                    <span className="text-gray-400 mx-1">/</span>
                    <span className="text-gray-500">{Math.round(weatherData.daily.temperature2mMin[index])}°</span>
                  </p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full" 
                      style={{ width: `${weatherData.daily.precipitationProbabilityMax[index]}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {weatherData.daily.precipitationProbabilityMax[index]}% rain
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Farm Impact Alert - Enhanced Modern Design */}
      {weatherData.daily.precipitationProbabilityMax[0] > 70 && (
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-500 rounded-xl p-4 shadow-md overflow-hidden">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 text-amber-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-amber-800">Weather Alert</h3>
              <div className="mt-2 text-amber-700">
                <p className="text-sm">
                  High probability of rain today. Consider these actions:
                </p>
                <ul className="mt-2 text-sm list-disc list-inside">
                  <li>Adjust watering schedules to avoid over-watering</li>
                  <li>Postpone fertilizer application if planned for today</li>
                  <li>Ensure proper drainage in all beds</li>
                  <li>Move sensitive equipment to covered areas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Extreme Temperature Alert - Only shown when needed */}
      {weatherData.current.temperature > 30 && (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-red-500 rounded-xl p-4 shadow-md overflow-hidden">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-red-800">Heat Alert</h3>
              <div className="mt-2 text-red-700">
                <p className="text-sm">
                  Temperatures are higher than optimal for most crops. Consider these actions:
                </p>
                <ul className="mt-2 text-sm list-disc list-inside">
                  <li>Increase watering frequency for all beds</li>
                  <li>Provide shade for sensitive crops during peak hours</li>
                  <li>Monitor for signs of heat stress in plants</li>
                  <li>Schedule field work for early morning or evening</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherOverview;
