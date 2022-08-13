import { configureStore } from "@reduxjs/toolkit";
import selectedLocationReducers from "./selected-location/selected-location.reducers";
import restaurantReducers from "./restaurant/restaurant.reducers";

export const store = configureStore({
  reducer: {
    restaurants: restaurantReducers,
    selectedLocation: selectedLocationReducers,
  },
});
