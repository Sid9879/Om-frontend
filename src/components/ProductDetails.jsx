import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

export default function ProductDetails() {
  const navigate = useNavigate();

  const { id: productId } = useParams(); 
  const [Details, setDetails] = useState(null);
  useEffect(() => {
    if (!productId) {
      navigate("/"); 
    }

    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`https://om-backend.onrender.com/posts/find/${productId}`);
        setDetails(res.data.post);
      } catch (error) {
        console.error('Error fetching product details:', error);
        navigate("/error-page"); 
      }
    };
    fetchProductDetails();
  }, [productId, navigate]); 

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };
  if (!Details) {
    return (
        <div role="status" className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-lime-50 p-4">
            <div className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center bg-white shadow-xl rounded-3xl p-8 w-full max-w-4xl">
                <div className="flex items-center justify-center w-full h-72 bg-gray-300 rounded-2xl sm:w-96 dark:bg-gray-700 flex-shrink-0">
                    <svg className="w-12 h-12 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                    </svg>
                </div>
                <div className="w-full space-y-4">
                    <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-700 w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 max-w-full"></div>
                    <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[90%]"></div>
                    <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[80%]"></div>
                    <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[70%]"></div>
                    <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[60%]"></div>
                    <div className="h-12 bg-gray-300 rounded-full dark:bg-gray-700 w-full mt-6"></div> {/* Placeholder for buttons */}
                </div>
            </div>
            <span className="sr-only">Loading product details...</span>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br from-green-50 to-lime-50 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-10 bg-white shadow-2xl rounded-3xl p-8 border border-gray-200">

        {/* Product Image Slider */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          {Details.image?.length > 1 ? (
            <Slider {...sliderSettings} className="w-full max-w-lg rounded-2xl shadow-xl border border-gray-100">
              {Details.image.map((img, i) => (
                <div key={i} className="rounded-2xl overflow-hidden h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center bg-gray-100">
                  <img
                    src={img.url}
                    alt={img.name || 'Product Image'}
                    className="object-contain w-full h-full p-2"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="w-full max-w-lg rounded-2xl overflow-hidden h-[300px] sm:h-[400px] lg:h-[500px] shadow-xl border border-gray-100 flex items-center justify-center bg-gray-100">
              <img
                src={Details.image?.[0]?.url || 'https://via.placeholder.com/500x500?text=No+Image+Available'}
                alt={Details.image?.[0]?.name || 'Product Image'}
                className="object-contain w-full h-full p-2"
              />
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">{Details.title}</h2>
            <p className="text-5xl font-extrabold text-green-700">₹{Details.price}</p>
            <p className="text-gray-700 text-lg leading-relaxed">
              <span className="font-semibold text-gray-800">Description:</span> {Details.description}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold text-gray-800">Size:</span> {Details.size || 'N/A'}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold text-gray-800">Category:</span> {Details.category || 'N/A'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to={'/viewcart'}
              className="flex-1 text-center bg-gray-200 text-gray-800 px-8 py-4 rounded-full text-xl font-bold hover:bg-gray-300 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Back to Cart <i className="fas fa-arrow-left ml-3"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
