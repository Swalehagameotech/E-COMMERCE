import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle } from 'lucide-react';

const OrderConfirmationModal = ({ onClose }) => {
  const modalRef = useRef(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Focus the modal to ensure it's visible
    if (modalRef.current) {
      modalRef.current.focus();
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e) => {
    // Only close if clicking directly on the backdrop, not on the modal content
    if (e.target === e.currentTarget) {
      // Don't close on backdrop click - require button click
      // onClose();
    }
  };

  const modalContent = (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 sm:p-8 animate-fade-in border border-primary/5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-accent" />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-primary mb-3">
            Order Placed Successfully!
          </h2>

          <p className="text-primary/70 mb-8 text-sm sm:text-base font-medium">
            Your order has been successfully placed. You will receive a confirmation shortly.
          </p>

          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-primary hover:bg-white hover:text-primary border border-transparent hover:border-primary text-white font-bold tracking-widest uppercase text-sm py-3 px-8 transition-all duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default OrderConfirmationModal;
