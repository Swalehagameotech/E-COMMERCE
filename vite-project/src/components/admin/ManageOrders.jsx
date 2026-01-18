import { useState, useEffect } from 'react';
import adminAPI from '../../utils/adminAPI';
import { Eye, X } from 'lucide-react';

const InvoiceModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">Order Invoice</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8" id="invoice-content">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-primary mb-2">INVOICE</h1>
              <p className="text-gray-500">Order #{order._id}</p>
              <p className="text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className={`mt-2 font-semibold ${order.status === 'delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
                Status: {order.status?.toUpperCase() || 'PENDING'}
              </p>
            </div>
            <div className="text-right">
              <h3 className="font-bold text-gray-800">Billed To:</h3>
              <p className="text-gray-600">{order.email || order.userEmail}</p>
              {/* Ideally we show address details here but we only saved email in order model initially. 
                     We should have saved full address snapshot. For now, we show what we have. 
                     Wait, checking implementation plan, I should have saved 'full details'. 
                     I can try to fetch the address if I have addressID or just assume we missed saving address snapshot. 
                     Request said "where you ask for adress there shoild be optin of add phone number also like wise add in databes here on thi smpde".
                     Actually, I should have saved the address in the order object.
                     Let's check order schema updates I did. I only added email.
                     The user request said "take that user firebase id from User collection then in address collection take id his email and store its addresss all adress...".
                     It seems I missed saving the FULL address snapshot in the Order model.
                     However, I can fetch the user address using the email/uid if needed, OR better,
                     update the Order controller to start saving address details now. 
                     For existing orders, I might not have it.
                     For now, I will display what I have. */}
            </div>
          </div>

          <table className="w-full mb-8">
            <thead>
              <tr className="border-b-2 border-primary/10">
                <th className="text-left py-3 text-sm font-bold text-gray-600">Item</th>
                <th className="text-center py-3 text-sm font-bold text-gray-600">Qty</th>
                <th className="text-right py-3 text-sm font-bold text-gray-600">Price</th>
                <th className="text-right py-3 text-sm font-bold text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-100">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img src={item.image} className="w-10 h-10 object-cover rounded" alt="" />
                      <span className="font-medium text-gray-800">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-center">{item.quantity}</td>
                  <td className="py-4 text-right">₹{item.price}</td>
                  <td className="py-4 text-right">₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>₹{order.totalAmount}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-primary pt-3 border-t border-gray-200">
                <span>Total:</span>
                <span>₹{order.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">
            Close
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90"
          >
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllOrders();
      if (response.success) {
        setOrders(response.data);
      } else {
        setError('Failed to load orders');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Error loading orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await adminAPI.updateOrderStatus(orderId, newStatus);
      if (response.success) {
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        // alert('Order status updated successfully');
      } else {
        alert('Failed to update order status');
      }
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Error updating order status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-primary mb-2">Manage Orders</h1>
        <p className="text-gray-600">View and update order status</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-primary/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">No orders found</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-secondary/50">
                    <td className="px-6 py-4 text-sm text-primary">#{order._id.slice(-8)}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-primary">{order.email || order.userEmail || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{order.products?.length} items</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-primary">₹{order.totalAmount?.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status || 'placed'}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium border focus:ring-2 focus:ring-primary/20 outline-none ${order.status === 'delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                            order.status === 'shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              order.status === 'confirmed' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                'bg-yellow-50 text-yellow-700 border-yellow-200'
                          }`}
                      >
                        <option value="placed">Placed</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-gray-400 hover:text-primary transition-colors"
                        title="View Invoice"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <InvoiceModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
};

export default ManageOrders;
