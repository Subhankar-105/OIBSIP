import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="bg-red-600 text-white py-16 text-center">

      <h2 className="text-3xl font-bold">
        Ready to build your pizza?
      </h2>

      <Link
        to="/register"
        className="inline-block mt-6 bg-white text-red-600 px-6 py-3 rounded-lg font-semibold"
      >
        Create Account
      </Link>

    </section>
  );
};

export default CallToAction;