import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Ingredient } from "../../types/ingredient";
import { getIngredients } from "../ingredients/ingredientService";
import { createOrder } from "../orders/orderService";
import IngredientSelector from "./IngredientSelector";
import { calculatePrice } from "./priceCalculator";

const PizzaBuilder = () => {

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const [base, setBase] = useState<string[]>([]);
  const [sauce, setSauce] = useState<string[]>([]);
  const [cheese, setCheese] = useState<string[]>([]);
  const [veggies, setVeggies] = useState<string[]>([]);
  const [meat, setMeat] = useState<string[]>([]);

  useEffect(() => {

    const fetchIngredients = async () => {
      const data = await getIngredients();
      setIngredients(data);
    };

    fetchIngredients();

  }, []);

  const filterByCategory = (category: string) =>
    ingredients.filter((i) => i.category === category);

  const selectedIds = [...base, ...sauce, ...cheese, ...veggies, ...meat];

  const totalPrice = calculatePrice(ingredients, selectedIds);

  const handleOrder = async () => {

    if (selectedIds.length === 0) {
      toast.warning("Select ingredients first");
      return;
    }

    try {

      await createOrder(selectedIds, totalPrice);

      toast.success("Order placed successfully!");

      setBase([]);
      setSauce([]);
      setCheese([]);
      setVeggies([]);
      setMeat([]);

    } catch (error) {

      console.error("Order failed", error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-6 p-6">

      {/* LEFT SIDE */}
      <div className="col-span-2">

        <h2 className="text-2xl font-bold mb-6">
          Build Your Pizza 🍕
        </h2>

        <IngredientSelector
          title="Choose Base"
          ingredients={filterByCategory("base")}
          selected={base}
          setSelected={setBase}
        />

        <IngredientSelector
          title="Choose Sauce"
          ingredients={filterByCategory("sauce")}
          selected={sauce}
          setSelected={setSauce}
        />

        <IngredientSelector
          title="Choose Cheese"
          ingredients={filterByCategory("cheese")}
          selected={cheese}
          setSelected={setCheese}
        />

        <IngredientSelector
          title="Veggies"
          ingredients={filterByCategory("veggie")}
          selected={veggies}
          setSelected={setVeggies}
          multi
        />

        <IngredientSelector
          title="Meat"
          ingredients={filterByCategory("meat")}
          selected={meat}
          setSelected={setMeat}
          multi
        />

      </div>

      {/* RIGHT SIDE */}
      <div className="bg-white shadow p-6 rounded">

        <h3 className="text-xl font-bold mb-4">
          Order Summary
        </h3>

        <p className="mb-2">
          Selected Items: {selectedIds.length}
        </p>

        <p className="text-lg font-bold mb-4">
          Total Price: ₹{totalPrice}
        </p>

        <button 
          onClick={handleOrder}
          className="bg-red-600 text-white w-full py-3 rounded hover:bg-red-700"
        >
          Place Order
        </button>

      </div>

    </div>
  );
};

export default PizzaBuilder;