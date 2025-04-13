import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { logout } from '../store/UserSlice';
import { FaOpencart } from "react-icons/fa";
import "../App.css";
import axios from 'axios';

export default function Navbar() {
  const [searchUser, setSearchUser] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const userStore = useSelector((state)=>state.user)
  let dispatch = useDispatch()

  let login = userStore.login

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (!event.target.closest("#navbar") && !event.target.closest("#profile-menu")) {
      setNavbarOpen(false);
      setProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
const [products, setproducts] = useState(false);
  const productOpen = ()=>{
    setproducts(!products) 
  }


  const [useritems, setuseritems] = useState([]);
 const cart = async()=>{
   let res = await axios.get(`https://om-backend.onrender.com/carts/getcartItems`,{
     headers:{
       'Authorization':userStore.token
     }
   })
   let data = res.data;
   setuseritems(data.cartItem[0].items);
   }  
   useEffect(()=>{
     cart()
   },[userStore.token])

   useEffect(() => {
    if (!userStore.token) return;
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
      console.log(res.data)
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  return (
    <nav id="navbar" className="bg-gray-800 text-white shadow-md fixed w-full z-50 ">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo or Heading */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-blue-400">Om Agro Center</Link>
        </div>

        {/* Search Bar */}
        <li className='list-none'>
  <div className="relative">
    <input
      type="text"
      value={searchValue}
      onChange={handleSearchChange}
      placeholder="Search..."
      className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
    />
    {login === true && searchValue.trim() !== "" && searchUser.length > 0 && (
      <div className="absolute left-0 right-0 mt-2 bg-white shadow-md rounded-md max-h-48 overflow-y-auto z-50">
        {searchUser.map((product, i) => (
          <Link
            key={i}
            to="/productDetail"
            state={product}
            className="block px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setSearchValue("");
              setSearchUser([]);
              setNavbarOpen(false); // optionally close menu on mobile
            }}
          >
            {product.title}
          </Link>
        ))}
      </div>
    )}
  </div>
</li>    
       <li className='hidden lg:block'><Link to = ''>Home</Link></li>
       <li className='hidden lg:block'><Link to = '/about'>AboutUs</Link></li>
       <li onClick={productOpen} className='hidden lg:block cursor-pointer relative'>Products
       { products&& <ul id='navbar' className=' text-white absolute my-7 -right-14'>
         <div className='w-44  h-max flex flex-col justify-center items-center gap-2 bg-green-400'>
         <li className='mylists'>
              <Link to="/seed" className="block  ">Seeds</Link>
            </li>

            <li className='mylists'>
              <Link to="/fertilizer" className="block ">Fertilizer</Link>
            </li>
            <li className='mylists'>
              <Link to="/pesticide" className="block ">Insecticides & Pesticides</Link>
            </li>
         </div>
          </ul>}
       </li>
       <li className='hidden lg:block'><Link to = '/contact'>ContactUs</Link></li>
        {/* Cart */}
       { login === true ?<Link to ='/viewcart' className='cursor-pointer'><sub>{useritems.length}</sub><FaOpencart size={25} /></Link> :
        <Link to ='/viewcart' className='cursor-pointer'><sub>0</sub><FaOpencart size={25} /></Link>}

        {/* Profile Section */}
        <div id="profile-menu" className="relative flex items-center space-x-4">
          <button
            className="flex items-center space-x-2 hover:text-blue-400"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          >
            <img
              src={userStore.user?.profilePic|| 'https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=2048x2048&w=is&k=20&c=gQzuvUmvNKqkEsbZVBPR6Pm7JaIEDWLZrH6YLnW2uGc='}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            
          </button>

          {/* Profile Dropdown Menu */}
          {profileMenuOpen && (
            <div className="absolute -right-4 mt-56 w-44 bg-gray-700 rounded-lg shadow-lg z-50">
              <p className='px-4'>{userStore.user.name}</p>
              {/* <hr className='border border-b-slate-400' /> */}
              <p className='text-xs truncate'>{userStore.user.email}</p>
             <hr className='border border-b-slate-400 h-[3px] bg-black border-blue-200' />
              <ul className="py-2 text-sm">
                <li>
                  <Link
                    to="/userProfile"
                    className="block px-4 py-2 hover:bg-gray-600 hover:text-blue-400"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="block px-4 py-2 hover:bg-gray-600 hover:text-blue-400"
                  >
                    Settings
                  </Link>
                </li>
               { login === true ? <li>
                  <Link
                    to="#" onClick={()=>dispatch(logout())}
                    className="block px-4 py-2 hover:bg-gray-600 hover:text-blue-400"
                  >
                     Logout
                  </Link>
                </li> :
                <li>
                  <Link
                    to="#"
                    className="block px-4 py-2 hover:bg-gray-600 hover:text-blue-400"
                  >
                     Login
                  </Link>
                </li>}
              </ul>
            </div>
          )}

          {/* Menu Button */}
          <button
            className=""
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={navbarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-16 6h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/*Menu Bar*/}
      {navbarOpen && (
        <div className=" bg-gray-900 text-white px-4 py-2 ">
          <ul className="space-y-4 z-40 ">
            <li className='hover:text-green-300'><Link to ='/'>Home</Link></li>
           
            
        <li onClick={productOpen} className='cursor-pointer hover:text-green-300 block lg:hidden '>
          Products
        { products&& <ul className='px-3 text-amber-300'>
          <li>
              <Link to="/seed" className="block hover:text-emerald-400 ">Seeds</Link>
            </li>
            <li>
              <Link to="/fertilizer" className="block hover:text-emerald-400">Fertilizer</Link>
            </li>
            <li>
              <Link to="/pesticide" className="block hover:text-emerald-400">Insecticides & Pesticides</Link>
            </li>
          </ul>}
         
        </li>
        <li className='hover:text-green-300'><Link to ='/about'>About Us</Link></li>
            <li className='hover:text-green-300'><Link to ='/'>ContactUs</Link></li>
            
           
            {/* <li>
              <div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white sm:hidden"/>
              </div>
            </li> */}
          </ul>
        </div>
        
      )}
     {/* {login === true && searchValue.trim() !== "" && searchUser.length > 0 && (
  <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-md rounded-md max-h-48 overflow-y-auto z-50 sm:hidden">
    {searchUser.map((product, i) => (
      <Link
        key={i}
        to="/productDetail"
        state={product}
        className="block px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
        onClick={() => {
          setSearchValue("");
          setSearchUser([]);
        }}
      >
        {product.title}
      </Link>
    ))}
  </div>
)} */}


    </nav>
  );
}
