import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const apiOrderService = axios.create({
    baseURL: import.meta.env.VITE_SERVICE_ORDER_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api