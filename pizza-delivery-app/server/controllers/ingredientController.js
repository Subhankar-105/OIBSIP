const Ingredient = require("../models/Ingredient");

// Create Ingredient (Admin)
exports.createIngredient = async (req, res) => {
  try {
    const { name, category, price, stock } = req.body;

    const ingredient = await Ingredient.create({
      name,
      category,
      price,
      stock,
    });

    res.status(201).json(ingredient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Ingredients (User + Admin)
exports.getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Ingredient (Admin)
exports.updateIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);

    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    ingredient.name = req.body.name || ingredient.name;
    ingredient.category = req.body.category || ingredient.category;
    ingredient.price = req.body.price || ingredient.price;
    ingredient.stock = req.body.stock || ingredient.stock;

    const updated = await ingredient.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Ingredient (Admin)
exports.deleteIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);

    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    await ingredient.deleteOne();
    res.json({ message: "Ingredient removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
