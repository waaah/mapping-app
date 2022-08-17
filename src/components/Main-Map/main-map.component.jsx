/*global google*/
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Map } from "./Map/map.component";
import { getRestaurantsByFilter } from "../../store/restaurant/restaurant.slice";
import "./main-map.styles.css";
import { setDirectionData } from "../../store/selected-location/selected-location.slices";

export const MainMap = () => {
  const dispatch = useDispatch();
  const [directions, setDirections] = useState(null);
  const { data: restaurants, filters } = useSelector(
    (state) => state.restaurants
  );
  const { rectangles, isAddShape, center } = useSelector((state) => state.map);
  const { origin, destination, mode } = useSelector(
    (state) => state.selectedLocation
  );

  // get restaurants when filters change
  useEffect(() => {
    dispatch(getRestaurantsByFilter(filters));
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    // if there are any changes in the origin and destination
    const getDirections = async () => {
      try {
        if (origin && destination && mode) {
          const directionsService = new window.google.maps.DirectionsService();
          const directions = await directionsService.route({
            origin,
            destination,
            travelMode: mode,
          });
          setDirections(directions);
          const estimatedTime = directions.routes[0].legs[0].duration.text;
          const estimatedDistance = directions.routes[0].legs[0].distance.text;
          dispatch(setDirectionData({ estimatedDistance, estimatedTime }));
        } else {
          setDirections(null);
        }
      } catch (error) {
        alert("No directions were found");
        setDirections(null);
        dispatch(setDirectionData(null));
      }
    };
    getDirections();
  }, [origin, destination, mode]);

  return (
    <Map
      config={{
        center,
        markerData: restaurants,
        directions,
        rectangleData: rectangles,
        isAddShape,
      }}
    />
  );
};
