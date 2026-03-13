import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-red-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        <Link to="/" className="text-2xl font-bold">
          PizzaCraft
        </Link>

        <div className="space-x-6">
          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>

          <Link to="/login" className="hover:text-yellow-300">
            Login
          </Link>

          <Link to="/register" className="hover:text-yellow-300">
            Register
          </Link>

          <Link to="/dashboard" className="hover:text-yellow-300">
            Dashboard
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;