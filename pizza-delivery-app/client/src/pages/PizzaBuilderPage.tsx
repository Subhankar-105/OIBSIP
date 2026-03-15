import UserNavbar from "../components/layout/UserNavbar";
import PizzaBuilder from "../features/pizzaBuilder/PizzaBuilder";

const PizzaBuilderPage = () => {

  return (
    <div className="bg-gradient-to-r from-amber-50 to-amber-100 min-h-screen">

      <UserNavbar />

      <div className="max-w-6xl mx-auto px-6 py-8">

        <h1 className="text-2xl font-bold mb-6">
          Customize Your Pizza
        </h1>

        <PizzaBuilder />

      </div>

    </div>
  );
};

export default PizzaBuilderPage;