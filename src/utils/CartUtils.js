import axios from 'axios';

/**
 * Adds an item to the cart.
 * @param {Object} obj - The object containing item details (title, price, size, etc.).
 * @param {String} token - The user's authentication token.
 * @returns {Object} - The response from the server.
 */
export const handleAddCart = async (obj, token) => {
  const addCartData = {
    title: obj.title,
    price: obj.price,
    size: obj.size || '',
    quantity: 1,
    total: obj.price *obj.quantity,
  };

  try {
    const res = await axios.post(
      `http://localhost:8090/carts/addCart/${obj._id}`,
      addCartData,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    console.log("Response:", res.data);
    return res.data; // Return the response for further handling
  } catch (error) {
    console.error("Error adding to cart:", error.response?.data || error.message);
    throw error; // Propagate the error for error handling
  }
};
