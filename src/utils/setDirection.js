export const setHtmlDirection = (langCode) => {
    const dir = langCode === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", langCode);
};
