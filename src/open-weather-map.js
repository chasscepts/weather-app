const apiKey = '9b3214bc67fa5d5b9d3c96cbc99c3a54';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const getUrl = (location) => `${baseUrl}?q=${location}&APPID=${apiKey}`;

const getPositionUrl = (longitude, latitude) => `${baseUrl}?lat=${latitude}&lon=${longitude}&APPID=${apiKey}`;

const iconUrl = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const windDirection = (num) => {
  num = parseInt(num, 10);
  if (num === 0) return 'North';
  if (num < 90) return 'North East';
  if (num === 90) return 'East';
  if (num < 180) return 'South East';
  if (num === 180) return 'South';
  if (num < 270) return 'South West';
  if (num === 270) return 'West';
  if (num < 360) return 'North West';
  return 'North';
};

const convertTemperature = (temp) => Math.round(temp - 273.15);

const convertSpeed = (speed) => `${(Math.round(speed * 36) / 10)} km/h`;

const capitalize = (text) => text.split(' ').map((w) => `${w[0].toUpperCase()}${w.substring(1)}`).join(' ');

const formatWeatherInfo = (raw) => (
  {
    city: raw.name,
    country: raw.sys.country,
    image: iconUrl(raw.weather[0].icon),
    longitude: raw.coord.lon,
    latitude: raw.coord.lat,
    description: capitalize(raw.weather[0].description),
    clouds: `Cloudiness: ${raw.clouds.all}%`,
    temperature: convertTemperature(raw.main.temp),
    maxtemprature: convertTemperature(raw.main.temp_max),
    minTemperature: convertTemperature(raw.main.temp_min),
    humidity: `Humidity: ${raw.main.humidity}%`,
    windSpeed: convertSpeed(raw.wind.speed),
    windDirection: windDirection(raw.wind.deg),
  }
);

const openweathermap = {
  search(location) {
    return new Promise((resolve, reject) => {
      fetch(getUrl(location), { mode: 'cors' })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then((response) => resolve(formatWeatherInfo(response)))
        .catch((err) => reject(err));
    });
  },
  searchByPosition(longitude, latitude) {
    return new Promise((resolve, reject) => {
      fetch(getPositionUrl(longitude, latitude), { mode: 'cors' })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then((response) => resolve(formatWeatherInfo(response)))
        .catch((err) => reject(err));
    });
  },
};

export default openweathermap;
