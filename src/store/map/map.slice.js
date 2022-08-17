import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const initialState = {
  rectangles: [],
  isAddShape: false,
  center: { lat: 10.336536, lng: 123.883072 },
};
/**
 * rectangles : [{
 *   bounds: {
 *     ...
 *   },
 *   key: 'key'
 *   editable:
 *   draggable:
 * }]
 */

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setAddShape(state, action) {
      state.isAddShape = action.payload;
      return state;
    },
    createRectangle(state, action) {
      if (state.isAddShape) {
        const newRectangle = action.payload;
        state.rectangles.push(newRectangle);
        newRectangle.key = uuid();
        return state;
      }
    },
    removeRectangle(state, action) {
      const { key } = action.payload;
      const newRectangles = state.rectangles.filter((rect) => rect.key !== key);
      state.rectangles = newRectangles;
      return state;
    },
    setMouseDownState(state, action) {
      const { isMouseDown, key } = action.payload;
      const selectedIndex = state.rectangles.findIndex(
        (rect) => rect.key === key
      );
      state.rectangles[selectedIndex].isMouseDown = isMouseDown;
    },
    modifyBounds(state, action) {
      const { bounds, key } = action.payload;
      const selectedIndex = state.rectangles.findIndex(
        (rect) => rect.key === key
      );
      state.rectangles[selectedIndex].bounds = bounds;
      return state;
    },
    selectRectangle(state, action) {
      const { selectedKey } = action.payload;
      state.rectangles.forEach((rect) => {
        const isSelected = rect.key === selectedKey;
        rect.editable = isSelected;
        rect.draggable = isSelected;
      });
    },
    setCenter(state, action) {
      const { center } = action.payload;
      state.center = center;
      return state;
    },
  },
});

export const {
  createRectangle,
  removeRectangle,
  modifyBounds,
  setAddShape,
  selectRectangle,
  setCenter,
  setMouseDownState,
} = mapSlice.actions;
export default mapSlice;
