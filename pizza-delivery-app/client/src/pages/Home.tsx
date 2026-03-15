import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import PopularPizzas from "../components/home/PopularPizzas";
import Features from "../components/home/Features";
import CallToAction from "../components/home/CallToAction";

const Home = () => {
  return (

    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-grow">

        <Hero />

        <PopularPizzas />

        <Features />

        <CallToAction />

      </main>

      <Footer />

    </div>

  );
};

export default Home;