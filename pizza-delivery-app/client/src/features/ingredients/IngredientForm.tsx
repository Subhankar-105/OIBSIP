import { useState } from "react";
import { addIngredient } from "./ingredientService";
import { Ingredient } from "../../types/ingredient";
import { ingredientOptions } from "./ingredientOptions";

const IngredientForm = ({ refresh }: { refresh: () => void }) => {

  const [category, setCategory] = useState<Ingredient["category"]>("base");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const handleCategoryChange = (value: Ingredient["category"]) => {
    setCategory(value);
    setName("");
    setPrice(0);
  };

  const handleNameChange = (value: string) => {
    setName(value);

    const selected = ingredientOptions[category].find(
      (item) => item.name === value
    );

    if (selected) {
      setPrice(selected.price);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addIngredient({
        name,
        category,
        price,
        stock,
      });

      setName("");
      setPrice(0);
      setStock(0);

      refresh();
    } catch (error) {
      console.error("Error adding ingredient", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl p-6 mb-6"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Add Ingredient
      </h3>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Category */}
        <select
          className="border p-2 rounded-lg"
          value={category}
          onChange={(e) =>
            handleCategoryChange(e.target.value as Ingredient["category"])
          }
        >
          <option value="base">Base</option>
          <option value="sauce">Sauce</option>
          <option value="cheese">Cheese</option>
          <option value="veggie">Veggie</option>
          <option value="meat">Meat</option>
        </select>

        {/* Ingredient Name */}
        <select
          className="border p-2 rounded-lg"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          required
        >
          <option value="">Select Ingredient</option>

          {ingredientOptions[category].map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}

        </select>

        {/* Price auto filled */}
        <input
          type="number"
          className="border p-2 rounded-lg bg-gray-100"
          value={price}
          readOnly
        />

        {/* Stock */}
        <input
          type="number"
          placeholder="Stock"
          className="border p-2 rounded-lg"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          required
        />

      </div>

      <button
        type="submit"
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
      >
        Add Ingredient
      </button>

    </form>
  );
};

export default IngredientForm;