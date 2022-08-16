export const getLocation = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        resolve({ lat, lng });
      },
      async (error) => {
        if (error.code === 1) return alert("Please enable location services!");
      },
      {
        enableHighAccuracy: true,
      }
    );
  });
};
