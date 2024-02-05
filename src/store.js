import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./features/imageSlice";
import imageDataSlice from "./features/imageDataSlice";

const store = configureStore({
  reducer: {
    images: imageReducer,
    imageData: imageDataSlice,
  },
});

export default store;
