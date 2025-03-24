import { createContext, useReducer, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import cartReducer from "./Reducer";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  const initialState = {
    cart: [],
    loading: false,
    error: null,
    cartCount: 0,
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const loadCart = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        if (isAuthenticated) {
          const response = await fetch("http://localhost:3000/api/cart", {
            headers: { "auth-token": localStorage.getItem("token") },
          });
          const data = await response.json();
          if (data.success) {
            dispatch({
              type: "SET_CART",
              payload: { items: data.items, cartCount: data.cartCount },
            });
          } else {
            dispatch({
              type: "SET_CART",
              payload: { items: [], cartCount: 0 },
            });
          }
        } else {
          dispatch({ type: "SET_CART", payload: { items: [], cartCount: 0 } });
        }
      } catch (error) {
        console.error("Error loading cart:", error);
        dispatch({ type: "SET_ERROR", payload: error.message });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    loadCart();
  }, [isAuthenticated, user]);

  const addToCart = async (product) => {
    if (!isAuthenticated) {
      dispatch({
        type: "SET_ERROR",
        payload: "Please log in to add items to your cart",
      });
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/cart/add-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      });
      const data = await response.json();
      if (data.success) {
        dispatch({
          type: "SET_CART",
          payload: { items: data.items, cartCount: data.cartCount },
        });
      } else {
        dispatch({ type: "SET_ERROR", payload: data.error });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const removeFromCart = async (productId) => {
    if (!isAuthenticated) {
      dispatch({
        type: "SET_ERROR",
        payload: "Please log in to modify your cart",
      });
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/cart/remove-item/${productId}`,
        {
          method: "DELETE",
          headers: { "auth-token": localStorage.getItem("token") },
        }
      );
      const data = await response.json();
      if (data.success) {
        dispatch({
          type: "SET_CART",
          payload: { items: data.items, cartCount: data.cartCount },
        });
      } else {
        dispatch({ type: "SET_ERROR", payload: data.error });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const updateCartItem = async (productId, quantity) => {
    if (!isAuthenticated) {
      dispatch({
        type: "SET_ERROR",
        payload: "Please log in to modify your cart",
      });
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3000/api/cart/update-item",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ productId, quantity }),
        }
      );
      const data = await response.json();
      if (data.success) {
        dispatch({
          type: "SET_CART",
          payload: { items: data.items, cartCount: data.cartCount },
        });
      } else {
        dispatch({ type: "SET_ERROR", payload: data.error });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      dispatch({
        type: "SET_ERROR",
        payload: "Please log in to clear your cart",
      });
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/cart/clear", {
        method: "DELETE",
        headers: { "auth-token": localStorage.getItem("token") },
      });
      const data = await response.json();
      if (data.success) {
        dispatch({ type: "SET_CART", payload: { items: [], cartCount: 0 } });
      } else {
        dispatch({ type: "SET_ERROR", payload: data.error });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
