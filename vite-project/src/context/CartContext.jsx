import { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated } from '../utils/auth';
import { cartAPI } from '../utils/cartAPI';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // Load cart on mount
  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      const isAuth = isAuthenticated();

      if (isAuth) {
        // Load from MongoDB
        try {
          const response = await cartAPI.getCart();
          if (response.success) {
            // Transform cart items: productId -> _id for frontend compatibility
            const transformedCart = response.data.cart.map(item => ({
              _id: item.productId,
              productId: item.productId,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image || '',
            }));
            setCart(transformedCart);
          }
        } catch (error) {
          console.error('Error loading cart from MongoDB:', error);
          // Fallback to localStorage if MongoDB fails
          const savedCart = localStorage.getItem('cart');
          if (savedCart) {
            setCart(JSON.parse(savedCart));
          }
        }
      } else {
        // Load from localStorage for guest users
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      }
      setLoading(false);
    };

    loadCart();
  }, []);

  // Sync cart to localStorage for guest users
  useEffect(() => {
    if (!isAuthenticated()) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Sync cart to MongoDB when authenticated
  const syncToMongoDB = async (updatedCart) => {
    if (!isAuthenticated() || syncing) return;

    setSyncing(true);
    try {
      // Get current MongoDB cart
      const response = await cartAPI.getCart();
      if (response.success) {
        const mongoCart = response.data.cart;
        
        // Compare and sync differences
        // For simplicity, we'll let individual operations handle sync
        // This is just a safety net
      }
    } catch (error) {
      console.error('Error syncing cart to MongoDB:', error);
    } finally {
      setSyncing(false);
    }
  };

  const addToCart = async (product) => {
    const isAuth = isAuthenticated();

    if (isAuth) {
      // Sync with MongoDB
      try {
        const response = await cartAPI.addToCart(product);
        if (response.success) {
          // Transform and update local state
          const transformedCart = response.data.cart.map(item => ({
            _id: item.productId,
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image || '',
          }));
          setCart(transformedCart);
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        // Fallback to local state update
        setCart((prevCart) => {
          const existingItem = prevCart.find(item => item._id === product._id || item.productId === product._id);
          
          if (existingItem) {
            return prevCart.map(item =>
              (item._id === product._id || item.productId === product._id)
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            return [...prevCart, { ...product, quantity: 1 }];
          }
        });
      }
    } else {
      // Update local state only (guest user)
      setCart((prevCart) => {
        const existingItem = prevCart.find(item => item._id === product._id);
        
        if (existingItem) {
          return prevCart.map(item =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevCart, { ...product, quantity: 1 }];
        }
      });
    }
  };

  const removeFromCart = async (productId) => {
    const isAuth = isAuthenticated();

    if (isAuth) {
      // Sync with MongoDB - use productId (which equals _id after transformation)
      try {
        const response = await cartAPI.removeFromCart(productId);
        if (response.success) {
          const transformedCart = response.data.cart.map(item => ({
            _id: item.productId,
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image || '',
          }));
          setCart(transformedCart);
        }
      } catch (error) {
        console.error('Error removing from cart:', error);
        // Fallback to local state update
        setCart((prevCart) => prevCart.filter(item => item._id !== productId && item.productId !== productId));
      }
    } else {
      // Update local state only
      setCart((prevCart) => prevCart.filter(item => item._id !== productId));
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const isAuth = isAuthenticated();

    if (isAuth) {
      // Sync with MongoDB - use productId (which equals _id after transformation)
      try {
        const response = await cartAPI.updateCartItem(productId, quantity);
        if (response.success) {
          const transformedCart = response.data.cart.map(item => ({
            _id: item.productId,
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image || '',
          }));
          setCart(transformedCart);
        }
      } catch (error) {
        console.error('Error updating cart:', error);
        // Fallback to local state update
        setCart((prevCart) =>
          prevCart.map(item =>
            (item._id === productId || item.productId === productId) ? { ...item, quantity } : item
          )
        );
      }
    } else {
      // Update local state only
      setCart((prevCart) =>
        prevCart.map(item =>
          item._id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = async () => {
    const isAuth = isAuthenticated();

    if (isAuth) {
      // Sync with MongoDB
      try {
        await cartAPI.clearCart();
        setCart([]);
      } catch (error) {
        console.error('Error clearing cart:', error);
        setCart([]);
      }
    } else {
      // Clear local state
      setCart([]);
      localStorage.removeItem('cart');
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 0)), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + (item.quantity || 0), 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    loading,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
