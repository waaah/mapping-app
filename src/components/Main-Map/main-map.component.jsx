/*global google*/
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Map } from "./Map/map.component";
import { getRestaurantsByFilter } from "../../store/restaurant/restaurant.slice";
import "./main-map.styles.css";

export const MainMap = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.restaurants.data);
  const { origin, destination, center } = useSelector(
    (state) => state.selectedLocation
  );
  const [directions, setDirections] = useState();

  useEffect(() => {
    dispatch(getRestaurantsByFilter());
  }, []);

  useEffect(() => {
    // if there are any changes in the origin and destination
    const getDirections = async () => {
      if (!origin && !destination) return setDirections(null);

      const directionsService = new window.google.maps.DirectionsService();
      const directions = await directionsService.route({
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      setDirections(directions);
    };
    getDirections();
  }, [origin, destination]);

  return (
    <Map
      config={{
        center,
        markerData: restaurants,
        directions,
      }}
    />
  );
};
