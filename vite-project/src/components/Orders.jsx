import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import orderAPI from '../utils/orderAPI';
import Hero from './Hero';
import Footer from './Footer';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderAPI.getOrders();
        if (response.success) {
          setOrders(response.data.orders || []);
        } else {
          setError('Failed to fetch orders');
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Error loading orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <>
        <Hero />
        <div className="min-h-screen pt-20 px-4 bg-secondary">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center border border-primary/10">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-primary">Loading orders...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Hero />
        <div className="min-h-screen bg-gray-50 pt-20 px-4 bg-secondary">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center border border-primary/10">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => navigate('/home')}
                className="bg-primary hover:bg-white hover:text-primary text-white font-medium py-2 px-6 rounded-lg transition-colors border border-transparent hover:border-primary"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (orders.length === 0) {
    return (
      <>
        <Hero />
        <div className="min-h-screen pt-20 px-4 bg-secondary">
          <div className="max-w-4xl mx-auto my-2 sm:my-0">
            <div className="bg-white rounded-lg shadow-md p-8 text-center border border-primary/10">
              <h2 className="text-2xl font-bold text-primary mb-4">No Orders Yet</h2>
              <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
              <button
                onClick={() => navigate('/home')}
                className="bg-primary hover:bg-white hover:text-primary text-white font-medium py-2 px-6 rounded-lg transition-colors border border-transparent hover:border-primary"
              >
                Start Shopping
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
        <div className="max-w-6xl mx-auto my-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-6">My Orders</h1>

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-primary/5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-600">
                      Order Date: {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <p className="text-lg font-bold text-primary">
                      Total: ₹{order.totalAmount.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {order.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 pb-3 border-b border-gray-100 last:border-0"
                    >
                      {product.image && (
                        <div className="w-16 h-16 bg-secondary rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain mix-blend-multiply"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                            }}
                          />
                        </div>
                      )}
                      <div className="flex-grow">
                        <h3 className="font-semibold text-primary">{product.name}</h3>
                        <p className="text-sm text-gray-600">
                          Quantity: {product.quantity} × ₹{((product.discounted_price || product.original_price || product.price || 0)).toLocaleString('en-IN')}
                        </p>
                      </div>
                      <p className="font-bold text-accent">
                        ₹{(((product.discounted_price || product.original_price || product.price || 0)) * (product.quantity || 1)).toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
