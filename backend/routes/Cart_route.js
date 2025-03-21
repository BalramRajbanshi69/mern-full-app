// const express = require("express");
// const router = express.Router();
// const CartModel = require("../models/CartModel"); 
// const FetchUser = require("../middleware/FetchUser");

// // Add product to cart
// router.post("/add-to-cart",FetchUser, async (req, res) => {
//   const { userId, productId } = req.body;

//   try {
//     // Find the cart for the user
//     let cart = await CartModel.findOne({ userId });

//     // If cart doesn't exist, create a new one
//     if (!cart) {
//       cart = new CartModel({ userId, products: [], total: 0 });
//     }

//     // Add the product to the cart
//     cart.products.push(productId);
//     cart.total += 1; // Increment total (or calculate based on product price)

//     // Save the cart
//     await cart.save();

//     res.status(200).json({ message: "Product added to cart", cart });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to add product to cart" });
//   }
// });

// // Get cart for a specific user
// router.get("/get-cart/:userId",FetchUser, async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const cart = await CartModel.findOne({ userId }).populate("products"); // Populate product details
//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     res.status(200).json({ cart });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch cart" });
//   }
// });

// // Remove product from cart
// router.post("/remove-from-cart",FetchUser, async (req, res) => {
//   const { userId, productId } = req.body;

//   try {
//     const cart = await CartModel.findOne({ userId });

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     // Remove the product from the cart
//     cart.products = cart.products.filter((id) => id.toString() !== productId);
//     cart.total -= 1; // Decrement total (or calculate based on product price)

//     await cart.save();

//     res.status(200).json({ message: "Product removed from cart", cart });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to remove product from cart" });
//   }
// });

// module.exports = router;






const express = require("express");
const router = express.Router();
const CartModel = require('../model/Cart_model');
const FetchUser = require("../middleware/Fetchuser");

// Get user's cart
router.get("/get-cart", FetchUser, async (req, res) => {
  try {
    let cart = await CartModel.findOne({ user: req.user.id });
    
    if (!cart) {
      cart = new CartModel({
        user: req.user.id,
        items: []
      });
      await cart.save();
    }

    res.json({ items: cart.items });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Sync cart
router.post("/sync", FetchUser, async (req, res) => {
  try {
    const { items } = req.body;

    let cart = await CartModel.findOne({ user: req.user.id });
    if (cart) {
      cart.items = items;
    } else {
      cart = new CartModel({
        user: req.user.id,
        items
      });
    }

    await cart.save();
    res.json({ success: true, items: cart.items });
  } catch (error) {
    console.error("Sync cart error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;