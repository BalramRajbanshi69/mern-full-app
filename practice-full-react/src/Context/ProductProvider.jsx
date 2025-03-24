// import React, { useReducer, useState,useEffect } from "react";
// import ProductContext from "./ProductContext";
// import cartReducer from "./Reducer";

// const ProductProvider = ({ children }) => {
//   const initialProducts = [
//     {
//       _id: 1,
//       name: "Apple",
//       price: 100,
//       description: "This is an Apple",
//       inStock: 4,
//     },
//     {
//       _id: 2,
//       name: "Mango",
//       price: 200,
//       description: "This is a Mango",
//       inStock: 5,
//     },
//     {
//       _id: 3,
//       name: "Cherry",
//       price: 300,
//       description: "This is a Cherry",
//       inStock: 3,
//     },
//     {
//       _id: 4,
//       name: "Orange",
//       price: 900,
//       description: "This is a Orange",
//       inStock: 8,
//     },
//   ];
//   const [products, setProducts] = useState(initialProducts);
//   const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
//   const [state, dispatch] = useReducer(cartReducer, {
//     product: products,
//     cart: initialCart,
//   });

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(state.cart));
//   }, [state.cart]);



//    const getUserProducts = async () => {
//      try {
//        const response = await fetch(
//          "http://localhost:3000/api/product/getproducts",
//          {
//            method: "GET",
//            headers: {
//              "Content-Type": "application/json",
//              "auth-token": localStorage.getItem("token"),
//            },
//          }
//        );
//        const data = await response.json();
//        setProducts(data);
//      } catch (error) {
//        console.error("Error fetching user products:", error);
//      }
//    };

//   const allProduct = async (searchQuery = "") => {
//     const response = await fetch(
//       `http://localhost:3000/api/product/getallproducts?searchQuery=${searchQuery}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": localStorage.getItem("token"),
//         },
//       }
//     );
//     let data = await response.json();
//     console.log(data);
//     setProducts(data);
//   };

//   // edit product
//   const editProduct = async (selectedProduct, updateData) => {
//     console.log("edit product", selectedProduct);
//     const { name, description, price, inStock } = updateData;
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/product/updateproduct/${selectedProduct}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             "auth-token": localStorage.getItem("token"),
//           },
//           body: JSON.stringify({ name, description, price, inStock }),
//         }
//       );
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       const json = await response.json();
//       console.log(json);
//     } catch (error) {
//       throw new Error("fail to update");
//     }
//   };

//   // delete product
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
//         console.log("product deleted succesfully!");
//       } else {
//         console.log("failed to delete the product");
//       }
//       allProduct();
//     } catch (error) {
//       console.error("internal server error");
//     }
//   };

//   return (
//     <div>
//       <ProductContext.Provider
//         value={{
//           products,
//           setProducts,
//           state,
//           dispatch,
//           allProduct,
//           editProduct,
//           deleteProduct,
//           getUserProducts,
//         }}
//       >
//         {children}
//       </ProductContext.Provider>
//     </div>
//   );
// };

// export default ProductProvider;











// grok
import React, { useState, useEffect } from "react";
import ProductContext from "./ProductContext";

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

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
    try {
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
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };

  const editProduct = async (productId, updateData) => {
    const { name, description, price, inStock } = updateData;
    try {
      const response = await fetch(
        `http://localhost:3000/api/product/updateproduct/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ name, description, price, inStock }),
        }
      );
      if (!response.ok) throw new Error("Failed to update product");
      await response.json();
      getUserProducts(); // Refresh products
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

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
        allProduct(); // Refresh products
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        allProduct,
        editProduct,
        deleteProduct,
        getUserProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;