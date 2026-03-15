import { useState } from "react";
import UserNavbar from "../components/layout/UserNavbar";
import PizzaBuilder from "../features/pizzaBuilder/PizzaBuilder";
import PopularPizzas from "../components/home/PopularPizzas";
import { useAuth } from "../context/AuthContext";

import { FaPizzaSlice } from "react-icons/fa";

const PizzaIcon = FaPizzaSlice as any;

const UserDashboard = () => {
  const [showBuilder, setShowBuilder] = useState(false);
  const { user } = useAuth();

  return (
    <div className="bg-gray-100 min-h-screen">

      <UserNavbar />

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Welcome banner */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-6 mb-8 shadow">

          <h1 className="text-2xl font-bold flex items-center gap-2">
            Welcome back, {user?.name} <PizzaIcon />
          </h1>

          <p className="text-sm mt-2">
            Hungry? Order your favorite pizza or create your own masterpiece!
          </p>

        </div>

        {/* Builder CTA */}
        <div className="border-2 border-dashed border-red-300 rounded-xl p-6 flex items-center justify-between mb-10 bg-white">

          <div className="flex items-center gap-4">

            <div className="bg-red-100 p-3 rounded-full">
              <PizzaIcon className="text-red-500 text-xl" />
            </div>

            <div>
              <h2 className="font-semibold text-lg">
                Build Your Own Pizza
              </h2>

              <p className="text-gray-500 text-sm">
                Choose your base, sauce, cheese, and toppings!
              </p>
            </div>

          </div>

          <button
            onClick={() => setShowBuilder(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold"
          >
            Start Customizing
          </button>

        </div>

        <PopularPizzas />

        {showBuilder && (
          <div className="mt-12">
            <PizzaBuilder />
          </div>
        )}

      </div>

    </div>
  );
};

export default UserDashboard;