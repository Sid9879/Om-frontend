import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'

const ViewCart = () => {
 const userStore = useSelector((state)=>state.user)

let token = userStore.token;

 const [useritems, setuseritems] = useState([]);
 console.log(useritems)
 console.log(useritems.length)
const cart = async()=>{
let res = await axios.get(`https://om-backend.onrender.com/carts/getcartItems`,{
  headers:{
    'Authorization':userStore.token
  }
})
// console.log(res)
let data = res.data;

setuseritems(data.cartItem);
}  
useEffect(()=>{
  cart()
},[userStore.token])

const handleAddCart = async(obj)=>{
  if (obj.quantity >= 10) {
    alert("You have added the maximum quantity for this item to the cart.");
    return;
  }
  const addCartData = {
    title: obj.title, 
    price: obj.price, 
    size: obj.size || '', 
    quantity: 1, 
    total: obj.price * 1
  };
 

  try {
    
    const res = await axios.post(
      `https://om-backend.onrender.com/carts/addCart/${obj.productId._id}`,
      addCartData, 
      {
        headers: {
          Authorization: userStore.token, 
        },
      }
    );

   
    if(res.data.success){
      cart()
    }
  } catch (error) {
    console.error("Error adding to cart:", error.response?.data || error.message);
  }
}

const handleUpdateCart = async(obj,index)=>{
  try {
    let res1 = await axios.put(`https://om-backend.onrender.com/carts/update/${obj.productId._id}`,{quantity:obj.quantity},{
      headers:{
        Authorization:userStore.token
      }
    })
    if(res1.data.success){
      cart()
    }
  } catch (error) {
    console.log('error',error)
  }
}

const deleteCart = async(obj)=>{
  try {
    let res = await axios.delete(`https://om-backend.onrender.com/carts/delete/${obj.productId._id}`,{
      headers:{
        'Authorization':userStore.token
      }
    })
    if(res.data.success){
      cart()
    }
  } catch (error) {
    console.error("Error deleting item:", error.response?.data || error.message);
    alert("Failed to delete item from cart.");
  }
}


  useEffect(()=>{
     cart()
   },[userStore.token])

   useEffect(() => {
    if (!userStore.token) return;
    cart();
    const interval = setInterval(() => {
      cart();
    }, 2000);
    return () => clearInterval(interval);
  }, [userStore.token]);
 

  return (
    <div>

<section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>
    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
     {useritems.map((ele)=>{
      return <div key={ele._id} className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
       
 {ele.items.map((obj)=>{
  return  <div key={obj.productId?._id} className="space-y-6">
       
  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">


  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
  <a href="#" className="shrink-0 md:order-1">
    <img className="h-20 w-20 dark:hidden" src={obj.productId?.image[0]?.url} alt="imac image" />
    <img className="hidden h-20 w-20 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-dark.svg" alt="imac image" />
  </a>
  <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
  <div className="flex items-center justify-between md:order-3 md:justify-end">
    <div className="flex items-center">
      <p className='px-2'>Size:-{obj?.size}</p>
      <button onClick={()=>handleUpdateCart(obj)}  type="button" id="decrement-button-4" data-input-counter-decrement="counter-input-4" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
        <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
        </svg>
      </button>
      <p className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" >{obj.quantity}</p>
      <button onClick={()=>handleAddCart(obj)} type="button" id="increment-button-4" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
        <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
        </svg>
      </button>
    </div>
    <div className="text-end md:order-4 md:w-32">
      <p className="text-base font-bold text-gray-900 dark:text-white">₹ {obj.total}</p>
    </div>
  </div>
  <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
    <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">{obj.title}</a>
    <div className="flex items-center gap-4">
      <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
        <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
        </svg>
        Add to Favorites
      </button>
      <button onClick={()=>deleteCart(obj)} type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
        <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 17.94 6M18 18 6.06 6" />
        </svg>
        Remove
      </button>
    </div>
  </div>
</div>

</div>
</div>

 })}
<h1 className='text-end font-medium px-7 py-3'>Total:-{ele?.totalPrice}</h1>
{/* <Link
  to='/location'
  className='block bg-green-500 w-[150px] h-[50px] mx-auto text-center leading-[50px] font-medium'>
  Next
</Link> */}

     {/* <div className="hidden xl:mt-8 xl:block">
       <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">People also bought</h3>
       <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
         <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
           <a href="#" className="overflow-hidden rounded">
             <img className="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
             <img className="mx-auto hidden h-44 w-44 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
           </a>
           <div>
             <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">iMac 27”</a>
             <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">This generation has some improvements, including a longer continuous battery life.</p>
           </div>
           <div>
             <p className="text-lg font-bold text-gray-900 dark:text-white">
               <span className="line-through"> $399,99 </span>
             </p>
             <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$299</p>
           </div>
           <div className="mt-6 flex items-center gap-2.5">
             <button data-tooltip-target="favourites-tooltip-1" type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
               <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
               </svg>
             </button>
             <div id="favourites-tooltip-1" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
               Add to favourites
               <div className="tooltip-arrow" data-popper-arrow />
             </div>
             <button type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
               <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
               </svg>
               Add to cart
             </button>
           </div>
         </div>
         <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
           <a href="#" className="overflow-hidden rounded">
             <img className="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg" alt="imac image" />
             <img className="mx-auto hidden h-44 w-44 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg" alt="imac image" />
           </a>
           <div>
             <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">Playstation 5</a>
             <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">This generation has some improvements, including a longer continuous battery life.</p>
           </div>
           <div>
             <p className="text-lg font-bold text-gray-900 dark:text-white">
               <span className="line-through"> $799,99 </span>
             </p>
             <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$499</p>
           </div>
           <div className="mt-6 flex items-center gap-2.5">
             <button data-tooltip-target="favourites-tooltip-2" type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
               <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
               </svg>
             </button>
             <div id="favourites-tooltip-2" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
               Add to favourites
               <div className="tooltip-arrow" data-popper-arrow />
             </div>
             <button type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
               <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
               </svg>
               Add to cart
             </button>
           </div>
         </div>
         <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
           <a href="#" className="overflow-hidden rounded">
             <img className="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg" alt="imac image" />
             <img className="mx-auto hidden h-44 w-44 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg" alt="imac image" />
           </a>
           <div>
             <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">Apple Watch Series 8</a>
             <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">This generation has some improvements, including a longer continuous battery life.</p>
           </div>
           <div>
             <p className="text-lg font-bold text-gray-900 dark:text-white">
               <span className="line-through"> $1799,99 </span>
             </p>
             <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$1199</p>
           </div>
           <div className="mt-6 flex items-center gap-2.5">
             <button data-tooltip-target="favourites-tooltip-3" type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
               <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
               </svg>
             </button>
             <div id="favourites-tooltip-3" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
               Add to favourites
               <div className="tooltip-arrow" data-popper-arrow />
             </div>
             <button type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
               <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
               </svg>
               Add to cart
             </button>
           </div>
         </div>
       </div>
     </div> */}
   </div>
     })}
    {useritems.length >=0 ?  <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
          {useritems.map((item,index)=>{
          return <div key={index} className="space-y-4">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">₹ {item.totalPrice}</dd>
              </dl>
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                <dd className="text-base font-medium text-green-600">₹ 0</dd>
              </dl>
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Delivery Charge</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">₹ 0</dd>
              </dl>
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax:- Included in price</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">₹ 0</dd>
              </dl>
            </div>
            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
              <dd className="text-base font-bold text-gray-900 dark:text-white">₹ {item.totalPrice}</dd>
            </dl>
          </div>
          })}
          <Link to ="#" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white  hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</Link>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
            <Link to="/" title='' className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
              Continue Shopping
              <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m14 0-4 4m4-4-4-4" />
              </svg>
            </Link>
          </div>
        </div>
        
      </div>:<h1>please add</h1>}
    </div>
  </div>
</section>


    </div>
    
  )
}

export default ViewCart
