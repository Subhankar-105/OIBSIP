import Navbar from "../components/Navbar";
import IngredientTable from "../features/ingredients/IngredientTable";
import OrderTable from "../features/orders/OrderTable";
import DashboardStats from "../features/orders/DashboardStats";

const AdminDashboard = () => {
  return (
    <>
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>

        <DashboardStats />
        
        <IngredientTable />

        <OrderTable />

      </div>
    </>
  );
};

export default AdminDashboard;