import { FaClock, FaPizzaSlice, FaUsers } from "react-icons/fa";

const ClockIcon = FaClock as any;
const PizzaIcon = FaPizzaSlice as any;
const UsersIcon = FaUsers as any;

const Features = () => {
  return (
    <section className="bg-amber-50 py-16">

      <h2 className="text-2xl font-bold text-center mb-10">
        Why Choose Us?
      </h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto text-center">

        <div>
          <ClockIcon className="text-red-500 text-3xl mx-auto mb-3" />
          <h3 className="font-semibold">Fast Delivery</h3>
          <p className="text-gray-500 text-sm">
            30 minutes or it's free!
          </p>
        </div>

        <div>
          <PizzaIcon className="text-red-500 text-3xl mx-auto mb-3" />
          <h3 className="font-semibold">Fresh Ingredients</h3>
          <p className="text-gray-500 text-sm">
            Only the finest and freshest ingredients
          </p>
        </div>

        <div>
          <UsersIcon className="text-red-500 text-3xl mx-auto mb-3" />
          <h3 className="font-semibold">Customer First</h3>
          <p className="text-gray-500 text-sm">
            Your satisfaction is our priority
          </p>
        </div>

      </div>

    </section>
  );
};

export default Features;