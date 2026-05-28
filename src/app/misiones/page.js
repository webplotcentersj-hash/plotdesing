"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  C,
  Card,
  Btn,
  Badge,
  Label,
  Row,
  Progress,
  Avatar,
  Toast,
  fmtK,
} from "@/components/Ui";

const MISIONES_DEMO = [
  { id: "M001", titulo: "Logo + Manual de Uso", cliente: "Cafetería El Roble", dis: "María González", estado: "en_progreso", precioCliente: 9000000, sobrecargo: 0, progreso: 32 },
  { id: "M002", titulo: "Identidad Corporativa", cliente: "Empresa BA SA", dis: "Juan Pérez", estado: "entregada", precioCliente: 22500000, sobrecargo: 7500000, progreso: 100 },
  { id: "M003", titulo: "Pack 10 piezas RRSS", cliente: "Tienda Online", dis: "Lucas Torres", estado: "aprobada", precioCliente: 520000, sobrecargo: 120000, progreso: 100 },
  { id: "M004", titulo: "Web Estándar", cliente: "Consultora BA", dis: "Carlos Ibáñez", estado: "en_progreso", precioCliente: 2200000, sobrecargo: 0, progreso: 65 },
];

const BLOCKED_PATTERNS = [
  /\d{8,}/,
  /@[\w]/,
  /whatsapp/i,
  /instagram/i,
  /telegram/i,
  /gmail/i,
  /\.com/i,
];

export default function MisionesPage() {
  const [sel, setSel] = useState(null);
  const [msgs, setMsgs] = useState([
    { de: "sistema", txt: "Misión activada bajo el resguardo contractual de Plot φ.", ts: "10:00" },
    { de: "cliente", txt: "Hola, te mando el brief completo del logo para iniciar.", ts: "10:05" },
    { de: "dis", txt: "Excelente, lo reviso hoy mismo y te paso las primeras ideas.", ts: "10:18" },
  ]);
  const [msg, setMsg] = useState("");
  const [blocked, setBlocked] = useState(false);
  const [tab, setTab] = useState("chat");
  const [stars, setStars] = useState({ calidad: 0, tiempo: 0, comunicacion: 0 });
  const [rated, setRated] = useState(false);
  const [toast, setToast] = useState(null);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [msgs, tab, sel]);

  const sendMsg = () => {
    if (!msg.trim()) return;
    if (BLOCKED_PATTERNS.some((p) => p.test(msg))) {
      setBlocked(true);
      setToast("❌ Bloqueado: Filtro de elusión activo (sin correos, teléfonos ni links externos)");
      setTimeout(() => setBlocked(false), 3000);
      return;
    }
    setMsgs((p) => [
      ...p,
      {
        de: "cliente",
        txt: msg,
        ts: new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setMsg("");
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}

      {sel ? (
        /* Split view: Side-by-side details + Interactive Workspace tabs */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: Static details summary (Sticky) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-[100px]">
            <button
              onClick={() => setSel(null)}
              className="text-[#7E849B] hover:text-white font-bold font-mono text-xs bg-transparent border-none cursor-pointer flex gap-2 items-center mb-2"
            >
              ← Volver al Listado
            </button>

            <Card accent={sel.estado === "en_progreso" ? C.or : sel.estado === "entregada" ? C.pu : C.gr} style={{ padding: 26, borderRadius: 12 }}>
              <Label color={C.muted}>CÓDIGO OPERATIVO: {sel.id}</Label>
              <h3 className="font-extrabold text-white text-base mb-3 leading-snug">{sel.titulo}</h3>
              <div className="flex gap-2 mb-6 flex-wrap">
                <Badge color={sel.estado === "en_progreso" ? C.or : sel.estado === "entregada" ? C.pu : C.gr}>
                  {sel.estado.toUpperCase().replace("_", " ")}
                </Badge>
                {sel.sobrecargo > 0 && <Badge color={C.ye}>⚡ URGENTE</Badge>}
              </div>

              <div className="space-y-2.5 border-t border-white/5 pt-4">
                <Row l="Cliente Corporativo" v={sel.cliente} />
                <Row l="Profesional Asignado" v={sel.dis || "Asignando..."} />
                <div className="pt-3">
                  <div className="flex justify-between text-xs font-mono text-[#9A9A9A] mb-2 font-bold">
                    <span>Avance Misión</span>
                    <span>{sel.progreso}%</span>
                  </div>
                  <Progress v={sel.progreso} color={sel.estado === "aprobada" ? C.gr : C.or} />
                </div>
              </div>
            </Card>

            <Card style={{ background: "rgba(255,255,255,0.01)", padding: 26, borderRadius: 12 }}>
              <Label>// DESGLOSE MONTO Y LIQUIDACIÓN</Label>
              <Row l="Monto Total Contratado" v={fmtK(sel.precioCliente)} vc={C.or} />
              <Row l="Liquidación Profesional (50%)" v={fmtK(Math.round(sel.precioCliente * 0.5))} vc={C.gr} />
              {sel.sobrecargo > 0 && (
                <div className="text-[11px] text-amber-500 font-mono mt-3 leading-normal">
                  ⚡ Incluye recargo por urgencia acelerada de {fmtK(sel.sobrecargo)} (dividido al 50/50 de forma contractual).
                </div>
              )}
            </Card>

            {/* Ratings inside the detailed card */}
            {sel.estado === "aprobada" && !rated && (
              <Card style={{ background: "rgba(16, 185, 129, 0.03)", borderColor: "rgba(16, 185, 129, 0.2)", padding: 26, borderRadius: 12 }}>
                <Label color={C.gr}>CALIFICAR SERVICIO PROFESIONAL</Label>
                <p className="text-slate-400 text-xs mb-4 leading-normal">
                  Misión culminada con éxito. Califica al profesional para liberar los fondos retenidos en el depósito en garantía:
                </p>
                {["Calidad Diseño", "Cumplimiento Plazos", "Comunicación"].map((item) => {
                  const key = item.toLowerCase().replace(" ", "_");
                  return (
                    <div key={item} className="flex justify-between items-center py-1.5">
                      <span className="text-xs text-white">{item}</span>
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span
                            key={s}
                            onClick={() => setStars((st) => ({ ...st, [key]: s }))}
                            className="cursor-pointer text-base transition-all"
                            style={{ color: s <= (stars[key] || 0) ? C.ye : "#222530", textShadow: s <= (stars[key] || 0) ? "0 0 8px rgba(245,158,11,0.4)" : "none" }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
                <div className="mt-5">
                  <Btn
                    full
                    disabled={Object.values(stars).some((v) => v === 0)}
                    onClick={() => {
                      setRated(true);
                      setToast("✅ Misión liquidada y valorada con éxito!");
                    }}
                  >
                    Confirmar Valoración & Cerrar
                  </Btn>
                </div>
              </Card>
            )}
          </div>

          {/* RIGHT PANEL: Workspace Chat / Upload Files tabs */}
          <div className="lg:col-span-8 space-y-6">
            <div className="glass-panel p-1 rounded-lg flex gap-1 border border-white/5 bg-[#13141A]">
              {[
                ["chat", "💬 Chat Seguro"],
                ["archivos", "📂 Repositorio de Archivos"],
              ].map(([t, label]) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`sidebar-btn ${tab === t ? "sidebar-btn-active" : ""}`}
                  style={{ flex: 1, padding: "8px 0", justifyContent: "center" }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* TAB: SECURE CHAT */}
            {tab === "chat" && (
              <Card style={{ padding: 28, borderRadius: 14 }}>
                <Label color={C.or}>CHAT DE COMUNICACIÓN EN VIVO</Label>
                <div className="p-3 bg-red-500/5 border border-red-500/10 text-red-500 font-mono text-[11px] rounded leading-relaxed mb-4">
                  🔒 **Filtro Operativo**: El chat filtra y bloquea datos personales, correos, perfiles de redes externas o páginas web para asegurar la validez de la garantía.
                </div>

                {/* Chat messages viewport */}
                <div
                  ref={chatRef}
                  className="bg-slate-950/40 border border-white/5 rounded-lg p-5 flex flex-col gap-4 overflow-y-auto mb-4"
                  style={{ height: 380 }}
                >
                  {msgs.map((m, i) => {
                    const isSis = m.de === "sistema";
                    const isClient = m.de === "cliente";
                    return (
                      <div
                        key={i}
                        className={`max-w-[75%] rounded-xl p-3.5 relative flex flex-col ${
                          isSis
                            ? "bg-slate-950 border border-white/5 self-center text-center max-w-[90%]"
                            : isClient
                            ? "bg-[#FF6B00] text-black self-end"
                            : "bg-slate-900 border border-white/5 self-start"
                        }`}
                      >
                        <span
                          className={`font-mono text-[9px] font-bold mb-1.5 ${
                            isClient ? "text-black/70" : isSis ? "text-amber-500" : "text-[#9A9A9A]"
                          }`}
                        >
                          {isSis ? "AUDITORÍA DE SEGURIDAD" : isClient ? "VOS (CLIENTE)" : "PROFESIONAL"} · {m.ts}
                        </span>
                        <p className="text-white text-xs leading-relaxed font-bold" style={{ color: isClient ? "#000" : "#fff" }}>
                          {m.txt}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Send action bar */}
                <div className="flex gap-3">
                  <input
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Escribí tu mensaje seguro..."
                    className="tech-input flex-1 focus:border-[#FF6B00]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") sendMsg();
                    }}
                  />
                  <Btn onClick={sendMsg}>Enviar Mensaje</Btn>
                </div>
              </Card>
            )}

            {/* TAB: ATTACHMENTS */}
            {tab === "archivos" && (
              <div className="space-y-6 animate-slide-up">
                <Card style={{ padding: 28, borderRadius: 14 }}>
                  <Label>// CONTRATO DIGITAL Y DOCUMENTACIÓN ASOCIADA</Label>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-slate-950/40 border border-white/5">
                      <div>
                        <div className="text-xs font-bold text-white">Brief_Tecnico_Empresa.pdf</div>
                        <span className="text-[10px] text-slate-500 font-mono mt-1 block">Subido por Cliente corporativo · 2.4MB</span>
                      </div>
                      <Btn sm outline>Descargar</Btn>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-slate-950/40 border border-white/5">
                      <div>
                        <div className="text-xs font-bold text-white">Propuesta_Logotipo_V1.zip</div>
                        <span className="text-[10px] text-slate-500 font-mono mt-1 block">Subido por Profesional · 42.1MB</span>
                      </div>
                      <Btn sm>Descargar</Btn>
                    </div>
                  </div>
                </Card>

                {sel.estado !== "aprobada" && (
                  <button
                    onClick={() => setToast("📁 Simulando carga de archivos.")}
                    className="w-full py-10 border border-dashed border-[#222530] bg-[#13141A]/50 hover:bg-[#13141A] rounded-xl text-[#9A9A9A] hover:border-[#FF6B00] transition-all font-bold font-mono text-xs"
                  >
                    + ARRASTRÁ O SUBÍ FORMATOS (ZIP, PDF, AI, PSD, PNG)
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* VIEW: LIST OF GENERAL MISSIONS (EXECUTIVE PANEL SUMMARY) */
        <div className="space-y-6">
          <div>
            <h3 className="font-extrabold text-xl text-white tracking-tight">Monitoreo de Misiones Activas</h3>
            <p className="text-slate-400 text-xs mt-1">
              Seguí la comunicación segura, audita los avances o aprobá misiones en tránsito.
            </p>
          </div>

          {/* Franja resumen de KPIs operativos */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { l: "Misiones Totales", v: MISIONES_DEMO.length, c: C.or, i: "⚡" },
              { l: "En Curso", v: MISIONES_DEMO.filter((m) => m.estado === "en_progreso").length, c: C.bl, i: "🔄" },
              { l: "Por Aprobar", v: MISIONES_DEMO.filter((m) => m.estado === "entregada").length, c: C.pu, i: "📦" },
              { l: "Valor Contractual", v: fmtK(MISIONES_DEMO.reduce((a, m) => a + m.precioCliente, 0)), c: C.gr, i: "💰" },
            ].map((s) => (
              <Card key={s.l} style={{ padding: 18, borderRadius: 12 }}>
                <div className="flex justify-between items-start">
                  <div>
                    <div style={{ fontFamily: C.fm, fontSize: 8, color: C.muted, fontWeight: 700, letterSpacing: 1.2 }}>
                      {s.l.toUpperCase()}
                    </div>
                    <div style={{ fontFamily: C.ff, fontWeight: 900, color: s.c, fontSize: 22, marginTop: 6, letterSpacing: "-0.02em" }}>
                      {s.v}
                    </div>
                  </div>
                  <span style={{ fontSize: 18 }}>{s.i}</span>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MISIONES_DEMO.map((m) => {
              const eColor =
                m.estado === "en_progreso" ? C.or : m.estado === "entregada" ? C.pu : C.gr;
              return (
                <Card
                  key={m.id}
                  onClick={() => {
                    setSel(m);
                    setTab("chat");
                  }}
                  style={{ cursor: "pointer", padding: 26, borderRadius: 12 }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <Badge color={eColor}>
                      {m.estado === "en_progreso" ? "⚡ En curso" : m.estado === "entregada" ? "📦 Entregado" : "✅ Aprobada"}
                    </Badge>
                    <span className="font-mono text-xs text-slate-500">{m.id}</span>
                  </div>

                  <h4 className="font-extrabold text-white text-base mb-3 leading-snug">{m.titulo}</h4>
                  <div className="text-slate-400 text-xs mb-4">
                    👤 Cliente: {m.cliente} {m.dis ? `· 🎨 Prof: ${m.dis}` : ""}
                  </div>

                  <div className="space-y-2 mb-4">
                    <Progress v={m.progreso} color={eColor} />
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-white/5">
                    <span style={{ fontSize: 9, fontFamily: C.fm, color: C.muted }}>VALOR CONTRACTUAL</span>
                    <span className="font-extrabold text-white text-base">{fmtK(m.precioCliente)}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
