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

            {ingredients.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-6 text-gray-500">
                  No ingredients available
                </td>
              </tr>
            )}

            {ingredients.map((item) => (
              <tr
                key={item._id}
                className="border-t hover:bg-gray-50 transition"
              >

                <td className="p-3 font-medium text-gray-700">
                  {item.name}
                </td>

                <td className="p-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryStyle[item.category]}`}
                  >
                    {item.category}
                  </span>
                </td>

                <td className="p-3 text-center font-medium">
                  ₹{item.price}
                </td>

                {/* Low stock highlight */}
                <td className="p-3 text-center relative font-semibold">
                  <div className="flex justify-center items-center gap-2 font-semibold">

                    <span
                      className={`${
                        item.stock < 20 ? "text-red-600 text-lg" : "text-gray-700"
                      }`}
                    >
                      {item.stock}
                    </span>

                    {item.stock < 20 && (
                      <span className="absolute left-1/2 translate-x-6 bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs">
                        Low
                      </span>
                    )}
                  </div>

                </td>

                <td className="p-3 text-center">

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default IngredientTable;