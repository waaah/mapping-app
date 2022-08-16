import axios from "axios";
const endpoint = "http://localhost:4500";

export const getRestaurantData = async (placeId) => {
  try {
    const { data } = await axios({
      method: "get",
      url: `${endpoint}/places/${placeId}`,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
export const setCategory = async (placeId, data) => {
  try {
    await axios({
      method: "post",
      url: `${endpoint}/places/${placeId}/categories`,
      data,
    });
  } catch (error) {
    throw error;
  }
};
export const setSpecialties = async (placeId, data) => {
  try {
    return await axios.post(`${endpoint}/places/${placeId}/specialties`, data);
  } catch (error) {
    throw error;
  }
};
