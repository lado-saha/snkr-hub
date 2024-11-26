import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo, gif } from "../assets/data";
import { FaShoppingCart, FaTimes, FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const navigate = useNavigate(); // Hook to access the navigate function

  const toggleMobileMenu = () => {
    setClick(!click);
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page in history
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 dark:bg-gray-900/90 shadow-md z-50 backdrop-blur-md">
      <div className="p-4 flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Back Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="text-lg  text-gray-800 dark:text-white mr-16"
            aria-label="Go Back"
          >
            <FaArrowLeft />
          </button>

          <img
            src={logo}
            alt="Logo"
            height={50}
            width={50}
            className="dark:hidden"
          />
          <img
            src={gif}
            alt="Gif Logo"
            height={50}
            width={50}
            className="hidden dark:block"
          />
          <span className="text-2xl font-bold text-gray-800 dark:text-white">
            Bricostore
            <span className="font-extrabold text-sm text-green-600 ml-4">shop</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700 dark:text-gray-300">
          <li className="hover:text-green-600 dark:hover:text-green-400 transition">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-green-600 dark:hover:text-green-400 transition">
            <Link to="/explore">Browse Shop</Link>
          </li>
          <li className="relative hover:text-green-600 dark:hover:text-green-400 transition">
            <Link to="/cart">
              <FaShoppingCart className="text-xl" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-green-600 text-xs w-4 h-4 flex justify-center items-center rounded-full text-white animate-bounce">
                  {cart.length}
                </span>
              )}
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} aria-label="Toggle Mobile Menu">
            {!click ? (
              <GiHamburgerMenu className="text-2xl text-gray-800 dark:text-white" />
            ) : (
              <FaTimes className="text-2xl text-gray-800 dark:text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {click && (
          <ul className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 flex flex-col gap-4 p-6 shadow-lg z-40">
            <li className="hover:text-green-600 dark:hover:text-green-400 transition">
              <Link to="/" onClick={toggleMobileMenu}>
                Home
              </Link>
            </li>
            <li className="hover:text-green-600 dark:hover:text-green-400 transition">
              <Link to="/explore" onClick={toggleMobileMenu}>
                Browse Shop
              </Link>
            </li>
            <li className="hover:text-green-600 dark:hover:text-green-400 transition">
              <Link to="/cart" onClick={toggleMobileMenu}>
                Cart
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
