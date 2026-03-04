import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "./orderService";

interface Order {
  _id: string;
  ingredients: string[];
  totalPrice: number;
  status: string;
}

const OrderTable = () => {

  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
      console.log("Orders:", data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const changeStatus = async (id: string, status: string) => {

    try {
      await updateOrderStatus(id, status);
      fetchOrders();
    } catch (error) {
      console.error("Status update failed", error);
    }

  };

  return (
    <div className="mt-6">

      <h3 className="text-xl font-bold mb-4">Orders</h3>

      <table className="w-full border">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Items</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((order) => (
            <tr key={order._id}>

              <td className="p-2 border">
                {order._id.slice(-6)}
              </td>

              <td className="p-2 border">
                {order.ingredients?.length || 0}
              </td>

              <td className="p-2 border">
                ₹{order.totalPrice}
              </td>

              <td className="p-2 border">
                {order.status}
              </td>

              <td className="p-2 border space-x-2">

                <button
                  onClick={() => changeStatus(order._id, "In Kitchen")}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Kitchen
                </button>

                <button
                  onClick={() => changeStatus(order._id, "Sent to Delivery")}
                  className="bg-green-600 text-white px-2 py-1 rounded"
                >
                  Deliver
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default OrderTable;