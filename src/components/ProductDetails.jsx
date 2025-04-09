import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ProductDetails() {
  const location = useLocation();
  const userId = location.state._id;
  const [Details, setDetails] = useState(null);

  useEffect(() => {
    const getAll = async () => {
      try {
        const res = await axios.get(`https://om-backend.onrender.com/posts/find/${userId}`);
        setDetails(res.data.post);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    getAll();
  }, [userId]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  if (!Details) {
    return <div className="text-center mt-10 text-lg font-medium text-gray-600">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col lg:flex-row gap-8 bg-white shadow-md rounded-xl border border-red-500 p-4">
        {/* Image Slider or Single Image */}
        <div className="w-full lg:w-1/2">
          {Details.image?.length > 1 ? (
            <Slider {...sliderSettings}>
              {Details.image.map((obj, i) => (
                <div key={i} className="rounded-xl overflow-hidden max-h-[400px] sm:max-h-[500px]">
                  <img
                    src={obj.url}
                    alt={obj.name || 'Image'}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="rounded-xl overflow-hidden max-h-[400px] sm:max-h-[500px]">
              <img
                src={Details.image?.[0]?.url}
                alt={Details.image?.[0]?.name || 'Image'}
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{Details.title}</h2>
              <span className="text-lg md:text-xl font-bold text-red-500">₹{Details.price}</span>
            </div>
            <p className="text-gray-700 text-sm md:text-base">
              <span className="font-semibold">Description:</span> {Details.description}
            </p>
            <p className="text-gray-700 text-sm md:text-base">
              <span className="font-semibold">Size:</span> {Details.size}
            </p>
            <p className="text-gray-700 text-sm md:text-base">
              <span className="font-semibold">Category:</span> {Details.category}
            </p>
          </div>

          {/* Optional buttons */}
          <div className="mt-6 flex gap-4 items-center justify-center">
            {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Add to Cart</button> */}
            <Link to={'/'} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition">Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
