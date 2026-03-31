import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

export const getCart = createAsyncThunk('cart/getCart', async () => {
  const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`);
  return res.data.data; 
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: {},
    cartList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.cartList = action.payload.carts;
    });
  },
});

export default cartSlice.reducer;