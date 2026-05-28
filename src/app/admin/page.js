"use client";

import { useState } from "react";
import Link from "next/link";
import {
  C,
  Card,
  Btn,
  Badge,
  Label,
  Row,
  Avatar,
  Toast,
  fmt,
  fmtK,
} from "@/components/Ui";

const DISEÑADORES_INIT = [
  { id: 1, n: "Juan Pérez", tipo: "senior", pts: 4.9, mis: 42, disp: true, estado: "activo" },
  { id: 2, n: "María González", tipo: "junior", pts: 4.7, mis: 18, disp: true, estado: "activo" },
  { id: 3, n: "Lucas Torres", tipo: "junior", pts: 4.4, mis: 9, disp: true, estado: "activo" },
  { id: 4, n: "Ana Ruiz", tipo: "estudiante", pts: 4.2, mis: 3, disp: true, estado: "activo" },
  { id: 5, n: "Carlos Ibáñez", tipo: "senior", pts: 4.8, mis: 31, disp: false, estado: "pendiente" },
];

const MISIONES_DEMO = [
  { id: "M001", titulo: "Logo + Manual de Uso", cliente: "Cafetería El Roble", dis: "María González", estado: "en_progreso", precioCliente: 9000000, sobrecargo: 0, progreso: 32 },
  { id: "M002", titulo: "Identidad Corporativa", cliente: "Empresa BA SA", dis: "Juan Pérez", estado: "entregada", precioCliente: 22500000, sobrecargo: 7500000, progreso: 100 },
  { id: "M003", titulo: "Pack 10 piezas RRSS", cliente: "Tienda Online", dis: "Lucas Torres", estado: "aprobada", precioCliente: 520000, sobrecargo: 120000, progreso: 100 },
  { id: "M004", titulo: "Web Estándar", cliente: "Consultora BA", dis: "Juan Pérez", estado: "en_progreso", precioCliente: 2200000, sobrecargo: 0, progreso: 65 },
];

const segC = (s) => (s === "senior" ? C.or : s === "junior" ? C.ye : C.bl);
const segL = (s) => (s === "senior" ? "Senior" : s === "junior" ? "Junior" : "Estudiante");
const segI = (s) => (s === "senior" ? "⭐" : s === "junior" ? "🎨" : "👨‍🎓");

// High-fidelity custom SVG Vector Spline Line Chart
const SVGChart = () => (
  <div className="space-y-4 pt-4">
    <div className="flex justify-between items-center">
      <Label color={C.muted}>HISTORIAL DE INGRESOS MENSUALES (SPLITS FACTURADOS)</Label>
      <div className="flex gap-4 font-mono text-[9px] text-[#5A5F73]">
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" /> Facturación Bruta</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Liquidado Prof.</span>
      </div>
    </div>
    <div className="p-4 bg-black/40 rounded-xl border border-white/5 relative">
      <svg viewBox="0 0 500 200" className="w-full h-44 font-mono text-[8px] text-[#5A5F73]">
        {/* Horizontal grid lines */}
        <line x1="40" y1="20" x2="480" y2="20" stroke="rgba(255,255,255,0.03)" strokeDasharray="4 4" />
        <line x1="40" y1="60" x2="480" y2="60" stroke="rgba(255,255,255,0.03)" strokeDasharray="4 4" />
        <line x1="40" y1="100" x2="480" y2="100" stroke="rgba(255,255,255,0.03)" strokeDasharray="4 4" />
        <line x1="40" y1="140" x2="480" y2="140" stroke="rgba(255,255,255,0.03)" strokeDasharray="4 4" />
        <line x1="40" y1="170" x2="480" y2="170" stroke="rgba(255,255,255,0.08)" />
        
        {/* Glow under spline */}
        <defs>
          <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path d="M 40 170 L 40 120 L 120 140 L 200 80 L 280 110 L 360 50 L 440 30 L 480 30 L 480 170 Z" fill="url(#chartGlow)" />
        
        {/* Spline line */}
        <path d="M 40 120 L 120 140 L 200 80 L 280 110 L 360 50 L 440 30" fill="none" stroke="#FF6B00" strokeWidth="2.5" filter="drop-shadow(0 0 5px rgba(255,107,0,0.4))" />
        
        {/* Coordinate points */}
        <circle cx="40" cy="120" r="3.5" fill="#FF6B00" />
        <circle cx="120" cy="140" r="3.5" fill="#FF6B00" />
        <circle cx="200" cy="80" r="3.5" fill="#FF6B00" />
        <circle cx="280" cy="110" r="3.5" fill="#FF6B00" />
        <circle cx="360" cy="50" r="3.5" fill="#FF6B00" />
        <circle cx="440" cy="30" r="3.5" fill="#FF6B00" />
        
        {/* Metrics values on left */}
        <text x="35" y="123" textAnchor="end">5M</text>
        <text x="35" y="83" textAnchor="end">15M</text>
        <text x="35" y="33" textAnchor="end">25M</text>
        
        {/* Time weeks on bottom */}
        <text x="40" y="188" textAnchor="middle">Sem 1</text>
        <text x="120" y="188" textAnchor="middle">Sem 2</text>
        <text x="200" y="188" textAnchor="middle">Sem 3</text>
        <text x="280" y="188" textAnchor="middle">Sem 4</text>
        <text x="360" y="188" textAnchor="middle">Sem 5</text>
        <text x="440" y="188" textAnchor="middle">Sem 6</text>
      </svg>
    </div>
  </div>
);

// High-fidelity custom SVG Circular Progress Gauge
const SVGCircularGauge = ({ value, label, color }) => (
  <div className="flex flex-col items-center justify-center p-4">
    <svg viewBox="0 0 100 100" className="w-24 h-24">
      {/* Circular base track */}
      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="7" />
      {/* Active colored path */}
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeDasharray="251.2"
        strokeDashoffset={251.2 - (251.2 * value) / 100}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
        filter={`drop-shadow(0 0 5px ${color}44)`}
        style={{ transition: "stroke-dashoffset 0.8s ease-in-out" }}
      />
      {/* Text count inside */}
      <text x="50" y="55" textAnchor="middle" fill="#fff" className="font-mono font-bold text-lg">{value}%</text>
    </svg>
    <span className="text-[10px] text-slate-500 font-mono mt-3 uppercase tracking-widest text-center leading-normal font-bold">
      {label}
    </span>
  </div>
);

export default function AdminPage() {
  const [login, setLogin] = useState(false);
  const [pass, setPass] = useState("");
  const [passErr, setPassErr] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const [toast, setToast] = useState(null);
  const [toastColor, setToastColor] = useState(C.gr);
  const [disState, setDisState] = useState(DISEÑADORES_INIT);

  const totalIngresado = MISIONES_DEMO.filter((m) => m.estado === "aprobada").reduce(
    (a, m) => a + m.precioCliente,
    0
  );

  const handleLogin = () => {
    if (pass === "plotcenter2025") {
      setLogin(true);
      setToast("🔑 Acceso Administrador Autorizado");
      setToastColor(C.gr);
    } else {
      setPassErr(true);
      setToast("❌ Contraseña Incorrecta");
      setToastColor(C.re);
      setTimeout(() => setPassErr(false), 2000);
    }
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {toast && <Toast msg={toast} color={toastColor} onClose={() => setToast(null)} />}

      {/* LOGIN SCREEN GATING */}
      {!login ? (
        <div className="max-w-md mx-auto py-16 space-y-8">
          <div className="text-center space-y-4">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto relative"
              style={{
                background: `linear-gradient(135deg, ${C.or}, #FF3D00)`,
                boxShadow: `0 12px 40px ${C.or}40`,
              }}
            >
              <span style={{ color: "#000", fontWeight: 900, fontSize: 34, fontFamily: "serif" }}>φ</span>
              <span
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                style={{ background: C.card2, border: `1px solid ${C.border2}` }}
              >
                🛡️
              </span>
            </div>
            <div className="space-y-1.5">
              <h2 className="font-extrabold text-2xl text-white tracking-tight">Panel de Control General</h2>
              <p style={{ fontFamily: C.fm, fontSize: 10, color: C.muted, letterSpacing: 2 }}>
                // ACCESO RESTRINGIDO A DIRECTORES PLOT CENTER
              </p>
            </div>
          </div>

          <Card style={{ padding: 30, borderRadius: 16 }}>
            <Label color={C.re}>CREDENCIAL CORPORATIVA</Label>
            <div className="space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base pointer-events-none">🔑</span>
                <input
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  type="password"
                  placeholder="Contraseña de Administrador"
                  className="tech-input w-full focus:border-red-500"
                  style={{ borderColor: passErr ? C.re : C.border, paddingLeft: 42 }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLogin();
                  }}
                />
              </div>
              {passErr && (
                <div style={{ color: C.re, fontSize: 11, fontFamily: C.fm, fontWeight: 700 }}>
                  ⚠️ Contraseña incorrecta. Intente de nuevo.
                </div>
              )}
              <Btn full size="lg" onClick={handleLogin}>
                VERIFICAR Y ENTRAR →
              </Btn>
            </div>
            <div className="mt-6 flex items-center gap-2 justify-center text-slate-500 text-[10px] font-mono leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full active-pulse" style={{ background: C.gr }} />
              Clave de desarrollo: <code className="text-orange-500 font-bold">plotcenter2025</code>
            </div>
          </Card>

          <p className="text-center text-slate-600 text-[10px] font-mono leading-relaxed">
            🔒 Conexión cifrada de extremo a extremo · Plot Center SRL
          </p>
        </div>
      ) : (
        /* MAIN ADMIN DASHBOARD WORKSPACE */
        <div className="space-y-8">
          {/* Sub navigation buttons bar */}
          <div className="glass-panel p-1.5 rounded-lg flex gap-1 border border-white/5 bg-[#13141A]">
            {[
              ["dashboard", "📊 Métricas y Splits"],
              ["misiones", "⚡ Tabla de Misiones"],
              ["disenadores", "🎨 Auditoría Profes."],
              ["finanzas", "💰 Auditoría Finanzas"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`sidebar-btn ${tab === id ? "sidebar-btn-active" : ""}`}
                style={{ flex: 1, padding: "8px 0", justifyContent: "center" }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* TAB: SPLITS & KPIS */}
          {tab === "dashboard" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Margin splits breakdown */}
              <div className="lg:col-span-8 space-y-6">
                <Card accent={C.gr} style={{ padding: 28, borderRadius: 14 }}>
                  <Label color={C.gr}>REGLA DE CONVENIO 50/50 CONSOLIDADA (APROBADO)</Label>
                  <div
                    style={{
                      fontFamily: C.ff,
                      fontWeight: 950,
                      fontSize: 48,
                      color: C.gr,
                      lineHeight: 1,
                      marginBottom: 16,
                      textShadow: `0 0 20px ${C.gr}22`,
                    }}
                  >
                    {fmt(totalIngresado)}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-6">
                    <div className="p-5 bg-slate-950/40 rounded-xl border border-white/5 text-center">
                      <div style={{ fontFamily: C.fm, fontSize: 9, color: C.or, marginBottom: 6, fontWeight: 700 }}>
                        PLOT CENTER RETENCIÓN (50%)
                      </div>
                      <div style={{ fontFamily: C.ff, fontWeight: 900, color: C.or, fontSize: 24 }}>
                        {fmt(Math.round(totalIngresado * 0.5))}
                      </div>
                    </div>
                    <div className="p-5 bg-slate-950/40 rounded-xl border border-white/5 text-center">
                      <div style={{ fontFamily: C.fm, fontSize: 9, color: C.gr, marginBottom: 6, fontWeight: 700 }}>
                        PROFESIONALES LIQUIDADO (50%)
                      </div>
                      <div style={{ fontFamily: C.ff, fontWeight: 900, color: C.gr, fontSize: 24 }}>
                        {fmt(Math.round(totalIngresado * 0.5))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Custom Sparkline Spline Chart */}
                <Card style={{ padding: 28, borderRadius: 14 }}>
                  <SVGChart />
                </Card>
              </div>

              {/* Quantities summary cards */}
              <div className="lg:col-span-4 space-y-6">
                <div className="grid grid-cols-1 gap-5">
                  {[
                    { i: "⚡", v: MISIONES_DEMO.filter((m) => m.estado === "en_progreso").length, l: "MISIONES EN CURSO", c: C.or },
                    { i: "👥", v: disState.filter((d) => d.estado === "activo").length, l: "PROF. CONSOLIDADOS", c: C.bl },
                    { i: "⏳", v: disState.filter((d) => d.estado === "pendiente").length, l: "POSTULANTES PENDIENTES", c: C.ye },
                  ].map((s) => (
                    <Card key={s.l} style={{ padding: 24, borderRadius: 12 }}>
                      <div className="flex justify-between items-center">
                        <div>
                          <div style={{ fontFamily: C.fm, fontSize: 8, color: C.muted, fontWeight: 700, letterSpacing: 1.5 }}>{s.l}</div>
                          <div style={{ fontFamily: C.ff, fontWeight: 900, color: s.c, fontSize: 24, marginTop: 6 }}>
                            {s.v}
                          </div>
                        </div>
                        <span className="text-2xl">{s.i}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: TABULAR MISSIONS TABLE */}
          {tab === "misiones" && (
            <Card style={{ padding: 28, borderRadius: 14 }}>
              <Label color={C.or}>REGISTRO GENERAL DE MISIONES DE TRABAJO</Label>
              <div className="overflow-x-auto mt-4">
                <table className="tech-table">
                  <thead>
                    <tr>
                      <th>CÓDIGO</th>
                      <th>MISION</th>
                      <th>CLIENTE</th>
                      <th>PROFESIONAL</th>
                      <th>ESTADO</th>
                      <th className="text-right">VALOR CLIENTE</th>
                      <th className="text-right">NETO SPLIT (50%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MISIONES_DEMO.map((m) => {
                      const eColor =
                        m.estado === "en_progreso" ? C.or : m.estado === "entregada" ? C.pu : C.gr;
                      return (
                        <tr key={m.id}>
                          <td className="font-bold text-white">{m.id}</td>
                          <td className="font-sans font-bold text-white">{m.titulo}</td>
                          <td>{m.cliente}</td>
                          <td>{m.dis || "Buscando..."}</td>
                          <td>
                            <span style={{ color: eColor, fontWeight: "bold" }}>
                              ● {m.estado.toUpperCase().replace("_", " ")}
                            </span>
                          </td>
                          <td className="text-right font-bold" style={{ color: C.or }}>{fmt(m.precioCliente)}</td>
                          <td className="text-right font-bold text-emerald-500">{fmt(Math.round(m.precioCliente * 0.5))}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* TAB: DISEÑADORES REVIEW */}
          {tab === "disenadores" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-extrabold text-xl text-white">Validación de Postulaciones</h3>
                  <p className="text-slate-400 text-xs mt-1">Revisa el portfolio y aprueba perfiles para darles de alta en la plataforma.</p>
                </div>
                {disState.filter((d) => d.estado === "pendiente").length > 0 && (
                  <Badge color={C.ye}>
                    {disState.filter((d) => d.estado === "pendiente").length} PERFILES
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {disState.map((d) => (
                  <Card key={d.id} accent={d.estado === "pendiente" ? C.ye : C.bl} style={{ padding: 26, borderRadius: 12 }}>
                    <div className="flex gap-4 items-center mb-4">
                      <Avatar name={d.n} size={42} color={segC(d.tipo)} />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-white text-sm">{d.n}</h4>
                          <span
                            className="font-bold text-[9px] font-mono rounded px-2.5 py-1"
                            style={{
                              background: d.estado === "activo" ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.12)",
                              color: d.estado === "activo" ? C.gr : C.ye,
                            }}
                          >
                            {d.estado.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex gap-3 mt-2 flex-wrap items-center">
                          <Badge color={segC(d.tipo)}>
                            {segI(d.tipo)} {segL(d.tipo)}
                          </Badge>
                          <span className="font-mono text-xs text-amber-500 font-bold">★ {d.pts}</span>
                          <span className="text-slate-500 text-xs font-mono">{d.mis} misiones</span>
                        </div>
                      </div>
                    </div>

                    {d.estado === "pendiente" && (
                      <div className="flex gap-2.5 mt-6 border-t border-white/5 pt-4">
                        <Btn
                          sm
                          onClick={() => {
                            setDisState((prev) =>
                              prev.map((x) => (x.id === d.id ? { ...x, estado: "activo" } : x))
                            );
                            setToast("✅ Profesional aprobado correctamente. Habilitado en la red.");
                            setToastColor(C.gr);
                          }}
                        >
                          Aprobar Profesional
                        </Btn>
                        <button
                          onClick={() => {
                            setDisState((prev) => prev.filter((x) => x.id !== d.id));
                            setToast("❌ Postulación rechazada.");
                            setToastColor(C.re);
                          }}
                          className="bg-transparent border border-red-500 text-red-500 rounded px-4 py-2 hover:bg-red-500/10 font-bold text-xs"
                        >
                          Rechazar
                        </button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* TAB: FINANZAS REVIEW */}
          {tab === "finanzas" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Financial balances */}
              <div className="lg:col-span-8 space-y-6">
                <Card accent={C.gr} style={{ padding: 28, borderRadius: 14 }}>
                  <Label color={C.gr}>BALANCE FINANCIERO INTEGRAL (LIQUIDADO)</Label>
                  <div style={{ fontFamily: C.ff, fontWeight: 950, fontSize: 32, color: C.gr, marginBottom: 12 }}>
                    {fmt(totalIngresado)}
                  </div>
                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <Row l="Comisión de Captación Plot Center (50%)" v={fmt(Math.round(totalIngresado * 0.5))} vc={C.or} />
                    <Row l="Liquidaciones Netas Profesionales (50%)" v={fmt(Math.round(totalIngresado * 0.5))} vc={C.gr} />
                  </div>
                </Card>

                {/* Urgencies surcharge totals */}
                <Card style={{ background: "rgba(245, 158, 11, 0.02)", borderColor: "rgba(245, 158, 11, 0.15)", padding: 26, borderRadius: 12 }}>
                  <Label color={C.ye}>MONTO TOTAL FACTURADO POR COMISIÓN DE URGENCIA</Label>
                  {(() => {
                    const totalSob = MISIONES_DEMO.reduce((a, m) => a + (m.sobrecargo || 0), 0);
                    return (
                      <>
                        <Row l="Total Sobrecargos Urgentes" v={fmt(totalSob)} vc={C.ye} />
                        <Row l="50% Margen Plot Center" v={fmt(Math.round(totalSob * 0.5))} vc={C.or} />
                        <Row l="50% Honorario Profesional" v={fmt(Math.round(totalSob * 0.5))} vc={C.gr} />
                      </>
                    );
                  })()}
                </Card>
              </div>

              {/* ARCA billing connection log */}
              <div className="lg:col-span-4 space-y-6">
                <Card style={{ padding: 26, borderRadius: 12, border: `1px solid ${C.border}` }}>
                  <Label color={C.bl}>RENDIMIENTO Y ESTADÍSTICAS</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <SVGCircularGauge value={98} label="ARCA Uptime" color={C.bl} />
                    <SVGCircularGauge value={85} label="Conversión" color={C.gr} />
                  </div>
                </Card>

                <Card
                  onClick={() => setToast("🏦 Conexión ARCA Activa. Facturas automatizadas.")}
                  style={{ cursor: "pointer", padding: 26, borderRadius: 12 }}
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-xl rounded-lg">
                      🧾
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-xs leading-normal">Facturación ARCA (AFIP)</h4>
                      <span className="text-[10px] text-slate-500 font-mono mt-1 block">Conexión AFIP: ESTABLE</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed mt-4 font-mono">
                    Todos los Splits se facturan de forma inmediata emitiendo comprobante fiscal oficial de Plot Center SRL.
                  </p>
                </Card>
              </div>

            </div>
          )}

        </div>
      )}
    </div>
  );
}
