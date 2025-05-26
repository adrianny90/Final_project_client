import axios from "axios";

export const fetchItemsByCategory = async(category) => {
    const res = await axios.get(`http://localhost:3000/items?category=${category}`)
    return res.data;
};

export const fetchAllItems = async ()=> {
    const res = await axios.get(`http://localhost:3000/items`)
    return res.data;
}