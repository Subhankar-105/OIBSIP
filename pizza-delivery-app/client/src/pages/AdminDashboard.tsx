import AdminNavbar from "../components/layout/AdminNavbar";
import DashboardStats from "../features/orders/DashboardStats";
import IngredientTable from "../features/ingredients/IngredientTable";
import OrderTable from "../features/orders/OrderTable";
import Footer from "../components/layout/Footer";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <AdminNavbar />

      <main className="flex-grow">

        <div className="max-w-7xl mx-auto p-6">

          <h1 className="text-2xl font-bold mb-6">
            Admin Dashboard
          </h1>

          <DashboardStats />

          <IngredientTable />

          <OrderTable />

        </div>

      </main>

      <Footer />

    </div>
  );
};

export default AdminDashboard;