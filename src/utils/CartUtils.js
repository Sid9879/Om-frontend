import axios from 'axios';

/**
 * @param {Object} obj - The object containing item details (title, price, size, etc.).
 * @param {String} token - The user's authentication token.
 * @returns {Object} - The response from the server.
 */
export const handleAddCart = async (obj, token) => {
  const addCartData = {
    title: obj.title,
    price: obj.price,
    size: obj.size || '',
    quantity: obj.quantity || 1,
    total: obj.price *obj.quantity,
  };

  try {
    const res = await axios.post(
      `https://om-backend.onrender.com/carts/addCart/${obj._id}`,
      addCartData,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    console.log("Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error adding to cart:", error.response?.data || error.message);
    throw error;
  }
};
