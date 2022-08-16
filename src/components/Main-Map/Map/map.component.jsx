/* eslint-disable no-undef */
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getRestaurantsByFilter,
  getRestaurantsOnDragHandler,
} from "../../../store/restaurant/restaurant.slice";
import { selectRestaurant } from "../../../store/selected-location/selected-location.slices";

export const Map = (props) => {
  const dispatch = useDispatch();
  const [map, setMap] = useState();
  const { markerData, directions } = props.config;
  const [center, setCenter] = useState({ lat: 10.336536, lng: 123.883072 });

  const onSelectMarker = (restaurant) => {
    const { lat, lng } = restaurant;
    dispatch(selectRestaurant({ restaurant, center: { lat, lng } }));
  };

  const markers = markerData.map((data, i) => {
    const { lat, lng } = data;
    return (
      <Marker
        onClick={() => onSelectMarker(data)}
        key={i}
        position={{ lat, lng }}
      ></Marker>
    );
  });

  const directionsData = directions && (
    <DirectionsRenderer directions={directions} />
  );

  const mapCenter = new google.maps.LatLng(center.lat, center.lng);

  if (map) {
    const hasEventListener = window.hasMapOnDrag;
    if (!hasEventListener) {
      window.hasMapOnDrag = true;
      map.addListener("dragend", () => {
        const currentCenter = map.getCenter();
        const centerCoordinates = {
          lat: currentCenter.lat(),
          lng: currentCenter.lng(),
        };
        setCenter(centerCoordinates);
        // dispatch(
        //   getRestaurantsOnDragHandler({
        //     location: `${centerCoordinates.lat},${centerCoordinates.lng}`,
        //   })
        // );
      });
    }
  }
  const defaultMapOptions = {
    fullscreenControl: false,
  };

  return (
    <GoogleMap
      options={defaultMapOptions}
      zoom={15}
      center={mapCenter}
      mapContainerClassName="map-container"
      onLoad={(map) => setMap(map)}
    >
      {markers.length > 0 && markers}
      {directionsData}
    </GoogleMap>
  );
};
