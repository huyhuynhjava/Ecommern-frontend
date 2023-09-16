import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/usersSlice";
import productReducer from "../slices/products/productSlice";
import brandReducer from "../slices/categories/brandSlice";
import categoryReducer from "../slices/categories/categoriesSlice";
import colorReducer from "../slices/categories/colorSlice";
//store
const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandReducer,
    colors: colorReducer,
  },
});

export default store;
