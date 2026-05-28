"use client";

import { useState, useEffect } from "react";

// Design tokens matching globals.css variables
export const C = {
  bg: "#030406",
  white: "#FFFFFF",
  card: "rgba(14, 16, 26, 0.6)",
  card2: "#040508",
  bg_panel_hover: "rgba(20, 23, 38, 0.8)",
  border: "rgba(255, 255, 255, 0.04)",
  border2: "rgba(255, 255, 255, 0.08)",
  or: "#FF6B00",
  orl: "#FF8522",
  ord: "#CC5600",
  gd: "#B8943A",
  navy: "#07080B",
  dark: "#0F172A",
  mid: "#9A9A9A",
  muted: "#5A5F73",
  gr: "#10B981",
  bl: "#3B82F6",
  pu: "#8B5CF6",
  ye: "#F59E0B",
  re: "#EF4444",
  ff: "var(--font-sans)",
  fm: "var(--font-mono)",
};

export const fmt = (n) => `$${n.toLocaleString("es-AR")}`;
export const fmtK = (n) =>
  n >= 1000000
    ? `$${(n / 1000000).toFixed(1)}M`
    : n >= 1000
    ? `$${(n / 1000).toFixed(0)}K`
    : fmt(n);

// ── TECH CARD (SPACIOUS & LUXURIOUS) ──────────────────────────
export const Card = ({ children, style = {}, onClick, accent }) => (
  <div
    onClick={onClick}
    className={`tech-card ${onClick ? "tech-card-interactive" : ""}`}
    style={{
      borderRadius: 14,
      padding: "28px 30px", // Generous premium padding
      position: "relative",
      overflow: "hidden",
      border: accent ? `1.5px solid ${accent}` : `1px solid ${C.border}`,
      ...style,
    }}
  >
    {children}
  </div>
);

// ── BTN ────────────────────────────────────────────────────────
export const Btn = ({
  children,
  onClick,
  outline,
  full,
  disabled,
  size = "md",
  color,
  sm,
}) => {
  const [h, setH] = useState(false);
  const c = color || C.or;
  const fs = sm ? 11 : size === "sm" ? 11 : size === "lg" ? 14 : 13;
  const pad = sm
    ? "8px 18px"
    : size === "sm"
    ? "8px 18px"
    : size === "lg"
    ? "14px 30px"
    : "11px 24px";

  const glowShadow = outline
    ? "none"
    : h && !disabled
    ? `0 6px 18px ${c}44`
    : "none";

  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: disabled
          ? "rgba(255,255,255,0.02)"
          : outline
          ? "transparent"
          : c,
        color: disabled ? "rgba(255,255,255,0.18)" : outline ? c : "#000",
        border: `1.5px solid ${disabled ? "rgba(255,255,255,0.04)" : c}`,
        borderRadius: 10,
        fontWeight: 800,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: C.ff,
        width: full ? "100%" : "auto",
        padding: pad,
        fontSize: fs,
        boxShadow: glowShadow,
        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: h && !disabled ? "translateY(-1px)" : "none",
        opacity: disabled ? 0.35 : 1,
        letterSpacing: 0.5,
      }}
    >
      {children}
    </button>
  );
};

// ── BADGE ──────────────────────────────────────────────────────
export const Badge = ({ children, color = C.or }) => (
  <span
    style={{
      background: `${color}12`,
      color,
      border: `1px solid ${color}25`,
      borderRadius: 8,
      padding: "4px 12px",
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: 0.5,
      fontFamily: C.fm,
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
    }}
  >
    {children}
  </span>
);

// ── CHIP ───────────────────────────────────────────────────────
export const Chip = ({ text, color = C.or }) => (
  <span
    style={{
      background: `${color}12`,
      color,
      border: `1px solid ${color}22`,
      borderRadius: 6,
      padding: "5px 14px",
      fontSize: 9,
      fontWeight: 850,
      letterSpacing: 1.5,
      fontFamily: C.fm,
      display: "inline-block",
    }}
  >
    {text}
  </span>
);

// ── LABEL ──────────────────────────────────────────────────────
export const Label = ({ children, color = C.mid }) => (
  <div
    style={{
      fontFamily: C.fm,
      fontSize: 9,
      color,
      letterSpacing: 2.5,
      textTransform: "uppercase",
      marginBottom: 14,
      fontWeight: 700,
    }}
  >
    {children}
  </div>
);

// ── ROW ────────────────────────────────────────────────────────
export const Row = ({ l, v, vc }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 0",
      borderBottom: `1px solid ${C.border}`,
    }}
  >
    <span style={{ color: C.mid, fontSize: 12.5, fontFamily: C.fm }}>{l}</span>
    <span
      style={{
        color: vc || "#fff",
        fontWeight: 800,
        fontSize: 13.5,
        fontFamily: vc === C.fm ? C.fm : C.ff,
      }}
    >
      {v}
    </span>
  </div>
);

// ── PROGRESS ───────────────────────────────────────────────────
export const Progress = ({ v, color = C.or }) => (
  <div
    style={{
      background: "rgba(0, 0, 0, 0.4)",
      borderRadius: 6,
      height: 6,
      overflow: "hidden",
      border: `1px solid ${C.border}`,
    }}
  >
    <div
      style={{
        background: color,
        height: "100%",
        width: `${Math.min(100, v)}%`,
        transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: `0 0 10px ${color}`,
      }}
    />
  </div>
);

// ── AVATAR ─────────────────────────────────────────────────────
export const Avatar = ({ name, size = 42, color = C.or }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: 10,
      background: `linear-gradient(135deg, ${color}, ${color}55)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.4,
      fontWeight: 900,
      color: "#000",
      flexShrink: 0,
      fontFamily: C.ff,
      border: `1px solid rgba(255,255,255,0.06)`,
    }}
  >
    {name ? name[0].toUpperCase() : "?"}
  </div>
);

// ── TOAST ──────────────────────────────────────────────────────
export const Toast = ({ msg, color = C.or, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className="tech-card animate-slide-up"
      style={{
        position: "fixed",
        bottom: 40,
        right: 40,
        color: "#fff",
        borderRadius: 10,
        padding: "16px 28px",
        fontFamily: C.ff,
        fontWeight: 800,
        fontSize: 13.5,
        zIndex: 999,
        borderLeft: `4px solid ${color}`,
        boxShadow: `0 24px 60px rgba(0,0,0,0.6)`,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span style={{ fontSize: 16 }}>⚡</span>
      {msg}
    </div>
  );
};
