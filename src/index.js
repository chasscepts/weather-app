import openweathermap from './open-weather-map';
import location from './location';
import './assets/css/style.scss';

const positionBtn = document.querySelector('#search-position-btn');
const form = document.querySelector('#search-form');
const cityInput = document.querySelector('#city-input');

const handleError = (() => {
  const cover = document.querySelector('#error-cover');
  const errorMsg = document.querySelector('#error-msg');

  const getErrorText = (err) => {
    if (typeof err === 'string') {
      return err;
    }
    if (err instanceof Error) {
      return err.message;
    }
    return 'This error contains no additional information';
  };

  cover.addEventListener('click', () => cover.classList.remove('open'));

  return (err) => {
    errorMsg.textContent = getErrorText(err);
    cover.classList.add('open');
  };
})();

const displayWeather = (() => {
  const icon = document.querySelector('#icon');
  const city = document.querySelector('#city');
  const country = document.querySelector('#country');
  const longitude = document.querySelector('#longitude');
  const latitude = document.querySelector('#latitude');
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
    windSpeed.textContent = weather.windSpeed;
    windDirection.textContent = weather.windDirection;
    description.textContent = weather.description;
    clouds.textContent = weather.clouds;
    humidity.textContent = weather.humidity;
  };
})();

const temperatureHandler = (() => {
  const temperatureElement = document.querySelector('#temperature');
  const maxElement = document.querySelector('#max-temp');
  const minElement = document.querySelector('#min-temp');
  const unitsElement = document.querySelector('#temp-unit');
  const celsiusRadio = document.querySelector('#celsius');
  const fahrenheitRadio = document.querySelector('#fahrenheit');

  const METRIC = 'metric';
  const IMPERIAL = 'imperial';

  let units = METRIC;
  let isLockedMetric = true;

  const isMetric = () => units === METRIC;

  const convert = (temp) => {
    const lIsMetric = isMetric();
    if (isLockedMetric) {
      if (lIsMetric) {
        return Math.round(temp);
      }

      return Math.round(32 + ((temp * 9) / 5));
    }
    if (lIsMetric) {
      return Math.round((((temp - 32) * 5) / 9));
    }
    return Math.round(temp);
  };

  let temperature = null;
  let max;
  let min;

  const update = () => {
    if (temperature === null) {
      return;
    }
    temperatureElement.textContent = convert(temperature);
    maxElement.textContent = convert(max);
    minElement.textContent = convert(min);
    unitsElement.textContent = isMetric() ? 'C' : 'F';
  };

  const setWeather = (weather, _units) => {
    units = _units;
    temperature = weather.temperature;
    max = weather.maxtemprature;
    min = weather.minTemperature;

    if (isMetric()) {
      celsiusRadio.checked = true;
      isLockedMetric = true;
    } else {
      fahrenheitRadio.checked = true;
      isLockedMetric = false;
    }
    update();
  };

  celsiusRadio.addEventListener('change', () => {
    if (celsiusRadio.checked) {
      units = METRIC;
      update();
    }
  });

  fahrenheitRadio.addEventListener('change', () => {
    if (fahrenheitRadio.checked) {
      units = IMPERIAL;
      update();
    }
  });

  return {
    getUnits: () => units,
    set: (weather, metric) => setWeather(weather, metric),
  };
})();

const changeBackground = (() => {
  const { body } = document;

  return (weather) => {
    body.className = weather.main.toLowerCase();
  };
})();

const handleApiCallResponse = (weather, units) => {
  displayWeather(weather);
  temperatureHandler.set(weather, units);
  changeBackground(weather);
};

const searchByLocation = async () => {
  const location = cityInput.value;
  if (!location) {
    return;
  }

  try {
    const units = temperatureHandler.getUnits();
    const weather = await openweathermap.search(location, units);
    handleApiCallResponse(weather, units);
  } catch (error) {
    handleError(error);
  }
};

const searchByPosition = async () => {
  try {
    const units = temperatureHandler.getUnits();
    const { longitude, latitude } = await location.position();
    const weather = await openweathermap.searchByPosition(longitude, latitude, units);
    handleApiCallResponse(weather, units);
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
