/*global google*/
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "../../services/places";
import { setRestaurants } from "../../store/restaurant/restaurant.slice";
import { Map } from "./Map/map.component";
import "./main-map.styles.css";

export const MainMap = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.restaurants);
  const { origin, destination } = useSelector((state) => state.location);
  const [directions, setDirections] = useState();

  useEffect(() => {
    const getRestaurantData = async () => {
      const restaurants = await getRestaurants();
      dispatch(setRestaurants(restaurants));
    };
    getRestaurantData();
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
        lat: 10.336536,
        lng: 123.883072,
        markerData: restaurants,
        directions,
      }}
    />
  );
};
