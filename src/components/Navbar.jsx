import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/UserSlice';
import { FaOpencart } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";
import axios from 'axios';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [searchUser, setSearchUser] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const userStore = useSelector((state) => state.user);
  let dispatch = useDispatch();

  let login = userStore.login;

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (
      !event.target.closest("#navbar") &&
      !event.target.closest("#profile-menu-button") &&
      !event.target.closest("#products-dropdown-button")
    ) {
      setNavbarOpen(false);
      setProfileMenuOpen(false);
      setProductsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [useritems, setuseritems] = useState([]);
  const cart = async () => {
    if (!userStore.token) {
      setuseritems([]);
      return;
    }
    try {
      let res = await axios.get(`https://om-backend.onrender.com/carts/getcartItems`, {
        headers: {
          'Authorization': userStore.token
        }
      });
      let data = res.data;
      setuseritems(data.cartItem[0]?.items || []);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setuseritems([]);
    }
  };

  useEffect(() => {
    cart();
    const interval = setInterval(() => {
      cart();
    }, 2000);
    return () => clearInterval(interval);
  }, [userStore.token]);

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (!value.trim()) {
      setSearchUser([]);
      return;
    }

    try {
      const res = await axios.get(`https://om-backend.onrender.com/posts/search?q=${value}`);
      setSearchUser(res.data.products || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchUser([]);
    }
  };

  return (
    <nav id="navbar" className="bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-xl fixed w-full z-50 transition-all duration-300 ease-in-out">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="text-2xl font-bold flex items-center gap-2">
          <img
            className="w-[35px] h-[35px] rounded-full sm:w-[40px] sm:h-[40px] mr-2 transform hover:scale-110 transition-transform duration-300"
            src={logo}
            alt="Om Agro Center Logo"
          />
          <Link
            to="/"
            className="text-white hover:text-green-300 transition-colors duration-200 text-3xl font-extrabold tracking-tight hidden md:block"
          >
            Om Agro Center
          </Link>
        </div>

        <div className="relative flex-grow mx-4 max-w-lg">
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="w-full px-5 py-2.5 rounded-full focus:outline-none focus:ring-3 focus:ring-green-400 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 shadow-inner text-lg transition-all duration-200"
          />
          {login === true && searchValue.trim() !== "" && searchUser.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-50 animate-fade-in-down transform translate-y-2">
              {searchUser.map((product) => (
                <Link
                  key={product._id}
                  to="/productDetail"
                  state={product}
                  className="block px-4 py-3 text-gray-800 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 text-base border-b border-gray-100 last:border-b-0"
                  onClick={() => {
                    setSearchValue("");
                    setSearchUser([]);
                    setNavbarOpen(false);
                  }}
                >
                  {product.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        <ul className="hidden lg:flex items-center space-x-6 text-lg font-medium">
          <li><Link to="/" className="hover:text-green-300 transition-colors duration-200">Home</Link></li>
          <li><Link to="/about" className="hover:text-green-300 transition-colors duration-200">About Us</Link></li>
          <li className="relative">
            <button
              id="products-dropdown-button"
              onClick={(e) => {
                e.stopPropagation(); // Stop propagation to prevent handleClickOutside from closing it immediately
                setProductsDropdownOpen(!productsDropdownOpen);
              }}
              className="hover:text-green-300 transition-colors duration-200 focus:outline-none flex items-center"
            >
              Products
              <svg className={`ml-1 w-4 h-4 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {productsDropdownOpen && (
              <ul className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-48 bg-gray-700 rounded-lg shadow-xl py-2 z-[60] animate-fade-in-up">
                <li><Link to="/seed" className="block px-4 py-2 hover:bg-gray-600 hover:text-green-300 transition-colors duration-200" onClick={() => setProductsDropdownOpen(false)}>Seeds</Link></li>
                <li><Link to="/fertilizer" className="block px-4 py-2 hover:bg-gray-600 hover:text-green-300 transition-colors duration-200" onClick={() => setProductsDropdownOpen(false)}>Fertilizer</Link></li>
                <li><Link to="/pesticide" className="block px-4 py-2 hover:bg-gray-600 hover:text-green-300 transition-colors duration-200" onClick={() => setProductsDropdownOpen(false)}>Insecticides & Pesticides</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/contact" className="hover:text-green-300 transition-colors duration-200">Contact Us</Link></li>
        </ul>

        <Link to='/viewcart' className='relative cursor-pointer ml-6 group'>
          <FaOpencart size={28} className="text-white group-hover:text-green-400 transition-colors duration-200 transform group-hover:scale-110" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce-in">
            {useritems.length}
          </span>
        </Link>

        <div id="profile-menu-button" className="relative flex items-center space-x-4 ml-6">
          <button
            className="flex items-center space-x-2 hover:text-green-400 transition-colors duration-200 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation(); // Stop propagation
              setProfileMenuOpen(!profileMenuOpen);
            }}
          >
            <img
              src={userStore.user?.profilePic || 'https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=2048x2048&w=is&k=20&c=gQzuvUmvNKqkEsbZVBPR6Pm7JaIEDWLZrH6YLnW2uGc='}
              alt="Profile"
              className="w-9 h-9 rounded-full border-2 border-green-300 object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 mt-64 w-48 bg-gray-700 rounded-lg shadow-xl z-50 animate-fade-in-up">
              <div className="p-4 border-b border-gray-600 text-center">
                <p className='font-bold text-md text-green-300'>{userStore.user?.name || "Guest"}</p>
                {userStore.user?.email && (
                  <p className='text-xs text-gray-300 truncate'>{userStore.user.email}</p>
                )}
              </div>
              <ul className="py-2 text-sm">
                <li>
                  <Link
                    to="/userProfile"
                    className="block px-4 py-2 hover:bg-gray-600 hover:text-green-300 transition-colors duration-200"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="block px-4 py-2 hover:bg-gray-600 hover:text-green-300 transition-colors duration-200"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                </li>
                {login === true ? (
                  <li>
                    <button
                      onClick={() => { dispatch(logout()); setProfileMenuOpen(false); }}
                      className="w-full text-left block px-4 py-2 hover:bg-red-700 hover:text-white transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <li>
                    <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-green-700 hover:text-white transition-colors duration-200"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* This is the mobile menu (hamburger) button */}
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={(e) => { // Added 'e' to access the event object
              e.stopPropagation(); // Crucial: Stop event propagation here
              setNavbarOpen(!navbarOpen); // Toggle the main mobile navbar state
            }}
          >
            {navbarOpen ? (
              <IoClose size={32} className="text-green-400 animate-rotate-in" />
            ) : (
              <IoMenu size={32} className="text-white animate-rotate-out" />
            )}
          </button>
        </div>
      </div>

      {navbarOpen && (
        <div className="lg:hidden bg-gray-800 text-white px-4 py-4 shadow-inner animate-slide-down">
          <ul className="space-y-4 text-lg font-medium">
            <li><Link to='/' className='block hover:text-green-300 transition-colors duration-200' onClick={() => setNavbarOpen(false)}>Home</Link></li>
            <li><Link to='/about' className='block hover:text-green-300 transition-colors duration-200' onClick={() => setNavbarOpen(false)}>About Us</Link></li>

            <li className='relative'>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Stop propagation
                  setProductsDropdownOpen(!productsDropdownOpen);
                }}
                className='w-full text-left flex items-center justify-between hover:text-green-300 transition-colors duration-200 focus:outline-none'
              >
                Products
                <svg className={`ml-1 w-5 h-5 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {productsDropdownOpen && (
                <ul className='pl-4 mt-2 space-y-2 text-md bg-gray-700 rounded-md py-2 z-[60] animate-fade-in-up'>
                  <li><Link to="/seed" className="block py-1 hover:text-green-300 transition-colors duration-200" onClick={() => { setNavbarOpen(false); setProductsDropdownOpen(false); }}>Seeds</Link></li>
                  <li><Link to="/fertilizer" className="block py-1 hover:text-green-300 transition-colors duration-200" onClick={() => { setNavbarOpen(false); setProductsDropdownOpen(false); }}>Fertilizer</Link></li>
                  <li><Link to="/pesticide" className="block py-1 hover:text-green-300 transition-colors duration-200" onClick={() => { setNavbarOpen(false); setProductsDropdownOpen(false); }}>Insecticides & Pesticides</Link></li>
                </ul>
              )}
            </li>
            <li><Link to='/contact' className='block hover:text-green-300 transition-colors duration-200' onClick={() => setNavbarOpen(false)}>Contact Us</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}