const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["base", "sauce", "cheese", "veggie", "meat"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ingredient", ingredientSchema);
