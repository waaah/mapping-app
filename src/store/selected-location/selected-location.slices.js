import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: null,
  origin: null,
  restaurant: null,
  center: { lat: 10.336536, lng: 123.883072 },
};

const selectedLocationSlice = createSlice({
  name: "selectedLocation",
  initialState,
  reducers: {
    selectRestaurant(state, action) {
      const { restaurant, center } = action.payload;
      state.restaurant = restaurant;
      state.center = center;

      return state;
    },

    setOriginAndDestination(state, action) {
      const { origin, destination } = action.payload;
      state.origin = origin;
      state.destination = destination;
      return state;
    },
    resetState(state) {
      state = initialState;
      return state;
    },
    closeRestaurant(state) {
      state.restaurant = null;
      state.origin = null;
      state.destination = null;
      return state;
    },
  },
});

export const {
  setOriginAndDestination,
  resetState,
  selectRestaurant,
  closeRestaurant,
} = selectedLocationSlice.actions;
export default selectedLocationSlice;
