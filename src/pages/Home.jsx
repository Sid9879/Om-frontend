import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import Seed from './Seed';
import Pesticide from './Pesticide';
import Fertilizer from './Fertilizer';
const Home = () => {
  const userStore = useSelector((state)=>state.user);
  const [isVisible, setIsVisible] = useState(false);

 
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false); 
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

 
  return (
    <div className=' flex flex-col gap-8 bg-white'>
     <Seed/>
  <Pesticide/>
   <Fertilizer/>
   {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition h-18 w-18"
        >
          ↑
        </button>
      )}
    </div>
  )
}

export default Home
