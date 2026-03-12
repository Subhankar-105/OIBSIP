import { useEffect, useState } from "react";
import { Ingredient } from "../../types/ingredient";
import { getIngredients, deleteIngredient } from "./ingredientService";
import IngredientForm from "./IngredientForm";

const categoryStyle: any = {
  base: "bg-blue-100 text-blue-700",
  sauce: "bg-red-100 text-red-700",
  cheese: "bg-yellow-100 text-yellow-700",
  veggie: "bg-green-100 text-green-700",
  meat: "bg-purple-100 text-purple-700",
};

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
    <div className="mt-8">

      {/* Ingredient Form */}
      <IngredientForm refresh={fetchIngredients} />

      {/* Inventory Card */}
      <div className="bg-white shadow-md rounded-xl p-6">

        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Inventory
        </h3>

        <table className="w-full">

          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-center">Category</th>
              <th className="p-3 text-center">Price</th>
              <th className="p-3 text-center">Stock</th>
              <th className="p-3 text-center">Actions</th>
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
                <td
                  className={`p-3 text-center font-semibold ${
                    item.stock < 20
                      ? "text-red-600"
                      : "text-gray-700"
                  }`}
                >
                  {item.stock}
                  {item.stock < 20 && (
                    <span className="ml-2 text-xs">
                      (Stock Low)
                    </span>
                  )}
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