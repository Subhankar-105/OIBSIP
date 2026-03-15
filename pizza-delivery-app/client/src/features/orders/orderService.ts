import API from "../../api/axios";

export const createOrder = async (ingredients: string[], totalPrice: number) => {
  const res = await API.post("/orders", {
    ingredients,
    totalPrice
  });

  return res.data;
};

export const getOrders = async () => {
  const res = await API.get("/orders");
  return res.data;
};

export const updateOrderStatus = async (id: string, status: string) => {
  const res = await API.put(`/orders/${id}`, { status });
  return res.data;
};

export const getUserOrders = async () => {
  const res = await API.get("/orders/my-orders");
  return res.data;
};
