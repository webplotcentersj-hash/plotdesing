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

const TARIFAS = [
  { id: "id_corp", cat: "Identidad", n: "Identidad Corporativa", precio: 15000000, dias: 15, seg: "senior" },
  { id: "logo_man", cat: "Identidad", n: "Logo + Manual de Uso", precio: 9000000, dias: 10, seg: "junior" },
  { id: "logo", cat: "Identidad", n: "Logo / Isotipo", precio: 4500000, dias: 5, seg: "junior" },
  { id: "flyer1", cat: "Publicidad", n: "Flyer simple", precio: 150000, dias: 2, seg: "estudiante" },
  { id: "web_std", cat: "Web", n: "Web Estándar", precio: 2200000, dias: 12, seg: "senior" },
  { id: "app", cat: "Web", n: "App UX + UI", precio: 5500000, dias: 20, seg: "senior" },
  { id: "pack10", cat: "Redes", n: "Pack 10 piezas RRSS", precio: 400000, dias: 3, seg: "estudiante" },
  { id: "gest_int", cat: "Redes", n: "Gestión RRSS Intensiva", precio: 750000, dias: 30, seg: "junior" },
  { id: "rapida", cat: "⚡ Rápida", n: "Modificación rápida", precio: 80000, dias: 1, seg: "estudiante" },
];

const DISEÑADORES = [
  { id: 1, n: "Juan Pérez", tipo: "senior", pts: 4.9, mis: 42, disp: true },
  { id: 2, n: "María González", tipo: "junior", pts: 4.7, mis: 18, disp: true },
  { id: 3, n: "Lucas Torres", tipo: "junior", pts: 4.4, mis: 9, disp: true },
  { id: 4, n: "Ana Ruiz", tipo: "estudiante", pts: 4.2, mis: 3, disp: true },
  { id: 5, n: "Carlos Ibáñez", tipo: "senior", pts: 4.8, mis: 31, disp: false },
];

const segC = (s) => (s === "senior" ? C.or : s === "junior" ? C.ye : C.bl);
const segL = (s) => (s === "senior" ? "Senior" : s === "junior" ? "Junior" : "Estudiante");
const segI = (s) => (s === "senior" ? "⭐" : s === "junior" ? "🎨" : "👨‍🎓");

export default function ClientePage() {
  const [step, setStep] = useState(0);
  const [tarifa, setTarifa] = useState(null);
  const [dias, setDias] = useState(0);
  const [brief, setBrief] = useState({ empresa: "", desc: "" });
  const [modo, setModo] = useState("todos");
  const [disSel, setDisSel] = useState(null);
  const [pago, setPago] = useState("");
  const [paying, setPaying] = useState(false);
  const [done, setDone] = useState(false);
  const [toast, setToast] = useState(null);
  const [catF, setCatF] = useState("");

  const cats = [...new Set(TARIFAS.map((t) => t.cat))];
  const MULT = 1.5;
  const SPLIT = 0.5;

  const calc =
    tarifa && dias > 0
      ? (() => {
          const diasAcortados = tarifa.dias - dias;
          if (diasAcortados <= 0) return { sobrecargo: 0, total: tarifa.precio, urgente: false };
          const pDia = tarifa.precio / tarifa.dias;
          const sob = Math.round(diasAcortados * pDia * MULT);
          return { sobrecargo: sob, total: tarifa.precio + sob, urgente: true };
        })()
      : null;

  const reset = () => {
    setStep(0);
    setTarifa(null);
    setDias(0);
    setBrief({ empresa: "", desc: "" });
    setModo("todos");
    setDisSel(null);
    setPago("");
    setDone(false);
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}

      {/* Done State */}
      {done ? (
        <div className="max-w-3xl mx-auto text-center space-y-8 py-10">
          <div className="text-7xl animate-bounce">🚀</div>
          <div className="space-y-2">
            <h2 className="font-extrabold text-3xl text-white tracking-tight">¡Misión Publicada Exitosamente!</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
              El requerimiento fue auditado y publicado en la base de datos segura de Plot φ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <Card accent={C.or} style={{ padding: 28, borderRadius: 14 }}>
              <Label>// DETALLE DE PUBLICACIÓN</Label>
              <Row l="Servicio" v={tarifa?.n} />
              <Row l="Proyecto" v={brief.empresa} />
              <Row l="Plazo Solicitado" v={`${dias} días hábiles`} />
              {calc?.sobrecargo > 0 && <Row l="Costo Urgencia (1.5x)" v={fmt(calc.sobrecargo)} vc={C.ye} />}
              <Row l="Monto Total Pagado" v={fmt(calc?.total || tarifa?.precio)} vc={C.or} />
            </Card>

            <Card style={{ background: "rgba(16, 185, 129, 0.02)", borderColor: "rgba(16, 185, 129, 0.2)", padding: 28, borderRadius: 14 }}>
              <Label color={C.gr}>// VISTA EN CAPSULA PROFESIONAL</Label>
              <Row l="Servicio Asignado" v={tarifa?.n} />
              <Row l="Plazo Máximo" v={`${dias} días hábiles`} />
              <Row l="Ganancia Neto (50%)" v={fmtK(Math.round((calc?.total || tarifa?.precio) * SPLIT))} vc={C.gr} />
              <div className="text-[10px] text-slate-500 font-mono mt-5 leading-relaxed">
                🔒 El profesional recibe sus honorarios netos de forma directa sin visibilidad de las comisiones de plataforma ni facturación total corporativa.
              </div>
            </Card>
          </div>

          <div className="pt-6 max-w-xs mx-auto">
            <Btn full size="lg" onClick={reset}>
              + Crear Nueva Misión
            </Btn>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Setup details */}
          <div className="lg:col-span-8 space-y-6">
            <Card style={{ padding: 28, borderRadius: 14 }}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <Label color={C.or}>1. CONFIGURACIÓN DEL PROYECTO</Label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {cats.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCatF(catF === cat ? "" : cat)}
                      style={{
                        background: catF === cat ? C.or : "rgba(255,255,255,0.02)",
                        color: catF === cat ? "#000" : C.mid,
                        border: `1px solid ${catF === cat ? C.or : C.border}`,
                        borderRadius: 8,
                        padding: "6px 14px",
                        fontSize: 11,
                        cursor: "pointer",
                        fontFamily: C.ff,
                        fontWeight: 800,
                        transition: "all 0.2s",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid listings of services */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[440px] overflow-y-auto pr-2">
                {TARIFAS.filter((t) => !catF || t.cat === catF).map((t) => {
                  const isSel = tarifa?.id === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => {
                        setTarifa(t);
                        setDias(t.dias);
                      }}
                      className="tech-card p-5 rounded-xl cursor-pointer flex justify-between items-center transition-all duration-200"
                      style={{
                        background: isSel ? "rgba(255, 107, 0, 0.04)" : "rgba(255,255,255,0.01)",
                        borderColor: isSel ? C.or : C.border,
                      }}
                    >
                      <div>
                        <div style={{ fontFamily: C.ff, fontWeight: 800, color: "#fff", fontSize: 14 }}>
                          {t.n}
                        </div>
                        <div className="flex gap-4 mt-4">
                          <Badge color={segC(t.seg)}>
                            {segI(t.seg)} {segL(t.seg)}
                          </Badge>
                          <span style={{ fontSize: 11, color: C.mid, alignSelf: "center", fontFamily: C.fm }}>
                            {t.dias}d estándar
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div style={{ fontFamily: C.ff, fontWeight: 900, color: C.or, fontSize: 15 }}>
                          {fmtK(t.precio)}
                        </div>
                        <div style={{ fontFamily: C.fm, fontSize: 8, color: C.muted }}>base</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card style={{ padding: 28, borderRadius: 14 }}>
              <Label color={C.or}>2. IDENTIFICACIÓN Y BRIEF TÉCNICO</Label>
              <div className="space-y-5">
                <div>
                  <div style={{ fontFamily: C.fm, fontSize: 9, color: C.mid, letterSpacing: 2, marginBottom: 8, fontWeight: 700 }}>
                    EMPRESA O MARCA CORPORATIVA *
                  </div>
                  <input
                    value={brief.empresa}
                    onChange={(e) => setBrief((b) => ({ ...b, empresa: e.target.value }))}
                    placeholder="Ej: Constructora Andina S.A."
                    className="tech-input w-full"
                  />
                </div>
                <div>
                  <div style={{ fontFamily: C.fm, fontSize: 9, color: C.mid, letterSpacing: 2, marginBottom: 8, fontWeight: 700 }}>
                    DESCRIPCIÓN OPERATIVA DEL REQUERIMIENTO *
                  </div>
                  <textarea
                    value={brief.desc}
                    onChange={(e) => setBrief((b) => ({ ...b, desc: e.target.value }))}
                    placeholder="Describe los entregables esperados, formatos, paleta de colores, referencias estéticas, etc."
                    rows={4}
                    className="tech-input w-full"
                    style={{ resize: "none", lineHeight: 1.6 }}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN: Real-time preview sidebar widget */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-[100px]">
            {/* Step Indicators */}
            <div className="tech-card p-5 rounded-xl flex justify-between gap-1 items-center">
              {["CONFIGURAR", "PLANIFICAR", "COMPRAR"].map((l, i) => (
                <div key={l} className="text-center flex-1">
                  <div
                    style={{
                      height: 3,
                      background: step >= i ? C.or : "#1E202B",
                      boxShadow: step >= i ? `0 0 10px ${C.or}` : "none",
                      borderRadius: 1,
                      marginBottom: 6,
                    }}
                  />
                  <span style={{ fontSize: 9, fontFamily: C.fm, color: step >= i ? "#fff" : C.muted, fontWeight: 700 }}>
                    {l}
                  </span>
                </div>
              ))}
            </div>

            {/* Main Interactive Budget Calculator */}
            {tarifa ? (
              <>
                {step === 0 && (
                  <Card accent={C.or} style={{ padding: 26, borderRadius: 12 }}>
                    <Label>// MONTO PRESELECCIONADO</Label>
                    <Row l="Servicio Base" v={tarifa.n} />
                    <Row l="Precio Base" v={fmt(tarifa.precio)} vc={C.or} />
                    <Row l="Plazo Estándar" v={`${tarifa.dias} días hábiles`} />
                    <div className="mt-6">
                      <Btn
                        full
                        size="lg"
                        disabled={!brief.empresa || !brief.desc}
                        onClick={() => setStep(1)}
                      >
                        DEFINIR PLAZO ENTREGA →
                      </Btn>
                    </div>
                  </Card>
                )}

                {step === 1 && (
                  <Card accent={C.or} style={{ padding: 26, borderRadius: 12 }}>
                    <Label>// PLANIFICACIÓN DE ENTREGA</Label>
                    <div className="flex gap-4 justify-between items-center mb-6">
                      <button
                        onClick={() => setDias((d) => Math.max(1, d - 1))}
                        className="w-11 h-11 rounded-lg border border-white/5 bg-black/40 text-white hover:border-orange-500 font-bold transition-all text-lg"
                      >
                        −
                      </button>
                      <div className="text-center flex-1">
                        <div
                          style={{
                            fontFamily: C.ff,
                            fontWeight: 900,
                            fontSize: 48,
                            color: calc?.urgente ? C.ye : C.gr,
                            lineHeight: 1,
                            textShadow: calc?.urgente ? `0 0 16px ${C.ye}33` : `0 0 16px ${C.gr}33`,
                          }}
                        >
                          {dias}
                        </div>
                        <span style={{ fontSize: 10, fontFamily: C.fm, color: C.mid, fontWeight: 700 }}>días hábiles</span>
                      </div>
                      <button
                        onClick={() => setDias((d) => Math.min(tarifa.dias * 2, d + 1))}
                        className="w-11 h-11 rounded-lg border border-white/5 bg-black/40 text-white hover:border-orange-500 font-bold transition-all text-lg"
                      >
                        +
                      </button>
                    </div>

                    {/* Cost alerts */}
                    {calc?.urgente ? (
                      <div className="p-3 bg-amber-500/5 border border-amber-500/10 text-amber-500 font-mono text-[11px] rounded mb-4 leading-normal">
                        ⚡ Urgencia: Redujiste {tarifa.dias - dias}d. Se aplica sobrecargo 1.5x por día acortado.
                      </div>
                    ) : (
                      <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 text-emerald-500 font-mono text-[11px] rounded mb-4 leading-normal">
                        ✅ Entrega estándar: Plazo normal sin recargos.
                      </div>
                    )}

                    <div className="border-t border-white/5 pt-4 mt-4 space-y-2 font-mono">
                      <Row l="Precio Base" v={fmt(tarifa.precio)} />
                      {calc?.sobrecargo > 0 && <Row l="Costo Urgencia" v={fmt(calc.sobrecargo)} vc={C.ye} />}
                      <Row l="Total Presupuesto" v={fmt(calc?.total || tarifa.precio)} vc={C.or} />
                    </div>

                    <div className="mt-6 flex gap-3">
                      <Btn outline onClick={() => setStep(0)} sm>
                        Atrás
                      </Btn>
                      <Btn full onClick={() => setStep(2)}>
                        ASIGNACIÓN Y PAGO →
                      </Btn>
                    </div>
                  </Card>
                )}

                {step === 2 && (
                  <Card accent={C.or} style={{ padding: 26, borderRadius: 12 }}>
                    <Label>// ASIGNACIÓN Y FACTURACIÓN</Label>

                    {/* Routing choices */}
                    <div className="space-y-2.5 mb-4">
                      {[
                        { v: "todos", t: "📢 Envío Abierto (Misiones Libres)" },
                        { v: "directo", t: "👤 Asignación Directa" },
                      ].map((item) => (
                        <div
                          key={item.v}
                          onClick={() => {
                            setModo(item.v);
                            setDisSel(null);
                          }}
                          className="p-3 rounded-lg border border-white/5 cursor-pointer font-semibold text-xs flex justify-between items-center transition-all"
                          style={{
                            background: modo === item.v ? "rgba(255, 107, 0, 0.05)" : "transparent",
                            borderColor: modo === item.v ? C.or : "rgba(255,255,255,0.05)",
                            color: modo === item.v ? C.or : C.mid,
                          }}
                        >
                          <span>{item.t}</span>
                          {modo === item.v && <span className="font-bold">✓</span>}
                        </div>
                      ))}
                    </div>

                    {/* Direct designer dropdown */}
                    {modo === "directo" && (
                      <div className="space-y-2 max-h-[140px] overflow-y-auto mb-4 pr-1">
                        {DISEÑADORES.map((d) => (
                          <div
                            key={d.id}
                            onClick={() => d.disp && setDisSel(d)}
                            className="p-2.5 rounded-lg border border-white/5 flex gap-3 items-center cursor-pointer transition-all text-xs"
                            style={{
                              background: disSel?.id === d.id ? "rgba(59, 130, 246, 0.05)" : "transparent",
                              borderColor: disSel?.id === d.id ? C.bl : "rgba(255,255,255,0.05)",
                              opacity: d.disp ? 1 : 0.4,
                            }}
                          >
                            <Avatar name={d.n} size={28} color={segC(d.tipo)} />
                            <div className="flex-1 font-bold">{d.n}</div>
                            {disSel?.id === d.id && <span style={{ color: C.bl, fontWeight: "bold" }}>✓</span>}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Payment choices */}
                    <div className="space-y-2.5 border-t border-white/5 pt-4">
                      <div style={{ fontFamily: C.fm, fontSize: 8, color: C.muted, letterSpacing: 1 }}>
                        MÉTODO DE PAGO
                      </div>
                      {["Tarjeta de Crédito / Débito", "Transferencia bancaria / CVU"].map((item) => (
                        <div
                          key={item}
                          onClick={() => setPago(item)}
                          className="p-3 rounded-lg border border-white/5 text-xs font-semibold cursor-pointer flex justify-between items-center"
                          style={{
                            background: pago === item ? "rgba(255, 107, 0, 0.04)" : "transparent",
                            borderColor: pago === item ? C.or : "rgba(255,255,255,0.05)",
                            color: pago === item ? C.or : C.mid,
                          }}
                        >
                          <span>{item}</span>
                          {pago === item && <span className="font-bold">✓</span>}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex gap-3">
                      <Btn outline onClick={() => setStep(1)} sm>
                        Atrás
                      </Btn>
                      <Btn
                        full
                        disabled={!pago || (modo === "directo" && !disSel) || paying}
                        onClick={() => {
                          setPaying(true);
                          setTimeout(() => {
                            setPaying(false);
                            setDone(true);
                          }, 1800);
                        }}
                      >
                        {paying ? "Procesando..." : `PAGAR ${fmtK(calc?.total || tarifa.precio)}`}
                      </Btn>
                    </div>
                  </Card>
                )}
              </>
            ) : (
              <Card style={{ background: "rgba(255,255,255,0.01)", borderStyle: "dashed" }}>
                <div className="text-center py-14 text-slate-500 font-mono text-sm leading-relaxed">
                  Selecciona un servicio técnico del catálogo de la izquierda para comenzar el cálculo inteligente de presupuesto.
                </div>
              </Card>
            )}

            <Card style={{ background: "rgba(16, 185, 129, 0.02)", borderColor: "rgba(16, 185, 129, 0.15)" }}>
              <div className="text-xs text-emerald-500 leading-relaxed font-mono">
                🔒 **Resguardo Fiduciario**: Los fondos se bloquean de forma transparente en Plot φ y se liberan al profesional una vez culminado y calificado el trabajo.
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
