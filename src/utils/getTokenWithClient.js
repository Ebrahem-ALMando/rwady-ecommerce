import Cookies from "js-cookie";

export const getTokenWithClient= ()=>{
    return Cookies.get("token");
}