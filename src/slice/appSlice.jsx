import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isFullPageLoading: false,
  },
  reducers: {
    setIsFullPageLoading: (state, action) => {
      state.isFullPageLoading = action.payload;
    },
  },
});

export const { setIsFullPageLoading } = appSlice.actions;
export default appSlice.reducer;