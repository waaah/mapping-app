import { configureStore } from "@reduxjs/toolkit";
import selectedLocationReducers from "./selected-location/selected-location.reducers";
import restaurantReducers from "./restaurant/restaurant.reducers";
import mapReducers from "./map/map.reducers";

export const store = configureStore({
  reducer: {
    restaurants: restaurantReducers,
    selectedLocation: selectedLocationReducers,
    map: mapReducers,
  },
});
