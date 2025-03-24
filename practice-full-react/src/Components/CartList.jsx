// import React, { useContext } from "react";
// import ProductContext from "../Context/ProductContext";
// import p2 from "../assets/picTwo.jpg";
// import { MdDelete } from "react-icons/md";
// import { IoReturnUpBackOutline } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";

// const CartList = () => {
//   const {
//     state: { cart },
//     dispatch,
//   } = useContext(ProductContext);
//   const navigate = useNavigate();

//   if (cart.length === 0) {
//     return (
//       <div className="container px-4 py-8 mx-auto">
//         <div className="p-4 text-red-700 bg-red-100 border-l-4 border-red-500 rounded shadow-md">
//           <div className="flex items-center">
//             <svg
//               className="w-6 h-6 mr-2"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <strong className="font-medium">Cart Empty!</strong>
//             <span className="ml-2">Select items to add to your cart.</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container px-4 py-8 mx-auto">
//       <h2 className="mb-6 text-2xl font-bold text-center underline underline-offset-4">
//         Product Cart
//       </h2>
//       <div className="m-3 cursor-pointer ">
//         <IoReturnUpBackOutline size={40} onClick={() => navigate(-1)} />
//       </div>
//       <div className="overflow-hidden bg-white rounded-lg shadow-2xl">
//         <ul className="divide-y divide-gray-300">
//           {cart.map((item) => (
//             <li
//               key={item.id}
//               className="p-8 transition-colors hover:bg-gray-50"
//             >
//               <div className="flex items-start space-x-6">
//                 <div className="w-full overflow-hidden rounded-lg md:w-48 h-35">
//                   <img
//                     src={
//                       item.image?.length > 0
//                         ? `http://localhost:3000/uploads/${item.image[0]}`
//                         : p2
//                     }
//                     alt={item.name || "Product"}
//                     className="object-cover object-center w-full h-full transition-transform duration-300 transform hover:scale-105"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex justify-between">
//                     <h3 className="text-lg font-medium text-gray-900">
//                       {item.name}
//                     </h3>
//                     <p className="text-lg font-medium text-gray-900">
//                       ${item.price * item.quantity}
//                     </p>
//                   </div>
//                   <div className="flex items-center justify-between mt-4">
//                     <div className="flex items-center space-x-4">
//                       <label className="text-sm text-gray-600">Quantity:</label>
//                       <select
//                         value={item.quantity}
//                         onChange={(e) =>
//                           dispatch({
//                             type: "UPDATE_ITEM",
//                             payload: {
//                               _id: item._id,
//                               quantity: e.target.value,
                              
//                             },
//                           })
//                         }
//                         className="border-gray-300 rounded-md shadow-sm form-select focus:border-indigo-500 focus:ring-indigo-500"
//                       >
//                         {[...Array(item.inStock).keys()].map((x) => (
//                           <option key={x + 1} value={x + 1}>
//                             {x + 1}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <button
//                       onClick={() =>
//                         dispatch({
//                           type: "REMOVE_FROM_CART",
//                           payload: item,
//                         })
//                       }
//                       className="p-2 transition-all duration-300 ease-in-out rounded-md cursor-pointer hover:bg-transparent hover:scale-110 group"
//                     >
//                       <MdDelete
//                         size={30}
//                         className="text-red-950 group-hover:text-red-600"
//                       />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default CartList;













//grok
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useCart } from "../Context/CartContext";
import p2 from "../assets/picTwo.jpg";

const CartList = () => {
  const {
    state: { cart },
    updateCartItem,
    removeFromCart,
  } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="p-4 text-red-700 bg-red-100 border-l-4 border-red-500 rounded shadow-md">
          <div className="flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <strong className="font-medium">Cart Empty!</strong>
            <span className="ml-2">Select items to add to your cart.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-center underline underline-offset-4">
        Product Cart
      </h2>
      <div className="m-3 cursor-pointer">
        <IoReturnUpBackOutline size={40} onClick={() => navigate(-1)} />
      </div>
      <div className="overflow-hidden bg-white rounded-lg shadow-2xl">
        <ul className="divide-y divide-gray-300">
          {cart.map((item) => (
            <li
              key={item.productId}
              className="p-8 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-start space-x-6">
                <div className="w-full overflow-hidden rounded-lg md:w-48 h-35">
                  <img
                    src={
                      item.image
                        ? `http://localhost:3000/uploads/${item.image}`
                        : p2
                    }
                    alt={item.name || "Product"}
                    className="object-cover object-center w-full h-full transition-transform duration-300 transform hover:scale-105"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-lg font-medium text-gray-900">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4">
                      <label className="text-sm text-gray-600">Quantity:</label>
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartItem(item.productId, Number(e.target.value))
                        }
                        className="border-gray-300 rounded-md shadow-sm form-select focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        {[...Array(item.inStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="p-2 transition-all duration-300 ease-in-out rounded-md cursor-pointer hover:bg-transparent hover:scale-110 group"
                    >
                      <MdDelete
                        size={30}
                        className="text-red-950 group-hover:text-red-600"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CartList;