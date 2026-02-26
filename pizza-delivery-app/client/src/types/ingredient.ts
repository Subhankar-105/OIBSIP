export interface Ingredient {
  _id: string;
  name: string;
  category: "base" | "sauce" | "cheese" | "veggie" | "meat";
  price: number;
  stock: number;
}