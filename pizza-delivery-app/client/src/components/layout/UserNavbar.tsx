import { FaPizzaSlice, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const PizzaIcon = FaPizzaSlice as any;
const UserIcon = FaUser as any;
const LogoutIcon = FaSignOutAlt as any;

const UserNavbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-red-600 to-orange-500 text-white shadow">

      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">

        {/* Logo */}
        <div className="flex items-center gap-2 text-xl font-semibold">
          <PizzaIcon />
          Pizza Delivery
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">

          {/* User badge */}
          <div className="flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full">
            <UserIcon />
            {user?.name || "User"}
          </div>

          {/* Orders */}
          <button className="bg-white text-red-600 px-4 py-1 rounded-md font-medium hover:bg-gray-100">
            My Orders
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="text-white text-lg hover:opacity-80"
          >
            <LogoutIcon />
          </button>

        </div>

      </div>

    </nav>
  );
};

export default UserNavbar;
