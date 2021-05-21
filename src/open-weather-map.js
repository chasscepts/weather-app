const apiKey = '9b3214bc67fa5d5b9d3c96cbc99c3a54';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const getUrl = (location, units) => `${baseUrl}?q=${location}&units=${units}&APPID=${apiKey}`;

const getPositionUrl = (longitude, latitude, units) => `${baseUrl}?lat=${latitude}&lon=${longitude}&units=${units}&APPID=${apiKey}`;

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

const convertSpeed = (speed) => `${(Math.round(speed * 36) / 10)} km/h`;

const capitalize = (text) => text.split(' ').map((w) => `${w[0].toUpperCase()}${w.substring(1)}`).join(' ');

const formatWeatherInfo = (raw) => (
  {
    city: raw.name,
    country: raw.sys.country,
    image: iconUrl(raw.weather[0].icon),
    longitude: raw.coord.lon,
    latitude: raw.coord.lat,
    main: raw.weather[0].main,
    description: capitalize(raw.weather[0].description),
    clouds: `Cloudiness: ${raw.clouds.all}%`,
    temperature: raw.main.temp,
    maxtemprature: raw.main.temp_max,
    minTemperature: raw.main.temp_min,
    humidity: `Humidity: ${raw.main.humidity}%`,
    windSpeed: convertSpeed(raw.wind.speed),
    windDirection: windDirection(raw.wind.deg),
  }
);

const openweathermap = {
  search(location, units) {
    return new Promise((resolve, reject) => {
      fetch(getUrl(location, units), { mode: 'cors' })
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
  searchByPosition(longitude, latitude, units) {
    return new Promise((resolve, reject) => {
      fetch(getPositionUrl(longitude, latitude, units), { mode: 'cors' })
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
