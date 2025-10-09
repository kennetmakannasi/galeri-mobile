import Cookies from "js-cookie"

export const UseToken = () =>{
    const token = Cookies.get("token")
    return token
}