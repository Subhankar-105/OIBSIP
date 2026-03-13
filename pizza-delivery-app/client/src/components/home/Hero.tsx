import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-yellow-50 py-20">

      <div className="max-w-6xl mx-auto text-center">

        <h1 className="text-5xl font-bold text-gray-800">
          Build Your Perfect Pizza
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Choose ingredients, customize flavors, and get your pizza delivered fresh.
        </p>

        <Link
          to="/login"
          className="inline-block mt-6 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
        >
          Start Ordering
        </Link>

      </div>

    </section>
  );
};

export default Hero;