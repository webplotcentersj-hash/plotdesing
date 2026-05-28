"use client";

import { useState } from "react";
import Link from "next/link";
import {
  C,
  Card,
  Btn,
  Badge,
  Chip,
  Label,
  Row,
  Progress,
  Avatar,
  Toast,
  fmtK,
} from "@/components/Ui";

const SPECS = [
  "Branding",
  "Identidad",
  "Web/UI",
  "Redes Sociales",
  "Editorial",
  "Packaging",
  "Ilustración",
  "Marketing",
];

const TARIFAS = [
  { id: "id_corp", cat: "Identidad", n: "Identidad Corporativa", precio: 15000000, dias: 15, seg: "senior" },
  { id: "logo_man", cat: "Identidad", n: "Logo + Manual de Uso", precio: 9000000, dias: 10, seg: "junior" },
  { id: "logo", cat: "Identidad", n: "Logo / Isotipo", precio: 4500000, dias: 5, seg: "junior" },
  { id: "flyer1", cat: "Publicidad", n: "Flyer simple", precio: 150000, dias: 2, seg: "estudiante" },
  { id: "web_std", cat: "Web", n: "Web Estándar", precio: 2200000, dias: 12, seg: "senior" },
  { id: "app", cat: "Web", n: "App UX + UI", precio: 5500000, dias: 20, seg: "senior" },
  { id: "pack10", cat: "Redes", n: "Pack 10 piezas RRSS", precio: 400000, dias: 3, seg: "estudiante" },
];

const segC = (s) => (s === "senior" ? C.or : s === "junior" ? C.ye : C.bl);
const segL = (s) => (s === "senior" ? "Senior" : s === "junior" ? "Junior" : "Estudiante");
const segI = (s) => (s === "senior" ? "⭐" : s === "junior" ? "🎨" : "👨‍🎓");

const MISIONES_DEMO = [
  { id: "M001", titulo: "Logo + Manual de Uso", cliente: "Cafetería El Roble", dis: "María González", estado: "en_progreso", precioCliente: 9000000, sobrecargo: 0, progreso: 32 },
  { id: "M002", titulo: "Identidad Corporativa", cliente: "Empresa BA SA", dis: "Juan Pérez", estado: "entregada", precioCliente: 22500000, sobrecargo: 7500000, progreso: 100 },
  { id: "M003", titulo: "Pack 10 piezas RRSS", cliente: "Tienda Online", dis: "Lucas Torres", estado: "aprobada", precioCliente: 520000, sobrecargo: 120000, progreso: 100 },
  { id: "M004", titulo: "Web Estándar", cliente: "Consultora BA", dis: null, estado: "publicada", precioCliente: 2200000, sobrecargo: 0, progreso: 0 },
];

const PORTFOLIO_REAL = [
  { titulo: "Identidad Visual Corporativa", desc: "Manual de marca, papelería y folletos corporativos.", img: "/logo_brochure.png", tags: ["Branding", "Vector"] },
  { titulo: "App Dashboard E-Commerce", desc: "Pantalla principal UI/UX y flujos de compra interactivos.", img: "/app_ui.png", tags: ["Web/UI", "UX"] },
  { titulo: "Packaging Cosmética Premium", desc: "Caja con foil dorado y relieve en seco.", img: "/packaging.png", tags: ["Packaging", "Design"] },
  { titulo: "Landing Page SaaS", desc: "Sitio responsive de alto impacto para startup tecnológica.", img: "/web_design.png", tags: ["Web", "UI"] },
  { titulo: "Pack de Contenido RRSS", desc: "Sistema visual coherente para campaña en redes sociales.", img: "/rrss_pack.png", tags: ["Redes Sociales", "Marketing"] },
  { titulo: "Diseño Editorial Premium", desc: "Doble página de revista con grilla tipográfica avanzada.", img: "/editorial.png", tags: ["Editorial", "Print"] },
];

export default function ProfesionalPage() {
  const [view, setView] = useState("splash");
  const [tipo, setTipo] = useState("");
  const [regStep, setRegStep] = useState(0);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    especialidades: [],
    portfolio: [],
  });
  const [navTab, setNavTab] = useState("misiones");
  const [toast, setToast] = useState(null);

  const SPLIT = 0.5;

  // Available missions
  const misDisponibles = [
    { tarifa: TARIFAS[4], precioCliente: 2200000, plazo: "12 días" },
    { tarifa: TARIFAS[0], precioCliente: 15000000, plazo: "15 días" },
    { tarifa: TARIFAS[6], precioCliente: 400000, plazo: "3 días" },
  ];

  return (
    <div className="space-y-8 animate-slide-up">
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}

      {/* SPLASH REGISTER CHOICES */}
      {view === "splash" && (
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="text-7xl">🎨</div>
            <h2 className="font-extrabold text-3xl text-white tracking-tight">Red de Profesionales Creativos</h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xl mx-auto">
              Trabajá en misiones corporativas de primer nivel, administrá tus entregas de forma ágil y cobrá tu 50% neto de forma garantizada y de depósito en garantía.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t: "Diseño Gráfico", s: "Desarrollo de identidad de marca, UI/UX, editorial y packaging premium.", i: "🎨", c: C.or, v: "disenador" },
              { t: "Content Management", s: "Estrategias de contenido orgánico, calendarios mensuales y piezas RRSS.", i: "📱", c: C.bl, v: "community", new: true },
              { t: "Lic. en Marketing", s: "Planificación estratégica de campañas, embudos y posicionamiento.", i: "📊", c: C.pu, v: "marketing", new: true },
            ].map((o) => (
              <div
                key={o.v}
                onClick={() => {
                  setTipo(o.v);
                  setView("register");
                  setRegStep(0);
                }}
                className="tech-card p-8 rounded-xl flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-2"
                style={{
                  border: `1px solid ${C.border}`,
                  minHeight: 240,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = o.c;
                  e.currentTarget.style.background = C.bg_panel_hover;
                  e.currentTarget.style.boxShadow = `0 12px 30px ${o.c}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.background = C.card;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-4xl">{o.i}</span>
                    {o.new && <Badge color={C.gr}>NUEVO INGRESO</Badge>}
                  </div>
                  <h3 className="font-extrabold text-white text-base mb-3 leading-snug">{o.t}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{o.s}</p>
                </div>
                <div className="text-right mt-6 font-mono text-xs font-bold" style={{ color: o.c }}>
                  COMENZAR POSTULACIÓN ›
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-xs mx-auto pt-4">
            <Btn outline full onClick={() => setView("dashboard")}>
              Acceder con mi perfil verificado
            </Btn>
          </div>
        </div>
      )}

      {/* REGISTER WIZARD VIEW */}
      {view === "register" && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex justify-between items-center mb-4">
            <Chip text={tipo.toUpperCase()} color={tipo === "disenador" ? C.or : tipo === "community" ? C.bl : C.pu} />
            <button
              onClick={() => {
                if (regStep === 0) setView("splash");
                else setRegStep((r) => r - 1);
              }}
              style={{ background: "none", border: "none", color: C.mid, cursor: "pointer", fontFamily: C.fm, fontSize: 11, fontWeight: 700 }}
            >
              ← Volver
            </button>
          </div>

          {/* Stepper tracks */}
          <div className="flex gap-4 mb-6">
            {["DATOS PERSONALES", "CONOCIMIENTOS", "CARGA PORTFOLIO"].map((l, i) => (
              <div key={l} className="flex-1">
                <div
                  style={{
                    height: 4,
                    background: i <= regStep ? C.bl : "#1E202B",
                    boxShadow: i <= regStep ? `0 0 10px ${C.bl}` : "none",
                    borderRadius: 2,
                    marginBottom: 6,
                  }}
                />
                <span style={{ fontSize: 9, fontFamily: C.fm, color: i <= regStep ? "#fff" : C.muted, fontWeight: 700 }}>
                  {l}
                </span>
              </div>
            ))}
          </div>

          {/* STEP 0: DATOS */}
          {regStep === 0 && (
            <Card style={{ padding: 28, borderRadius: 14 }}>
              <Label color={C.bl}>1. INFORMACIÓN OPERATIVA DE ACCESO</Label>
              <div className="space-y-5">
                {[
                  ["NOMBRE COMPLETO *", "nombre", "Ej: María Victoria González"],
                  ["EMAIL OPERATIVO Y LABORAL *", "email", "maria@plotcenter.com"],
                  ["CONTRASEÑA OPERATIVA *", "password", "••••••••", "password"],
                ].map(([l, k, p, t]) => (
                  <div key={k}>
                    <div style={{ fontFamily: C.fm, fontSize: 8, color: C.mid, letterSpacing: 2, marginBottom: 8, fontWeight: 700 }}>
                      {l}
                    </div>
                    <input
                      value={form[k]}
                      onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}
                      placeholder={p}
                      type={t || "text"}
                      className="tech-input w-full"
                    />
                  </div>
                ))}
                <div className="pt-4 text-right">
                  <Btn
                    disabled={!form.nombre || !form.email || !form.password}
                    onClick={() => setRegStep(1)}
                  >
                    Continuar a Especialidades →
                  </Btn>
                </div>
              </div>
            </Card>
          )}

          {/* STEP 1: PERFIL */}
          {regStep === 1 && (
            <Card style={{ padding: 28, borderRadius: 14 }}>
              <Label color={C.bl}>2. ESPECIALIDADES PROFESIONALES (MÍN. 1)</Label>
              <p className="text-slate-400 text-xs mb-6 leading-relaxed">
                Seleccioná las competencias clave donde tengas mayor experiencia para filtrar las misiones del catálogo:
              </p>
              <div className="flex flex-wrap gap-3">
                {SPECS.map((s) => {
                  const isSel = form.especialidades.includes(s);
                  return (
                    <button
                      key={s}
                      onClick={() =>
                        setForm((f) => ({
                          ...f,
                          especialidades: isSel
                            ? f.especialidades.filter((x) => x !== s)
                            : [...f.especialidades, s],
                        }))
                      }
                      style={{
                        background: isSel ? "rgba(59, 130, 246, 0.1)" : "rgba(255,255,255,0.02)",
                        color: isSel ? C.bl : C.mid,
                        border: `1px solid ${isSel ? C.bl : C.border}`,
                        borderRadius: 8,
                        padding: "8px 16px",
                        fontSize: 12,
                        cursor: "pointer",
                        fontFamily: C.ff,
                        fontWeight: 800,
                        transition: "all 0.2s",
                      }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 flex justify-between">
                <Btn outline onClick={() => setRegStep(0)}>
                  Atrás
                </Btn>
                <Btn
                  disabled={form.especialidades.length === 0}
                  onClick={() => setRegStep(2)}
                >
                  Continuar a Portfolio →
                </Btn>
              </div>
            </Card>
          )}

          {/* STEP 2: PORTFOLIO */}
          {regStep === 2 && (
            <Card style={{ padding: 28, borderRadius: 14 }}>
              <Label color={C.bl}>3. CARGA Y REVISIÓN DE PORTFOLIO (MÍN. 3)</Label>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Upload Check bar */}
                <div className="md:col-span-4 space-y-4">
                  <div className="p-5 bg-slate-950/40 border border-white/5 rounded-xl">
                    <div className="flex justify-between items-center mb-3">
                      <span style={{ fontSize: 11, color: C.mid, fontFamily: C.fm }}>Trabajos cargados</span>
                      <span className="font-bold text-xs" style={{ color: C.bl }}>
                        {form.portfolio.length} de 3
                      </span>
                    </div>
                    <Progress v={(form.portfolio.length / 3) * 100} color={C.bl} />
                  </div>
                  <p className="text-slate-500 text-[10px] leading-relaxed font-mono">
                    ⚠️ Plot Center realiza una validación exhaustiva e individual de tu portfolio antes de darte de alta de forma activa en el catálogo de ofertas.
                  </p>
                </div>

                {/* Portfolio inputs fields */}
                <div className="md:col-span-8 space-y-4">
                  {form.portfolio.map((p, i) => (
                    <div key={i} className="p-4 border border-white/5 rounded-xl space-y-3 relative bg-slate-950/20">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs" style={{ color: C.bl, fontFamily: C.fm }}>
                          MUESTRA #{i + 1}
                        </span>
                        <button
                          onClick={() =>
                            setForm((f) => ({
                              ...f,
                              portfolio: f.portfolio.filter((_, j) => j !== i),
                            }))
                          }
                          className="text-red-500 hover:text-red-400 font-bold bg-transparent border-none cursor-pointer text-xs"
                        >
                          ✕ Quitar
                        </button>
                      </div>
                      <input
                        placeholder="Título o enlace del proyecto corporativo destacado"
                        value={p.titulo}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            portfolio: f.portfolio.map((x, j) => (j === i ? { ...x, titulo: e.target.value } : x)),
                          }))
                        }
                        className="tech-input w-full"
                        style={{ padding: "8px 12px", fontSize: 12 }}
                      />
                    </div>
                  ))}

                  <button
                    onClick={() => setForm((f) => ({ ...f, portfolio: [...f.portfolio, { titulo: "" }] }))}
                    className="w-full py-3 bg-[#040508] border border-dashed border-[#222530] rounded-xl text-slate-400 hover:border-slate-500 transition-all font-bold text-xs"
                  >
                    + Agregar Enlace/Trabajo
                  </button>

                  <div className="pt-6 flex justify-between">
                    <Btn outline onClick={() => setRegStep(1)}>
                      Atrás
                    </Btn>
                    <Btn
                      disabled={form.portfolio.length < 3 || form.portfolio.some((p) => !p.titulo)}
                      onClick={() => {
                        setView("dashboard");
                        setToast("🚀 Perfil enviado para auditoría manual de Plot φ.");
                      }}
                    >
                      SOLICITAR ALTA DE PERFIL
                    </Btn>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* DASHBOARD WORKSPACE VIEW */}
      {view === "dashboard" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SECTION: Credentials and Nav tabs */}
          <div className="lg:col-span-4 space-y-6">
            <Card accent={C.bl} style={{ padding: 26, borderRadius: 12 }}>
              <div className="flex gap-4 items-center mb-6">
                <Avatar name={form.nombre || "María González"} size={52} color={C.bl} />
                <div className="space-y-1">
                  <h3 className="font-extrabold text-white text-base leading-snug">
                    {form.nombre || "María González"}
                  </h3>
                  <div className="flex gap-2">
                    <Badge color={C.bl}>{tipo.toUpperCase() || "DISEÑADOR"}</Badge>
                    <Badge color={C.gr}>VERIFICADO</Badge>
                  </div>
                </div>
              </div>

              {/* Stats blocks */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  ["18", "MISIONES"],
                  ["4.9", "PUNTAJE"],
                  ["$3.4M", "GANADO"],
                ].map(([v, l]) => (
                  <div key={l} className="p-3.5 rounded-lg border border-white/5 bg-black/40 text-center">
                    <div style={{ fontFamily: C.ff, fontWeight: 900, color: C.bl, fontSize: 14 }}>
                      {v}
                    </div>
                    <div style={{ fontFamily: C.fm, fontSize: 8, color: C.muted, marginTop: 2, fontWeight: 700 }}>{l}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Tab navigation */}
            <div className="tech-card rounded-xl p-2 border border-[#222530] bg-[#13141A]">
              {[
                ["misiones", "🎯 Ofertas de Misiones"],
                ["activas", "⚡ Misiones Activas"],
                ["portfolio", "🖼️ Mi Portfolio Real"],
                ["contrato", "📜 Contrato 50/50"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setNavTab(id)}
                  className={`sidebar-btn ${navTab === id ? "sidebar-btn-active" : ""}`}
                  style={{ width: "100%" }}
                >
                  {label}
                </button>
              ))}
            </div>

            <Card style={{ background: "rgba(16, 185, 129, 0.02)", borderColor: "rgba(16, 185, 129, 0.15)" }}>
              <Label color={C.gr}>GARANTÍA DE LIQUIDACIÓN SEGURA</Label>
              <p className="text-slate-400 text-xs leading-relaxed">
                Tus retribuciones por misiones terminadas se envían a tu cuenta bancaria asociada todos los días viernes bajo fiscalización tributaria de ARCA.
              </p>
            </Card>
          </div>

          {/* RIGHT SECTION: Content slot */}
          <div className="lg:col-span-8 space-y-6">
            {/* TAB: DISPONIBLES */}
            {navTab === "misiones" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-extrabold text-xl text-white tracking-tight">Catálogo de Misiones</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Solo visualizás ofertas que encajan perfectamente con tu segmento verificado ({tipo || "diseñador"}).
                  </p>
                </div>

                <div className="p-4 bg-red-500/5 border border-red-500/10 text-red-500 font-mono text-[11px] rounded leading-relaxed">
                  ⚠️ **Confidencialidad Operativa**: Se prohíbe terminantemente divulgar las liquidaciones del catálogo. Las cifras mostradas aquí corresponden al **50% de cobro neto** estipulado por contrato.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {misDisponibles.map((m, i) => (
                    <Card key={i} style={{ padding: 26, borderRadius: 12 }}>
                      <div className="flex justify-between items-center mb-4">
                        <Badge color={segC(m.tarifa.seg)}>
                          {segI(m.tarifa.seg)} {segL(m.tarifa.seg)}
                        </Badge>
                        <span className="font-mono text-xs text-slate-500">{m.plazo} de plazo</span>
                      </div>
                      <h4 className="font-extrabold text-white text-base mb-4">{m.tarifa.n}</h4>
                      <div className="flex justify-between items-center bg-[#040508] p-3.5 rounded-lg border border-white/5 mb-4">
                        <span className="text-[10px] text-slate-400 font-mono">PAGO VOS COBRÁS</span>
                        <span className="font-extrabold text-emerald-500 text-lg">{fmtK(Math.round(m.precioCliente * SPLIT))}</span>
                      </div>
                      <Btn
                        full
                        onClick={() => {
                          setToast(`✅ Misión cargada con éxito a tus trabajos activos.`);
                        }}
                      >
                        Aceptar Misión
                      </Btn>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: MIS MISIONES ACTIVAS */}
            {navTab === "activas" && (
              <div className="space-y-6">
                <h3 className="font-extrabold text-xl text-white tracking-tight">Tus Misiones en Curso</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {MISIONES_DEMO.filter((m) => m.dis).map((m) => {
                    const eColor =
                      m.estado === "en_progreso" ? C.or : m.estado === "entregada" ? C.pu : C.gr;
                    return (
                      <Card key={m.id} accent={eColor} style={{ padding: 26, borderRadius: 12 }}>
                        <div className="flex justify-between items-center mb-3">
                          <Badge color={eColor}>
                            {m.estado === "en_progreso" ? "⚡ En progreso" : m.estado === "entregada" ? "📦 Entregado" : "✅ Aprobada"}
                          </Badge>
                          {m.sobrecargo > 0 && <Badge color={C.ye}>⚡ URGENTE</Badge>}
                        </div>
                        <h4 className="font-extrabold text-white text-sm mb-2">{m.titulo}</h4>
                        <div className="text-slate-400 text-xs mb-4">Cliente: {m.cliente}</div>
                        <div className="space-y-2">
                          <Progress v={m.progreso} color={eColor} />
                        </div>
                        <div className="flex justify-between items-center mt-4 border-t border-white/5 pt-3">
                          <span className="text-[10px] text-slate-500 font-mono">HONORARIO PROFESIONAL (50%)</span>
                          <span className="font-extrabold text-emerald-500 text-base">
                            {fmtK(Math.round(m.precioCliente * SPLIT))}
                          </span>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: PORTFOLIO REAL (GALLERY OF REAL HIGH-END Generated IMAGES) */}
            {navTab === "portfolio" && (
              <div className="space-y-6 animate-slide-up">
                <div>
                  <h3 className="font-extrabold text-xl text-white tracking-tight">Tu Portafolio de Trabajos</h3>
                  <p className="text-slate-400 text-xs mt-1">Muestras reales validadas para la auditoría de Plot Center.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PORTFOLIO_REAL.map((p, i) => (
                    <div
                      key={i}
                      className="portfolio-card tech-card rounded-2xl overflow-hidden flex flex-col cursor-pointer"
                      style={{ border: `1px solid ${C.border}`, background: C.card }}
                    >
                      <div className="relative w-full bg-[#040508] overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
                        <img
                          src={p.img}
                          alt={p.titulo}
                          loading="lazy"
                          className="portfolio-img w-full h-full object-cover"
                        />
                        {/* Top gradient + primary tag overlay */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{ background: "linear-gradient(180deg, rgba(3,4,6,0.55) 0%, transparent 35%, transparent 70%, rgba(3,4,6,0.85) 100%)" }}
                        />
                        <div className="absolute top-3 left-3">
                          <Chip text={p.tags[0]} />
                        </div>
                        <div className="portfolio-cta absolute bottom-3 right-3 flex items-center gap-1.5 font-mono text-[10px] font-bold" style={{ color: C.or }}>
                          VER PROYECTO
                          <span style={{ fontSize: 13 }}>›</span>
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1.5">
                          <h4 className="font-extrabold text-white text-sm leading-snug">{p.titulo}</h4>
                          <p className="text-[11px] text-slate-400 leading-normal">{p.desc}</p>
                        </div>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              style={{
                                background: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.05)",
                                color: C.mid,
                                padding: "3px 8px",
                                borderRadius: 5,
                                fontSize: 9,
                                fontFamily: C.fm,
                                fontWeight: 700,
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: CONTRATO */}
            {navTab === "contrato" && (
              <div className="space-y-6">
                <h3 className="font-extrabold text-xl text-white tracking-tight">Contrato Marco de Mediación</h3>
                <Card style={{ padding: 28, borderRadius: 14 }}>
                  <Label>// RELACIÓN COMERCIAL Y GESTIÓN CORPORATIVA</Label>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Plot Center SRL ejerce de mediador corporativo de primer nivel, proveyendo la estructura del software interactivo y garantizando legalmente la fianza del depósito en garantía corporativa.
                  </p>
                  <div className="p-4 bg-slate-950/40 rounded-lg border border-white/5 mt-5 space-y-2.5 text-xs font-mono">
                    <Row l="Margen Operativo y Software Plot φ" v="50%" vc={C.or} />
                    <Row l="Comisión Neta Garantizada Talento" v="50%" vc={C.gr} />
                  </div>
                  <p className="text-slate-500 text-[10px] mt-4 font-mono leading-relaxed">
                    * Los sobrecargos y comisiones complementarias por entregas de urgencia anticipada también respetan exactamente la misma proporción del 50/50 de base.
                  </p>
                </Card>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
