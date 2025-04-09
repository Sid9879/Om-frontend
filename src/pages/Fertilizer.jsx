import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { handleAddCart } from '../utils/CartUtils';
import { useSelector } from 'react-redux';

const Fertilizer = () => {
  const userStore = useSelector((state) => state.user);
   const [totalPage, settotalPage] = useState(0);
  
      const [page, setpage] = useState(1);
     
      let limit = 2
        const [loading, setloading] = useState(false);
  const [fertilizesDetails, setfertilizesDetails] = useState([]);

  const getfertilizers = async () => {
    try {
      setloading(true)
      let res = await axios.get('https://om-backend.onrender.com/posts/getfertilizers');
      let data = res.data;
      settotalPage(data.totalPage)
      setfertilizesDetails(data.fertilizers)
      setloading(false)
    } catch (error) {
      console.error('Error fetching fertilizer:', error);
    }
  };

useEffect(()=>{
getfertilizers()
},[])

const fetchMoreData = ()=>{
  setpage(page+1)
  getSeed()
}

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleAddToCartClick = async (obj) => {
    try {
      const data = await handleAddCart(obj, userStore.token);
      if (data.success) {
        
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  
  return (
    <div>
       <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 bg-orange-300">Fertilizers</h1>
     <InfiniteScroll
             dataLength={fertilizesDetails.length}
             next={fetchMoreData}
            
           
             hasMore={page<totalPage}
             loader={<h4>Loading...</h4>}
             endMessage={
                 <p style={{ textAlign: 'center' }}>
                   <b>Yay! You have seen it all</b>
                 </p>
             }
            
           >
    <div  className="container mx-auto px-4 sm:px-6 lg:px-8">
   
  
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {fertilizesDetails?.map((ele, index) => (
        <div  style={{height:"65vh"}} key={index} className="relative flex flex-col text-gray-700 bg-white shadow-md rounded-xl border border-red-500 ">
          {ele.image.length > 1 ? (
              <Slider {...sliderSettings}>
                {ele.image.map((obj, i) => (
                  <div key={i} className="relative overflow-hidden bg-white rounded-xl h-96">
                    <img
                      src={obj.url}
                      alt={obj.name || 'Default Image'}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="relative overflow-hidden bg-white rounded-xl h-96">
                <img
                  src={ele.image[0]?.url}
                  alt={ele.image[0]?.name || 'Default Image'}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-base font-medium">Title:-{ele.title}</p>
              <p className="text-base font-medium">₹{ele.price}</p>
            </div>
            <p className="text-sm text-gray-700 opacity-75">
              Description:-{ele.description?.slice(0, 100)}...
            </p>
            <p className="text-sm text-gray-700 opacity-75">
              {ele?.size}
            </p>
            <p className="text-sm text-gray-700 opacity-75">
              Category:-{ele?.category}
              </p>
          </div>
          <div className="p-4 pt-0 flex gap-2">
            <Link to = '/viewcart' onClick={()=>handleAddToCartClick(ele)}
              className="block w-full py-2 text-sm font-bold text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
              type="button"
            >
              Add to Cart
            </Link>
            <Link  to ='/viewdetails' state={ele}
              className="block w-full py-2 text-sm font-bold text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
              type="button"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
  </InfiniteScroll>
  </div>
  );
};

export default Fertilizer;
