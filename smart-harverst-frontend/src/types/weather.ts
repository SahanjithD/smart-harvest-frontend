export interface WeatherData {
  current: {
    time: string;
    temperature: number;
    relativeHumidity: number;
    precipitation: number;
    windSpeed: number;
    weatherCode: number;
  };
  daily: {
    time: string[];
    weatherCode: number[];
    temperature2mMax: number[];
    temperature2mMin: number[];
    precipitationProbabilityMax: number[];
  };
}

export interface WeatherForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  precipitationProbability: number;
}

// WMO Weather interpretation codes
export const weatherCodes: { [key: number]: { label: string; icon: string } } = {
  0: { label: 'Clear sky', icon: '☀️' },
  1: { label: 'Mainly clear', icon: '🌤️' },
  2: { label: 'Partly cloudy', icon: '⛅' },
  3: { label: 'Overcast', icon: '☁️' },
  45: { label: 'Foggy', icon: '🌫️' },
  48: { label: 'Depositing rime fog', icon: '🌫️' },
  51: { label: 'Light drizzle', icon: '🌧️' },
  53: { label: 'Moderate drizzle', icon: '🌧️' },
  55: { label: 'Dense drizzle', icon: '🌧️' },
  61: { label: 'Slight rain', icon: '🌧️' },
  63: { label: 'Moderate rain', icon: '🌧️' },
  65: { label: 'Heavy rain', icon: '🌧️' },
  71: { label: 'Slight snow fall', icon: '🌨️' },
  73: { label: 'Moderate snow fall', icon: '🌨️' },
  75: { label: 'Heavy snow fall', icon: '🌨️' },
  77: { label: 'Snow grains', icon: '🌨️' },
  80: { label: 'Slight rain showers', icon: '🌦️' },
  81: { label: 'Moderate rain showers', icon: '🌦️' },
  82: { label: 'Violent rain showers', icon: '🌦️' },
  85: { label: 'Slight snow showers', icon: '🌨️' },
  86: { label: 'Heavy snow showers', icon: '🌨️' },
  95: { label: 'Thunderstorm', icon: '⛈️' },
  96: { label: 'Thunderstorm with slight hail', icon: '⛈️' },
  99: { label: 'Thunderstorm with heavy hail', icon: '⛈️' },
};
