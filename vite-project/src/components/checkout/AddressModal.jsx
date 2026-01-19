import { useState, useEffect } from 'react';
import { X, Plus, Home, Briefcase, MapPin } from 'lucide-react';
import { auth } from '../../utils/firebase';

const AddressModal = ({ isOpen, onClose, onSelectAddress, selectedAddressId, user }) => {
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        addressLine: '',
        city: '',
        state: '',
        zip: '',
        type: 'Home'
    });

    // const user = auth.currentUser; // Removed in favor of prop

    // Fetch addresses
    const fetchAddresses = async () => {
        if (!user || !user.email) return;
        try {
            const res = await fetch(`https://ecomm-backend-3r05.onrender.com/api/address/${user.email}`);
            const data = await res.json();
            setAddresses(data);
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchAddresses();
        }
    }, [isOpen, user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...formData,
                userEmail: user.email,
                firebaseUID: user.uid,
                email: user.email // Contact email
            };

            const res = await fetch('http://localhost:5000/api/address/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setShowForm(false);
                fetchAddresses();
                // Reset form
                setFormData({
                    name: '',
                    phone: '',
                    addressLine: '',
                    city: '',
                    state: '',
                    zip: '',
                    type: 'Home'
                });
            }
        } catch (error) {
            console.error('Error saving address:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-900">
                        {showForm ? 'Add New Address' : 'Select Delivery Address'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-6">
                    {!showForm ? (
                        <div className="space-y-4">
                            <button
                                onClick={() => setShowForm(true)}
                                className="w-full py-4 border-2 border-dashed border-primary/20 rounded-xl flex items-center justify-center gap-2 text-primary hover:bg-primary/5 transition-colors font-medium"
                            >
                                <Plus className="w-5 h-5" /> Add New Address
                            </button>

                            <div className="grid gap-4">
                                {addresses.map((addr) => (
                                    <div
                                        key={addr._id}
                                        onClick={() => {
                                            onSelectAddress(addr);
                                            onClose();
                                        }}
                                        className={`p-4 border rounded-xl cursor-pointer transition-all hover:border-primary/50 relative ${selectedAddressId === addr._id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200'
                                            }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`p-2 rounded-lg ${selectedAddressId === addr._id ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                                                {addr.type === 'Office' ? <Briefcase className="w-5 h-5" /> :
                                                    addr.type === 'Home' ? <Home className="w-5 h-5" /> :
                                                        <MapPin className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-semibold text-gray-900">{addr.name}</h3>
                                                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{addr.type}</span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-1">{addr.addressLine}, {addr.city}, {addr.state} - {addr.zip}</p>
                                                <p className="text-sm text-gray-500">Phone: {addr.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Line</label>
                                    <input
                                        name="addressLine"
                                        required
                                        value={formData.addressLine}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                    <input
                                        name="state"
                                        required
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                                    <input
                                        name="zip"
                                        required
                                        value={formData.zip}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                                    <div className="flex gap-4">
                                        {['Home', 'Office', 'Other'].map(type => (
                                            <label key={type} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value={type}
                                                    checked={formData.type === type}
                                                    onChange={handleInputChange}
                                                    className="text-primary focus:ring-primary"
                                                />
                                                <span className="text-sm text-gray-700">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : 'Save & Continue'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddressModal;
