import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Users/Forms/Login";
import RegisterForm from "./components/Users/Forms/RegisterForm";
import Navbar from "./components/Navbar/Navbar";
import CustomerProfile from "./components/Users/Profile/CustomerProfile";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageCoupons from "./components/Admin/Coupons/ManageCoupons";
import AddCoupon from "./components/Admin/Coupons/AddCoupon";
import AddProduct from "./components/Admin/Products/AddProduct";
import OrderPayment from "./components/Users/Products/OrderPayment";
import ManageCategories from "./components/Admin/Categories/ManageCategories";
import UpdateProduct from "./components/Admin/Products/UpdateProduct";
import ManageStocks from "./components/Admin/Products/ManageStocks";
import CategoryToAdd from "./components/Admin/Categories/CategoryToAdd";
import AddCategory from "./components/Admin/Categories/AddCategory";
import AddBrand from "./components/Admin/Categories/AddBrand";
import AddColor from "./components/Admin/Categories/AddColor";
import UpdateCoupon from "./components/Admin/Coupons/UpdateCoupon";
import UpdateCategory from "./components/Admin/Categories/UpdateCategory";
import OrdersList from "./components/Admin/Orders/OdersList";
import ManageOrders from "./components/Admin/Orders/ManageOrders";
import BrandsColorsList from "./components/Admin/Categories/BrandsColorsList";
import Customers from "./components/Admin/Orders/Customers";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import AdminRoute from "./components/AuthRoute/AdminRoute";
import HomePage from "./components/HomePage/HomePage";
import Product from "./components/Users/Products/Product";
import AllCategories from "./components/HomePage/AllCategories";
import ProductsFilters from "./components/Users/Products/ProductsFilters";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* user */}
        <Route
          path="admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          {/* products */} <Route path="" element={<OrdersList />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="manage-products" element={<ManageStocks />} />
          <Route path="products/edit/:id" element={<UpdateProduct />} />
          {/* coupons */}
          <Route path="add-coupon" element={<AddCoupon />} />
          <Route path="manage-coupon" element={<ManageCoupons />} />
          <Route path="manage-coupon/edit/:code" element={<UpdateCoupon />} />
          {/* Category */}
          <Route path="category-to-add" element={<CategoryToAdd />} />{" "}
          <Route path="add-category" element={<AddCategory />} />
          <Route path="manage-category" element={<ManageCategories />} />
          <Route path="edit-category/:id" element={<UpdateCategory />} />
          {/* brand category */}
          <Route path="add-brand" element={<AddBrand />} />
          <Route path="all-brands" element={<BrandsColorsList />} />
          {/* color category */}
          <Route path="add-color" element={<AddColor />} />
          <Route path="all-colors" element={<BrandsColorsList />} />
          {/* Orders */}
          <Route path="manage-orders" element={<ManageOrders />} />
          <Route path="order-payment" element={<OrderPayment />} />
          <Route path="customers" element={<Customers />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="customer-profile" element={<CustomerProfile />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="all-categories" element={<AllCategories />} />
        <Route path="products-filters" element={<ProductsFilters />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
