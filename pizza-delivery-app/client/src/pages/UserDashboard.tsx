import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/layout/UserNavbar";
import PopularPizzas from "../components/home/PopularPizzas";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/layout/Footer"
import LatestOrderTracker from "../features/orders/LatestOrderTracker";

import { FaPizzaSlice } from "react-icons/fa";

const PizzaIcon = FaPizzaSlice as any;

const UserDashboard = () => {

  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-amber-50 to-red-100 min-h-screen">

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
            onClick={() => navigate("/builder")}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold"
          >
            Start Customizing
          </button>

        </div>

        {/* Builder CTA */}
        <div className="mb-10">
          <LatestOrderTracker />
        </div>
        
        <PopularPizzas />

      </div>

      <div>
        <Footer />
      </div>

    </div>
  );
};

export default UserDashboard;