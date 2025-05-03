import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

// Add to cart
export const addToCartController = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    // Find user's cart
    let cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      // Create new cart if doesn't exist
      cart = await new cartModel({
        user: userId,
        products: [{ product: productId, quantity: 1 }],
      }).save();
    } else {
      // Check if product already in cart
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );

      if (productIndex > -1) {
        // Update quantity if product exists
        cart.products[productIndex].quantity += 1;
      } else {
        // Add new product to cart
        cart.products.push({ product: productId, quantity: 1 });
      }

      await cart.save();
    }

    // Populate product details
    const populatedCart = await cartModel
      .findById(cart._id)
      .populate("products.product", "name price description photo");

    res.status(200).send({
      success: true,
      message: "Product added to cart",
      cart: populatedCart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in adding to cart",
      error,
    });
  }
};

// Get cart
export const getCartController = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await cartModel
      .findOne({ user: userId })
      .populate("products.product", "name price description photo");

    if (!cart) {
      return res.status(200).send({
        success: true,
        message: "Cart is empty",
        cart: { products: [] },
      });
    }

    res.status(200).send({
      success: true,
      message: "Cart retrieved successfully",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting cart",
      error,
    });
  }
};

// Remove from cart
export const removeFromCartController = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).send({
        success: false,
        message: "Cart not found",
      });
    }

    // Remove product from cart
    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId
    );

    await cart.save();

    // Populate product details
    const populatedCart = await cartModel
      .findById(cart._id)
      .populate("products.product", "name price description photo");

    res.status(200).send({
      success: true,
      message: "Product removed from cart",
      cart: populatedCart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in removing from cart",
      error,
    });
  }
};

// Update cart item quantity
export const updateCartQuantityController = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user._id;

    const cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).send({
        success: false,
        message: "Cart not found",
      });
    }

    // Update product quantity
    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();
    }

    // Populate product details
    const populatedCart = await cartModel
      .findById(cart._id)
      .populate("products.product", "name price description photo");

    res.status(200).send({
      success: true,
      message: "Cart quantity updated",
      cart: populatedCart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating cart quantity",
      error,
    });
  }
}; 