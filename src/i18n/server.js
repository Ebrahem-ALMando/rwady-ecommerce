// src/i18n/server.js
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export const createTranslation = async (namespace = "common") => {
    const lang = cookies().get("language")?.value || "ar";
    const filePath = path.resolve(`./public/locales/${lang}/${namespace}.json`);
    const file = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(file);

    const t = (key) => {
        return key.split('.').reduce((acc, cur) => acc?.[cur], data) || key;
    };

    return { t, lang };
};
