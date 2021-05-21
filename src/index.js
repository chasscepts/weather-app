import openweathermap from './open-weather-map';
import location from './location';
import './assets/css/style.scss';

const positionBtn = document.querySelector('#search-position-btn');
const form = document.querySelector('#search-form');
const cityInput = document.querySelector('#city-input');

const handleError = (err) => {
  console.log(err);
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

const temperatureUnitSelector = (() => {
  const celsiusRadio = document.querySelector('#celsius');
  const fahrenheitRadio = document.querySelector('#fahrenheit');

  let units = 'metric';

  celsiusRadio.addEventListener('change', () => {
    if (celsiusRadio.checked) {
      units = 'metric';
    }
  });

  fahrenheitRadio.addEventListener('change', () => {
    if (fahrenheitRadio.checked) {
      units = 'imperial';
    }
  });

  return {
    units: () => units,
  };
})();

const searchByLocation = async () => {
  const location = cityInput.value;
  if (!location) {
    return;
  }

  try {
    const weather = await openweathermap.search(location);
    displayWeather(weather);
  } catch (error) {
    handleError(error);
  }
};

const searchByPosition = async () => {
  try {
    const position = await location.position();
    const weather = await openweathermap.searchByPosition(position.longitude, position.latitude);
    displayWeather(weather);
  } catch (error) {
    handleError(error);
  }
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  searchByLocation();
  return false;
});

positionBtn.addEventListener('click', async () => {
  searchByPosition();
});
