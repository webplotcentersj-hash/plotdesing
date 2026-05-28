"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { C } from "./Ui";

export function AppLayout({ children }) {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { title: "Dashboard Overview", url: "/", icon: "📊" },
    { title: "Módulo Cliente", url: "/cliente", icon: "🏢" },
    { title: "Módulo Profesional", url: "/profesional", icon: "🎨" },
    { title: "Módulo Misiones", url: "/misiones", icon: "⚡" },
    { title: "Panel Administrador", url: "/admin", icon: "🛡️" },
  ];

  const getPageTitle = () => {
    const active = menuItems.find((item) => item.url === pathname);
    return active ? active.title : "Plot φ Workspace";
  };

  return (
    <div className="min-h-screen bg-[#040508] text-[#F1F5F9] flex flex-col lg:flex-row relative">
      {/* ── HIGH-END DESKTOP PERSISTENT SIDEBAR ──────────────────────── */}
      <aside
        className="w-72 bg-[#07080B] border-r border-white/[0.04] hidden lg:flex flex-col justify-between h-screen sticky top-0 z-40"
        style={{ flexShrink: 0 }}
      >
        <div>
          {/* Brand Block */}
          <div className="p-8 border-b border-white/[0.04]">
            <Link href="/" className="no-underline flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="Plot Center"
                style={{ height: 46, width: "auto", flexShrink: 0 }}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="leading-none">
                <div style={{ fontFamily: C.ff, fontWeight: 900, fontSize: 18, color: "#fff", letterSpacing: 1.5 }}>
                  PLOT CENTER
                </div>
                <div style={{ fontFamily: C.fm, fontSize: 9, color: C.muted, letterSpacing: 2.5, marginTop: 5, fontWeight: 700 }}>
                  CONSOLA OPERATIVA
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="p-6 flex flex-col gap-2">
            <div style={{ fontFamily: C.fm, fontSize: 9, color: C.muted, letterSpacing: 3, paddingLeft: 14, marginBottom: 12, fontWeight: 700 }}>
              // SISTEMA OPERATIVO
            </div>
            {menuItems.map((item) => {
              const active = pathname === item.url;
              return (
                <Link href={item.url} key={item.title} className="no-underline">
                  <button
                    className={`sidebar-btn ${active ? "sidebar-btn-active" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ position: "relative" }}
                  >
                    <span style={{ fontSize: 16 }}>{item.icon}</span>
                    <span>{item.title}</span>
                    {active && (
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "25%",
                          width: 4,
                          height: "50%",
                          background: "#fff",
                          borderRadius: "0 4px 4px 0",
                        }}
                      />
                    )}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>

        {/* High-fidelity Footer info */}
        <div className="p-8 border-t border-white/[0.04] flex flex-col gap-3">
          <div className="flex items-center gap-2.5 text-[#9A9A9A] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 active-pulse" style={{ background: C.gr }} />
            <span>Servicios de ARCA: Activo</span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
            user: root_admin_vip
          </div>
        </div>
      </aside>

      {/* ── MOBILE RESPONSIVE TOP BAR & DRAWER ─────────────────────── */}
      <header className="lg:hidden border-b border-[#222530] bg-[#07080B] p-4 flex justify-between items-center sticky top-0 z-50">
        <Link href="/" className="no-underline">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Plot Center" style={{ height: 30, width: "auto" }} />
            <span style={{ fontWeight: 900, fontFamily: C.ff, fontSize: 16, color: "#fff", letterSpacing: 1 }}>
              PLOT CENTER
            </span>
          </div>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white bg-transparent border border-white/10 rounded p-2.5 text-xs font-semibold focus:outline-none"
        >
          {mobileMenuOpen ? "✕ Cerrar" : "☰ Menú"}
        </button>
      </header>

      {/* Mobile Drawer menu overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#07080B]/98 border-b border-white/5 p-6 flex flex-col gap-2.5 z-50 animate-slide-up backdrop-blur-lg">
          {menuItems.map((item) => {
            const active = pathname === item.url;
            return (
              <Link href={item.url} key={item.title} className="no-underline">
                <button
                  className={`sidebar-btn ${active ? "sidebar-btn-active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  <span>{item.title}</span>
                </button>
              </Link>
            );
          })}
        </div>
      )}

      {/* ── MAIN WORKSPACE VIEWPORT ────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* DESKTOP TOP HEADER PANEL */}
        <header className="hidden lg:flex border-b border-white/[0.04] bg-[#07080B]/60 backdrop-blur-lg px-10 py-9 justify-between items-center gap-8 z-30">
          <div className="space-y-1.5">
            <h2 style={{ fontFamily: C.ff, fontWeight: 900, fontSize: 22, color: "#fff", letterSpacing: "-0.02em" }}>
              {getPageTitle()}
            </h2>
            <p style={{ color: C.mid, fontSize: 13 }}>
              Panel de control integrado · Plot Center SRL
            </p>
          </div>
          <div className="flex items-center gap-6">
            {/* Live Clock widget */}
            <div
              className="px-5 py-2.5 bg-black/40 border border-white/5 rounded-xl font-mono text-xs tracking-wider"
              style={{ color: C.or, boxShadow: "inset 0 1px 3px rgba(0,0,0,0.5)" }}
            >
              🕒 {currentTime || "00:00:00"}
            </div>
            {/* Global system tag */}
            <div className="flex items-center gap-2.5 bg-white/[0.02] rounded-xl px-5 py-2.5 border border-white/[0.05]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 active-pulse" style={{ background: C.gr }} />
              <span className="font-mono text-xs font-bold text-white tracking-wider">CONEXION ESTABLE</span>
            </div>
          </div>
        </header>

        {/* Content routing slot */}
        <main className="flex-1 p-8 md:p-10 overflow-y-auto w-full max-w-[1400px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
