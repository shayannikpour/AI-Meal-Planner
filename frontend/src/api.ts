import axios from "axios";

// Base URL for Laravel API
const API_BASE_URL = "http://localhost:8000/api";

export const fetchTags = async () => {
    const response = await axios.get(`${API_BASE_URL}/tags`);
    return response.data;
};

export const fetchIngredients = async () => {
    const response = await axios.get(`${API_BASE_URL}/ingredients`);
    return response.data;
};
