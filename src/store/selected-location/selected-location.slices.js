import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: null,
  origin: null,
  restaurant: null,
};

const selectedLocationSlice = createSlice({
  name: "selectedLocation",
  initialState,
  reducers: {
    setRestaurantState(state, action) {
      const { restaurant } = action.payload;
      state.restaurant = restaurant;
      return state;
    },
    setLocationState(state, action) {
      const { origin, destination } = action.payload;
      state.origin = origin;
      state.destination = destination;
      return state;
    },
    resetState(state) {
      state = initialState;
      return state;
    },
  },
});

export const { setLocationState, resetState, setRestaurantState } =
  selectedLocationSlice.actions;
export default selectedLocationSlice;
