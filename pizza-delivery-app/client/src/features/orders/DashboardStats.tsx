import { useEffect, useState } from "react";
import { getOrders } from "./orderService";

interface Order {
  _id: string;
  status: string;
}

const DashboardStats = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    // Auto refresh every 5 seconds
    const interval = setInterval(fetchOrders, 5000);

    return () => clearInterval(interval);
  }, []);

  const total = orders.length;
  const received = orders.filter(o => o.status === "Order Received").length;
  const kitchen = orders.filter(o => o.status === "In Kitchen").length;
  const delivery = orders.filter(o => o.status === "Sent to Delivery").length;
  const delivered = orders.filter(o => o.status === "Delivered").length;

  if (loading) {
    return (
      <div className="mb-8 text-gray-500">
        Loading dashboard statistics...
      </div>
    );
  }

  return (
    <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-5">

      {/* Total Orders */}
      <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-blue-500 hover:shadow-lg transition">
        <p className="text-sm text-gray-500 mb-1">
          Total Orders
        </p>
        <h2 className="text-3xl font-bold text-gray-800">
          {total}
        </h2>
      </div>

      {/* Order Received */}
      <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-yellow-500 hover:shadow-lg transition">
        <p className="text-sm text-gray-500 mb-1">
          Order Received
        </p>
        <h2 className="text-3xl font-bold text-gray-800">
          {received}
        </h2>
      </div>

      {/* In Kitchen */}
      <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-orange-500 hover:shadow-lg transition">
        <p className="text-sm text-gray-500 mb-1">
          In Kitchen
        </p>
        <h2 className="text-3xl font-bold text-gray-800">
          {kitchen}
        </h2>
      </div>

      {/* Sent to Delivery */}
      <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-purple-500">
        <p className="text-sm text-gray-500 mb-1">
          Sent to Delivery
        </p>
        <h2 className="text-3xl font-bold text-gray-800">
          {delivery}
        </h2>
      </div>

      {/* Delivered */}
      <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-green-500 hover:shadow-lg transition">
        <p className="text-sm text-gray-500 mb-1">
          Delivered
        </p>
        <h2 className="text-3xl font-bold text-gray-800">
          {delivered}
        </h2>
      </div>

    </div>
  );
};

export default DashboardStats;