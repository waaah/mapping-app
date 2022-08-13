import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { getRestaurants } from "../../services/places";
import "./main-map.styles.css";
import { MarkerGroup } from "../Marker-Group/marker-group.component";

export const MainMap = () => {
  const [restaurants, setRestaurants] = useState();

  useEffect(() => {
    const getRestaurantData = async () => {
      const restaurants = await getRestaurants();
      setRestaurants(restaurants);
    };
    getRestaurantData();
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD-eQAdA2DAAPRVDQKOCKT1KpgeKtJnDVM",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return getMap({ lat: 10.336536, lng: 123.883072, markerData: restaurants });
};

const getMap = (config) => {
  const markers = config.markerData.map((data, i) => {
    const { lat, lng } = data.geometry.location;
    return <Marker key={i} position={{ lat, lng }}></Marker>;
  });
  return (
    <GoogleMap
      zoom={10}
      center={{ lat: config.lat, lng: config.lng }}
      mapContainerClassName="map-container"
    >
      {markers.length > 0 && markers}
    </GoogleMap>
  );
};
