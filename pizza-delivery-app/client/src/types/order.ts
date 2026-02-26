export interface Order {
  _id: string;
  user: string;
  ingredients: string[];
  totalPrice: number;
  status: "Order Received" | "In Kitchen" | "Sent to Delivery";
  createdAt: string;
}