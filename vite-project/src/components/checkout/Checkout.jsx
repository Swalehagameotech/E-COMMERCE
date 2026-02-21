import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import AddressModal from './AddressModal';
import OrderConfirmationModal from './OrderConfirmationModal';
import { auth } from '../../utils/firebase';
import { API_ENDPOINTS } from '../../config/apiConfig';
import Hero from '../Hero';
import Footer from '../Footer';

const Checkout = () => {
    const { cart, getTotalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [checkoutItems, setCheckoutItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [user, setUser] = useState(null);
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setInitializing(false);
            if (!currentUser) {
                // Optional: redirect to login if not authenticated
                // navigate('/login'); 
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!initializing) {
            if (location.state?.items) {
                setCheckoutItems(location.state.items);
                setTotal(location.state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0));
            } else {
                setCheckoutItems(cart);
                setTotal(getTotalPrice());
                if (cart.length === 0) {
                    navigate('/cart');
                }
            }
            if (location.state?.selectedAddress) {
                setSelectedAddress(location.state.selectedAddress);
            }
        }
    }, [cart, location.state, navigate, getTotalPrice, initializing]);

    if (initializing) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen pt-24 px-4 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login to Checkout</h2>
                <button
                    onClick={() => navigate('/login')}
                    className="bg-primary text-white px-6 py-2 rounded-lg"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            alert('Please select a delivery address');
            return;
        }

        setLoading(true);
        try {
            const email = selectedAddress.email || (auth.currentUser?.email);

            const payload = {
                items: checkoutItems,
                totalPrice: total,
                email: email,
            };

            const res = await fetch(API_ENDPOINTS.ORDERS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-firebase-uid': auth.currentUser.uid,
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (data.success) {
                setIsOrderModalOpen(true);
                // Clear cart if we came from cart or if we are using default cart items (no state)
                if (location.state?.fromCart || !location.state?.items) {
                    clearCart();
                }
            } else {
                alert(data.message || 'Failed to place order');
            }
        } catch (error) {
            console.error('Order error:', error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Hero />
            <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left Column: Address & Payment */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Address Section */}
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-800">Delivery Address</h2>
                                    <button
                                        onClick={() => setIsAddressModalOpen(true)}
                                        className="text-white hover:text-accent font-medium text-sm"
                                    >
                                        {selectedAddress ? 'Change' : 'Select'}
                                    </button>
                                </div>

                                {selectedAddress ? (
                                    <div className="border border-green-100 bg-green-50 p-4 rounded-lg">
                                        <p className="font-semibold text-gray-800">{selectedAddress.name}</p>
                                        <p className="text-gray-600">{selectedAddress.addressLine}, {selectedAddress.city}</p>
                                        <p className="text-gray-600">{selectedAddress.state} - {selectedAddress.zip}</p>
                                        <p className="text-gray-600">Phone: {selectedAddress.phone}</p>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => setIsAddressModalOpen(true)}
                                        className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors"
                                    >
                                        <p>No address selected</p>
                                        <span className="text-sm text-primary mt-1">Click to add address</span>
                                    </div>
                                )}
                            </div>

                            {/* Payment Section */}
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h2>
                                <div className="flex items-center gap-4 p-4 border border-primary/20 bg-primary/5 rounded-lg">
                                    <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    <span className="font-medium text-gray-800">Cash on Delivery (COD)</span>
                                </div>
                            </div>

                        </div>

                        {/* Right Column: Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>

                                <div className="space-y-4 max-h-60 overflow-y-auto pr-2 mb-4 scrollbar-thin">
                                    {checkoutItems.map((item, index) => (
                                        <div key={`${item.productId || item.id || index}-${index}`} className="flex gap-3">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                <p className="text-sm font-semibold text-primary">₹{item.price * item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-100 pt-4 space-y-2">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>₹{total}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="text-green-600">Free</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-100 mt-2">
                                        <span>Total</span>
                                        <span>₹{total}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={loading || !selectedAddress}
                                    className="w-full mt-6 py-3 bg-[#A02E4C]  text-white rounded-xl font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20"
                                >
                                    {loading ? 'Processing...' : 'Place Order'}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                <AddressModal
                    isOpen={isAddressModalOpen}
                    onClose={() => setIsAddressModalOpen(false)}
                    onSelectAddress={setSelectedAddress}
                    selectedAddressId={selectedAddress?._id}
                    user={user}
                />

                <OrderConfirmationModal
                    isOpen={isOrderModalOpen}
                    onClose={() => {
                        setIsOrderModalOpen(false);
                        navigate('/orders');
                    }}
                />
            </div>
            <Footer />
        </>
    );
};

export default Checkout;
