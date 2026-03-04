import API from "../../api/axios";
import { Ingredient } from "../../types/ingredient";

export const getIngredients = async (): Promise<Ingredient[]> => {
  const res = await API.get("/ingredients");
  return res.data;
};

export const addIngredient = async (ingredient: Partial<Ingredient>) => {
  const res = await API.post("/ingredients", ingredient);
  return res.data;
};

export const updateIngredient = async (id: string, ingredient: Partial<Ingredient>) => {
  const res = await API.put(`/ingredients/${id}`, ingredient);
  return res.data;
};

export const deleteIngredient = async (id: string) => {
  const res = await API.delete(`/ingredients/${id}`);
  return res.data;
};