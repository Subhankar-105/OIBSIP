import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-[#e8e1d8] py-20 text-center">

      <h1 className="text-4xl font-bold text-gray-900">
        Fresh Pizza Delivered to Your Door
      </h1>

      <p className="text-gray-600 mt-4 max-w-xl mx-auto">
        Customize your perfect pizza and have it delivered hot and fresh
        in 30 minutes or less!
      </p>

      <Link
        to="/dashboard"
        className="inline-block mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
      >
        Order Now
      </Link>

    </section>
  );
};

export default Hero;