import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import CallToAction from "../components/home/CallToAction";

const Home = () => {
  return (
    <>
      <Navbar />

      <Hero />

      <Features />

      <CallToAction />

      <Footer />
    </>
  );
};

export default Home;