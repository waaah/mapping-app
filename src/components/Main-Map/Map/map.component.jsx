/* eslint-disable no-undef */
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { selectRestaurant } from "../../../store/selected-location/selected-location.slices";

export const Map = (props) => {
  const dispatch = useDispatch();
  const [map, setMap] = useState();
  const { markerData, directions, center } = props.config;
  const onSelectMarker = (restaurant) => {
    const destination = restaurant.geometry.location;
    const { lat, lng } = destination;
    dispatch(selectRestaurant({ restaurant, center: { lat, lng } }));
  };
  const markers = markerData.map((data, i) => {
    const { lat, lng } = data.geometry.location;
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
    map.addListener("dragend", () => {});
  }
  return (
    <GoogleMap
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
