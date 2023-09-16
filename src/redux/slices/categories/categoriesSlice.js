import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalAction/globalAction";
const initialState = {
  category: {},
  categories: [],
  loading: false,
  error: null,
  isUpdated: false,
  isAdded: false,
  isDeleted: false,
};
export const createcategoryAction = createAsyncThunk(
  "category/create",
  async ({ name, file }, { rejectWithValue, getState, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", file);
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.post(
        `${baseURL}/categories`,
        formData,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

export const fetchCategoriesAction = createAsyncThunk(
  "category/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/categories`);

      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);
const categorySlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createcategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createcategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.isAdded = true;
      state.categories.categories = [
        ...state.categories.categories,
        action.payload.category,
      ];
    });
    builder.addCase(createcategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.category = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //categori fetch
    builder.addCase(fetchCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.categories = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    builder.addCase(resetErrorAction.pending, (state, action) => {
      state.error = null;
    });
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
    });
  },
});
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
