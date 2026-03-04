import { Ingredient } from "../../types/ingredient";

interface Props {
  title: string;
  ingredients: Ingredient[];
  selected: string[];
  setSelected: (items: string[]) => void;
  multi?: boolean;
}

const IngredientSelector = ({
  title,
  ingredients,
  selected,
  setSelected,
  multi = false
}: Props) => {

  const toggleSelect = (id: string) => {

    if (multi) {
      if (selected.includes(id)) {
        setSelected(selected.filter((i) => i !== id));
      } else {
        setSelected([...selected, id]);
      }
    } else {
      setSelected([id]);
    }
  };

  return (
    <div className="mb-6">

      <h3 className="text-lg font-bold mb-2">{title}</h3>

      <div className="flex flex-wrap gap-3">

        {ingredients.map((item) => (
          <button
            key={item._id}
            onClick={() => toggleSelect(item._id)}
            className={`px-4 py-2 border rounded ${
              selected.includes(item._id)
                ? "bg-green-500 text-white"
                : "bg-white"
            }`}
          >
            {item.name} ₹{item.price}
          </button>
        ))}

      </div>
    </div>
  );
};

export default IngredientSelector;