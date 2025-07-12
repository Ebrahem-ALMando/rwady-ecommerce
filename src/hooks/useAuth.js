"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { logoutUser} from "@/api/services/auth/logoutUser";

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedToken = Cookies.get("token");
        const storedUserId = Cookies.get("user_id");
        const storedUserName = Cookies.get("user_name");

        setToken(storedToken || null);
        setUserId(storedUserId || null);
        setUserName(storedUserName || null);
        setIsAuthenticated(!!storedToken);
    }, []);

    const login = (newToken, { id, name }) => {
        Cookies.set("token", newToken, {
            expires: 90,
            secure: true,
            sameSite: "Strict",
            path: "/",
        });

        Cookies.set("user_id", id, {
            expires: 90,
            secure: true,
            sameSite: "Strict",
            path: "/",
        });

        Cookies.set("user_name", name, {
            expires: 90,
            secure: true,
            sameSite: "Strict",
            path: "/",
        });

        setToken(newToken);
        setUserId(id);
        setUserName(name);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        const res=await logoutUser()
        console.log(res)
        if(!res.error){
            Cookies.remove("token");
            Cookies.remove("user_id");
            Cookies.remove("user_name");
            setToken(null);
            setUserId(null);
            setUserName(null);
            setIsAuthenticated(false);
        }else {
            console.log("Logout Error")
        }
    };

    return {
        token,
        userId,
        userName,
        isAuthenticated,
        login,
        logout,
    };
};
