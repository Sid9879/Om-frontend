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

  return (
    <div>
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
