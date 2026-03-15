import AdminNavbar from "../components/layout/AdminNavbar";
import DashboardStats from "../features/orders/DashboardStats";
import IngredientTable from "../features/ingredients/IngredientTable";
import OrderTable from "../features/orders/OrderTable";

const AdminDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">

      <AdminNavbar />

      <div className="max-w-7xl mx-auto p-6">

        <h1 className="text-2xl font-bold mb-6">
          Admin Dashboard
        </h1>

        <DashboardStats />

        <IngredientTable />

        <OrderTable />

      </div>

    </div>
  );
};

export default AdminDashboard;