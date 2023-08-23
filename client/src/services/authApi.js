import axios from "axios"
import { SERVER_URL } from "../constants"

export async function isAuth() {
    const response = await axios.get(`${SERVER_URL}/api/auth/isauth`, { withCredentials: true });
    return response.data;
}

export async function logoutUser() {
    const response = await axios.get(`${SERVER_URL}/api/auth/logout`, { withCredentials: true });
    return response;
}
