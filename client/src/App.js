import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import PrivateRoute from "./components/Routes/Private";
import PublicRoute from "./components/Routes/Public";

// Lazy loading components for better performance
const Homepage = lazy(() => import("./pages/Homepage"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Policy = lazy(() => import("./pages/Policy"));
const Pagenotfound = lazy(() => import("./pages/Pagenotfound"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Dashboard = lazy(() => import("./pages/user/Dashboard"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));
const AdminRoute = lazy(() => import("./components/Routes/AdminRoute"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const CreateCategory = lazy(() => import("./pages/Admin/CreateCategory"));
const CreateProduct = lazy(() => import("./pages/Admin/CreateProduct"));
const Users = lazy(() => import("./pages/Admin/Users"));
const Orders = lazy(() => import("./pages/user/Orders"));
const Profile = lazy(() => import("./pages/user/Profile"));
const Products = lazy(() => import("./pages/Admin/Products"));
const UpdateProduct = lazy(() => import("./pages/Admin/UpdateProduct"));
const Search = lazy(() => import("./pages/Search"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Categories = lazy(() => import("./pages/Categories"));
const CategoryProduct = lazy(() => import("./pages/CategoryProduct"));
const CartPage = lazy(() => import("./pages/CartPage"));
const AdminOrders = lazy(() => import("./pages/Admin/AdminOrders"));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />

        {/* Auth Routes - Only accessible when not logged in */}
        <Route element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected Routes - Only accessible when logged in */}
        <Route element={<PrivateRoute />}>
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/dashboard/user" element={<Dashboard />} />
          <Route path="/dashboard/user/orders" element={<Orders />} />
          <Route path="/dashboard/user/profile" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </Suspense>
  );
}

export default App;