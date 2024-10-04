import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
    },
    fetchProductsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearProducts(state) {
      state.items = []; // Clear old products
    },
  },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure, clearProducts } = productSlice.actions;

export const selectProducts = (state) => state.products.items;
export const selectLoading = (state) => state.products.loading;
export const selectError = (state) => state.products.error;

// Action to fetch all products with pagination
export const fetchProducts = (page = 1, productsPerPage = 10) => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const skip = (page - 1) * productsPerPage;
    const response = await axios.get(`https://dummyjson.com/products?skip=${skip}&limit=${productsPerPage}`);
    dispatch(fetchProductsSuccess(response.data.products));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export const fetchProductsByCategory = (category, page = 1, productsPerPage = 10) => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const skip = (page - 1) * productsPerPage;
    const response = await axios.get(`https://dummyjson.com/products/category/${category}?skip=${skip}&limit=${productsPerPage}`);
    dispatch(fetchProductsSuccess(response.data.products));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export default productSlice.reducer;
