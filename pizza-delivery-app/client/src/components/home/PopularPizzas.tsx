import pizza1 from "../../assets/Margherita.jpg";
import pizza2 from "../../assets/Pepperoni.jpg";
import pizza3 from "../../assets/Veggie_Supreme.jpg";
import pizza4 from "../../assets/BBQ_Chicken.jpg";

const pizzas = [
  {
    name: "Margherita",
    desc: "Fresh mozzarella, tomatoes, basil",
    image: pizza1
  },
  {
    name: "Pepperoni",
    desc: "Classic pepperoni & cheese",
    image: pizza2
  },
  {
    name: "Veggie Supreme",
    desc: "Fresh vegetables & herbs",
    image: pizza3
  },
  {
    name: "BBQ Chicken",
    desc: "BBQ sauce, chicken, onions",
    image: pizza4
  }
];

const PopularPizzas = () => {
  return (
    <section className="py-16 bg-amber-50">

      <h2 className="text-2xl font-bold text-center mb-10">
        Our Popular Pizzas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">

        {pizzas.map((pizza, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >

            <img
              src={pizza.image}
              alt={pizza.name}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">

              <h3 className="font-semibold">{pizza.name}</h3>

              <p className="text-sm text-gray-500 mt-1">
                {pizza.desc}
              </p>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default PopularPizzas;