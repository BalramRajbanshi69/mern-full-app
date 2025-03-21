// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_TO_CART":
//       return {
//         ...state,
//         cart: [...state.cart, { ...action.payload, quantity: 1 }],
//       };
//     case "REMOVE_FROM_CART":
//       return {
//         ...state,
//         cart: state.cart.filter((c) => c._id !== action.payload._id),
//       };
//     case "UPDATE_ITEM":
//       return {
//         ...state,
//         cart: state.cart.map((c) =>
//           c._id === action.payload._id
//             ? { ...c, quantity: action.payload.quantity }
//             : c
//         ),
//       };
//     default:
//       return state;
//   }
// };

// export default cartReducer;






const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };
    case "SET_CART":
      return {
        ...state,
        cart: action.payload || [],
        cartCount: (action.payload || []).reduce(
          (sum, item) => sum + (item?.quantity || 0),
          0
        ),
        loading: false,
        error: null,
      };

    case "ADD_TO_CART": {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;
        if (newQuantity > action.payload.inStock) {
          return {
            ...state,
            error: "Not enough stock available",
          };
        }

        const updatedCart = state.cart.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: newQuantity }
            : item
        );

        return {
          ...state,
          cart: updatedCart,
          cartCount: updatedCart.reduce((sum, item) => sum + item.quantity, 0),
          error: null,
        };
      }

      const newCart = [...state.cart, { ...action.payload, quantity: 1 }];
      return {
        ...state,
        cart: newCart,
        cartCount: newCart.reduce((sum, item) => sum + item.quantity, 0),
        error: null,
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload._id),
        error: null,
      };

    case "UPDATE_ITEM": {
      const { _id, quantity } = action.payload;
      const item = state.cart.find((item) => item._id === _id);

      if (quantity > item.inStock) {
        return {
          ...state,
          error: "Requested quantity exceeds available stock",
        };
      }

      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === _id ? { ...item, quantity: parseInt(quantity) } : item
        ),
        error: null,
      };
    }

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
        cartCount: 0,
        error: null,
      };

    default:
      return state;
  }
};

// Helper function to calculate cart totals
export const getCartTotals = (cart) => {
  return cart.reduce(
    (totals, item) => ({
      items: totals.items + item.quantity,
      price: totals.price + (item.price * item.quantity)
    }),
    { items: 0, price: 0 }
  );
};

export default cartReducer;