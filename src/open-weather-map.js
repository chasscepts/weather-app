const apiKey = '9b3214bc67fa5d5b9d3c96cbc99c3a54';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const getUrl = (location) => `${baseUrl}?q=${location}&APPID=${apiKey}`;

const getPositionUrl = (longitude, latitude) => `${baseUrl}?lat=${latitude}&lon=${longitude}&APPID=${apiKey}`;

const iconUrl = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatWeatherInfo = (raw) => (
  {
    city: raw.name,
    country: raw.sys.country,
    image: iconUrl(raw.weather[0].icon),
    longitude: raw.coord.lon,
    latitude: raw.coord.lat,
    cloudSummary: raw.weather[0].main,
    cloud: raw.weather[0].description,
    temperature: raw.main.temp,
    pressure: raw.main.pressure,
    humidity: raw.main.humidity,
    windSpeed: raw.wind.speed,
    windDirection: raw.wind.deg,
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
