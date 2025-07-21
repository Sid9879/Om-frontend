import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'antd'; // Assuming Ant Design is installed
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer for notifications
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS

const GetallPost = () => {
  const userStore = useSelector((state) => state.user);
  const [totalPage, settotalPage] = useState(0);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false);
  const [getAllPost, setgetAllPost] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDetails, setcurrentDetails] = useState(null);
  const [updatedDetails, setupdatedDetails] = useState({
    title: '',
    price: '',
    size: '',
    category: '',
    description: '',
  });

  const getAll = async () => {
    try {
      setloading(true);
     
      let res = await axios.get('https://om-backend.onrender.com/posts/getAll'); 
      let data = res.data;

      settotalPage(data.totalPage);

      setgetAllPost((prev) => {
        const newPosts = data.post.filter((post) => !prev.some((p) => p._id === post._id));
        return [...prev, ...newPosts]; 
      });
      setloading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setloading(false);
      toast.error("Failed to load posts. Please try again.", { position: "bottom-right" });
    }
  };

  useEffect(() => {
    getAll();
  }, [page]); 

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

  const handleDelete = async (ele) => {
    try {
      let res = await axios.delete(`https://om-backend.onrender.com/posts/delete/${ele._id}`, {
        headers: {
          'Authorization': userStore.token
        }
      });

      let data = res.data;
      if (data.success) {
        toast.success("Post deleted successfully!", { position: "bottom-right" });
        getAll();
      } else {
        toast.error("Failed to delete post. Please try again.", { position: "bottom-right" });
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error("An error occurred while deleting the post.", { position: "bottom-right" });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const updateRes = await axios.put(`https://om-backend.onrender.com/posts/update/${currentDetails._id}`, updatedDetails, {
        headers: {
          'Authorization': userStore.token
        }
      });

      if (updateRes.status === 200) {
        getAll();
        toast.success("Post updated successfully! ", { position: "top-center", theme: "dark" });
      } else {
        toast.error("Failed to update post.", { position: "top-center", theme: "dark" });
      }
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("An error occurred while updating the post.", { position: "top-center", theme: "dark" });
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setupdatedDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateClick = (ele) => { 
    setcurrentDetails(ele);
    setupdatedDetails({
      title: ele.title,
      description: ele.description,
      price: ele.price,
      size: ele.size,
      category: ele.category,
    });
    showModal(); 
  };

  if (loading && getAllPost.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-10 text-blue-800 bg-blue-200 py-5 rounded-xl shadow-lg mx-auto max-w-2xl">All Products</h1>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => ( 
              <div key={index} className="relative flex flex-col bg-white shadow-xl rounded-xl border border-blue-300 h-[420px] sm:h-[450px] md:h-[480px] lg:h-[500px] overflow-hidden animate-pulse">
                <div className="relative overflow-hidden bg-gray-200 rounded-t-xl h-96"></div>
                <div className="p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-1/4"></div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full max-w-[90%] mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded-full max-w-[80%] mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded-full max-w-[70%]"></div>
                </div>
                <div className="p-4 pt-0 flex gap-2 bg-gray-50">
                  <div className="block w-full py-2 h-10 bg-blue-300 rounded-lg"></div>
                  <div className="block w-full py-2 h-10 bg-blue-300 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8"> 
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-10 text-blue-800 bg-blue-200 py-5 rounded-xl shadow-lg mx-auto max-w-2xl animate-fade-in-down">All Products</h1>

      <InfiniteScroll
        dataLength={getAllPost.length}
        next={fetchMoreData}
        hasMore={page < totalPage}
        loader={
          <div className="flex justify-center items-center py-6 text-blue-700 font-semibold text-lg">
            <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-500 mr-3"></div>
            <p>Loading more products...</p>
          </div>
        }
        endMessage={
          <p className="text-center py-8 text-gray-700 text-xl font-bold bg-blue-100 rounded-lg m-4 shadow-inner">
            ✨ You've reached the end of all available products! ✨
          </p>
        }
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"> 
            {getAllPost?.map((ele, index) => (
              <div
                key={ele._id} 
                className="relative flex flex-col bg-white shadow-xl rounded-xl border border-blue-300 h-[420px] sm:h-[450px] md:h-[480px] lg:h-[500px] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-blue-500"
              >
                {ele.image.length > 1 ? (
                  <Slider {...sliderSettings}>
                    {ele.image.map((obj, i) => (
                      <div key={i} className="relative overflow-hidden bg-gray-100 rounded-t-xl h-96">
                        <img
                          src={obj.url}
                          alt={obj.name || 'Product Image'}
                          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="relative overflow-hidden bg-gray-100 rounded-t-xl h-96">
                    <img
                      src={ele.image[0]?.url}
                      alt={ele.image[0]?.name || 'Product Image'}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-4 bg-blue-50 flex-grow"> 
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-lg font-bold text-blue-800">Title: {ele.title}</p>
                    <p className="text-lg font-bold text-red-600">₹{ele.price}</p>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">
                    **Description:** {ele.description?.slice(0, 100)}{ele.description?.length > 100 ? '...' : ''}
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    **Size:** {ele?.size}
                  </p>
                  <p className="text-sm text-gray-700">
                    **Category:** {ele.category}
                  </p>
                </div>
                <div className="p-4 pt-0 flex gap-3 bg-blue-50">
                  <button
                    onClick={() => handleDelete(ele)}
                    className="block w-full py-3 text-base font-semibold text-center text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-300 transform hover:scale-105 active:scale-100 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    type="button"
                    style={{ height: '48px' }}
                  >
                    Delete
                  </button>

                  <Button
                    type="primary"
                    onClick={() => handleUpdateClick(ele)} 
                    className='w-full py-3 text-base font-semibold text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 active:scale-100 shadow-md hover:shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                    style={{ height: '48px', lineHeight: 'normal' }}
                  >
                    Update
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>

      
      <Modal
        title={<span className="text-xl font-bold text-blue-800">Update Product Details</span>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel} className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 border-none transition duration-200">
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk} className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 border-none transition duration-200">
            Save Changes
          </Button>,
        ]}
      >
        <div className='flex flex-col gap-4 mt-4'>
          <input
            name='title'
            value={updatedDetails?.title}
            onChange={handleChange}
            className='border border-blue-300 focus:border-blue-500 outline-none rounded-lg py-2 px-4 transition duration-200 placeholder-gray-400'
            type="text"
            placeholder='Title'
          />
          <textarea
            value={updatedDetails?.description}
            onChange={handleChange}
            className='border border-blue-300 focus:border-blue-500 outline-none rounded-lg py-2 px-4 h-24 resize-none transition duration-200 placeholder-gray-400'
            name="description"
            placeholder='Description'
          ></textarea>
          <input
            name='price'
            value={updatedDetails?.price}
            onChange={handleChange}
            className='border border-blue-300 focus:border-blue-500 outline-none rounded-lg py-2 px-4 transition duration-200 placeholder-gray-400'
            type="number"
            placeholder='Price'
          />
          <input
            name='size'
            value={updatedDetails?.size}
            onChange={handleChange}
            className='border border-blue-300 focus:border-blue-500 outline-none rounded-lg py-2 px-4 transition duration-200 placeholder-gray-400'
            type="text"
            placeholder='Size (e.g., 1kg, 500ml)'
          />
          <input
            name='category'
            value={updatedDetails?.category}
            onChange={handleChange}
            className='border border-blue-300 focus:border-blue-500 outline-none rounded-lg py-2 px-4 transition duration-200 placeholder-gray-400'
            type="text"
            placeholder='Category (e.g., Fertilizer, Seed)'
          />
        </div>
      </Modal>
    </div>
  );
};

export default GetallPost;