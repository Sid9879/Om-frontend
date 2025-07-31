import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { handleAddCart } from '../utils/CartUtils';
import { useSelector } from 'react-redux';

const ViewDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const itemDetails = location.state;
  let userStore = useSelector((state)=>state.user);

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!itemDetails || !itemDetails._id) {
      setLoading(false);
      setError("Item details not provided. Please navigate from a valid link.");
      return;
    }
    setDetails(itemDetails);
    setLoading(false);
  }, [itemDetails]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    adaptiveHeight: true,
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleAddToCart =async (obj) => {
   try {
 
      const data = await handleAddCart(details, userStore.token);
      if (data.success) {
        alert(`${details.title} successfully added to cart!`);
      } else {
        alert(`Failed to add ${details.title} to cart: ${data.message || 'Unknown error'}`);
      }
    } catch (apiError) {
      console.error("Error adding item to cart:", apiError);
      alert(`Error adding ${details.title} to cart. Please try again. Detailed error: ${apiError.response?.data?.message || apiError.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center bg-white p-8 rounded-lg shadow-xl">
          <div className="flex items-center justify-center w-full h-64 bg-gray-200 rounded-lg sm:w-96">
            <svg className="w-12 h-12 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
            </svg>
          </div>
          <div className="w-full">
            <div className="h-4 bg-gray-200 rounded-full w-48 mb-6"></div>
            <div className="h-3 bg-gray-200 rounded-full max-w-[480px] mb-3"></div>
            <div className="h-3 bg-gray-200 rounded-full mb-3"></div>
            <div className="h-3 bg-gray-200 rounded-full max-w-[440px] mb-3"></div>
            <div className="h-3 bg-gray-200 rounded-full max-w-[460px] mb-3"></div>
            <div className="h-3 bg-gray-200 rounded-full max-w-[360px]"></div>
          </div>
          <span className="sr-only">Loading item details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4">
        <div className="text-center p-8 bg-white border border-red-400 text-red-700 rounded-xl shadow-lg">
          <p className="text-2xl font-bold mb-4">Oops! An Error Occurred</p>
          <p className="text-lg mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md font-semibold"
          >
            Go back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50 p-4">
        <div className="text-center p-8 bg-white border border-yellow-400 text-yellow-700 rounded-xl shadow-lg">
          <p className="text-2xl font-bold mb-4">Item Not Found</p>
          <p className="text-lg mb-6">The item you are looking for does not exist or has been removed.</p>
          <button
            onClick={() => navigate('/')}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md font-semibold"
          >
            Go back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 bg-gradient-to-br from-green-50 to-blue-50 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-10 bg-white shadow-2xl rounded-2xl overflow-hidden max-w-6xl w-full p-8 transition-all duration-300 ease-in-out transform hover:scale-[1.005]">
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 bg-gray-50 rounded-lg shadow-inner">
          {details.image && details.image.length > 0 ? (
            <Slider {...sliderSettings} className="w-full max-w-xl">
              {details.image.map((obj, i) => (
                <div key={i} className="rounded-lg overflow-hidden h-[350px] sm:h-[450px] lg:h-[500px] flex items-center justify-center">
                  <img
                    src={obj.url}
                    alt={details.title || 'Item Image'}
                    className="object-contain w-full h-full p-2 bg-white rounded-lg shadow-sm"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="rounded-lg overflow-hidden h-[350px] sm:h-[450px] lg:h-[500px] w-full flex items-center justify-center bg-gray-200">
              <img
                src={'https://via.placeholder.com/600x400?text=No+Image+Available'}
                alt="No Item Image Available"
                className="object-contain w-full h-full p-4"
              />
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-between p-4">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
              {details.title}
            </h1>
            <p className="text-5xl font-bold text-red-600">
              ₹{details.price}
            </p>

            <div className="text-gray-700 text-lg md:text-xl leading-relaxed space-y-3">
              <p><strong className="font-semibold text-gray-800">Category:</strong> {details.category}</p>
              <p><strong className="font-semibold text-gray-800">Size:</strong> {details.size}</p>
              <p><strong className="font-semibold text-gray-800">Description:</strong> {details.description}</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-5">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-green-700 text-white px-8 py-4 rounded-xl hover:bg-green-800 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg font-bold text-xl uppercase tracking-wide focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              Add to Cart
            </button>
            <button
              onClick={goBack}
              className="flex-1 text-center bg-gray-200 text-gray-800 px-8 py-4 rounded-xl hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg font-bold text-xl uppercase tracking-wide"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ViewDetails;