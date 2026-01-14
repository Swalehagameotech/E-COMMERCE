import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Products from './components/Products';
import Footwear from './components/Footwear';
import Fashion from './components/Fashion';
import Others from './components/Others';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import About from './components/About';
import Contact from './components/Contact';
import Orders from './components/Orders';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/footwear" element={<Footwear />} />
          <Route path="/fashion" element={<Fashion />} />
          <Route path="/others" element={<Others />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
