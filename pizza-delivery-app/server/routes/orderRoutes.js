const express = require("express");

const {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/* USER ROUTES */

router.post("/", protect, createOrder);

// User can see their own orders
router.get("/my-orders", protect, getUserOrders);


/* ADMIN ROUTES */

router.get("/", protect, adminOnly, getAllOrders);

router.put("/:id", protect, adminOnly, updateOrderStatus);


module.exports = router;