import type { WeatherData } from '../types/weather';

const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

// For this example, we're using fixed coordinates for a farm location
// In a real application, this would come from the farm's actual location
const DEFAULT_LATITUDE = 6.0794514;
const DEFAULT_LONGITUDE = 80.1920971;

export async function fetchWeatherData(): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${WEATHER_API_URL}?latitude=${DEFAULT_LATITUDE}&longitude=${DEFAULT_LONGITUDE}` +
      '&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code' +
      '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
      '&timezone=auto'
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData = await response.json();
    
    // Transform the API response to match our WeatherData interface
    return {
      current: {
        time: weatherData.current.time,
        temperature: weatherData.current.temperature_2m,
        relativeHumidity: weatherData.current.relative_humidity_2m,
        precipitation: weatherData.current.precipitation,
        windSpeed: weatherData.current.wind_speed_10m,
        weatherCode: weatherData.current.weather_code,
      },
      daily: {
        time: weatherData.daily.time,
        weatherCode: weatherData.daily.weather_code,
        temperature2mMax: weatherData.daily.temperature_2m_max,
        temperature2mMin: weatherData.daily.temperature_2m_min,
        precipitationProbabilityMax: weatherData.daily.precipitation_probability_max,
      },
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}
