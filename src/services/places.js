const axios = require("axios");
const corsAnywhere = "https://corsanywhere.herokuapp.com/";
export const getRestaurants = async () => {
  try {
    const { data } = await axios({
      method: "get",
      url:
        corsAnywhere +
        `https://maps.googleapis.com/maps/api/place/textsearch/json?input=restaurants%20in%20cebu&key=AIzaSyD-eQAdA2DAAPRVDQKOCKT1KpgeKtJnDVM&pagetoken=AeJbb3eBqA_wzlNmi8GA_YEPdSeXtrjS_Ihw3J0DfpkR5DKBrIMMg2W-U-qqj7fjV7v7Bzeo2KpMgL-O9hHsv6VKtq40oUZs9qFZ2s2aJWPcgUe1UzKZk_ZnbHlBMX9MqtdVsBw4NvCSDM_iGtbcuKNqH4HU7W3DdcG4p7ye62rWheRNNeXoVCpbHDPGjH8DC-U7Ch6oKlOopxQGVVFH0sg_t_ocJwoZWO8afGdLETKGkRsscvKbPb4S_Rx7ZBQjjuBpTjw1y-QvemVYLUKlH4Eb7hiILogYWY3w_cOHxQkyltXRWtrBcIJ2kEmm42AcfQ-8HSm6YWqv4l3b9axaf21Zh-oMT-fAeDXhKSvlcy5EJnxjci2ieJt3TwkDyLicu_erD6T1JHgRhOevCbXoVIgr6d0`,
    });
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getLocationByAddress = async (address) => {
  try {
    const { data } = await axios({
      method: "get",
      url:
        corsAnywhere +
        `https://maps.googleapis.com/maps/api/place/textsearch/json?input=restaurants%20in%20cebu&key=AIzaSyD-eQAdA2DAAPRVDQKOCKT1KpgeKtJnDVM&pagetoken=AeJbb3eBqA_wzlNmi8GA_YEPdSeXtrjS_Ihw3J0DfpkR5DKBrIMMg2W-U-qqj7fjV7v7Bzeo2KpMgL-O9hHsv6VKtq40oUZs9qFZ2s2aJWPcgUe1UzKZk_ZnbHlBMX9MqtdVsBw4NvCSDM_iGtbcuKNqH4HU7W3DdcG4p7ye62rWheRNNeXoVCpbHDPGjH8DC-U7Ch6oKlOopxQGVVFH0sg_t_ocJwoZWO8afGdLETKGkRsscvKbPb4S_Rx7ZBQjjuBpTjw1y-QvemVYLUKlH4Eb7hiILogYWY3w_cOHxQkyltXRWtrBcIJ2kEmm42AcfQ-8HSm6YWqv4l3b9axaf21Zh-oMT-fAeDXhKSvlcy5EJnxjci2ieJt3TwkDyLicu_erD6T1JHgRhOevCbXoVIgr6d0`,
    });
    return data.results;
  } catch (error) {
    throw error;
  }
};
