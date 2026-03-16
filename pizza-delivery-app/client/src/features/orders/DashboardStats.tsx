import { useEffect, useState } from "react";
import { getOrders } from "./orderService";

interface Order {
  _id: string;
  status: string;
}

const DashboardStats = () => {

  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  useEffect(() => {

    fetchOrders(); // initial load

    const interval = setInterval(() => {
      fetchOrders(); // refresh every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // cleanup

  }, []);

  const total = orders.length;
  const received = orders.filter(o => o.status === "Order Received").length;
  const kitchen = orders.filter(o => o.status === "In Kitchen").length;
  const delivery = orders.filter(o => o.status === "Sent to Delivery").length;
  const delivered = orders.filter(o => o.status === "Delivered").length;

  return (

    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">

      <div className="bg-white shadow rounded-xl p-5 border-l-4 border-blue-500">
        <p className="text-gray-500 text-sm">Total Orders</p>
        <h2 className="text-2xl font-bold">{total}</h2>
      </div>

      <div className="bg-white shadow rounded-xl p-5 border-l-4 border-yellow-500">
        <p className="text-gray-500 text-sm">Order Received</p>
        <h2 className="text-2xl font-bold">{received}</h2>
      </div>

      <div className="bg-white shadow rounded-xl p-5 border-l-4 border-orange-500">
        <p className="text-gray-500 text-sm">In Kitchen</p>
        <h2 className="text-2xl font-bold">{kitchen}</h2>
      </div>

      <div className="bg-white shadow rounded-xl p-5 border-l-4 border-purple-500">
        <p className="text-gray-500 text-sm">Sent to Delivery</p>
        <h2 className="text-2xl font-bold">{delivery}</h2>
      </div>

      <div className="bg-white shadow rounded-xl p-5 border-l-4 border-green-500">
        <p className="text-gray-500 text-sm">Delivered</p>
        <h2 className="text-2xl font-bold">{delivered}</h2>
      </div>

    </div>

  );
};

export default DashboardStats;