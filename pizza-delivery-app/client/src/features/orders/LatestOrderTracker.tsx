import { useEffect, useState } from "react";
import { getUserOrders } from "../../features/orders/orderService";

interface Order {
  _id: string;
  totalPrice: number;
  status: string;
  items: any[];
  createdAt: string;
}

const steps = [
  "Order Received",
  "In Kitchen",
  "Sent to Delivery",
  "Delivered"
];

const LatestOrderTracker = () => {

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {

    fetchOrders();

    const interval = setInterval(fetchOrders, 10000);

    return () => clearInterval(interval);

  }, []);

  const fetchOrders = async () => {

    const data = await getUserOrders();

    if (data.length > 0) {
      setOrder(data[0]); // latest order
    }

  };

  if (!order) return null;

  const getProgressWidth = () => {

    const index = steps.indexOf(order.status);

    return ((index + 1) / steps.length) * 100;

  };

  return (

    <div className="bg-white shadow rounded-xl p-6 mt-10">

      <h2 className="text-lg font-semibold mb-3">
        Track Your Pizza 🍕
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        Order #{order._id.slice(-6)} • ₹{order.totalPrice}
      </p>

      <p className="text-sm text-gray-600 mb-4">
        • Custom Pizza (
        {order.items.map((item:any)=>item.ingredient?.name).join(", ")}
        )
      </p>

      {/* Status Banner */}

      <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-3 rounded mb-4">

        {order.status}

      </div>

      {/* Progress */}

      <div>

        <div className="flex justify-between text-xs text-gray-500 mb-1">

          {steps.map(step => (
            <span key={step}>{step}</span>
          ))}

        </div>

        <div className="w-full bg-gray-200 h-2 rounded">

          <div
            className="bg-red-500 h-2 rounded"
            style={{ width: `${getProgressWidth()}%` }}
          />

        </div>

      </div>

    </div>

  );
};

export default LatestOrderTracker;