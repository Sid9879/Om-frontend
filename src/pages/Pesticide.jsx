import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { handleAddCart } from '../utils/CartUtils';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pesticide = () => {
  const userStore = useSelector((state) => state.user);
  const [totalPage, settotalPage] = useState(0);
  const [page, setpage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [loading, setloading] = useState(false);
  const [PesticideDetails, setPesticideDetails] = useState([]);

  const getPesticide = async () => {
    try {
      setloading(true);
      let res = await axios.get(`https://om-backend.onrender.com/posts/getPesticides?limit=${limit}&page=${page}`);
      
      let data = res.data;

      settotalPage(data.totalPage);
      setPesticideDetails((prevDetails) => [...prevDetails, ...data.Pesticides]);
      setloading(false);
    } catch (error) {
      console.error('Error fetching pesticides:', error);
      setloading(false);
      toast.error('Failed to load pesticides. Please try again.');
    }
  };

  useEffect(() => {
    getPesticide();
  }, [page, limit]);

  const fetchMoreData = () => {
    if (page < totalPage) {
      setpage(page + 1);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: dots => (
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          borderRadius: "8px",
          padding: "4px",
          bottom: "10px",
          width: "auto",
          display: "inline-block",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)"
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: "#fff",
          borderRadius: "50%",
          display: "inline-block",
          margin: "0 2px",
          border: "1px solid #ccc"
        }}
      ></div>
    )
  };

  const handleAddToCartClick = async (obj) => {
    try {
      const data = await handleAddCart(obj, userStore.token);
      if (data.success) {
        toast.success(`${obj.title} added to cart! ✅`);
      } else {
        toast.error("Failed to add to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("An error occurred while adding to cart.");
    }
  };

  if (loading && PesticideDetails.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-10 text-indigo-800 bg-indigo-200 py-5 rounded-xl shadow-lg mx-auto max-w-2xl">Pesticides & Insecticides</h1>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="relative flex flex-col text-gray-700 bg-white shadow-xl rounded-xl border border-indigo-300 h-[420px] sm:h-[450px] md:h-[480px] lg:h-[500px] overflow-hidden animate-pulse">
                <div className="relative overflow-hidden bg-gray-200 rounded-t-xl h-96 dark:bg-gray-700"></div>
                <div className="p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4"></div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[90%] mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[80%] mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[70%]"></div>
                </div>
                <div className="p-4 pt-0 flex gap-2 bg-gray-50">
                  <div className="block w-full py-2 h-10 bg-indigo-300 rounded-lg dark:bg-indigo-700"></div>
                  <div className="block w-full py-2 h-10 bg-indigo-300 rounded-lg dark:bg-indigo-700"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8">
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-10 text-indigo-800 bg-indigo-200 py-5 rounded-xl shadow-lg mx-auto max-w-2xl animate-fade-in-down">Pesticides & Insecticides</h1>

      <InfiniteScroll
        dataLength={PesticideDetails.length}
        next={fetchMoreData}
        hasMore={page < totalPage}
        loader={
          <div className="flex justify-center items-center py-6 text-indigo-700 font-semibold text-lg">
            <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-indigo-500 mr-3"></div>
            <p>Loading more pesticides...</p>
          </div>
        }
        endMessage={
          <p className="text-center py-8 text-gray-700 text-xl font-bold bg-indigo-100 rounded-lg m-4 shadow-inner">
            🎉 You've seen all our potent solutions! 🎉
          </p>
        }
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {PesticideDetails?.map((ele, index) => (
              <div
                key={index}
                className="relative flex flex-col bg-white shadow-xl rounded-xl border border-indigo-300 h-[420px] sm:h-[450px] md:h-[480px] lg:h-[500px] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-indigo-500"
              >
                {ele.image.length > 1 ? (
                  <Slider {...sliderSettings}>
                    {ele.image.map((obj, i) => (
                      <div key={i} className="relative overflow-hidden bg-gray-100 rounded-t-xl h-96">
                        <img
                          src={obj.url}
                          alt={obj.name || 'Default Image'}
                          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="relative overflow-hidden bg-gray-100 rounded-t-xl h-96">
                    <img
                      src={ele.image[0]?.url}
                      alt={ele.image[0]?.name || 'Default Image'}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-4 bg-indigo-50 flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-lg font-bold text-indigo-800">Title: {ele.title}</p>
                    <p className="text-lg font-bold text-red-600">₹{ele.price}</p>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">
                    **Description:** {ele.description?.slice(0, 50)}...
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    **Size:** {ele?.size}
                  </p>
                  <p className="text-sm text-gray-700">
                    **Category:** {ele?.category}
                  </p>
                </div>
                <div className="p-4 pt-0 flex gap-3 bg-indigo-50">
                  <Link
                    to="/viewcart"
                    onClick={() => handleAddToCartClick(ele)}
                    className="block w-full py-3 text-base font-semibold text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105 active:scale-100 shadow-md hover:shadow-lg"
                    type="button"
                  >
                    Add to Cart
                  </Link>
                  <Link
                    to="/viewdetails"
                    state={ele}
                    className="block w-full py-3 text-base font-semibold text-center text-indigo-800 bg-indigo-200 rounded-lg hover:bg-indigo-300 transition duration-300 transform hover:scale-105 active:scale-100 shadow-md hover:shadow-lg"
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

export default Pesticide;