import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-red-600 text-white px-6 py-3">
      <h1 className="text-xl font-bold">🍕 Pizza Delivery</h1>

      {user && (
        <div className="flex items-center gap-4">
          <span className="bg-white text-red-600 px-2 py-1 rounded text-sm">
            {user.role}
          </span>

          <span>{user.name}</span>

          <button
            onClick={handleLogout}
            className="bg-black px-3 py-1 rounded hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;