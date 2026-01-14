import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import Hero from './Hero';
import Footer from './Footer';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <>
        <Hero />
        <div className="min-h-screen pt-44 px-4  bg-gradient-to-br from-[#EDDFE0] to-[#FFECC8] ">
        <div className="max-w-4xl mx-auto my-2 sm:-my-0">
          <div className=" rounded-lg shadow-md bg-gradient-to-r from-[#FFD6E0] via-[#F6DFEB] to-[#FFD6E0] p-8 text-center">
            <h2 className="text-2xl font-bold  text-[#896C6C] mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <button
              onClick={() => navigate('/home')}
              className="bg-[#896C6C] hover:bg-[#896C6C] text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
      <Footer />
      </>
    );
  }

  const total = getCartTotal();
  const deliveryCharges = 50;
  const finalTotal = total + deliveryCharges;

  return (
    <>
      <Hero />
      <div className="min-h-screen  bg-gradient-to-br from-[#EDDFE0] to-[#FFECC8] pt-28 px-2 sm:px-4 md:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-gradient-to-r from-[#FFD6E0] via-[#F6DFEB] to-[#FFD6E0] rounded-lg shadow-md p-4 sm:p-6 flex flex-col sm:flex-row gap-4"
              >
                {/* Product Image */}
                <div className="w-full sm:w-32 h-32 sm:h-32 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                </div>

                {/* Product Details */}
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-[#8F4F4F] font-bold text-lg mb-4">
                    ₹{item.price.toLocaleString('en-IN')}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="ml-auto text-red-600 hover:text-red-700 p-2"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mt-2">
                    Subtotal: ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-[#8F4F4F] mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  <span>₹{deliveryCharges}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-[#8F4F4F]">
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-gradient-to-br from-[#BB7171] to-[#FFECC8] hover:bg-gradient-to-br from-[#BB7171] to-[#FFECC8] text-[#4E3440] font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Cart;
