import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios'

const LiveLocation = () => {
 const userStore = useSelector((state)=>state.user)
//  console.log(userStore)
  // const [location, setLocation] = useState({ latitude: null, longitude: null });
  // const [address, setAddress] = useState("");
  // const [error, setError] = useState("");

  // const getLocation = () => {
  //   if (navigator.geolocation) {
  //     console.log("Geolocation is supported"); // Debugging line

  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         console.log("Position received", position); // Debugging line
  //         const { latitude, longitude } = position.coords;
  //         setLocation({ latitude, longitude });

  //         // Optional: Convert coordinates to a human-readable address
  //         fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
  //           .then((response) => response.json())
  //           .then((data) => {
  //             setAddress(data.display_name); // Update with the user's address
  //           })
  //           .catch((error) => {
  //             console.error("Error fetching address:", error);
  //             setError("Failed to fetch address");
  //           });
  //       },
  //       (error) => {
  //         console.error("Error getting location:", error);
  //         setError("Unable to fetch location. Please enable location services.");
  //       }
  //     );
  //   } else {
  //     console.error("Geolocation is not supported by your browser.");
  //     setError("Geolocation is not supported by your browser.");
  //   }
  // };
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    mobileNumber: "",
  });
  console.log(formData)
const handleInput =(e)=>{
  const { name, value } = e.target;
  if (name === "postalCode" && !/^\d*$/.test(value)) {
    return;
  }
  console.log(name,value)
  setFormData((prev) => ({ ...prev, [name]: value }));
}
const addressUpdate = async(e)=>{
  e.preventDefault();
  try {
    let res = await axios.put('https://om-backend.onrender.com/carts/updateadd',{address:formData},{
      headers:{
        Authorization: userStore.token,
      }
    })
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
}
const [getaddress, setgetaddress] = useState([]);
console.log(getaddress)
const getCart = async()=>{
try {
  let res = await axios.get(`https://om-backend.onrender.com/carts/getcartItems`,{
    headers:{
      'Authorization':userStore.token
    }
  })
  let data = res.data;
  console.log(data.cartItem)
  setgetaddress(data.cartItem[0].address)
  setFormData(data.cartItem[0].address);
} catch (error) {
  console.log('error',res.data.error)
}
}
useEffect(()=>{
  getCart()
},[userStore.token])



  return (
    <div className="live-location">
      {/* <h1>Live Location</h1> */}
      {/* <button
        onClick={getLocation}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Get My Location
      </button>
       */}
      {/* {error && <p style={{ color: "red" }}>{error}</p>} Display error if any */}
      
      {/* {location.latitude && location.longitude && (
        <div>
          <p>
            <strong>Latitude:</strong> {location.latitude}
          </p>
          <p>
            <strong>Longitude:</strong> {location.longitude}
          </p>
          {address && (
            <p>
              <strong>Address:</strong> {address}
            </p>
          )}
        </div>
      )} */}
      
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
     <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
     <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
      <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
        <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
          <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Cart
        </span>
      </li>
      <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
        <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
          <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Checkout
        </span>
      </li>
      <li className="flex shrink-0 items-center">
        <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        Order summary
      </li>
    </ol>
    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
      <div className="min-w-0 flex-1 space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Details</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="your_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Your name </label>
              <input  onChange={handleInput}  name="name" type="text" id="your_name" value={formData?.name} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Bonnie Green" required />
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2">
                <label htmlFor="select-city-input-3" className="block text-sm font-medium text-gray-900 dark:text-white"> Street* </label>
              </div>
              <input name="street" onChange={handleInput} type="text" value={formData?.street} id="your_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" required />
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2">
                <label htmlFor="select-city-input-3" className="block text-sm font-medium text-gray-900 dark:text-white"> City* </label>
              </div>
              <input name="city"
           onChange={handleInput} type="text" id="your_name" value={formData.city} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" required />
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2">
                <label htmlFor="select-city-input-3" className="block text-sm font-medium text-gray-900 dark:text-white"> State* </label>
              </div>
              <input  name="state" value={formData.state} onChange={handleInput} type="text" id="your_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" required />
            </div>
            
            <div>
              <div className="mb-2 flex items-center gap-2">
                <label htmlFor="select-country-input-3" className="block text-sm font-medium text-gray-900 dark:text-white"> Country* </label>
              </div>
              <input  name="country" onChange={handleInput} value={formData.country} type="text" id="your_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="India" required />
            </div>
            <div>
              <label htmlFor="phone-input-3" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> PostalCode* </label>
              <input name="postalCode" value={formData.postalCode} onChange={handleInput} minLength={6} maxLength={6}
  type="text"
  id="your_name"
  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
  placeholder="272202"
  pattern="\d*"
  required
/>



            </div>
            <div>
              <label htmlFor="phone-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Phone Number* </label>
              <input name="mobileNumber" value={formData.mobileNumber} onChange={handleInput} minLength={10} maxLength={10}
  type="text"
  id="your_name"
  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
  placeholder="1234567890"
  pattern="\d*"
  required
/>
            </div>
           
            <div className="sm:col-span-2">
              <button onClick={addressUpdate} type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                Add Address
              </button>
            </div>
          </div>
        </div>
        {/* <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Payment</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input id="credit-card" aria-describedby="credit-card-text" type="radio" name="payment-method" defaultValue className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" defaultChecked />
                </div>
                <div className="ms-4 text-sm">
                  <label htmlFor="credit-card" className="font-medium leading-none text-gray-900 dark:text-white"> Credit Card </label>
                  <p id="credit-card-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Pay with your credit card</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Delete</button>
                <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700" />
                <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Edit</button>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input id="pay-on-delivery" aria-describedby="pay-on-delivery-text" type="radio" name="payment-method" defaultValue className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                </div>
                <div className="ms-4 text-sm">
                  <label htmlFor="pay-on-delivery" className="font-medium leading-none text-gray-900 dark:text-white"> Payment on delivery </label>
                  <p id="pay-on-delivery-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">+$15 payment processing fee</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Delete</button>
                <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700" />
                <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Edit</button>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input id="paypal-2" aria-describedby="paypal-text" type="radio" name="payment-method" defaultValue className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                </div>
                <div className="ms-4 text-sm">
                  <label htmlFor="paypal-2" className="font-medium leading-none text-gray-900 dark:text-white"> Paypal account </label>
                  <p id="paypal-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Connect to your account</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Delete</button>
                <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700" />
                <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Edit</button>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Methods</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input id="dhl" aria-describedby="dhl-text" type="radio" name="delivery-method" defaultValue className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" defaultChecked />
                </div>
                <div className="ms-4 text-sm">
                  <label htmlFor="dhl" className="font-medium leading-none text-gray-900 dark:text-white"> $15 - DHL Fast Delivery </label>
                  <p id="dhl-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get it by Tommorow</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input id="fedex" aria-describedby="fedex-text" type="radio" name="delivery-method" defaultValue className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                </div>
                <div className="ms-4 text-sm">
                  <label htmlFor="fedex" className="font-medium leading-none text-gray-900 dark:text-white"> Free Delivery - FedEx </label>
                  <p id="fedex-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get it by Friday, 13 Dec 2023</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input id="express" aria-describedby="express-text" type="radio" name="delivery-method" defaultValue className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                </div>
                <div className="ms-4 text-sm">
                  <label htmlFor="express" className="font-medium leading-none text-gray-900 dark:text-white"> $49 - Express Delivery </label>
                  <p id="express-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get it today</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div>
          <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Enter a gift card, voucher or promotional code </label>
          <div className="flex max-w-md items-center gap-4">
            <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder required />
            <button type="button" className="flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply</button>
          </div>
        </div> */}
      </div>
      {/* <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
        <div className="flow-root">
          <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
            <dl className="flex items-center justify-between gap-4 py-3">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Subtotal</dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">$8,094.00</dd>
            </dl>
            <dl className="flex items-center justify-between gap-4 py-3">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
              <dd className="text-base font-medium text-green-500">0</dd>
            </dl>
            <dl className="flex items-center justify-between gap-4 py-3">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">$99</dd>
            </dl>
            <dl className="flex items-center justify-between gap-4 py-3">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">$199</dd>
            </dl>
            <dl className="flex items-center justify-between gap-4 py-3">
              <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
              <dd className="text-base font-bold text-gray-900 dark:text-white">$8,392.00</dd>
            </dl>
          </div>
        </div>
        <div className="space-y-3">
          <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Payment</button>
         
        </div>
      </div> */}
    </div>
  </form>
</section>

    </div>
  );
};

export default LiveLocation;
