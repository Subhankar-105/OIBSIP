import { Ingredient } from "../../types/ingredient";

export const calculatePrice = (
  ingredients: Ingredient[],
  selectedIds: string[]
) => {

  return ingredients
    .filter((i) => selectedIds.includes(i._id))
    .reduce((sum, item) => sum + item.price, 0);

};