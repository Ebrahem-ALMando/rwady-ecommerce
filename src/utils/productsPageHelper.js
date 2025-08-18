export function pickLocalizedName(name, locale) {
    if (!name) return "";
    if (typeof name === "string") return name;
    if (typeof name === "object") {
      const byLocale = name?.[locale];
      if (typeof byLocale === "string" && byLocale.trim()) return byLocale;
      const en = name?.en;
      if (typeof en === "string" && en.trim()) return en;
      const first = Object.values(name).find((v) => typeof v === "string");
      if (typeof first === "string") return first;
    }
    return "";
  }
  
  export function stripHtml(html) {
    if (!html) return "";
    return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  }