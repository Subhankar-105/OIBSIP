import { useEffect, useState } from "react";
import UserNavbar from "../components/layout/UserNavbar";
import { getUserOrders } from "../features/orders/orderService";

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
  "Out for Delivery",
  "Delivered"
];

const UserOrders = () => {

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {

    fetchOrders();

    const interval = setInterval(fetchOrders, 10000);

    return () => clearInterval(interval);

  }, []);

  const fetchOrders = async () => {
    const data = await getUserOrders();
    setOrders(data);
  };

  const getProgressWidth = (status: string) => {

    const index = steps.indexOf(status);

    return ((index + 1) / steps.length) * 100;
  };

  const getStatusStyle = (status: string) => {

    switch (status) {

      case "Delivered":
        return "bg-green-100 text-green-700 border-green-300";

      case "Sent to Delivery":
        return "bg-blue-100 text-blue-700 border-blue-300";

      case "In Kitchen":
        return "bg-orange-100 text-orange-700 border-orange-300";

      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
    }
  };

  return (

    <div className="bg-amber-50 min-h-screen">

      <UserNavbar />

      <div className="max-w-4xl mx-auto px-6 py-8">

        <div className="bg-white shadow rounded-lg p-6 mb-6">

          <h2 className="font-bold text-lg">
            Track Your Pizza Journey 🍕
          </h2>

          <p className="text-sm text-gray-500">
            Real time updates from our kitchen to your doorstep
          </p>

        </div>

        {orders.map(order => (

          <div
            key={order._id}
            className="bg-white shadow rounded-lg p-6 mb-6"
          >

            {/* Header */}

            <div className="flex justify-between items-center">

              <div>

                <h3 className="font-semibold">
                  Order #{order._id.slice(-6)}
                </h3>

                <p className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

              </div>

              <span className="text-red-600 font-bold">
                ₹{order.totalPrice}
              </span>

            </div>

            {/* Items */}

            <p className="mt-4 text-sm text-gray-600">
            • Custom Pizza (
            {order.items
                .map((item: any) => item.ingredient?.name)
                .join(", ")}
            )
            </p>

            {/* Status banner */}

            <div
              className={`mt-4 border rounded-lg p-3 text-sm text-center font-medium ${getStatusStyle(order.status)}`}
            >
              {order.status}
            </div>

            {/* Progress bar */}

            <div className="mt-4">

              <div className="flex justify-between text-xs text-gray-500 mb-1">

                {steps.map(step => (
                  <span key={step}>
                    {step}
                  </span>
                ))}

              </div>

              <div className="w-full bg-gray-200 rounded h-2">

                <div
                  className="bg-red-500 h-2 rounded"
                  style={{
                    width: `${getProgressWidth(order.status)}%`
                  }}
                />

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
};

export default UserOrders;