import { useEffect, useState } from "react";
import { Ingredient } from "../../types/ingredient";
import { getIngredients, addIngredient } from "./ingredientService";
import { toast } from "react-toastify";

interface Props {
  refresh: () => void;
}

/* Category Type */
type IngredientCategory =
  | "base"
  | "sauce"
  | "cheese"
  | "veggie"
  | "meat";

const IngredientForm = ({ refresh }: Props) => {

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [category, setCategory] = useState<IngredientCategory | "">("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  /* Fetch ingredients */
  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    const data = await getIngredients();
    setIngredients(data);
  };

  /* Filter ingredients by category */
  const filteredIngredients = ingredients.filter(
    (i) => i.category === category
  );

  /* Find selected ingredient */
  const ingredient = ingredients.find((i) => i.name === name);

  /* Auto price calculation */
  useEffect(() => {
    if (ingredient) {
      setTotalPrice(quantity * ingredient.price);
    } else {
      setTotalPrice(0);
    }
  }, [quantity, ingredient]);

  /* Submit handler */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || category === "" || quantity <= 0) {
      toast.error("Please complete the form");
      return;
    }

    await addIngredient({
      name,
      category,
      stock: quantity,
    });

    setName("");
    setCategory("");
    setQuantity(0);
    setTotalPrice(0);

    refresh();
  };

  return (

    <div className="bg-white shadow rounded p-6 mb-6">

      <h3 className="text-lg font-semibold mb-4">
        Add Ingredient
      </h3>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-4 gap-4"
      >

        {/* Ingredient Type */}
        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value as IngredientCategory);
            setName("");
          }}
        >
          <option value="">Select Type</option>
          <option value="base">Base</option>
          <option value="sauce">Sauce</option>
          <option value="cheese">Cheese</option>
          <option value="veggie">Veggie</option>
          <option value="meat">Meat</option>
        </select>

        {/* Ingredient Name */}
        <select
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        >
          <option value="">Select Ingredient</option>

          {filteredIngredients.map((item) => (
            <option key={item._id} value={item.name}>
              {item.name}
            </option>
          ))}

        </select>

        {/* Quantity */}
        <input
          type="number"
          placeholder="Amount"
          className="border p-2 rounded"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        {/* Auto price */}
        <input
          type="text"
          className="border p-2 rounded bg-gray-100"
          value={`₹${totalPrice}`}
          readOnly
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded mt-2 hover:bg-green-700"
        >
          Add Ingredient
        </button>

      </form>

    </div>
  );
};

export default IngredientForm;