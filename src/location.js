const isAvaliable = !!navigator.geolocation;

const location = {
  isAvaliable,
  position() {
    return new Promise((resolve, reject) => {
      if (!isAvaliable) {
        reject(new Error('Location is not available'));
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve({ longitude: position.coords.longitude, latitude: position.coords.latitude });
        }, (err) => reject(err));
      }
    });
  },
};

export default location;
