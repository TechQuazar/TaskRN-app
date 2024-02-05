import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: "images",
  initialState: {
    image: null,
  },
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const { setImage } = imageSlice.actions;
export const selectImage = (state) => state.image.image;
export default imageSlice.reducer;
