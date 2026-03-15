import { FaPizzaSlice, FaUserShield, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const PizzaIcon = FaPizzaSlice as any;
const AdminIcon = FaUserShield as any;
const LogoutIcon = FaSignOutAlt as any;

const AdminNavbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-red-600 text-white shadow">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

        <div className="flex items-center gap-2 text-lg font-semibold">
          <PizzaIcon />
          Pizza Delivery
        </div>

        <div className="flex items-center gap-4">

          <span className="bg-white text-red-600 px-2 py-1 rounded text-xs font-semibold">
            admin
          </span>

          <div className="flex items-center gap-2">
            <AdminIcon />
            {user?.name || "Main Admin"}
          </div>

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

export default AdminNavbar;