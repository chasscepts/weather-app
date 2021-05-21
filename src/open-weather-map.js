const apiKey = '9b3214bc67fa5d5b9d3c96cbc99c3a54';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const getUrl = (location) => `${baseUrl}?q=${location}&APPID=${apiKey}`;

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
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  },
};

export default openweathermap;
