import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import ReturnPolicy from "./pages/ReturnPolicy";
import Disclaimer from "./pages/Disclaimer";
import Contact from "./pages/ContactUs";
import ShippingPolicy from "./pages/ShippingPolicy";
import "./styles/global.css";
import FAQ from "./pages/FAQ";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import ScrollToTop from "./pages/ScrollToTop";
import Profile from "./pages/Profile";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminUsers from "./admin/AdminUsers";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
function App() {
  return (
    
    <Router>
     <ScrollToTop /> 
       
      <Navbar />
      
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/returns" element={<ReturnPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shipping" element={<ShippingPolicy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="login" element={<Login />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path= "/oder-sucess" element={<OrderSuccess />} />
        <Route path="/admin" element={<AdminLayout />}>

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="users" element={<AdminUsers />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
      </Route>
        <Route 
    path="/profile" 
    element={
        <Profile>
            <Profile />
        </Profile>
    } 
/>

      </Routes>

      
      <Footer />
      
    </Router>
  );
}

export default App;