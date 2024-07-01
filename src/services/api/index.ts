import axios from "axios";
import { headers } from "./configs";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers
});

api.interceptors.response.use(response => response.data);

export default api;