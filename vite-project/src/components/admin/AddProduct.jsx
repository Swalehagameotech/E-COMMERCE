import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminAPI from '../../utils/adminAPI';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
    discounted_price: '',
    stock: '',
    category: '',
    subcategory: '',
    brand_name: '',
    material: '',
    color: '',
    stars: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const categories = [
    'accessories',
    'footwear',
    'fashion',
    'others',
    'discount',
    'newarrival',
    'trending',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.category) {
        setError('Please select a category');
        setLoading(false);
        return;
      }
      if (!formData.subcategory || !formData.subcategory.trim()) {
        setError('Please enter a subcategory');
        setLoading(false);
        return;
      }

      // Validate numeric fields
      if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
        setError('Please enter a valid price');
        setLoading(false);
        return;
      }
      if (!formData.stock || isNaN(parseInt(formData.stock)) || parseInt(formData.stock) < 0) {
        setError('Please enter a valid stock quantity');
        setLoading(false);
        return;
      }

      // Build product data and filter out undefined/null/empty values
      const productData = {
        name: formData.name.trim(),
        image: formData.image.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category,
        subcategory: formData.subcategory.trim(),
        stars: parseFloat(formData.stars) || 0,
      };

      // Add optional fields only if they have values
      if (formData.discounted_price && formData.discounted_price.trim()) {
        productData.discounted_price = parseFloat(formData.discounted_price);
      }
      if (formData.brand_name && formData.brand_name.trim()) {
        productData.brand_name = formData.brand_name.trim();
      }
      if (formData.material && formData.material.trim()) {
        productData.material = formData.material.trim();
      }
      if (formData.color && formData.color.trim()) {
        productData.color = formData.color.trim();
      }

      console.log('📤 Sending product data:', { category: formData.category, productData });
      
      const response = await adminAPI.addProduct(productData);
      console.log('📥 Response from API:', response);
      
      if (response && response.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          name: '',
          image: '',
          description: '',
          price: '',
          discounted_price: '',
          stock: '',
          category: '',
          subcategory: '',
          brand_name: '',
          material: '',
          color: '',
          stars: '',
        });
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        const errorMsg = response?.message || response?.error || 'Failed to add product. Please check all fields.';
        console.error('❌ API Error:', errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      console.error('❌ Error adding product:', err);
      console.error('❌ Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      // Better error handling - show the actual error message from the backend
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          err.message || 
                          'Error adding product. Please check the server console for details.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-primary mb-2">Add Product</h1>
        <p className="text-gray-600">Add a new product to your store</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-primary/5 p-6">
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3 text-green-700">
            Product added successfully!
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-primary/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-primary/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="mt-2 h-24 w-24 object-cover rounded-lg border border-primary/10"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-primary mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-3 py-2 border border-primary/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-primary/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Discounted Price
              </label>
              <input
                type="number"
                name="discounted_price"
                value={formData.discounted_price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-primary/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-primary/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-primary/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toLowerCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Subcategory <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-primary/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">Brand Name</label>
              <input
                type="text"
                name="brand_name"
                value={formData.brand_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-primary/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">Material</label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-primary/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-primary/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">Stars (0-5)</label>
              <input
                type="number"
                name="stars"
                value={formData.stars}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                className="w-full px-3 py-2 border border-primary/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-primary/10">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-6 py-2 border border-primary/20 text-primary rounded-lg hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
