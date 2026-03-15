const Footer = () => {
  return (
    <footer className="bg-black text-gray-100 py-4 text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} PizzaCraft. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;