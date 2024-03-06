import axios from "axios";

const API_URL = "http://localhost:3000";

export const instance = axios.create({
    baseURL: `${API_URL}/`,
    withCredentials: true
});