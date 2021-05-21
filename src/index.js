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

// getWeatherInfo('London,uk');

location.position()
  .then((position) => {
    console.log(position);
    try {
      getWeatherInfoByPosition(position.longitude, position.latitude);
    } catch (err) {
      console.log(err);
    }
  })
  .catch((err) => console.log(err));
