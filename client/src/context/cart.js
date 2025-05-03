import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./auth";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [auth] = useAuth();

  // Get cart from backend when user is logged in
  useEffect(() => {
    if (auth?.token) {
      getCart();
    } else {
      setCart([]);
    }
  }, [auth?.token]);

  // Get cart from backend
  const getCart = async () => {
    try {
      const { data } = await axios.get("/api/v1/cart/get");
      if (data?.success) {
        setCart(data.cart.products || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Add to cart
  const addToCart = async (product) => {
    try {
      const { data } = await axios.post("/api/v1/cart/add", {
        productId: product._id,
      });
      if (data?.success) {
        setCart(data.cart.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Remove from cart
  const removeFromCart = async (productId) => {
    try {
      const { data } = await axios.delete(`/api/v1/cart/remove/${productId}`);
      if (data?.success) {
        setCart(data.cart.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update cart quantity
  const updateCartQuantity = async (productId, quantity) => {
    try {
      const { data } = await axios.put(`/api/v1/cart/update/${productId}`, {
        quantity,
      });
      if (data?.success) {
        setCart(data.cart.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={[cart, setCart, addToCart, removeFromCart, updateCartQuantity]}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };