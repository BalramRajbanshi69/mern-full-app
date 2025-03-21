

// const mongoose = require("mongoose");

// const CartSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "user",
//     required: true,
//     unique: true,
//   },
//   items: [
//     {
//       productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "product",
//         required: true,
//       },
//       name: String,
//       description: String,
//       price: Number,
//       quantity: {
//         type: Number,
//         default: 1,
//         min: 1,
//       },
//       inStock: Number,
//     },
//   ],
//   totalItems: {
//     type: Number,
//     default: 0,
//   },
//   lastModified: {
//     type: Date,
//     default: Date.now,
//   },
// });


// CartSchema.pre("save", function (next) {
//   this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
//   next();
// });

// const CartModel= mongoose.model("cart", CartSchema);
// module.exports = CartModel;






const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      name: String,
      description: String,
      price: Number,
      image: String,
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
      inStock: Number,
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const CartModel = mongoose.model("cart", CartSchema);
module.exports = CartModel;