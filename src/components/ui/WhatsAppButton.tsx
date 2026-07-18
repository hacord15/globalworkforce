"use client";

import { useState } from "react";

/**
 * WhatsAppButton
 * --------------
 * Floating "Chat on WhatsApp" button that matches the SIS Global
 * Workforce Solutions site design (green pill, bottom-right corner).
 *
 * Props:
 *   phoneNumber  – WhatsApp number with country code, no "+" or spaces
 *                  e.g. "911145678900"
 *   message      – Pre-filled message (optional)
 *   position     – "bottom-right" | "bottom-left"  (default: "bottom-right")
 */
export default function WhatsAppButton({
  phoneNumber = "+919818065979",
  message = "Hello! I'd like to know more about your workforce solutions.",
  position = "bottom-right",
}) {
  const [hovered, setHovered] = useState(false);

  const encodedMsg = encodeURIComponent(message);
  const href = `https://wa.me/${phoneNumber}?text=${encodedMsg}`;

  const positionStyle =
    position === "bottom-left"
      ? { left: "24px", right: "auto" }
      : { right: "24px", left: "auto" };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: "24px",
        ...positionStyle,
        zIndex: 9999,
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        backgroundColor: hovered ? "#1DA851" : "#25D366",
        color: "#fff",
        textDecoration: "none",
        padding: "12px 20px",
        borderRadius: "50px",
        fontFamily: "'Barlow', 'Segoe UI', sans-serif",
        fontWeight: 600,
        fontSize: "15px",
        letterSpacing: "0.01em",
        boxShadow: hovered
          ? "0 8px 24px rgba(37,211,102,0.55)"
          : "0 4px 16px rgba(37,211,102,0.4)",
        transform: hovered ? "translateY(-3px) scale(1.03)" : "translateY(0) scale(1)",
        transition: "background-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease",
        userSelect: "none",
        whiteSpace: "nowrap",
      }}
    >
      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="22"
        height="22"
        fill="white"
        style={{ flexShrink: 0 }}
        aria-hidden="true"
      >
        <path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.478.651 4.87 1.885 6.97L2 30l7.243-1.858A13.94 13.94 0 0016.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm0 25.464a11.442 11.442 0 01-5.84-1.604l-.418-.248-4.298 1.103 1.128-4.185-.272-.43a11.422 11.422 0 01-1.764-6.097c0-6.318 5.146-11.463 11.464-11.463 6.317 0 11.463 5.145 11.463 11.463 0 6.318-5.146 11.461-11.463 11.461zm6.29-8.583c-.345-.173-2.037-1.005-2.353-1.118-.316-.115-.547-.172-.777.173-.23.345-.891 1.117-1.092 1.348-.2.23-.402.259-.747.086-.344-.172-1.454-.536-2.77-1.71-1.024-.913-1.715-2.04-1.916-2.385-.2-.346-.021-.533.151-.705.155-.155.344-.403.517-.604.172-.2.23-.345.345-.575.115-.23.058-.432-.028-.604-.087-.172-.777-1.875-1.065-2.567-.28-.673-.566-.582-.777-.593l-.663-.012c-.23 0-.603.086-.919.43-.316.346-1.207 1.18-1.207 2.877s1.236 3.34 1.408 3.568c.173.23 2.428 3.71 5.882 5.203.822.354 1.464.567 1.963.726.824.261 1.574.224 2.167.136.66-.099 2.037-.832 2.324-1.636.287-.805.287-1.494.2-1.638-.085-.143-.315-.23-.66-.402z" />
      </svg>
      Chat on WhatsApp
    </a>
  );
}