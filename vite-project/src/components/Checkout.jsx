import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import orderAPI from '../utils/orderAPI';
import OrderConfirmationModal from './OrderConfirmationModal';
import Hero from './Hero';
import Footer from './Footer';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if this is a "Buy Now" purchase
  const buyNowProduct = location.state?.buyNowProduct;

  // Use buyNowProduct if available, otherwise use cart
  const displayItems = buyNowProduct
    ? [{ ...buyNowProduct, quantity: 1 }]
    : cart;

  const subtotal = buyNowProduct
    ? (buyNowProduct.discounted_price || buyNowProduct.original_price || buyNowProduct.price || 0)
    : getCartTotal();
  const deliveryCharges = 50;
  const total = subtotal + deliveryCharges;

  const handlePlaceOrder = async () => {
    if (paymentMethod !== 'cod') return;

    setLoading(true);
    setError(null);

    try {
      const items = displayItems.map(item => ({
        productId: item._id || item.productId,
        name: item.name,
        price: item.discounted_price || item.original_price || item.price || 0,
        quantity: item.quantity || 1,
        image: item.image || '',
      }));

      const response = await orderAPI.createOrder(items, total);
      console.log('Order API Response:', response);

      if (response && response.success) {
        console.log('Setting showModal to true');
        // Show modal first, then clear cart after a delay to prevent component unmount
        setShowModal(true);
        if (!buyNowProduct) {
          // Clear cart after modal is shown to prevent early return
          setTimeout(() => {
            clearCart();
          }, 200);
        }
      } else {
        const errorMessage = response?.message || 'Failed to place order. Please try again.';
        setError(errorMessage);
        console.log('Order failed:', errorMessage);
      }
    } catch (err) {
      console.error('Error placing order:', err);
      // Handle axios error responses
      if (err.response && err.response.data) {
        const errorMessage = err.response.data.message || 'Failed to place order. Please try again.';
        setError(errorMessage);
      } else {
        setError('Error placing order. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Debug: Log when showModal changes
  useEffect(() => {
    console.log('showModal state changed:', showModal);
  }, [showModal]);

  const handleCloseModal = () => {
    console.log('Closing modal and navigating');
    setShowModal(false);
    // Small delay to ensure modal closes smoothly before navigation
    setTimeout(() => {
      navigate('/home');
    }, 100);
  };

  // Don't show empty state if modal is open - keep showing checkout until modal is closed
  if (displayItems.length === 0 && !showModal) {
    return (
      <>
        <Hero />
        <div className="min-h-screen pt-20 px-4 bg-secondary">
          <div className="max-w-4xl mx-auto mt-2 sm:mt-44">
            <div className="bg-white rounded-2xl shadow-sm border border-primary/5 p-8 text-center">
              <h2 className="text-2xl font-bold font-serif text-primary mb-4">
                No Items to Checkout
              </h2>
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

  return (
    <>
      <Hero />
      <div className="min-h-screen bg-secondary pt-20 px-2 sm:px-4 md:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-primary mb-6 mt-10">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-primary/5 p-4 sm:p-6">
                <h2 className="text-xl font-bold font-serif text-primary mb-4">Order Details</h2>
                <div className="space-y-4">
                  {displayItems.map((item) => (
                    <div key={item._id} className="flex items-center gap-4 pb-4 border-b border-primary/5 last:border-0 last:pb-0">
                      <div className="w-16 h-16 bg-secondary rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-primary">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity} × ₹{((item.original_price || item.price || item.discounted_price || 0)).toLocaleString('en-IN')}
                        </p>
                      </div>
                      <p className="font-bold text-accent">
                        ₹{(((item.original_price || item.price || item.discounted_price || 0)) * (item.quantity || 1)).toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-primary/5 p-6 sticky top-24">
                <h2 className="text-xl font-bold font-serif text-primary mb-4">Payment Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charges</span>
                    <span>₹{deliveryCharges}</span>
                  </div>
                  <div className="border-t border-primary/10 pt-3 flex justify-between text-lg font-bold text-primary">
                    <span>Total</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <h3 className="font-semibold text-primary mb-3">Payment Method</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border border-accent rounded-lg cursor-pointer bg-secondary">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="font-medium text-primary">Cash on Delivery (COD)</span>
                    </label>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}
                <button
                  onClick={handlePlaceOrder}
                  disabled={paymentMethod !== 'cod' || loading}
                  className="w-full bg-primary hover:bg-white hover:text-primary disabled:bg-gray-300 disabled:cursor-not-allowed border border-transparent hover:border-primary text-white font-bold tracking-widest uppercase text-sm py-4 px-4 transition-all duration-300"
                >
                  {loading ? 'Placing Order...' : 'Buy Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      {showModal && <OrderConfirmationModal onClose={handleCloseModal} />}
      <Footer />
    </>
  );
};

export default Checkout;
