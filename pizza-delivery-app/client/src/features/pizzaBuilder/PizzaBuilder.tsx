import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../api/axios";

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

  const handlePayment = async () => {

    if (selectedIds.length === 0) {
      toast.warning("Please select ingredients first 🍕");
      return;
    }

    if (base.length === 0) {
      toast.warning("Please select a pizza base");
      return;
    }

    try {

      const res = await API.post("/payment/create-order", {
        amount: totalPrice
      });

      const order = res.data;

      const options = {
        key: "rzp_test_SPPJ2PWsAINvMz",
        amount: order.amount,
        currency: order.currency,
        name: "Pizza Delivery",
        description: "Pizza Order Payment",
        order_id: order.id,

        handler: async function () {

          await createOrder(selectedIds, totalPrice);

          toast.success("Payment successful & order placed!");

          setBase([]);
          setSauce([]);
          setCheese([]);
          setVeggies([]);
          setMeat([]);
        },

        theme: {
          color: "#dc2626"
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();

    } catch (error) {

      console.error(error);
      toast.error("Payment failed");

    }

  };

  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 px-4 py-6">

      {/* LEFT SIDE */}
      <div className="lg:col-span-2 space-y-8">

        <h2 className="text-2xl font-bold">
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
      <div className="bg-white shadow-lg p-6 rounded-xl h-fit sticky top-24">

        <h3 className="text-xl font-bold mb-4">
          Order Summary
        </h3>

        <div className="space-y-2 text-sm text-gray-600">

          <p>
            Base: {base.length > 0 ? base.length : "Not selected"}
          </p>

          <p>
            Sauce: {sauce.length > 0 ? sauce.length : "Not selected"}
          </p>

          <p>
            Cheese: {cheese.length > 0 ? cheese.length : "Not selected"}
          </p>

          <p>
            Veggies: {veggies.length}
          </p>

          <p>
            Meat: {meat.length}
          </p>

        </div>

        <hr className="my-4"/>

        <p className="text-lg font-bold mb-4">
          Total Price: ₹{totalPrice}
        </p>

        <button 
          onClick={handlePayment}
          className="bg-red-600 text-white w-full py-3 rounded-lg hover:bg-red-700 font-semibold transition"
        >
          Pay & Place Order
        </button>

      </div>

    </div>
  );
};

export default PizzaBuilder;