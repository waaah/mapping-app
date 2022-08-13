import { configureStore } from "@reduxjs/toolkit";
import restaurantReducers from "./restaurant.reducers";

export const store = configureStore({
  reducer: {
    restaurants: restaurantReducers,
  },
});
