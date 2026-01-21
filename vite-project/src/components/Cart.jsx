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
        <div className="min-h-screen pt-44 px-4 bg-secondary">
          <div className="max-w-4xl mx-auto my-2 sm:-my-0">
            <div className="rounded-2xl shadow-sm border border-primary/5 bg-white p-12 text-center">
              <h2 className="text-2xl font-bold font-serif text-primary mb-4">Your Cart is Empty</h2>
              <p className="text-gray-500 mb-8 font-medium">Add some products to get started!</p>
              <button
                onClick={() => navigate('/home')}
                className="bg-primary hover:bg-white hover:text-primary border border-transparent hover:border-primary text-white font-bold tracking-widest uppercase text-sm py-3 px-8 transition-all duration-300"
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
      <div className="min-h-screen bg-secondary pt-40 sm:pt-44 md:pt-48 px-2 sm:px-4 md:px-6 lg:px-8 py-8">

        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-primary mb-6">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-sm border border-primary/5 p-4 sm:p-6 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <div className="w-full sm:w-32 h-32 sm:h-32 flex-shrink-0 bg-secondary rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold font-serif text-primary mb-2">{item.name}</h3>
                    <p className="text-accent font-bold text-lg mb-4">
                      ₹{((item.discounted_price || item.original_price || item.price || 0)).toLocaleString('en-IN')}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-primary/20 rounded hover:bg-primary hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="text-lg font-medium w-8 text-center text-primary">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-primary/20 rounded hover:bg-primary hover:text-white transition-colors"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="ml-auto text-gray-400 hover:text-red-500 p-2 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <p className="text-sm text-gray-500 mt-2 font-medium">
                      Subtotal: ₹{(((item.discounted_price || item.original_price || item.price || 0)) * (item.quantity || 1)).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-primary/5 p-6 sticky top-24">
                <h2 className="text-xl font-bold font-serif text-primary mb-6">Order Summary</h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cart.length} items)</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charges</span>
                    <span>₹{deliveryCharges}</span>
                  </div>
                  <div className="border-t border-primary/10 pt-4 flex justify-between text-lg font-bold text-primary">
                    <span>Total</span>
                    <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/order-review', { state: { items: cart, fromCart: true } })}
                  className="w-full bg-[#A02E4C]  hover:bg-white hover:text-primary border border-transparent hover:border-primary text-white font-bold tracking-widest uppercase text-sm py-4 px-4 transition-all duration-300"
                >
                  Buy now
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
