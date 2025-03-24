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








// GROK
const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      const cartCount = action.payload.items.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
      );
      return {
        ...state,
        cart: action.payload.items,
        cartCount,
        loading: false,
        error: null,
      };
    case "ADD_TO_CART": {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      let updatedCart;
      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;
        if (newQuantity > action.payload.inStock) {
          return {
            ...state,
            error: "Not enough stock available",
          };
        }
        updatedCart = state.cart.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        if (action.payload.inStock < 1) {
          return {
            ...state,
            error: "Item is out of stock",
          };
        }
        updatedCart = [
          ...state.cart,
          {
            _id: action.payload._id,
            name: action.payload.name,
            price: action.payload.price,
            inStock: action.payload.inStock,
            quantity: 1,
          },
        ];
      }
      const cartCount = updatedCart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      return {
        ...state,
        cart: updatedCart,
        cartCount,
        error: null,
      };
    }
    case "REMOVE_FROM_CART": {
      const updatedCart = state.cart.filter(
        (item) => item._id !== action.payload._id
      );
      const cartCount = updatedCart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      return {
        ...state,
        cart: updatedCart,
        cartCount,
        error: null,
      };
    }
    case "UPDATE_ITEM": {
      const { _id, quantity } = action.payload;
      const item = state.cart.find((item) => item._id === _id);
      if (!item) return state;
      if (quantity <= 0) {
        const updatedCart = state.cart.filter((item) => item._id !== _id);
        const cartCount = updatedCart.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        return {
          ...state,
          cart: updatedCart,
          cartCount,
          error: null,
        };
      }
      if (quantity > item.inStock) {
        return {
          ...state,
          error: "Requested quantity exceeds available stock",
        };
      }
      const updatedCart = state.cart.map((item) =>
        item._id === _id ? { ...item, quantity: Number(quantity) } : item
      );
      const cartCount = updatedCart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      return {
        ...state,
        cart: updatedCart,
        cartCount,
        error: null,
      };
    }
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
        cartCount: 0,
        error: null,
      };
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
    default:
      return state;
  }
};

export default cartReducer;