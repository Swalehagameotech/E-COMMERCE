import { useState, useEffect } from 'react';
import { Edit, Trash2, Search } from 'lucide-react';
import adminAPI from '../../utils/adminAPI';
import EditProductModal from './EditProductModal';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllProducts();
      if (response.success) {
        setProducts(response.data);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Error loading products');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (productId, category) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await adminAPI.deleteProduct(productId, category);
      if (response.success) {
        setProducts(products.filter((p) => p._id !== productId));
        alert('Product deleted successfully');
      } else {
        alert('Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Error deleting product');
    }
  };

  const handleUpdateSuccess = () => {
    fetchProducts();
    setEditingProduct(null);
  };

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-3xl font-serif font-bold text-primary mb-2">View Products</h1>
        <p className="text-gray-600">Manage all products from all collections</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-primary/5 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-primary/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-primary/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-secondary/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-16 w-16 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src =
                            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                        }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-primary">{product.name}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {product.description?.substring(0, 50)}...
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-secondary text-primary capitalize">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-primary">{product.stock || 0}</td>
                    <td className="px-6 py-4 text-sm text-primary">
                      ₹{product.price?.toLocaleString('en-IN')}
                      {product.discounted_price && (
                        <span className="text-gray-400 line-through ml-2">
                          ₹{product.discounted_price.toLocaleString('en-IN')}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <h3
                          onClick={() => handleEdit(product)}
                          className="text-black hover:text-accent-dark p-2 rounded"
                        >
                          <Edit className="h-4 w-4" />
                        </h3>
                        <h3
                          onClick={() => handleDelete(product._id, product.category)}
                          className="text-red-600 hover:text-red-700 p-2 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </h3>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default ViewProducts;
