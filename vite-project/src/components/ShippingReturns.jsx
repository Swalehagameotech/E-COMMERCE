import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck, Clock, MapPin, Package, CheckCircle } from 'lucide-react';
import Hero from './Hero';
import Footer from './Footer';

const ShippingReturns = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
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
              Shipping Information
            </h1>
            <p className="text-lg text-gray-600">
              Everything you need to know about shipping and delivery.
            </p>
          </div>

          {/* Shipping Options */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Options</h2>
            
            <div className="space-y-6">
              {/* Standard Shipping */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Truck className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Standard Shipping</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 font-medium">5-7 business days</p>
                    <p className="text-sm text-gray-500">Free on orders above ₹500</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Our standard shipping option delivers your order within 5-7 business days. 
                      Orders are processed within 1-2 business days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Express Shipping */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-6 w-6 text-orange-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Express Shipping</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 font-medium">2-3 business days</p>
                    <p className="text-sm text-gray-500">₹199</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Need it faster? Express shipping delivers your order within 2-3 business days. 
                      Orders placed before 2 PM are processed the same day.
                    </p>
                  </div>
                </div>
              </div>

              {/* Same Day Delivery */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="h-6 w-6 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Same Day Delivery</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 font-medium">Same day</p>
                    <p className="text-sm text-gray-500">₹299 (Select cities only)</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Available in Mumbai, Delhi, Bangalore, and Hyderabad. 
                      Order before 12 PM for same-day delivery. Subject to availability and location.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Process */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Process</h2>
            
            <div className="grid md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Order Placed</h4>
                <p className="text-sm text-gray-600">You place your order and receive a confirmation email</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-orange-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Order Processing</h4>
                <p className="text-sm text-gray-600">We prepare your order (1-2 business days)</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Order Shipped</h4>
                <p className="text-sm text-gray-600">Your order is dispatched and you receive tracking details</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-yellow-600 font-bold">4</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Out for Delivery</h4>
                <p className="text-sm text-gray-600">Your order is on its way to you</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Delivered</h4>
                <p className="text-sm text-gray-600">Your order arrives at your doorstep</p>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Time</h3>
                <p className="text-gray-600">
                  All orders are processed within 1-2 business days (excluding weekends and holidays). 
                  Orders placed after 2 PM will be processed the next business day.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Delivery Areas</h3>
                <p className="text-gray-600">
                  We ship to all major cities and towns across India. For remote locations, 
                  delivery may take additional 2-3 business days. International shipping is not currently available.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tracking Your Order</h3>
                <p className="text-gray-600">
                  Once your order is shipped, you'll receive a tracking number via email and SMS. 
                  You can track your order status in real-time through your account dashboard or by using the tracking link provided.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Delivery Attempts</h3>
                <p className="text-gray-600">
                  Our delivery partner will attempt delivery up to 3 times. If delivery fails, 
                  your order will be returned to us. Please ensure someone is available to receive the package or provide accurate delivery instructions.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Undeliverable Packages</h3>
                <p className="text-gray-600">
                  If a package is returned to us due to an incorrect address or failed delivery attempts, 
                  we'll contact you to arrange reshipment. Additional shipping charges may apply.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help with Shipping?</h3>
                <p className="text-gray-600 mb-3">
                  If you have questions about your shipment or need assistance, our customer service team is here to help.
                </p>
                <a 
                  href="/contact" 
                  className="inline-block     bg-[#A02E4C]  hover:bg-[#cb4d6f] text-white font-semibold      py-2 px-6 rounded-lg transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShippingReturns;