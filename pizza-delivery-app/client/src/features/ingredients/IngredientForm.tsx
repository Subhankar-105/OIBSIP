import { useState } from "react";
import { addIngredient } from "./ingredientService";
import { Ingredient } from "../../types/ingredient";

const IngredientForm = ({ refresh }: { refresh: () => void }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Ingredient["category"]>("base");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addIngredient({
        name,
        category,
        price,
        stock
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
      className="bg-white shadow p-4 rounded mb-6"
    >
      <h3 className="text-lg font-bold mb-3">Add Ingredient</h3>

      <div className="grid grid-cols-4 gap-3">

        <input
          className="border p-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          className="border p-2"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as Ingredient["category"])
          }
        >
          <option value="base">Base</option>
          <option value="sauce">Sauce</option>
          <option value="cheese">Cheese</option>
          <option value="veggie">Veggie</option>
          <option value="meat">Meat</option>
        </select>

        <input
          className="border p-2"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <input
          className="border p-2"
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
        />

      </div>

      <button
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
        type="submit"
      >
        Add Ingredient
      </button>
    </form>
  );
};

export default IngredientForm;