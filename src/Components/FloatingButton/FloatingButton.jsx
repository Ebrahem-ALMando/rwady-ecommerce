"use client";
import styles from "./FloatingButton.module.css";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
// أيقونات داخل المكوّن (Client) لتجنّب تمرير دوال/عناصر من Server
import { PiWhatsappLogo } from "react-icons/pi";
import { useLocale } from "next-intl";

function Chevron({ dir = "right" }) {
  const rotation = dir === "left" ? 180 : 0;
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" style={{ transform: `rotate(${rotation}deg)` }} aria-hidden="true">
      <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DefaultDownloadIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3a1 1 0 0 1 1 1v9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4.001 4a1 1 0 0 1-1.412 0l-4-4A1 1 0 1 1 8.708 11.293L11 13.586V4a1 1 0 0 1 1-1Z"/>
      <path d="M5 19a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2H5Z"/>
    </svg>
  );
}

// mapping داخلي للمفاتيح النصية
const ICONS = {
  whatsapp: PiWhatsappLogo,
  download: DefaultDownloadIcon,
};

export default function FloatingButton({
  actions = [],
  position = "auto",
  positionVal = "20px",
  size = "md",
  openLabel = "Open actions",
  closeLabel = "Close actions",
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const lang = useLocale();
  const side = position === "auto" ? (lang === "ar" ? "left" : "right") : position;

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const items = useMemo(() => {
    if (Array.isArray(actions) && actions.length > 0) return actions;

    return [
      {
        key: "download",
        label: "Download App",
        href: "#",
        iconKey: "download",
        brandColor: "#007BFF",
        iconColor: "#007BFF",
      },
    ];
  }, [actions]);

  const containerStyle = {
    left: side === "left" ? positionVal : "unset",
    right: side === "right" ? positionVal : "unset",
  };

  return (
    <div
      className={[
        styles.root,
        styles[side],
        styles[size],
        isMobile ? styles.mobile : styles.desktop,
        isOpen ? styles.open : styles.closed,
      ].join(" ")}
      style={containerStyle}
    >
      {/* Overlay for mobile when open */}
      {isMobile && (
        <button
          type="button"
          aria-hidden={!isOpen}
          tabIndex={-1}
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
        />
      )}

      <button
        type="button"
        className={styles.toggle}
        aria-expanded={isOpen}
        aria-label={isOpen ? closeLabel : openLabel}
        onClick={() => setIsOpen((v) => !v)}
      >
        <span className={styles.chev}>
          {side === "left" ? (
            <Chevron dir={isOpen ? "left" : "right"} />
          ) : (
            <Chevron dir={isOpen ? "right" : "left"} />
          )}
        </span>
      </button>

      <div className={styles.panel}>
        <ul className={styles.stack} role="menu" aria-hidden={!isOpen}>
          {items.map((a, i) => {
            const IconComp = ICONS[a.iconKey] || DefaultDownloadIcon;
            return (
              <li key={a.key || i} className={styles.item} style={{ transitionDelay: isOpen ? `${i * 60}ms` : "0ms" }}>
                <div className={styles.btnWrap}>
                  <Link
                    href={a.href || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    aria-label={a.label}
                    className={styles.btn}
                    style={{ "--brand": a.brandColor || "#25D366", "--iconColor": a.iconColor || "#CBD5E1" }}
                  >
                    <span className={styles.wave} aria-hidden="true" />
                    <span className={styles.icon}>
                      <IconComp size={22} />
                    </span>
                  </Link>
                  {a.label && <span className={styles.tip}>{a.label}</span>}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
