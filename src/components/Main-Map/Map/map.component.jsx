/* eslint-disable no-undef */
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Rectangle,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createRectangle,
  modifyBounds,
  setMouseDownState,
} from "../../../store/map/map.slice";
import { selectRestaurant } from "../../../store/selected-location/selected-location.slices";
import { selectRectangle, setCenter } from "../../../store/map/map.slice";
import { addFilter } from "../../../store/restaurant/restaurant.slice";

export const Map = (props) => {
  const dispatch = useDispatch();
  const [map, setMap] = useState();
  const { markerData, directions, rectangleData, isAddShape, center } =
    props.config;
  const boundsData = JSON.stringify(rectangleData.map((rect) => rect.bounds));
  useEffect(() => {
    dispatch(
      addFilter({
        coordinates: boundsData === "[]" ? undefined : boundsData,
      })
    );
  }, [boundsData]);

  const onSelectMarker = (restaurant) => {
    const { lat, lng } = restaurant;
    dispatch(setCenter({ lat, lng }));
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

  const rectangles = rectangleData.map((data, i) => {
    const { bounds, key, editable, draggable, isMouseDown } = data;
    return (
      <Rectangle
        bounds={bounds}
        key={key}
        editable={editable}
        draggable={draggable}
        onClick={() => {
          dispatch(selectRectangle({ selectedKey: key }));
        }}
        onMouseDown={() =>
          dispatch(setMouseDownState({ key, isMouseDown: true }))
        }
        onMouseUp={() =>
          dispatch(setMouseDownState({ key, isMouseDown: false }))
        }
        onBoundsChanged={function () {
          if (!isMouseDown) {
            const newBounds = this.getBounds().toJSON();
            if (
              newBounds.east !== bounds.east ||
              newBounds.north !== bounds.north ||
              newBounds.south !== bounds.south ||
              newBounds.west !== bounds.west
            ) {
              dispatch(modifyBounds({ bounds: newBounds, key }));
            }
          }
        }}
        onDragEnd={function () {
          const newBounds = this.getBounds().toJSON();
          if (
            newBounds.east !== bounds.east ||
            newBounds.north !== bounds.north ||
            newBounds.south !== bounds.south ||
            newBounds.west !== bounds.west
          )
            dispatch(modifyBounds({ bounds: newBounds, key }));
        }}
      />
    );
  });

  const onHandleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    const rectangleConfig = {
      bounds: {
        north: lat + 0.01,
        south: lat - 0.01,
        east: lng + 0.01,
        west: lng - 0.01,
      },
      center: { lat, lng },
      editable: false,
      draggable: false,
    };
    dispatch(createRectangle(rectangleConfig));
  };

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
        dispatch(setCenter(centerCoordinates));
        // dispatch(
        //   getRestaurantsOnDragHandler({
        //     location: `${centerCoordinates.lat},${centerCoordinates.lng}`,
        //   })
        // );
      });

      map.addListener("click", onHandleMapClick);
    }
  }
  const defaultMapOptions = {
    fullscreenControl: false,
    draggableCursor: isAddShape ? "crosshair" : "grab",
  };

  return (
    <GoogleMap
      options={defaultMapOptions}
      zoom={15}
      center={center}
      mapContainerClassName={`map-container`}
      onLoad={(map) => setMap(map)}
    >
      {markers.length > 0 && markers}
      {directionsData}
      {rectangles.length > 0 && rectangles}
    </GoogleMap>
  );
};
