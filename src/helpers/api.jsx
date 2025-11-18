import Cookies from "js-cookie"
import axios from "axios"

export const UseToken = () =>{
    const token = Cookies.get("token")
    return token
}

const baseUrl = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: baseUrl,
});