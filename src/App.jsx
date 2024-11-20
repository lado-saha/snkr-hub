import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Cart, Explore, Home, Preview } from "./pages/index";
import Footer from "./components/Footer";
import Subscribe from "./components/Subscribe";

const App = () => {
  return (
    <div className="bg-gray-50 dark:bg-[#121212] h-full overflow-y-hidden">
      <section className="bg-blue-50 dark:bg-[#1E1E1E] shadow-sm dark:shadow-md mt-8">
        <Navbar />
      </section>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/preview/:id" element={<Preview />} />
      </Routes>

      {/* Footer with elevation */}
      <section className="bg-blue-50 dark:bg-[#1E1E1E] shadow-lg dark:shadow-md mt-8">
        <Subscribe />
        <Footer />
      </section>
    </div>
  );
};

// export default App;

export default App;
