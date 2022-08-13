import { createSlice } from "@reduxjs/toolkit";

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: [],
  reducers: {
    getRestaurantInfo(state, action) {},
    setRestaurants(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { getRestaurantInfo, setRestaurants } = restaurantsSlice.actions;
export default restaurantsSlice;
