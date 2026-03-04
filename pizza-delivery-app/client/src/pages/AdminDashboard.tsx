import Navbar from "../components/Navbar";
import IngredientTable from "../features/ingredients/IngredientTable";

const AdminDashboard = () => {
  return (
    <>
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>

        <IngredientTable />
      </div>
    </>
  );
};

export default AdminDashboard;