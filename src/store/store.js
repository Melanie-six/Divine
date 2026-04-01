import { configureStore } from '@reduxjs/toolkit';
import messageReducer from '../slice/messageSlice';
import cartReducer from '../slice/cartSlice';
import appReducer from '../slice/appSlice';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    cart: cartReducer,
    app: appReducer,
  },
});

export default store;
