import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  return (
    <>
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <p>Welcome to the admin panel.</p>
      </div>
    </>
  );
};

export default AdminDashboard;