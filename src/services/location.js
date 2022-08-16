import { getLocationByAddress } from "./places";

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
        const address = prompt("Enter your address:");
        alert(address);
        return await getCoordinatesByAddress(address, resolve, reject);
      },
      {
        enableHighAccuracy: true,
      }
    );
  });
};

export const getCoordinatesByAddress = async (address, resolve, reject) => {
  try {
    const { lat, lng } = await getLocationByAddress();
    resolve({ lat, lng });
  } catch (error) {
    reject(error);
  }
};
