import { CheckCircle } from 'lucide-react';

const OrderConfirmationModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 sm:p-8 animate-fade-in">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            Order Placed Successfully!
          </h2>
          
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Your order has been successfully placed. You will receive a confirmation shortly.
          </p>
          
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
