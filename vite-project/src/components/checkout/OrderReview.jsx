import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import AddressModal from './AddressModal';
import Hero from '../Hero';
import Footer from '../Footer';
import { auth } from '../../utils/firebase';

const OrderReview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cart, getTotalPrice } = useCart();

    const [reviewItems, setReviewItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [user, setUser] = useState(null);

    // Initial Auth Check
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Load items
    useEffect(() => {
        if (location.state?.items) {
            setReviewItems(location.state.items);
            setTotal(location.state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0));
        } else {
            // Fallback to cart if valid
            if (cart.length > 0) {
                setReviewItems(cart);
                setTotal(getTotalPrice());
            } else {
                // No items found
                navigate('/cart');
            }
        }
    }, [location.state, cart, getTotalPrice, navigate]);

    const handleConfirmOrderClick = () => {
        if (!user) {
            alert("Please login to continue");
            navigate('/login');
            return;
        }
        setIsAddressModalOpen(true);
    };

    const handleAddressSelect = (address) => {
        // Navigate to final checkout with items and selected address
        navigate('/checkout', {
            state: {
                items: reviewItems,
                fromCart: location.state?.fromCart,
                selectedAddress: address
            }
        });
    };

    return (
        <>
            <Hero />
            <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-8 font-serif">Review Your Order</h1>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                        <div className="p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Items</h2>
                            <div className="divide-y divide-gray-100">
                                {reviewItems.map((item, idx) => (
                                    <div key={idx} className="py-4 flex gap-4">
                                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                                            <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-primary">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gray-50 p-6 border-t border-gray-100">
                            <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                                <span>Grand Total</span>
                                <span>₹{total.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={handleConfirmOrderClick}
                            className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-0.5"
                        >
                            Confirm Order
                        </button>
                    </div>
                </div>

                <AddressModal
                    isOpen={isAddressModalOpen}
                    onClose={() => setIsAddressModalOpen(false)}
                    onSelectAddress={handleAddressSelect}
                    user={user}
                />
            </div>
            <Footer />
        </>
    );
};

export default OrderReview;
