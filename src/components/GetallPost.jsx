import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useSelector} from 'react-redux'
import { Button, Modal } from 'antd';
import { toast } from "react-toastify";

const GetallPost = () => {
  const userStore = useSelector((state)=>state.user)
  // console.log(userStore)
  const [totalPage, settotalPage] = useState(0);
    // console.log(totalPage)
      const [page, setpage] = useState(1);
      // console.log("page = ", page)
      let limit = 2
        const [loading, setloading] = useState(false);
const [getAllPost, setgetAllPost] = useState([]);
// console.log(getAllPost)

    const getAll = async()=>{
     try {
      setloading(true)
        let res = await axios.get('https://om-backend.onrender.com/posts/getAll')
        let data = res.data;
        // console.log(data)
        settotalPage(data.totalPage)
        setgetAllPost((prev) => {
          const newPosts = data.post.filter((post) => !prev.some((p) => p._id === post._id));
          return [...newPosts, ...prev];
        });
        setloading(false)
     } catch (error) {
      console.error('Error fetching seeds:', error);
     }
    }
    useEffect(()=>{
        getAll()
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

const handleDelete =async(ele)=>{
  try {
    let res = await axios.delete(`https://om-backend.onrender.com/posts/delete/${ele._id}`,{
      headers:{
        'Authorization':userStore.token
      }
    })
    // console.log(res.data)
    let data = res.data;
    if(data.success){
         getAll()
    }
  } catch (error) {
    console.log('internal server',error)
  }
}
const [isModalOpen, setIsModalOpen] = useState(false);
const [currentDetails, setcurrentDetails] = useState('');
// console.log(currentDetails)
const showModal = () => {
  setIsModalOpen(true);
};
const handleOk = async() => {
  try {
    const updateRes = await axios.put(`https://om-backend.onrender.com/posts/update/${currentDetails._id}`,updatedDetails,{
      headers:{
        'Authorization':userStore.token
      }
    })
    // console.log(updateRes)
    let data = updateRes.data
    if(updateRes.status===200){
      getAll()
      toast.success("Post updated successfully!", { position: "top-center", theme: "dark" });
    }
    else {
      toast.error("Failed to update post", { position: "top-center", theme: "dark" });
    }
  } catch (error) {
    toast.error("An error occurred while updating the post", { position: "top-center", theme: "dark" });
  }
  setIsModalOpen(false);
};
const handleCancel = () => {
  setIsModalOpen(false);
};

const handleChange =(e)=>{
// e.preventDefault();
const {name,value} = e.target;
setupdatedDetails((prev)=>({...prev,[name]:value}));
}
const [updatedDetails, setupdatedDetails] = useState({
  title:'',
  price:"",
  size:"",
  category:"",
  description:"",
});
// console.log(updatedDetails)

const handleUpdate = (ele)=>{
   setcurrentDetails(ele)
   setupdatedDetails({
    title:ele.title,
    description:ele.description,
    price:ele.price,
    size:ele.size,
    category:ele.category,
   })

   let value = e.target.current.value;
  //  console.log(value)
}

// useEffect(() => {
//   getAll(); // Fetch the initial posts

//   const interval = setInterval(() => {
//     getAll(); // Fetch updated posts
//   }, 5 * 60 * 60 * 1000);

//   return () => clearInterval(interval); // Cleanup the interval on unmount
// }, []);


  return (
    <div className='mt-8'>
       <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 bg-orange-300">All Products</h1>

 <InfiniteScroll
         dataLength={getAllPost.length}
         next={fetchMoreData}
        
       
         hasMore={page<totalPage}
         loader={<h4>Loading...</h4>}
         endMessage={
             <p style={{ textAlign: 'center' }}>
               <b>Yay! You have seen it all</b>
             </p>
         }
        
       >

       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
   
  
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
     {getAllPost?.map((ele, index) => (
       <div key={index} className="relative flex flex-col text-gray-700 bg-white shadow-md rounded-xl border border-red-500">
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
             Description:-{ele.description}
           </p>
           <p className="text-sm text-gray-700 opacity-75">
             Size:-{ele?.size}
           </p> <p className="text-sm text-gray-700 opacity-75">
             Category:-{ele.category}
           </p>
         </div>
         <div className="p-4 pt-0 flex gap-2">
           <button onClick={()=>handleDelete(ele)}
             className="block w-full text-sm font-bold text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
             type="button"
           >
            Delete
           </button>

           <Button type="primary" className=' font-medium w-full'   onClick={() => {showModal(); handleUpdate(ele);}}>
            Update
      </Button>
    
         </div>
       </div>
     ))}
       <Modal title="Update Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
     <div className='flex flex-col gap-2'>
     <input name='title' value={updatedDetails?.title}  onChange={handleChange}  className='border border-black outline-none py-2 px-2' type="text" placeholder='title'  />
     <textarea  value={updatedDetails?.description} onChange={handleChange}  className='border border-black py-2 px-2 outline-none' name="description" id="" placeholder='Description'></textarea>
     <input name='price' value={updatedDetails?.price} onChange={handleChange}  className='border border-black outline-none py-2 px-2' type="number" placeholder='Price' />
     <input name='size' value={updatedDetails?.size}  onChange={handleChange} className='border border-black outline-none py-2 px-2' type="text" placeholder='Size' />
     <input name='category' value={updatedDetails?.category} onChange={handleChange}  className='border border-black outline-none py-2 px-2' type="text" placeholder='Category' />
     </div>
      </Modal>
   </div>
 </div>
 </InfiniteScroll>  
    </div>
  )
}

export default GetallPost
