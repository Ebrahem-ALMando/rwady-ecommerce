"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";

export default function DirectionProvider({ children }) {
    useEffect(() => {
        const lang = Cookies.get("language") || "ar";
        const dir = lang === "ar" ? "rtl" : "ltr";
        document.documentElement.setAttribute("dir", dir);
        document.documentElement.setAttribute("lang", lang);
    }, []);

    return <>{children}</>;
}
