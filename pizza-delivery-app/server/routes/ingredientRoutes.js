const express = require("express");
const {
  createIngredient,
  getIngredients,
  updateIngredient,
  deleteIngredient,
} = require("../controllers/ingredientController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
  .post(protect, adminOnly, createIngredient)
  .get(protect, getIngredients);

router.route("/:id")
  .put(protect, adminOnly, updateIngredient)
  .delete(protect, adminOnly, deleteIngredient);

module.exports = router;
