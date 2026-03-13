const Features = () => {
  return (
    <section className="py-16 bg-white">

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        <div className="p-6 shadow rounded-lg text-center">
          <h3 className="text-xl font-bold">Custom Pizza Builder</h3>
          <p className="mt-2 text-gray-600">
            Select base, sauce, cheese, veggies, and meats.
          </p>
        </div>

        <div className="p-6 shadow rounded-lg text-center">
          <h3 className="text-xl font-bold">Real-time Order Tracking</h3>
          <p className="mt-2 text-gray-600">
            Track status from kitchen to delivery.
          </p>
        </div>

        <div className="p-6 shadow rounded-lg text-center">
          <h3 className="text-xl font-bold">Smart Inventory</h3>
          <p className="mt-2 text-gray-600">
            Admin inventory automatically updates with orders.
          </p>
        </div>

      </div>

    </section>
  );
};

export default Features;