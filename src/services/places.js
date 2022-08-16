const axios = require("axios");
const qs = require("qs");
const API_URL = process.env.REACT_APP_NAVAGIS_TEST_URL;
export const getRestaurants = async (filters = {}) => {
  try {
    const { data } = await axios({
      method: "get",
      url: `${API_URL}/places?` + qs.stringify(filters),
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getRestaurantsOnDrag = async (filters = {}) => {
  try {
    const { data } = await axios({
      method: "get",
      url: `${API_URL}/places/ondrag?` + qs.stringify(filters),
    });
    return data;
  } catch (error) {
    throw error;
  }
};
export const getLocationImage = (imageUrl) =>
  `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${imageUrl}&key=AIzaSyD-eQAdA2DAAPRVDQKOCKT1KpgeKtJnDVM`;
