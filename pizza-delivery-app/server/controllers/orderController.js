const Order = require("../models/Order");
const Ingredient = require("../models/Ingredient");

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ message: "No ingredients selected" });
    }

    let totalPrice = 0;
    const orderItems = [];

    for (let id of ingredients) {
      const ingredient = await Ingredient.findById(id);

      if (!ingredient) {
        return res.status(404).json({ message: "Ingredient not found" });
      }

      if (ingredient.stock <= 0) {
        return res.status(400).json({ message: `${ingredient.name} is out of stock` });
      }

      totalPrice += ingredient.price;

      orderItems.push({
        ingredient: ingredient._id,
        quantity: 1,
      });

      ingredient.stock -= 1;
      await ingredient.save();
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalPrice,
    });

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.ingredient", "name category");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Order Status (Admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status || order.status;

    const updatedOrder = await order.save();

    res.json(updatedOrder);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
