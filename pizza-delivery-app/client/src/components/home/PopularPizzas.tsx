import pizza1 from "../../assets/Margherita.jpg";
import pizza2 from "../../assets/Pepperoni.jpg";
import pizza3 from "../../assets/Veggie_Supreme.jpg";
import pizza4 from "../../assets/BBQ_Chicken.jpg";

const pizzas = [
  {
    name: "Margherita",
    desc: "Fresh mozzarella, tomatoes, basil",
    price: 299,
    image: pizza1
  },
  {
    name: "Pepperoni",
    desc: "Classic pepperoni & cheese",
    price: 399,
    image: pizza2
  },
  {
    name: "Veggie Supreme",
    desc: "Fresh vegetables & herbs",
    price: 349,
    image: pizza3
  },
  {
    name: "BBQ Chicken",
    desc: "BBQ sauce, chicken, onions",
    price: 449,
    image: pizza4
  }
];

const PopularPizzas = () => {
  return (
    <section className="py-16 bg-[#e8e1d8]">

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

              <p className="text-red-600 font-bold mt-2">
                ₹{pizza.price}
              </p>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default PopularPizzas;