import axios from "axios";

export const fetchItemsByCategory = async (category) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/items?category=${category}`
  );
  return res.data;
};

export const fetchAllItems = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/items`);
  return res.data;
};
