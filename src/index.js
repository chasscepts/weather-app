import openweathermap from './open-weather-map';
import location from './location';
import './assets/css/style.scss';

const getWeatherInfo = async (location) => {
  try {
    const result = await openweathermap.search(location);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const getWeatherInfoByPosition = async (longitude, latitude) => {
  try {
    const result = await openweathermap.searchByPosition(longitude, latitude);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const displayWeather = (() => {
  const icon = document.querySelector('#icon');
  const city = document.querySelector('#city');
  const country = document.querySelector('#country');
  const longitude = document.querySelector('#longitude');
  const latitude = document.querySelector('#latitude');
  const temperature = document.querySelector('#temperature');
  const maxTemp = document.querySelector('#max-temp');
  const minTemp = document.querySelector('#min-temp');
  const windSpeed = document.querySelector('#wind-speed');
  const windDirection = document.querySelector('#wind-direction');
  const description = document.querySelector('#description');
  const clouds = document.querySelector('#clouds');
  const humidity = document.querySelector('#humidity');

  return (weather) => {
    icon.src = weather.image;
    city.textContent = weather.city;
    country.textContent = weather.country;
    longitude.textContent = weather.longitude;
    latitude.textContent = weather.latitude;
    temperature.textContent = weather.temperature;
    maxTemp.textContent = weather.maxtemprature;
    minTemp.textContent = weather.minTemperature;
    windSpeed.textContent = weather.windSpeed;
    windDirection.textContent = weather.windDirection;
    description.textContent = weather.description;
    clouds.textContent = weather.clouds;
    humidity.textContent = weather.humidity;
  };
})();

const sampleWeather = {
  city: 'Ibadan',
  clouds: 'Cloudiness: 83%',
  country: 'NG',
  description: 'Broken Clouds',
  humidity: 'Humidity: 48%',
  image: 'http://openweathermap.org/img/wn/04d@2x.png',
  latitude: 7.4318,
  longitude: 3.8994,
  maxtemprature: 34,
  minTemperature: 34,
  temperature: 34,
  windDirection: 'South West',
  windSpeed: '9.6 km/h',
};

displayWeather(sampleWeather);

// getWeatherInfo('London,uk');

// location.position()
//   .then((position) => {
//     console.log(position);
//     try {
//       getWeatherInfoByPosition(position.longitude, position.latitude);
//     } catch (err) {
//       console.log(err);
//     }
//   })
//   .catch((err) => console.log(err));
