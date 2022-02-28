import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  products_data: [],
  qr_data: {},
  selected_product: {},
  product_in_cart: [],
};

export const products = createSlice({
  name: 'products',
  initialState,
  reducers: {
    SET_PRODUCTS: (state, action) => {
      state.products = action.payload;
    },
    SET_CONSTANT_PRODUCTS: (state, action) => {
      state.products_data = action.payload;
    },
    SET_QR: (state, action) => {
      state.qr_data = action.payload;
    },
    SET_SELECTED_PRODUCT: (state, action) => {
      state.selected_product = action.payload;
    },
    ADD_PRODUCT_TO_CART: (state, action) => {
      state.product_in_cart = action.payload;
    },
  },
});

export const { SET_PRODUCTS, SET_CONSTANT_PRODUCTS, SET_QR, SET_SELECTED_PRODUCT, ADD_PRODUCT_TO_CART } = products.actions;

export default products.reducer;
