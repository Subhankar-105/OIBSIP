import { useEffect, useState } from "react";
import { Ingredient } from "../../types/ingredient";
import { getIngredients, deleteIngredient } from "./ingredientService";
import IngredientForm from "./IngredientForm";

const IngredientTable = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const fetchIngredients = async () => {
    try {
      const data = await getIngredients();
      setIngredients(data);
    } catch (error) {
      console.error("Error fetching ingredients", error);
    }
  };

    const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this ingredient?")) return;

    try {
        await deleteIngredient(id);
        fetchIngredients();
    } catch (error) {
        console.error("Delete failed", error);
    }
    };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div className="mt-6">

      <IngredientForm refresh={fetchIngredients} />

      <h3 className="text-xl font-bold mb-4">Inventory</h3>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {ingredients.map((item) => (
            <tr key={item._id}>
              <td className="p-2 border">{item.name}</td>
              <td className="p-2 border">{item.category}</td>
              <td className="p-2 border">₹{item.price}</td>
              <td className="p-2 border">{item.stock}</td>
              
              <td className="pl-9 border">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IngredientTable;