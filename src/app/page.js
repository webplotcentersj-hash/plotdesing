"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { C, Card, Btn, Badge, Label, Avatar } from "@/components/Ui";

// ── Inline vector icons (no external deps) ──────────────────────
const svgBase = {
  viewBox: "0 0 24 24",
  width: 16,
  height: 16,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
const IconFilter = (p) => (<svg {...svgBase} {...p}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>);
const IconClock = (p) => (<svg {...svgBase} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
const IconUsers = (p) => (<svg {...svgBase} {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>);
const IconZap = (p) => (<svg {...svgBase} {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>);
const IconArrow = (p) => (<svg {...svgBase} strokeWidth={2.5} {...p}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>);
const IconBuilding = (p) => (<svg {...svgBase} {...p}><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" /></svg>);
const IconPalette = (p) => (<svg {...svgBase} {...p}><circle cx="13.5" cy="6.5" r=".6" fill="currentColor" stroke="none" /><circle cx="17.5" cy="10.5" r=".6" fill="currentColor" stroke="none" /><circle cx="8.5" cy="7.5" r=".6" fill="currentColor" stroke="none" /><circle cx="6.5" cy="12.5" r=".6" fill="currentColor" stroke="none" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.83-.44-1.12-.29-.29-.44-.65-.44-1.13a1.64 1.64 0 0 1 1.67-1.67h2c3.05 0 5.55-2.5 5.55-5.55C21.97 6.01 17.46 2 12 2z" /></svg>);

// Animated count-up number (no framer-motion dependency)
function useCountUp(target, duration = 1500, decimals = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString("es-AR");
}

// ── Network activity panel (themed equivalent) ──────────────────
const NET_SEGMENTS = [
  { label: "Activas", value: 45, color: C.or },
  { label: "En revisión", value: 25, color: C.ye },
  { label: "Entregadas", value: 20, color: C.gr },
  { label: "En pausa", value: 10, color: C.muted },
];
const NET_TALENTS = [
  { n: "Juan Pérez", c: C.or },
  { n: "María González", c: C.bl },
  { n: "Lucas Torres", c: C.ye },
  { n: "Ana Ruiz", c: C.pu },
  { n: "Carlos Ibáñez", c: C.gr },
];

function ActivityPanel() {
  const misiones = useCountUp(42);
  const talentos = useCountUp(235);
  return (
    <div className="tech-card rounded-2xl" style={{ padding: 26, border: `1px solid ${C.border}` }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 style={{ fontFamily: C.ff, fontWeight: 800, fontSize: 17, color: "#fff", letterSpacing: "-0.01em" }}>
            Actividad de la Red
          </h3>
          <p style={{ color: C.muted, fontSize: 11, fontFamily: C.fm, marginTop: 3 }}>
            Resumen operativo en tiempo real
          </p>
        </div>
        <button
          aria-label="Filtrar actividad"
          style={{
            width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.02)",
            border: `1px solid ${C.border}`, color: C.mid, display: "flex", alignItems: "center",
            justifyContent: "center", cursor: "pointer", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = C.or; e.currentTarget.style.borderColor = `${C.or}55`; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = C.mid; e.currentTarget.style.borderColor = C.border; }}
        >
          <IconFilter />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Distribución de misiones */}
        <div className="rounded-xl p-5" style={{ background: C.card2, border: `1px solid ${C.border}` }}>
          <div className="flex items-center justify-between mb-4">
            <span style={{ color: C.mid, fontSize: 12, fontWeight: 600 }}>Distribución de Misiones</span>
            <span style={{ color: C.muted }}><IconClock /></span>
          </div>
          <div className="mb-4">
            <span style={{ fontFamily: C.ff, fontWeight: 900, fontSize: 34, color: "#fff", letterSpacing: "-0.02em" }}>
              {misiones}
            </span>
            <span style={{ color: C.mid, fontSize: 12, marginLeft: 6 }}>misiones</span>
          </div>
          <div className="flex w-full overflow-hidden" style={{ height: 8, borderRadius: 99, background: "rgba(0,0,0,0.4)" }}>
            {NET_SEGMENTS.map((s) => (
              <div key={s.label} className="activity-seg" style={{ width: `${s.value}%`, background: s.color }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
            {NET_SEGMENTS.map((s) => (
              <div key={s.label} className="flex items-center gap-1.5">
                <span style={{ width: 7, height: 7, borderRadius: 99, background: s.color }} />
                <span style={{ fontSize: 10, color: C.muted, fontFamily: C.fm, fontWeight: 700 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Talentos en la red */}
        <div className="rounded-xl p-5" style={{ background: "rgba(255,107,0,0.05)", border: `1px solid ${C.or}22` }}>
          <div className="flex items-center justify-between mb-4">
            <span style={{ color: C.orl, fontSize: 12, fontWeight: 600 }}>Talentos en la Red</span>
            <span style={{ color: C.or }}><IconUsers /></span>
          </div>
          <div className="mb-6">
            <span style={{ fontFamily: C.ff, fontWeight: 900, fontSize: 34, color: "#fff", letterSpacing: "-0.02em" }}>
              {talentos}
            </span>
            <span style={{ color: C.orl, fontSize: 12, marginLeft: 6 }}>activos</span>
          </div>
          <div className="flex items-center">
            {NET_TALENTS.map((t, i) => (
              <div key={t.n} style={{ marginLeft: i ? -10 : 0, borderRadius: 12, border: `2px solid ${C.card2}` }}>
                <Avatar name={t.n} size={34} color={t.c} />
              </div>
            ))}
            <div
              style={{
                marginLeft: -10, width: 34, height: 34, borderRadius: 10, background: C.card2,
                border: `2px solid ${C.card2}`, display: "flex", alignItems: "center", justifyContent: "center",
                color: C.mid, fontFamily: C.fm, fontSize: 10, fontWeight: 800,
              }}
            >
              +230
            </div>
          </div>
        </div>
      </div>

      {/* CTA banner */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-5 rounded-xl p-4"
        style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}` }}
      >
        <div className="flex items-center gap-3">
          <div
            style={{
              width: 40, height: 40, borderRadius: 12, background: C.card2, border: `1px solid ${C.border2}`,
              display: "flex", alignItems: "center", justifyContent: "center", color: C.or, flexShrink: 0,
            }}
          >
            <IconZap />
          </div>
          <span style={{ fontSize: 13, color: C.mid, fontWeight: 600, lineHeight: 1.5 }}>
            Gestioná misiones y talento en un solo lugar.
          </span>
        </div>
        <Link href="/misiones" className="no-underline">
          <Btn>
            <span className="inline-flex items-center gap-1.5">Ver todo <IconArrow width={15} height={15} /></span>
          </Btn>
        </Link>
      </div>
    </div>
  );
}

// High fidelity vector Sparkline for KPI cards
const Sparkline = ({ points, color }) => (
  <svg viewBox="0 0 100 30" className="w-24 h-9 flex-shrink-0">
    <path
      d={points}
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter={`drop-shadow(0 0 4px ${color}66)`}
    />
  </svg>
);

export default function Home() {
  const MODS = [
    {
      id: "cliente",
      icon: "🏢",
      title: "Módulo Cliente",
      sub: "Cargá briefs corporativos, calculá presupuestos en tiempo real y publicá misiones urgentes.",
      color: C.or,
      href: "/cliente",
    },
    {
      id: "profesional",
      icon: "🎨",
      title: "Módulo Profesional",
      sub: "Postulate en las categorías activas, gestioná tu portfolio de trabajos y cobrá tu 50% neto.",
      color: C.bl,
      href: "/profesional",
    },
    {
      id: "misiones",
      icon: "⚡",
      title: "Módulo Misiones",
      sub: "Seguimiento operativo en tiempo real, chat seguro anti-elusión y descargas de entregables.",
      color: C.pu,
      href: "/misiones",
    },
    {
      id: "admin",
      icon: "🛡️",
      title: "Panel Administrador",
      sub: "Monitoreo financiero integral, división contractual 50/50 y validación de postulantes.",
      color: C.gr,
      href: "/admin",
    },
  ];

  const STATS = [
    { label: "Misiones Activas", value: "14 Misiones", color: C.or, icon: "⚡", spark: "M 5 25 Q 25 5 50 20 T 95 10" },
    { label: "Talentos Validados", value: "31 Cuentas", color: C.bl, icon: "👥", spark: "M 5 15 Q 30 25 50 10 T 95 5" },
    { label: "Validaciones Pend.", value: "3 Perfiles", color: C.ye, icon: "⏳", spark: "M 5 5 Q 30 10 50 25 T 95 20" },
    { label: "Volumen Liquidado", value: "$22.5M ARS", color: C.gr, icon: "💰", spark: "M 5 28 Q 20 20 50 12 T 95 2" },
  ];

  const RULES = [
    {
      t: "División Comercial 50/50",
      d: "Plot Center SRL retiene el 50% de la facturación bruta del cliente. El profesional recibe el 50% neto directamente en su cuenta, asegurando transparencia absoluta.",
      col: C.or,
    },
    {
      t: "Urgencia Acelerada 1.5×",
      d: "sobrecargo = días acortados × precio/día × 1.5. Este recargo se aplica al cliente corporativo y se divide equitativamente con el profesional asignado.",
      col: C.ye,
    },
    {
      t: "Postulación y Validación",
      d: "Los talentos se dividen en 3 segmentos: Estudiante, Junior y Senior. Exigimos la validación manual del portfolio por nuestro comité antes de habilitar misiones.",
      col: C.bl,
    },
    {
      t: "Protocolo Anti-Elusión",
      d: "Un regex en vivo detecta y bloquea datos de contacto en el chat integrado para proteger la transacción del depósito en garantía y asegurar las operaciones.",
      col: C.re,
    },
  ];

  return (
    <div className="space-y-xl animate-slide-up">
      {/* ── HERO / PRESENTACIÓN DE PLATAFORMA ─────────────────────────── */}
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{
          border: `1px solid ${C.border}`,
          background:
            "linear-gradient(135deg, rgba(255,107,0,0.10) 0%, rgba(13,15,24,0.6) 45%, rgba(139,92,246,0.08) 100%)",
        }}
      >
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,107,0,0.18) 0%, transparent 70%)", filter: "blur(40px)" }}
        />
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 md:p-12">
          {/* Texto principal */}
          <div className="lg:col-span-7 space-y-6">
            <Badge color={C.or}>● PLATAFORMA OPERATIVA · v2.0</Badge>
            <h1
              className="hero-title"
              style={{
                fontFamily: C.ff,
                fontWeight: 900,
                fontSize: "clamp(30px, 5vw, 46px)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
              }}
            >
              El ecosistema que conecta{" "}
              <span className="hero-accent" style={{ textShadow: `0 0 30px ${C.or}55` }}>
                marcas y talento creativo
              </span>{" "}
              de primer nivel.
            </h1>
            <p style={{ color: C.mid, fontSize: 15, lineHeight: 1.7, maxWidth: 540 }}>
              Plot φ centraliza briefs corporativos, presupuestos inteligentes,
              asignación de profesionales y liquidaciones 50/50 con total
              transparencia y resguardo fiduciario.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/cliente" className="no-underline">
                <Btn size="lg">
                  <span className="inline-flex items-center gap-2"><IconBuilding width={17} height={17} /> Publicar una Misión</span>
                </Btn>
              </Link>
              <Link href="/profesional" className="no-underline">
                <Btn size="lg" outline color={C.bl}>
                  <span className="inline-flex items-center gap-2"><IconPalette width={17} height={17} /> Soy Profesional</span>
                </Btn>
              </Link>
            </div>
          </div>

          {/* Visual showcase */}
          <div className="lg:col-span-5">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${C.border2}`, boxShadow: "0 30px 60px -20px rgba(0,0,0,0.7)" }}
            >
              <img
                src="/app_ui.png"
                alt="Vista previa de la plataforma Plot φ"
                loading="lazy"
                className="w-full h-full object-cover"
                style={{ aspectRatio: "16 / 11" }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(180deg, transparent 60%, rgba(3,4,6,0.5) 100%)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── PANEL DE ACTIVIDAD DE LA RED ──────────────────────────────── */}
      <ActivityPanel />

      {/* ── METRICS OVERVIEW (KPI BAR) ────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((s) => (
          <Card key={s.label} style={{ background: C.card, borderRadius: 14 }}>
            <div className="flex justify-between items-center mb-4">
              <span style={{ fontFamily: C.fm, fontSize: 10, color: C.muted, letterSpacing: 2, fontWeight: 700 }}>
                {s.label.toUpperCase()}
              </span>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
            </div>
            <div className="flex justify-between items-end gap-2">
              <div
                style={{
                  fontFamily: C.ff,
                  fontWeight: 900,
                  fontSize: 26,
                  color: s.color,
                  textShadow: `0 0 16px ${s.color}22`,
                  letterSpacing: "-0.02em",
                }}
              >
                {s.value}
              </div>
              <Sparkline points={s.spark} color={s.color} />
            </div>
          </Card>
        ))}
      </div>

      {/* ── SECURITY NOTIFICATION PANEL ────────────────────────────────── */}
      <div
        style={{
          background: "rgba(255, 107, 0, 0.02)",
          border: `1px solid rgba(255, 107, 0, 0.12)`,
          borderRadius: 14,
          padding: "22px 28px",
          boxShadow: "0 4px 30px rgba(0,0,0,0.2)",
        }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
      >
        <div className="space-y-1">
          <div style={{ color: C.or, fontWeight: 800, fontSize: 13, letterSpacing: 1.5, fontFamily: C.fm }}>
            🔒 RESGUARDO DE SEGURIDAD EXCLUSIVO BACKEND
          </div>
          <p style={{ color: C.mid, fontSize: 13, lineHeight: 1.6 }}>
            El entorno operativo del profesional jamás recibe la variable{" "}
            <code style={{ background: "rgba(255, 107, 0, 0.08)", color: C.or, padding: "3px 8px", borderRadius: 6, fontFamily: C.fm, fontSize: 11 }}>
              precio_cliente
            </code>
            . Todos los cálculos se resuelven de manera encapsulada para garantizar la total privacidad comercial.
          </p>
        </div>
        <Badge color={C.or}>SEGURIDAD ACTIVA</Badge>
      </div>

      {/* ── CORE OPERATIONS SECTIONS (GRID) ───────────────────────────── */}
      <div>
        <Label color={C.or}>ACCEDER A LOS MÓDULOS DE NEGOCIO</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {MODS.map((mod) => (
            <Link href={mod.href} key={mod.id} className="no-underline block">
              <div
                className="tech-card p-8 rounded-2xl flex gap-6 items-center cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  border: `1px solid ${C.border}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${mod.color}50`;
                  e.currentTarget.style.background = C.bg_panel_hover;
                  e.currentTarget.style.boxShadow = `0 12px 40px ${mod.color}18`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.background = C.card;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 10,
                    background: `${mod.color}10`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    border: `1.5px solid ${mod.color}25`,
                    flexShrink: 0,
                  }}
                >
                  {mod.icon}
                </div>
                <div className="flex-1 space-y-1">
                  <div
                    style={{
                      fontFamily: C.ff,
                      fontWeight: 800,
                      color: "#fff",
                      fontSize: 18,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {mod.title}
                  </div>
                  <div style={{ color: C.mid, fontSize: 13, lineHeight: 1.6 }}>{mod.sub}</div>
                </div>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "rgba(255, 255, 255, 0.02)",
                    border: `1px solid ${C.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: mod.color,
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  ›
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── SYSTEM & BUSINESS RULES (GRID) ────────────────────────────── */}
      <div>
        <Label color={C.muted}>REGLAS Y MARCOS OPERATIVOS</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          {RULES.map((rule) => (
            <Card key={rule.t} style={{ borderTop: `3px solid ${rule.col}`, padding: 26, borderRadius: 12 }}>
              <div
                style={{
                  fontFamily: C.ff,
                  fontWeight: 800,
                  color: "#fff",
                  fontSize: 15,
                  marginBottom: 10,
                }}
              >
                {rule.t}
              </div>
              <p style={{ color: C.mid, fontSize: 12, lineHeight: 1.7 }}>{rule.d}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
