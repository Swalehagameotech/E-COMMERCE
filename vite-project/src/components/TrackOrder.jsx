import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Package, Truck, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import Hero from './Hero';
import Footer from './Footer';

const TrackOrder = () => {
  const navigate = useNavigate();
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock tracking data
      setTrackingResult({
        orderId: trackingInput,
        status: 'In Transit',
        estimatedDelivery: '2024-01-25',
        currentLocation: 'Mumbai Distribution Center',
        timeline: [
          {
            status: 'Order Placed',
            date: '2024-01-20',
            time: '10:30 AM',
            completed: true,
            description: 'Your order has been confirmed'
          },
          {
            status: 'Order Processed',
            date: '2024-01-21',
            time: '2:15 PM',
            completed: true,
            description: 'Your order has been processed and packed'
          },
          {
            status: 'Shipped',
            date: '2024-01-22',
            time: '9:00 AM',
            completed: true,
            description: 'Your order has been shipped from our warehouse'
          },
          {
            status: 'In Transit',
            date: '2024-01-23',
            time: '11:45 AM',
            completed: true,
            description: 'Your order is on its way to you'
          },
          {
            status: 'Out for Delivery',
            date: '2024-01-25',
            time: 'Expected',
            completed: false,
            description: 'Your order will be out for delivery'
          },
          {
            status: 'Delivered',
            date: '2024-01-25',
            time: 'Expected',
            completed: false,
            description: 'Your order will be delivered'
          }
        ]
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Arrow */}
      <button
        onClick={handleBackClick}
        className="fixed top-20 left-4 z-[110] bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <Hero />
      
      <div className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Track Your Order
            </h1>
            <p className="text-lg text-gray-600">
              Enter your order ID or tracking number to check the status of your order.
            </p>
          </div>

          {/* Tracking Form */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <form onSubmit={handleTrackOrder} className="space-y-4">
              <div>
                <label htmlFor="tracking" className="block text-sm font-medium text-gray-700 mb-2">
                  Order ID or Tracking Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="tracking"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder="Enter your order ID or tracking number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading || !trackingInput.trim()}
                className="w-full                        w-full bg-[#A02E4C]  hover:bg-[#cb4d6f] text-white font-semibold           py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Tracking...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    Track Order
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Tracking Results */}
          {trackingResult && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="border-b border-gray-200 pb-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Order #{trackingResult.orderId}</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {trackingResult.status}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Current Location:</span>
                    <span className="ml-2 font-medium">{trackingResult.currentLocation}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="ml-2 font-medium">{trackingResult.estimatedDelivery}</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Timeline</h3>
                {trackingResult.timeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      item.completed ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {item.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-4 mb-1">
                        <h4 className={`font-medium ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {item.status}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {item.date} {item.time}
                        </span>
                      </div>
                      <p className={`text-sm ${item.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Can't Find Your Order?</h2>
            <p className="text-gray-600 mb-6">
              If you're having trouble tracking your order, please contact our customer service team.
            </p>
            <a 
              href="/contact" 
              className="inline-block      hover:text-white bg-[#A02E4C]  hover:bg-[#cb4d6f] text-white font-semibold        py-3 px-8 rounded-lg transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TrackOrder;