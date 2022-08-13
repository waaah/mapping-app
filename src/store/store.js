import { configureStore } from "@reduxjs/toolkit";
import locationReducers from "./location/location.reducers";
import restaurantReducers from "./restaurant/restaurant.reducers";

export const store = configureStore({
  reducer: {
    restaurants: restaurantReducers,
    location: locationReducers,
  },
});
