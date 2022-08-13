import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";

export const Map = (props) => {
  const { markerData, directions, lat, lng } = props.config;

  const markers = markerData.map((data, i) => {
    const { lat, lng } = data.geometry.location;
    return <Marker key={i} position={{ lat, lng }}></Marker>;
  });

  const directionsData = directions && (
    <DirectionsRenderer directions={directions} />
  );

  return (
    <GoogleMap
      zoom={15}
      center={{ lat, lng }}
      mapContainerClassName="map-container"
    >
      {markers.length > 0 && markers}
      {directionsData}
    </GoogleMap>
  );
};
