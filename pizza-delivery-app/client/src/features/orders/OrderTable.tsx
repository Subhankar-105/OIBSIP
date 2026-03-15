import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "./orderService";

interface Order {
  _id: string;
  items: any[];
  totalPrice: number;
  status: string;
}

const statusStyle: any = {
  "Order Received": "bg-yellow-100 text-yellow-700",
  "In Kitchen": "bg-orange-100 text-orange-700",
  "Sent to Delivery": "bg-blue-100 text-blue-700",
  "Delivered": "bg-green-100 text-green-700",
};

const OrderTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
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
    <div className="mt-8 bg-white shadow-md rounded-xl p-6">

      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Orders
      </h3>

      <table className="w-full overflow-hidden">

        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-center">Items</th>
            <th className="p-3 text-center">Price</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((order) => (
            <tr
              key={order._id}
              className="border-t hover:bg-gray-50 transition"
            >

              <td className="p-3 font-medium text-gray-700">
                {order._id.slice(-6)}
              </td>

              <td className="p-3 text-center">
                {order.items?.length || 0}
              </td>

              <td className="p-3 text-center font-medium">
                ₹{order.totalPrice}
              </td>

              <td className="p-3 text-center">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle[order.status]}`}
                >
                  {order.status}
                </span>

              </td>

              <td className="p-3 text-center">

                {/* Order Received → Kitchen */}
                {order.status === "Order Received" && (
                  <button
                    onClick={() => changeStatus(order._id, "In Kitchen")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Move to Kitchen
                  </button>
                )}

                {/* Kitchen → Delivery */}
                {order.status === "In Kitchen" && (
                  <button
                    onClick={() => changeStatus(order._id, "Sent to Delivery")}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Send to Delivery
                  </button>
                )}

                {/* Delivery → Delivered */}
                {order.status === "Sent to Delivery" && (
                  <button
                    onClick={() => changeStatus(order._id, "Delivered")}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Mark Delivered
                  </button>
                )}

                {/* Delivered */}
                {order.status === "Delivered" && (
                  <span className="text-green-600 font-semibold text-sm">
                    Completed
                  </span>
                )}

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default OrderTable;