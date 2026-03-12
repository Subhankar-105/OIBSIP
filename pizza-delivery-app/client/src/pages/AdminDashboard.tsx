import Navbar from "../components/Navbar";
import IngredientTable from "../features/ingredients/IngredientTable";
import OrderTable from "../features/orders/OrderTable";
import DashboardStats from "../features/orders/DashboardStats";

const AdminDashboard = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

        <DashboardStats />
        
        <IngredientTable />

        <OrderTable />

      </div>
    </>
  );
};

export default AdminDashboard;