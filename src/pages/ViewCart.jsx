import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const ViewCart = () => {
  const userStore = useSelector((state) => state.user);

  const [useritems, setuseritems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    if (!userStore.token) {
      setLoading(false);
      setError("Please log in to view your cart.");
      setuseritems([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://om-backend.onrender.com/carts/getcartItems`,
        {
          headers: {
            Authorization: userStore.token,
          },
        }
      );
      const data = res.data;

      setuseritems(Array.isArray(data.cartItem) ? data.cartItem : []);
    } catch (error) {
      console.error(
        "Error fetching cart items:",
        error.response?.data || error.message
      );
      setError("Failed to load cart items. Please try again later.");
      setuseritems([]);
    } finally {
      setLoading(false);
    }
  }, [userStore.token]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleAddCart = async (obj) => {
    if (obj.quantity >= 10) {
      alert(
        "You have added the maximum quantity (10) for this item to the cart."
      );
      return;
    }

    const addCartData = {
      title: obj.title,
      price: obj.price,
      size: obj.size || "",
      quantity: 1,
      total: obj.price * (obj.quantity + 1),
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
      if (res.data.success) {
        fetchCart();
      }
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message
      );
      alert("Failed to increase item quantity.");
    }
  };

  const handleUpdateCart = async (obj, index) => {
    try {
      let res1 = await axios.put(
        `https://om-backend.onrender.com/carts/update/${obj.productId._id}`,
        { quantity: obj.quantity },
        {
          headers: {
            Authorization: userStore.token,
          },
        }
      );
      if (res1.status===200) {
        fetchCart();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteCart = async (obj) => {
    if (
      !window.confirm(
        `Are you sure you want to remove "${obj.title}" from your cart?`
      )
    ) {
      return;
    }
    try {
      const res = await axios.delete(
        `https://om-backend.onrender.com/carts/delete/${obj.productId._id}`,
        {
          headers: {
            Authorization: userStore.token,
          },
        }
      );
      if (res.data.success) {
        fetchCart();
      }
    } catch (error) {
      console.error(
        "Error deleting item:",
        error.response?.data || error.message
      );
      alert("Failed to delete item from cart.");
    }
  };

  const CartItemSkeleton = () => (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm animate-pulse dark:border-gray-700 dark:bg-gray-800 md:p-6 mb-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <div className="shrink-0 md:order-1 h-20 w-20 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
        <div className="flex items-center justify-between md:order-3 md:justify-end w-full md:w-auto">
          <div className="flex items-center space-x-2">
            <div className="h-5 w-16 bg-gray-200 rounded dark:bg-gray-700"></div>
            <div className="h-5 w-5 bg-gray-200 rounded-md dark:bg-gray-700"></div>
            <div className="h-5 w-10 bg-gray-200 rounded dark:bg-gray-700"></div>
            <div className="h-5 w-5 bg-gray-200 rounded-md dark:bg-gray-700"></div>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <div className="h-6 w-24 bg-gray-200 rounded dark:bg-gray-700 ml-auto"></div>
          </div>
        </div>
        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <div className="h-6 w-3/4 bg-gray-200 rounded dark:bg-gray-700"></div>
          <div className="flex items-center gap-4">
            <div className="h-5 w-24 bg-gray-200 rounded dark:bg-gray-700"></div>
            <div className="h-5 w-20 bg-gray-200 rounded dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-6">
            Shopping Cart
          </h2>
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              {[1, 2].map((i) => (
                <CartItemSkeleton key={i} />
              ))}
            </div>
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm animate-pulse dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <div className="h-6 w-48 bg-gray-200 rounded mb-4 dark:bg-gray-700"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full dark:bg-gray-700"></div>
                  <div className="h-4 bg-gray-200 rounded w-full dark:bg-gray-700"></div>
                  <div className="h-4 bg-gray-200 rounded w-full dark:bg-gray-700"></div>
                  <div className="h-4 bg-gray-200 rounded w-full dark:bg-gray-700"></div>
                </div>
                <div className="h-8 w-full bg-gray-200 rounded-lg mt-4 dark:bg-gray-700"></div>
                <div className="h-5 w-3/4 bg-gray-200 rounded mx-auto mt-2 dark:bg-gray-700"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 min-h-[calc(100vh-100px)] flex items-center justify-center">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 text-center">
          <div className="p-8 bg-red-100 border border-red-400 text-red-700 rounded-xl shadow-lg dark:bg-red-800 dark:border-red-700 dark:text-red-200">
            <p className="text-2xl font-bold mb-4">
              Oops! Something went wrong 🙁
            </p>
            <p className="text-lg mb-6">{error}</p>
            <button
              onClick={fetchCart}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md font-semibold"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-8">
            Your Shopping Cart 🛒
          </h2>

          {useritems.length === 0 ||
          useritems.every((cart) => cart.items.length === 0) ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner transition-all duration-300 ease-in-out hover:shadow-xl">
              <svg
                className="w-20 h-20 text-gray-400 dark:text-gray-600 mb-6 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Your cart is empty!
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Start Shopping Now!
                <svg
                  className="ml-2 -mr-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl space-y-6">
                {useritems.map((ele) => (
                  <div key={ele._id} className="w-full">
                    {ele.items.map((obj) => (
                      <div
                        key={obj.productId?._id}
                        className="rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 md:p-6 mb-4 transition-all duration-300 ease-in-out hover:shadow-lg"
                      >
                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                          <Link
                            to={`/product/${obj.productId?._id}`}
                            className="shrink-0 md:order-1 group"
                          >
                            <img
                              className="h-20 w-20 object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105"
                              src={obj.productId?.image?.[0]?.url}
                              alt={obj.title || "Product Image"}
                            />
                          </Link>
                          <label htmlFor="counter-input" className="sr-only">
                            Choose quantity:
                          </label>
                          <div className="flex items-center justify-between md:order-3 md:justify-end w-full md:w-auto">
                            <div className="flex items-center text-gray-700 dark:text-gray-300 mr-4">
                              <p className="px-2 font-medium">
                                Size:{" "}
                                <span className="font-semibold">
                                  {obj?.size || "N/A"}
                                </span>
                              </p>
                            </div>
                            <div className="flex items-center border border-gray-300 rounded-lg dark:border-gray-600 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                              <button
                                onClick={() => handleUpdateCart(obj)}
                                type="button"
                                className="inline-flex h-8 w-8 items-center justify-center text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 transition duration-150 ease-in-out"
                              >
                                <svg
                                  className="h-3.5 w-3.5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 2"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 1h16"
                                  />
                                </svg>
                              </button>
                              <p className="w-10 text-center text-base font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-800 py-1">
                                {obj.quantity}
                              </p>
                              <button
                                onClick={() => handleAddCart(obj)}
                                type="button"
                                className="inline-flex h-8 w-8 items-center justify-center text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 transition duration-150 ease-in-out"
                              >
                                <svg
                                  className="h-3.5 w-3.5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 18"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 1v16M1 9h16"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className="text-end md:order-4 md:w-32 ml-4">
                              <p className="text-xl font-bold text-gray-900 dark:text-white">
                                ₹{obj.total}
                              </p>
                            </div>
                          </div>
                          <div className="w-full min-w-0 flex-1 space-y-2 md:order-2 md:max-w-md">
                            <Link
                              to={`/product/${obj.productId?._id}`}
                              className="text-lg font-semibold text-gray-900 hover:underline dark:text-white"
                            >
                              {obj.title}
                            </Link>
                            <div className="flex items-center gap-4 mt-2">
                              <button
                                type="button"
                                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white transition duration-150 ease-in-out"
                              >
                                <svg
                                  className="me-1.5 h-5 w-5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                  />
                                </svg>
                                Add to Favorites
                              </button>
                              <button
                                onClick={() => deleteCart(obj)}
                                type="button"
                                className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500 transition duration-150 ease-in-out"
                              >
                                <svg
                                  className="me-1.5 h-5 w-5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18 17.94 6M18 18 6.06 6"
                                  />
                                </svg>
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Order Summary 💰
                  </p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4 py-1">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Total Items ({useritems[0]?.items.length || 0})
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          ₹ {useritems[0]?.totalPrice}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4 py-1">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Savings
                        </dt>
                        <dd className="text-base font-medium text-green-600">
                          ₹ 0.00
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4 py-1">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Delivery Charge
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          ₹ 0.00
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4 py-1">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Estimated Tax
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          ₹ 0.00
                        </dd>
                      </dl>
                    </div>
                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                      <dt className="text-lg font-bold text-gray-900 dark:text-white">
                        Order Total
                      </dt>
                      <dd className="text-lg font-extrabold text-gray-900 dark:text-white">
                        ₹ {useritems[0]?.totalPrice}
                      </dd>
                    </dl>
                  </div>
                  <Link
                    to="#"
                    className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-lg font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                  >
                    Proceed to Checkout
                    <svg
                      className="ml-2 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {" "}
                      or{" "}
                    </span>
                    <Link
                      to="/"
                      title="Continue Shopping"
                      className="inline-flex items-center gap-2 text-base font-medium text-primary-700 underline hover:no-underline dark:text-primary-500 transition duration-150 ease-in-out"
                    >
                      Continue Shopping
                      <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 12H5m14 0-4 4m4-4-4-4"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ViewCart;
