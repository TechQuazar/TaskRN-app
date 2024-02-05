import { createSlice } from "@reduxjs/toolkit";

const imageDataSlice = createSlice({
  name: "imageData",
  initialState: {
    data: [],
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = imageDataSlice.actions;
export const selectImageData = (state) => state.imageData.data;
export default imageDataSlice.reducer;
