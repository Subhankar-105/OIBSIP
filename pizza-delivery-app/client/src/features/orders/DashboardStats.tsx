import { useEffect, useState } from "react";
import { getOrders } from "./orderService";

interface Order {
  _id: string;
  status: string;
}

const DashboardStats = () => {

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {

    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data);
    };

    fetchOrders();

  }, []);

  const total = orders.length;
  const received = orders.filter(o => o.status === "Order Received").length;
  const kitchen = orders.filter(o => o.status === "In Kitchen").length;
  const delivered = orders.filter(o => o.status === "Sent to Delivery").length;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">

      <div className="bg-stone-100 shadow p-4 rounded text-center">
        <h3 className="text-gray-500">Total Orders</h3>
        <p className="text-2xl font-bold">{total}</p>
      </div>

      <div className="bg-yellow-100 shadow p-4 rounded text-center">
        <h3>Order Received</h3>
        <p className="text-2xl font-bold">{received}</p>
      </div>

      <div className="bg-red-200 shadow p-4 rounded text-center">
        <h3>In Kitchen</h3>
        <p className="text-2xl font-bold">{kitchen}</p>
      </div>

      <div className="bg-lime-200 shadow p-4 rounded text-center">
        <h3>Delivered</h3>
        <p className="text-2xl font-bold">{delivered}</p>
      </div>

    </div>
  );
};

export default DashboardStats;