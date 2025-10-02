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

export const apiHistory = axios.create({
    baseURL: import.meta.env.VITE_HISTORY_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const apiTeams = axios.create({
    baseURL: import.meta.env.VITE_TEAMS_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api