import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ViewDetails = () => {
  const navigate = useNavigate()
    let location = useLocation();
    let state = location.state;

    const [cartDetails, setcartDetails] = useState();
   
    useEffect(()=>{
        if (state) {
            setcartDetails(state); // Set the state directly if it's an array
          }
    },[state])

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      };

     const goBack = ()=>{
      navigate(-1)
     }

     if (!cartDetails) {
      return <div role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
          <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded-sm sm:w-96 dark:bg-gray-700">
              <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
              </svg>
          </div>
          <div class="w-full">
              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          </div>
          <span class="sr-only">Loading...</span>
      </div>
    }

  return (
    <div className='overflow-hidden'>
      <div className="container sm:px-6 lg:px-8 w-screen my-10">
        {cartDetails ? (
          <div className="px-3 mx-auto relative flex flex-col text-gray-700 bg-white shadow-md rounded-xl w-[350px] border border-green-500 py-3">
            {/* Conditional Slider */}
            {cartDetails.image?.length > 1 ? (
              <Slider {...sliderSettings}>
                {cartDetails.image.map((obj, i) => (
                  <div key={i} className="relative overflow-hidden bg-white rounded-xl h-96 w-[500px]">
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
                  src={cartDetails.image[0]?.url}
                  alt={cartDetails.image[0]?.name || 'Default Image'}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p  className="text-base font-bold text-black  uppercase">Title: {cartDetails.title}</p>
                <p className="text-base font-medium">₹{cartDetails.price}</p>
              </div>
              <p className="text-sm  text-black font-bold  uppercase">Category: {cartDetails.category}</p>
              <p className="text-sm  text-black font-bold  uppercase">Size:- {cartDetails.size}</p>
              <p className="text-sm text-gray-700 opacity-75">Description: {cartDetails.description}</p>
            </div>
            <div className="p-4 pt-0 flex gap-2">
              <button
                className="block w-full py-2 text-sm font-bold text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                type="button"
              >
                Add to Cart
              </button>
              <button onClick={goBack}
                className="block w-full py-2 text-sm font-bold text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                type="button"
              >
                Go Back
              </button>
            </div>
          </div>
        ) : (
          <p>Loading details...</p> // Fallback if `cartDetails` is null
        )}
      </div>
    </div>
  )
}

export default ViewDetails
