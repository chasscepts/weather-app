import openweathermap from './open-weather-map';
import './assets/css/style.scss';

const getWeatherInfo = async (location) => {
  try {
    const result = await openweathermap.search(location);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

getWeatherInfo('London,uk');
