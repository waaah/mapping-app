import { createSlice } from "@reduxjs/toolkit";

const selectedLocationSlice = createSlice({
  name: "selectedLocation",
  initialState: {
    destination: null,
    origin: null,
    restaurant: null,
  },
  reducers: {
    setLocationState(state, action) {
      const { origin, destination, restaurant } = action.payload;
      state.origin = origin;
      state.restaurant = restaurant;
      state.destination = destination;
      return state;
    },
    resetLocationState(state) {
      state.origin = null;
      state.destination = null;
      state.restaurant = null;
      return state;
    },
  },
});

export const { setLocationState, resetLocationState } =
  selectedLocationSlice.actions;
export default selectedLocationSlice;
