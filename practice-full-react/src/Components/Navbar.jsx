
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import ProductContext from "../Context/ProductContext";
import { CiLight } from "react-icons/ci";
import { MdLightMode } from "react-icons/md";
import { LuLogIn } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import eco from '../assets/eco.jpg'
import './Navbar.css'
// import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const {
    state: { cart },
  } = useContext(ProductContext);

  const handleClick = () => {
    setIsDark(!isDark);
  };

    const handleSearchSubmit = (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/search/${searchQuery}`);
      }else{
        navigate('/')
      }
    };



   

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`px-4 sm:px-6 lg:px-8 ${
          isDark ? "bg-[#0a0908] text-white" : "bg-white text-black"
        } shadow font-mono border-b ${
          isDark ? "border-white/20" : "border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between h-16 mx-auto max-w-7xl">
          {/* Logo Section */}

          <div className="flex items-center flex-shrink-0">
            <Link to='/'>
              <h3 className="text-xl font-bold tracking-wider logo-text">
                {"ECOFRIEND".split("").map((letter, index) => (
                  <span key={index} className="logo-letter">
                    {letter}
                  </span>
                ))}
              </h3>
            </Link>
            <img
              src={eco}
              alt="ecommerce-image"
              className={`w-20 h-16 object-contain ${
                isDark
                  ? "invert brightness-200 contrast-100"
                  : "mix-blend-multiply"
              }`}
            />
          </div>

          {/* navigation link */}
          <div className="flex-1 hidden px-4 md:block">
            <ul className="flex items-center justify-center gap-8 font-bold text-[19px]">
              {["Home", "Profile", "Services", "Contact"].map((item, index) => (
                <Link
                  key={index}
                  className="nav-link"
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                >
                  {item.split("").map((letter, letterIndex) => (
                    <span key={letterIndex} className="nav-link-letter">
                      {letter}
                    </span>
                  ))}
                </Link>
              ))}
            </ul>
          </div>

          {/* Right Section - Search, Cart, etc */}
          <div className="flex items-center gap-4">
            <form
              onSubmit={handleSearchSubmit}
              className="relative hidden sm:block"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-64 pl-4 pr-10 py-2 rounded-full border focus:outline-none focus:ring-2 
                  ${
                    isDark
                      ? "bg-gray-800 border-gray-700 focus:ring-blue-500 text-white placeholder-gray-400"
                      : "bg-gray-50 border-gray-300 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  } transition-all`}
              />
              <button
                type="submit"
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full
                  ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-500 hover:text-gray-700"
                  } transition-colors`}
              >
                <FaSearch className="w-4 h-4" />
              </button>
            </form>

            <Link to="/cart_list">
              <button
                type="button"
                className="relative inline-flex items-center p-3 text-lg cursor-pointer"
              >
                <FaCartArrowDown className="text-2xl" />
                <span className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full -top-0 -right-2">
                  {cart.length}
                </span>
              </button>
            </Link>

            <button
              onClick={handleClick}
              className="px-2 py-2 text-2xl transition-transform hover:scale-110"
            >
              {isDark ? (
                <CiLight className="text-white" />
              ) : (
                <MdLightMode className="text-gray-900" />
              )}
            </button>

            <Link
              to="/signup"
              className="text-2xl transition-transform hover:scale-110"
            >
              <LuLogIn size={20} />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;










