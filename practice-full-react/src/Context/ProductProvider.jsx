import React, { useReducer, useState,useEffect } from "react";
import ProductContext from "./ProductContext";
import cartReducer from "./Reducer";

const ProductProvider = ({ children }) => {
  const initialProducts = [
    {
      _id: 1,
      name: "Apple",
      price: 100,
      description: "This is an Apple",
      inStock: 4,
    },
    {
      _id: 2,
      name: "Mango",
      price: 200,
      description: "This is a Mango",
      inStock: 5,
    },
    {
      _id: 3,
      name: "Cherry",
      price: 300,
      description: "This is a Cherry",
      inStock: 3,
    },
    {
      _id: 4,
      name: "Orange",
      price: 900,
      description: "This is a Orange",
      inStock: 8,
    },
  ];
  const [products, setProducts] = useState(initialProducts);
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [state, dispatch] = useReducer(cartReducer, {
    product: products,
    cart: initialCart,
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);



   const getUserProducts = async () => {
     try {
       const response = await fetch(
         "http://localhost:3000/api/product/getproducts",
         {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             "auth-token": localStorage.getItem("token"),
           },
         }
       );
       const data = await response.json();
       setProducts(data);
     } catch (error) {
       console.error("Error fetching user products:", error);
     }
   };

  const allProduct = async (searchQuery = "") => {
    const response = await fetch(
      `http://localhost:3000/api/product/getallproducts?searchQuery=${searchQuery}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    let data = await response.json();
    console.log(data);
    setProducts(data);
  };

  // edit product
  const editProduct = async (selectedProduct, updateData) => {
    console.log("edit product", selectedProduct);
    const { name, description, price, inStock } = updateData;
    try {
      const response = await fetch(
        `http://localhost:3000/api/product/updateproduct/${selectedProduct}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ name, description, price, inStock }),
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      console.log(json);
    } catch (error) {
      throw new Error("fail to update");
    }
  };

  // delete product
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/product/deleteproduct/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        console.log("product deleted succesfully!");
      } else {
        console.log("failed to delete the product");
      }
      allProduct();
    } catch (error) {
      console.error("internal server error");
    }
  };

  return (
    <div>
      <ProductContext.Provider
        value={{
          products,
          setProducts,
          state,
          dispatch,
          allProduct,
          editProduct,
          deleteProduct,
          getUserProducts,
        }}
      >
        {children}
      </ProductContext.Provider>
    </div>
  );
};

export default ProductProvider;







// import React, { useReducer, useState, useEffect, useContext } from "react";
// import ProductContext from "./ProductContext";
// import cartReducer from "./Reducer";
//  import { AuthContext } from "./AuthContext"; // Make sure to create this

// const ProductProvider = ({ children }) => {
//   const { isAuthenticated, user } = useContext(AuthContext);
//   const [products, setProducts] = useState([]);
//   const initialState = {
//     products: [],
//     cart: JSON.parse(localStorage.getItem("cart")) || [],
//     cartCount: 0,
//     loading: true,
//     error: null,
//   };
//   // const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
//   const [state, dispatch] = useReducer(cartReducer, initialState);

//     useEffect(() => {
//       allProduct(); // Load products immediately when component mounts
//     }, []);


//   useEffect(() => {
//     if (isAuthenticated && user) {
//       loadCartFromBackend();
//     }
//   }, [isAuthenticated, user]);

//   // Save cart to localStorage
//   useEffect(() => {
//     if (isAuthenticated && state.cart.length > 0) {
//       syncCartWithBackend(state.cart);
//     }
//   }, [state.cart, isAuthenticated]);

//   const loadCartFromBackend = async () => {
//     try {
//       dispatch({ type: "SET_LOADING", payload: true });
//       const response = await fetch("http://localhost:3000/api/cart/get-cart", {
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": localStorage.getItem("token"),
//         },
//       });

//       if (response.ok) {
//         const { items } = await response.json();
//         // Update both local state and localStorage
//         dispatch({ type: "SET_CART", payload: items });
//         localStorage.setItem("cart", JSON.stringify(items));
//       }
//     } catch (error) {
//       console.error("Error loading cart:", error);
//       dispatch({ type: "SET_ERROR", payload: "Failed to load cart" });
//     } finally {
//       dispatch({ type: "SET_LOADING", payload: false });
//     }
//   };


//   // Sync cart with backend after changes
//   const syncCartWithBackend = async (items) => {
//     if (!isAuthenticated) return;

//     try {
//       const response = await fetch("http://localhost:3000/api/cart/sync", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": localStorage.getItem("token"),
//         },
//         body: JSON.stringify({ items }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to sync cart");
//       }
//     } catch (error) {
//       console.error("Failed to sync cart:", error);
//       dispatch({ type: "SET_ERROR", payload: "Failed to sync cart" });
//     }
//   };

//   // Save cart to localStorage and sync with backend
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(state.cart));
//     if (isAuthenticated) {
//       syncCartWithBackend();
//     }
//   }, [state.cart, isAuthenticated]);

//   // Load cart from backend on auth change
//   useEffect(() => {
//     if (isAuthenticated) {
//       loadCartFromBackend();
//     }
//   }, [isAuthenticated]);

//   useEffect(() => {
//     getUserProducts();
//   }, []);

//   // Get user's products
//   const getUserProducts = async () => {
//     try {
//       dispatch({ type: "SET_LOADING", payload: true });
//       const response = await fetch(
//         "http://localhost:3000/api/product/getproducts",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "auth-token": localStorage.getItem("token"),
//           },
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch products");
//       }
//       const data = await response.json();
//       setProducts(data);
//       dispatch({ type: "SET_LOADING", payload: false });
//     } catch (error) {
//       dispatch({ type: "SET_ERROR", payload: error.message });
//     }
//   };

//   // Get all products with search
//   const allProduct = async (searchQuery = "") => {
//     try {
//       dispatch({ type: "SET_LOADING", payload: true });
//       const response = await fetch(
//         `http://localhost:3000/api/product/getallproducts?searchQuery=${searchQuery}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch products");
//       }
//       const data = await response.json();
//       setProducts(data);
//       dispatch({ type: "SET_PRODUCTS", payload: data }); // Add this action
//     } catch (error) {
//       dispatch({ type: "SET_ERROR", payload: error.message });
//     } finally {
//       dispatch({ type: "SET_LOADING", payload: false });
//     }
//   };

//   // Edit product
//   const editProduct = async (selectedProduct, updateData) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/product/updateproduct/${selectedProduct}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             "auth-token": localStorage.getItem("token"),
//           },
//           body: JSON.stringify(updateData),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update product");
//       }

//       await getUserProducts(); // Refresh products after update
//     } catch (error) {
//       console.error("Error updating product:", error);
//       throw error;
//     }
//   };

//   // Delete product
//   const deleteProduct = async (id) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/product/deleteproduct/${id}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             "auth-token": localStorage.getItem("token"),
//           },
//         }
//       );

//       if (response.ok) {
//         await allProduct(); // Refresh products after deletion
//       } else {
//         throw new Error("Failed to delete product");
//       }
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   return (
//     <ProductContext.Provider
//       value={{
//         products,
//         setProducts,
//         ...state,
//         cartCount: state.cart.reduce(
//           (sum, item) => sum + (item?.quantity || 0),
//           0
//         ),
//         dispatch,
//         allProduct,
//         editProduct,
//         deleteProduct,
//         getUserProducts,
//         syncCartWithBackend,
//         loadCartFromBackend,
//       }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export default ProductProvider;