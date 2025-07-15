import React from "react";

export function IconFade({ show, children }) {
    return (
        <span
            style={{
                position: "absolute",
                transition: "opacity 0.3s ease",
                opacity: show ? 1 : 0,
                pointerEvents: show ? "auto" : "none",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
      {children}
    </span>
    );
}