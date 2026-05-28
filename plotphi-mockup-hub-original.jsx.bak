import { useState, useEffect, useRef } from "react";

// ── TOKENS ───────────────────────────────────────────────────────
const C = {
  bg:     "#F8F9FB",
  white:  "#FFFFFF",
  card:   "#FFFFFF",
  card2:  "#F1F4F8",
  border: "#E2E8F0",
  border2:"#CBD5E1",
  or:     "#FF5500",
  orl:    "#FF7700",
  ord:    "#CC2200",
  gd:     "#B8943A",
  navy:   "#0F172A",
  dark:   "#1E293B",
  mid:    "#475569",
  muted:  "#94A3B8",
  gr:     "#16A34A",
  bl:     "#1D4ED8",
  pu:     "#7C3AED",
  ye:     "#B45309",
  re:     "#DC2626",
  ff:     "'Syne', sans-serif",
  fm:     "'Space Mono', monospace",
};

const MULT  = 1.5;
const SPLIT = 0.5;
const fmt   = n => `$${n.toLocaleString("es-AR")}`;
const fmtK  = n => n>=1000000?`$${(n/1000000).toFixed(1)}M`:n>=1000?`$${(n/1000).toFixed(0)}K`:fmt(n);

const TARIFAS = [
  { id:"id_corp",  cat:"Identidad",   n:"Identidad Corporativa", precio:15000000, dias:15, seg:"senior"    },
  { id:"logo_man", cat:"Identidad",   n:"Logo + Manual de Uso",  precio:9000000,  dias:10, seg:"junior"    },
  { id:"logo",     cat:"Identidad",   n:"Logo / Isotipo",        precio:4500000,  dias:5,  seg:"junior"    },
  { id:"flyer1",   cat:"Publicidad",  n:"Flyer simple",          precio:150000,   dias:2,  seg:"estudiante"},
  { id:"web_std",  cat:"Web",         n:"Web Estándar",          precio:2200000,  dias:12, seg:"senior"    },
  { id:"app",      cat:"Web",         n:"App UX + UI",           precio:5500000,  dias:20, seg:"senior"    },
  { id:"pack10",   cat:"Redes",       n:"Pack 10 piezas RRSS",   precio:400000,   dias:3,  seg:"estudiante"},
  { id:"gest_int", cat:"Redes",       n:"Gestión RRSS Intensiva",precio:750000,   dias:30, seg:"junior"    },
  { id:"rapida",   cat:"⚡ Rápida",    n:"Modificación rápida",   precio:80000,    dias:1,  seg:"estudiante"},
];

const segC  = s => s==="senior"?C.or:s==="junior"?C.ye:C.bl;
const segL  = s => s==="senior"?"Senior":s==="junior"?"Junior":"Estudiante";
const segI  = s => s==="senior"?"⭐":s==="junior"?"🎨":"👨‍🎓";

const BLOCKED = [/\d{8,}/,/@[\w]/,/whatsapp/i,/instagram/i,/telegram/i,/gmail/i,/\.com/i];

const DISEÑADORES = [
  { id:1, n:"Juan Pérez",    tipo:"senior",    pts:4.9, mis:42, disp:true  },
  { id:2, n:"María González",tipo:"junior",    pts:4.7, mis:18, disp:true  },
  { id:3, n:"Lucas Torres",  tipo:"junior",    pts:4.4, mis:9,  disp:true  },
  { id:4, n:"Ana Ruiz",      tipo:"estudiante",pts:4.2, mis:3,  disp:true  },
  { id:5, n:"Carlos Ibáñez", tipo:"senior",    pts:4.8, mis:31, disp:false },
];

const MISIONES_DEMO = [
  { id:"M001", titulo:"Logo + Manual de Uso",     cliente:"Cafetería El Roble", dis:"María González", estado:"en_progreso", precioCliente:9000000,  sobrecargo:0,       progreso:32 },
  { id:"M002", titulo:"Identidad Corporativa",     cliente:"Empresa BA SA",      dis:"Juan Pérez",     estado:"entregada",   precioCliente:22500000, sobrecargo:7500000, progreso:100},
  { id:"M003", titulo:"Pack 10 piezas RRSS",       cliente:"Tienda Online",      dis:"Lucas Torres",   estado:"aprobada",    precioCliente:520000,   sobrecargo:120000,  progreso:100},
  { id:"M004", titulo:"Web Estándar",              cliente:"Consultora BA",      dis:null,             estado:"publicada",   precioCliente:2200000,  sobrecargo:0,       progreso:0  },
];

// ── PRIMITIVES ───────────────────────────────────────────────────
const Card = ({ children, style={}, onClick, accent }) => (
  <div onClick={onClick} style={{
    background:C.white, border:`1.5px solid ${accent?`${accent}40`:C.border}`,
    borderRadius:14, padding:18, position:"relative", overflow:"hidden",
    boxShadow:"0 1px 4px rgba(0,0,0,0.06)",
    cursor:onClick?"pointer":"default", transition:"all 0.2s",
    ...(onClick?{"&:hover":{transform:"translateY(-2px)"}}:{}),
    ...style
  }}>
    {accent&&<div style={{position:"absolute",top:0,left:0,right:0,height:3,background:accent,borderRadius:"14px 14px 0 0"}}/>}
    {children}
  </div>
);

const Btn = ({ children, onClick, outline, full, disabled, size="md", color, sm }) => {
  const [h,setH]=useState(false);
  const c=color||C.or;
  const fs = sm?11:size==="sm"?11:size==="lg"?14:13;
  const pad = sm?"6px 12px":size==="sm"?"7px 14px":size==="lg"?"13px 24px":"10px 18px";
  return (
    <button onClick={disabled?undefined:onClick}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{
        background:disabled?"#E2E8F0":outline?"transparent":`linear-gradient(135deg,${c},${c}DD)`,
        color:disabled?C.muted:outline?c:"#fff",
        border:`1.5px solid ${disabled?C.border:c}`,
        borderRadius:9, fontWeight:700, cursor:disabled?"not-allowed":"pointer",
        fontFamily:C.ff, width:full?"100%":"auto", padding:pad, fontSize:fs,
        boxShadow:h&&!disabled&&!outline?`0 4px 16px ${c}44`:"none",
        transition:"all 0.2s", transform:h&&!disabled&&!outline?"translateY(-1px)":"none",
        opacity:disabled?.5:1, letterSpacing:0.3,
      }}>{children}</button>
  );
};

const Badge = ({ children, color=C.or }) => (
  <span style={{
    background:`${color}15`, color, border:`1px solid ${color}30`,
    borderRadius:6, padding:"2px 8px", fontSize:10, fontWeight:700,
    letterSpacing:0.5, fontFamily:C.fm,
  }}>{children}</span>
);

const Chip = ({ text, color=C.or }) => (
  <span style={{
    background:`${color}10`, color, border:`1px solid ${color}25`,
    borderRadius:20, padding:"3px 10px", fontSize:9, fontWeight:700,
    letterSpacing:1.5, fontFamily:C.fm, display:"inline-block",
  }}>{text}</span>
);

const Label = ({ children, color=C.muted }) => (
  <div style={{ fontFamily:C.fm, fontSize:9, color, letterSpacing:2, textTransform:"uppercase", marginBottom:10 }}>{children}</div>
);

const Row = ({ l, v, vc }) => (
  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
    <span style={{ color:C.muted, fontSize:12, fontFamily:C.fm }}>{l}</span>
    <span style={{ color:vc||C.dark, fontWeight:700, fontSize:13 }}>{v}</span>
  </div>
);

const Progress = ({ v, color=C.or }) => (
  <div style={{ background:C.card2, borderRadius:4, height:4 }}>
    <div style={{ background:color, height:4, width:`${Math.min(100,v)}%`, borderRadius:4, transition:"width 0.5s" }}/>
  </div>
);

const Avatar = ({ name, size=38, color=C.or }) => (
  <div style={{ width:size, height:size, borderRadius:"50%", background:`linear-gradient(135deg,${color},${color}88)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*.4, fontWeight:900, color:"#fff", flexShrink:0, fontFamily:C.ff }}>
    {name?name[0].toUpperCase():"?"}
  </div>
);

const Toast = ({ msg, color=C.or, onClose }) => {
  useEffect(()=>{ const t=setTimeout(onClose,3000); return()=>clearTimeout(t); },[]);
  return (
    <div style={{ position:"fixed", bottom:80, left:"50%", transform:"translateX(-50%)", background:color, color:"#fff", borderRadius:12, padding:"10px 20px", fontFamily:C.ff, fontWeight:700, fontSize:13, zIndex:999, boxShadow:`0 8px 24px ${color}55`, whiteSpace:"nowrap", animation:"slideUp .3s ease" }}>
      {msg}
    </div>
  );
};

// ── NAV BOTTOM ───────────────────────────────────────────────────
const NavBottom = ({ items, active, onChange }) => (
  <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:"rgba(255,255,255,0.97)", borderTop:`1px solid ${C.border}`, display:"flex", padding:"10px 0 20px", backdropFilter:"blur(20px)", zIndex:100, boxShadow:"0 -4px 20px rgba(0,0,0,0.06)" }}>
    {items.map(([id,icon,label])=>(
      <button key={id} onClick={()=>onChange(id)} style={{ flex:1, background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, color:active===id?C.or:C.muted, fontFamily:C.fm, transition:"color 0.2s" }}>
        <span style={{ fontSize:19, filter:active===id?`drop-shadow(0 0 4px ${C.or}66)`:"none" }}>{icon}</span>
        <span style={{ fontSize:8, fontWeight:700, letterSpacing:1 }}>{label}</span>
        {active===id&&<div style={{ width:12, height:2, borderRadius:2, background:C.or }}/>}
      </button>
    ))}
  </div>
);

// ══════════════════════════════════════════════════════════════
// MÓDULO CLIENTE
// ══════════════════════════════════════════════════════════════
const ModCliente = () => {
  const [step, setStep] = useState(0);
  const [tarifa, setTarifa] = useState(null);
  const [dias, setDias] = useState(0);
  const [brief, setBrief] = useState({ empresa:"", desc:"" });
  const [modo, setModo] = useState("");
  const [disSel, setDisSel] = useState(null);
  const [pago, setPago] = useState("");
  const [paying, setPaying] = useState(false);
  const [done, setDone] = useState(false);
  const [toast, setToast] = useState(null);
  const [catF, setCatF] = useState("");

  const cats = [...new Set(TARIFAS.map(t=>t.cat))];

  const calc = tarifa && dias > 0 ? (() => {
    const diasAcortados = tarifa.dias - dias;
    if (diasAcortados <= 0) return { sobrecargo:0, total:tarifa.precio, urgente:false };
    const pDia = tarifa.precio / tarifa.dias;
    const sob  = Math.round(diasAcortados * pDia * MULT);
    return { sobrecargo:sob, total:tarifa.precio+sob, urgente:true };
  })() : null;

  const reset = () => { setStep(0);setTarifa(null);setDias(0);setBrief({empresa:"",desc:""});setModo("");setDisSel(null);setPago("");setDone(false); };

  if (done) return (
    <div style={{ display:"flex", flexDirection:"column", gap:16, paddingTop:10, textAlign:"center" }}>
      <div style={{ fontSize:64 }}>🚀</div>
      <div style={{ fontFamily:C.ff, fontWeight:900, fontSize:22, color:C.dark }}>¡Misión publicada!</div>
      <Card accent={C.or}>
        <Label>// RESUMEN</Label>
        <Row l="Producto"      v={tarifa?.n}/>
        <Row l="Empresa"       v={brief.empresa}/>
        <Row l="Días pedidos"  v={`${dias} días hábiles`}/>
        {calc?.sobrecargo>0&&<Row l="Sobrecargo urgencia" v={fmt(calc.sobrecargo)} vc={C.ye}/>}
        <Row l="Total pagado"  v={fmt(calc?.total||tarifa?.precio)} vc={C.or}/>
      </Card>
      <Card style={{ background:`${C.gr}10`, borderColor:`${C.gr}30` }}>
        <Label color={C.gr}>// ASÍ VE LA MISIÓN EL DISEÑADOR</Label>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ fontFamily:C.ff, fontWeight:800, color:C.dark, fontSize:14 }}>{tarifa?.n}</div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontFamily:C.fm, fontSize:9, color:C.muted }}>VE Y COBRA</div>
            <div style={{ fontFamily:C.ff, fontWeight:900, color:C.gr, fontSize:22 }}>{fmtK(Math.round((calc?.total||tarifa?.precio)*SPLIT))}</div>
          </div>
        </div>
        <div style={{ fontFamily:C.fm, fontSize:10, color:C.muted, marginTop:8 }}>✅ El precio total al cliente nunca es visible para el diseñador</div>
      </Card>
      <div style={{ display:"flex", gap:10 }}>
        <Btn outline full onClick={reset}>+ Nueva misión</Btn>
      </div>
    </div>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
      {toast&&<Toast msg={toast} onClose={()=>setToast(null)}/>}

      {/* Steps bar */}
      <div style={{ display:"flex", gap:4, marginBottom:20 }}>
        {["PRODUCTO","PRESUPUESTO","PUBLICAR"].map((l,i)=>(
          <div key={l} style={{ flex:1 }}>
            <div style={{ height:3, background:step>=i?C.or:C.border, borderRadius:2, marginBottom:4, transition:"background 0.3s" }}/>
            <div style={{ fontFamily:C.fm, fontSize:8, color:step>=i?C.or:C.muted, letterSpacing:1 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* STEP 0 — PRODUCTO */}
      {step===0&&(
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ fontFamily:C.ff, fontWeight:800, fontSize:18, color:C.dark }}>¿Qué servicio necesitás?</div>

          {/* Empresa */}
          <div>
            <div style={{ fontFamily:C.fm, fontSize:9, color:C.muted, letterSpacing:2, marginBottom:5 }}>EMPRESA / PROYECTO <span style={{color:C.or}}>*</span></div>
            <input value={brief.empresa} onChange={e=>setBrief(b=>({...b,empresa:e.target.value}))}
              placeholder="Ej: Cafetería El Roble"
              style={{ width:"100%", background:C.white, border:`1.5px solid ${C.border}`, borderRadius:9, padding:"10px 13px", fontSize:13, fontFamily:C.ff, color:C.dark, outline:"none" }}/>
          </div>

          {/* Categorías */}
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            <button onClick={()=>setCatF("")} style={{ background:!catF?C.or:"transparent", color:!catF?"#fff":C.muted, border:`1px solid ${!catF?C.or:C.border}`, borderRadius:20, padding:"4px 12px", fontSize:10, cursor:"pointer", fontFamily:C.ff, fontWeight:700 }}>Todos</button>
            {cats.map(cat=><button key={cat} onClick={()=>setCatF(cat)} style={{ background:catF===cat?C.or:"transparent", color:catF===cat?"#fff":C.muted, border:`1px solid ${catF===cat?C.or:C.border}`, borderRadius:20, padding:"4px 12px", fontSize:10, cursor:"pointer", fontFamily:C.ff, fontWeight:700, whiteSpace:"nowrap" }}>{cat}</button>)}
          </div>

          {/* Lista productos */}
          <div style={{ display:"flex", flexDirection:"column", gap:8, maxHeight:260, overflowY:"auto" }}>
            {TARIFAS.filter(t=>!catF||t.cat===catF).map(t=>(
              <div key={t.id} onClick={()=>{setTarifa(t);setDias(t.dias);}}
                style={{ background:tarifa?.id===t.id?`${C.or}08`:C.white, border:`1.5px solid ${tarifa?.id===t.id?C.or:C.border}`, borderRadius:10, padding:"11px 14px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", transition:"all 0.15s" }}>
                <div>
                  <div style={{ fontFamily:C.ff, fontWeight:700, color:C.dark, fontSize:13 }}>{t.n}</div>
                  <div style={{ display:"flex", gap:6, marginTop:4 }}>
                    <Badge color={segC(t.seg)}>{segI(t.seg)} {segL(t.seg)}</Badge>
                    <span style={{ fontFamily:C.fm, fontSize:9, color:C.muted, alignSelf:"center" }}>{t.dias}d hábiles</span>
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontFamily:C.ff, fontWeight:900, color:C.or, fontSize:14 }}>{fmtK(t.precio)}</div>
                  <div style={{ fontFamily:C.fm, fontSize:9, color:C.muted }}>precio base</div>
                </div>
              </div>
            ))}
          </div>

          {/* Brief */}
          <div>
            <div style={{ fontFamily:C.fm, fontSize:9, color:C.muted, letterSpacing:2, marginBottom:5 }}>DESCRIPCIÓN DEL PROYECTO <span style={{color:C.or}}>*</span></div>
            <textarea value={brief.desc} onChange={e=>setBrief(b=>({...b,desc:e.target.value}))} placeholder="Contale al diseñador qué necesitás..." rows={3}
              style={{ width:"100%", background:C.white, border:`1.5px solid ${C.border}`, borderRadius:9, padding:"10px 13px", fontSize:13, fontFamily:C.ff, color:C.dark, resize:"vertical", lineHeight:1.6, outline:"none" }}/>
          </div>

          <Btn full size="lg" disabled={!tarifa||!brief.empresa||!brief.desc} onClick={()=>setStep(1)}>CALCULAR PRESUPUESTO →</Btn>
        </div>
      )}

      {/* STEP 1 — PRESUPUESTO */}
      {step===1&&tarifa&&(
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <button onClick={()=>setStep(0)} style={{ background:"none", border:"none", color:C.muted, cursor:"pointer", fontFamily:C.fm, fontSize:10, letterSpacing:1, display:"flex", alignItems:"center", gap:5, padding:0 }}>← Volver</button>
          <div style={{ fontFamily:C.ff, fontWeight:800, fontSize:18, color:C.dark }}>Tu presupuesto</div>

          {/* Selector de días */}
          <Card>
            <Label>// ¿CUÁNDO LO NECESITÁS?</Label>
            <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:10 }}>
              <button onClick={()=>setDias(d=>Math.max(1,d-1))} style={{ width:40, height:40, borderRadius:9, background:C.card2, border:`1px solid ${C.border}`, fontSize:20, cursor:"pointer", color:C.dark, display:"flex", alignItems:"center", justifyContent:"center" }}>−</button>
              <div style={{ flex:1, textAlign:"center" }}>
                <div style={{ fontFamily:C.ff, fontWeight:900, fontSize:48, color:calc?.urgente?C.ye:C.gr, lineHeight:1 }}>{dias}</div>
                <div style={{ fontFamily:C.fm, fontSize:10, color:C.muted, marginTop:4 }}>días hábiles · plazo normal: {tarifa.dias}d</div>
              </div>
              <button onClick={()=>setDias(d=>Math.min(tarifa.dias*2,d+1))} style={{ width:40, height:40, borderRadius:9, background:C.card2, border:`1px solid ${C.border}`, fontSize:20, cursor:"pointer", color:C.dark, display:"flex", alignItems:"center", justifyContent:"center" }}>+</button>
            </div>
            {calc?.urgente
              ? <div style={{ background:`${C.ye}12`, border:`1px solid ${C.ye}40`, borderRadius:8, padding:"8px 12px", fontFamily:C.fm, fontSize:10, color:C.ye }}>⚡ Acortás {tarifa.dias-dias} días — se aplica sobrecargo 1.5×</div>
              : <div style={{ background:`${C.gr}10`, border:`1px solid ${C.gr}30`, borderRadius:8, padding:"8px 12px", fontFamily:C.fm, fontSize:10, color:C.gr }}>✅ Plazo normal — sin costo de urgencia</div>
            }
          </Card>

          {/* Total */}
          <Card accent={C.or} style={{ textAlign:"center", padding:"24px 18px" }}>
            <div style={{ fontFamily:C.fm, fontSize:9, color:C.muted, letterSpacing:3, marginBottom:8 }}>TOTAL A PAGAR</div>
            <div style={{ fontFamily:C.ff, fontWeight:900, fontSize:48, color:calc?.urgente?C.ye:C.or, lineHeight:1, marginBottom:10 }}>
              {fmtK(calc?.total||tarifa.precio)}
            </div>
            <Badge color={segC(tarifa.seg)}>{segI(tarifa.seg)} {segL(tarifa.seg)}</Badge>
          </Card>

          {/* Desglose urgencia */}
          {calc?.urgente&&(
            <Card style={{ background:`${C.ye}08`, borderColor:`${C.ye}40` }}>
              <Label color={C.ye}>// CÁLCULO URGENCIA — FÓRMULA 1.5×</Label>
              {[
                ["Precio base",                    fmt(tarifa.precio)],
                [`Precio/día (÷${tarifa.dias}d)`,  fmt(Math.round(tarifa.precio/tarifa.dias))+"/día"],
                [`Días acortados`,                  `${tarifa.dias-dias} días`],
                [`Sobrecargo (×1.5)`,               fmt(calc.sobrecargo)],
              ].map(([l,v],i)=>(
                <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ color:C.muted, fontSize:12, fontFamily:C.fm }}>{l}</span>
                  <span style={{ color:i===3?C.re:C.dark, fontWeight:700, fontSize:13 }}>{v}</span>
                </div>
              ))}
              <div style={{ display:"flex", justifyContent:"space-between", paddingTop:10, marginTop:4 }}>
                <span style={{ fontFamily:C.ff, fontWeight:800, color:C.dark }}>TOTAL</span>
                <span style={{ fontFamily:C.ff, fontWeight:900, color:C.ye, fontSize:22 }}>{fmt(calc.total)}</span>
              </div>
            </Card>
          )}

          <Card style={{ background:`${C.gr}08`, borderColor:`${C.gr}30` }}>
            <div style={{ fontFamily:C.fm, fontSize:10, color:C.gr, lineHeight:1.8 }}>
              🔒 El pago queda retenido en Plot Center hasta que aprobés el trabajo. El 50% se libera al diseñador solo cuando das tu aprobación.
            </div>
          </Card>

          <Btn full size="lg" onClick={()=>setStep(2)}>✅ ACEPTAR — ELEGIR DISEÑADOR →</Btn>
        </div>
      )}

      {/* STEP 2 — PUBLICAR */}
      {step===2&&tarifa&&(
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <button onClick={()=>setStep(1)} style={{ background:"none", border:"none", color:C.muted, cursor:"pointer", fontFamily:C.fm, fontSize:10, letterSpacing:1, display:"flex", alignItems:"center", gap:5, padding:0 }}>← Volver</button>

          {/* Mini resumen */}
          <Card style={{ background:`${C.or}08`, borderColor:`${C.or}30`, padding:"12px 16px" }}>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <div>
                <div style={{ fontFamily:C.ff, fontWeight:800, color:C.dark, fontSize:14 }}>{tarifa.n}</div>
                <div style={{ color:C.muted, fontSize:12, marginTop:2 }}>{brief.empresa} · {dias} días hábiles</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontFamily:C.ff, fontWeight:900, color:calc?.urgente?C.ye:C.or, fontSize:22 }}>{fmtK(calc?.total||tarifa.precio)}</div>
                {calc?.urgente&&<div style={{ fontFamily:C.fm, fontSize:9, color:C.ye }}>⚡ incl. urgencia</div>}
              </div>
            </div>
          </Card>

          {/* Routing */}
          <div style={{ fontFamily:C.fm, fontSize:9, color:C.muted, letterSpacing:2, marginBottom:4 }}>¿A QUIÉN ENVIÁS LA MISIÓN?</div>
          {[{v:"todos",i:"📢",t:"A todos los diseñadores",s:"El primero en aceptar la toma.",c:C.or},
            {v:"segmento",i:"🎯",t:"A un segmento",s:"Solo Senior, Junior o Estudiante.",c:C.ye},
            {v:"directo",i:"👤",t:"Directo a un diseñador",s:"Elegís quién la recibe. 24hs para aceptar.",c:C.bl}
          ].map(o=>(
            <div key={o.v} onClick={()=>{setModo(o.v);setDisSel(null);}}
              style={{ background:modo===o.v?`${o.c}08`:C.white, border:`1.5px solid ${modo===o.v?o.c:C.border}`, borderRadius:12, padding:"12px 14px", cursor:"pointer", display:"flex", gap:12, alignItems:"center", transition:"all 0.2s", marginBottom:8 }}>
              <span style={{ fontSize:22, flexShrink:0 }}>{o.i}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:C.ff, fontWeight:800, color:modo===o.v?o.c:C.dark, fontSize:13, marginBottom:2 }}>{o.t}</div>
                <div style={{ color:C.muted, fontSize:11 }}>{o.s}</div>
              </div>
              {modo===o.v&&<div style={{ width:20, height:20, borderRadius:"50%", background:o.c, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:10, fontWeight:900 }}>✓</div>}
            </div>
          ))}

          {/* Diseñadores directos */}
          {modo==="directo"&&(
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {DISEÑADORES.map(d=>(
                <div key={d.id} onClick={()=>d.disp&&setDisSel(d)}
                  style={{ background:disSel?.id===d.id?`${C.bl}08`:C.white, border:`1.5px solid ${disSel?.id===d.id?C.bl:C.border}`, borderRadius:10, padding:"10px 12px", cursor:d.disp?"pointer":"not-allowed", display:"flex", gap:10, alignItems:"center", opacity:d.disp?1:0.4, transition:"all 0.15s" }}>
                  <Avatar name={d.n} size={36} color={segC(d.tipo)}/>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:C.ff, fontWeight:700, color:C.dark, fontSize:13 }}>{d.n}</div>
                    <div style={{ display:"flex", gap:5 }}><Badge color={segC(d.tipo)}>{segI(d.tipo)} {segL(d.tipo)}</Badge><span style={{ color:C.or, fontSize:11 }}>★ {d.pts}</span></div>
                  </div>
                  {!d.disp&&<Badge color={C.muted}>Ocupado</Badge>}
                  {disSel?.id===d.id&&<div style={{ width:20, height:20, borderRadius:"50%", background:C.bl, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:10 }}>✓</div>}
                </div>
              ))}
            </div>
          )}

          {/* Pago */}
          {(modo==="todos"||(modo==="segmento")||(modo==="directo"&&disSel))&&(
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <div style={{ fontFamily:C.fm, fontSize:9, color:C.muted, letterSpacing:2 }}>MÉTODO DE PAGO</div>
              {[["💳","Tarjeta de crédito / débito"],["🏦","Transferencia / CVU"],["📱","MercadoPago"]].map(([i,l])=>(
                <div key={l} onClick={()=>setPago(l)} style={{ background:pago===l?`${C.or}08`:C.white, border:`1.5px solid ${pago===l?C.or:C.border}`, borderRadius:10, padding:"10px 12px", cursor:"pointer", display:"flex", gap:10, alignItems:"center", transition:"all 0.15s" }}>
                  <span style={{ fontSize:18 }}>{i}</span>
                  <span style={{ fontFamily:C.ff, fontWeight:700, color:pago===l?C.or:C.dark, fontSize:13, flex:1 }}>{l}</span>
                  {pago===l&&<span style={{ color:C.or }}>✓</span>}
                </div>
              ))}
              <Btn full size="lg" disabled={!pago||paying} onClick={()=>{
                setPaying(true);
                setTimeout(()=>{ setPaying(false); setDone(true); },1800);
              }}>
                {paying?"Procesando...":"💳 PAGAR "+fmtK(calc?.total||tarifa.precio)+" Y PUBLICAR →"}
              </Btn>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// MÓDULO PROFESIONAL
// ══════════════════════════════════════════════════════════════
const ModProfesional = () => {
  const [view,setView]=useState("splash");
  const [tipo,setTipo]=useState("");
  const [regStep,setRegStep]=useState(0);
  const [form,setForm]=useState({nombre:"",email:"",password:"",especialidades:[],portfolio:[]});
  const [navTab,setNavTab]=useState("misiones");

  const SPECS=["Branding","Identidad","Web/UI","Redes Sociales","Editorial","Packaging","Ilustración","Marketing"];

  if(view==="splash") return (
    <div style={{ display:"flex", flexDirection:"column", gap:18, paddingTop:8 }}>
      <div style={{ textAlign:"center", marginBottom:4 }}>
        <div style={{ fontSize:50, marginBottom:10 }}>🎨</div>
        <div style={{ fontFamily:C.ff, fontWeight:900, fontSize:20, color:C.dark }}>Módulo Profesional</div>
        <div style={{ color:C.muted, fontSize:13, marginTop:4 }}>Elegí tu perfil para registrarte</div>
      </div>
      {[{t:"Diseñador Gráfico",s:"Identidad, web, editorial, packaging",i:"🎨",c:C.or,v:"disenador"},
        {t:"Community Manager",s:"Redes sociales, contenido, calendarios",i:"📱",c:C.bl,v:"community",new:true},
        {t:"Lic. en Marketing",s:"Estrategia, posicionamiento, campañas",i:"📊",c:C.pu,v:"marketing",new:true}
      ].map(o=>(
        <div key={o.v} onClick={()=>{setTipo(o.v);setView("register");setRegStep(0);}}
          style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"16px 18px", cursor:"pointer", display:"flex", gap:14, alignItems:"center", transition:"all 0.2s", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=o.c;e.currentTarget.style.boxShadow=`0 4px 16px ${o.c}22`;}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.06)";}}>
          <div style={{ width:50, height:50, borderRadius:12, background:`${o.c}12`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>{o.i}</div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <div style={{ fontFamily:C.ff, fontWeight:800, color:C.dark, fontSize:14 }}>{o.t}</div>
              {o.new&&<span style={{ background:`${C.gr}15`, color:C.gr, border:`1px solid ${C.gr}30`, borderRadius:10, padding:"1px 8px", fontSize:9, fontFamily:C.fm }}>NUEVO</span>}
            </div>
            <div style={{ color:C.muted, fontSize:12, marginTop:2 }}>{o.s}</div>
          </div>
          <span style={{ color:C.muted }}>›</span>
        </div>
      ))}
      <Btn outline full onClick={()=>setView("dashboard")}>Ya tengo cuenta — Ingresar</Btn>
    </div>
  );

  if(view==="register") return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      {/* Steps */}
      <div style={{ display:"flex", gap:4 }}>
        {["DATOS","PERFIL","PORTFOLIO"].map((l,i)=>(
          <div key={l} style={{ flex:1 }}>
            <div style={{ height:3, background:i<=regStep?C.or:C.border, borderRadius:2, marginBottom:4, transition:"background 0.3s" }}/>
            <div style={{ fontFamily:C.fm, fontSize:8, color:i<=regStep?C.or:C.muted, letterSpacing:1 }}>{l}</div>
          </div>
        ))}
      </div>
      <Chip text={tipo.toUpperCase()} color={tipo==="disenador"?C.or:tipo==="community"?C.bl:C.pu}/>

      {regStep===0&&(
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[["NOMBRE *","nombre","María"],["EMAIL *","email","tu@email.com"],["CONTRASEÑA *","password","••••••••"]].map(([l,k,p])=>(
            <div key={k}>
              <div style={{ fontFamily:C.fm, fontSize:9, color:C.muted, letterSpacing:2, marginBottom:5 }}>{l}</div>
              <input value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} placeholder={p} type={k==="password"?"password":"text"}
                style={{ width:"100%", background:C.white, border:`1.5px solid ${C.border}`, borderRadius:9, padding:"10px 13px", fontSize:13, fontFamily:C.ff, color:C.dark, outline:"none" }}/>
            </div>
          ))}
          <Btn full onClick={()=>form.nombre&&form.email&&form.password&&setRegStep(1)} disabled={!form.nombre||!form.email||!form.password}>Continuar →</Btn>
        </div>
      )}
      {regStep===1&&(
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div><div style={{ fontFamily:C.fm, fontSize:9, color:C.muted, letterSpacing:2, marginBottom:8 }}>ESPECIALIDADES (mín. 1)</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
            {SPECS.map(s=><button key={s} onClick={()=>setForm(f=>({...f,especialidades:f.especialidades.includes(s)?f.especialidades.filter(x=>x!==s):[...f.especialidades,s]}))}
              style={{ background:form.especialidades.includes(s)?`${C.or}12`:C.white, color:form.especialidades.includes(s)?C.or:C.muted, border:`1px solid ${form.especialidades.includes(s)?C.or:C.border}`, borderRadius:20, padding:"5px 12px", fontSize:12, cursor:"pointer", fontFamily:C.ff, fontWeight:700 }}>{s}</button>)}
          </div></div>
          <div style={{ display:"flex", gap:10 }}><Btn outline onClick={()=>setRegStep(0)} sm>← Atrás</Btn><Btn full onClick={()=>form.especialidades.length>0&&setRegStep(2)} disabled={form.especialidades.length===0}>Continuar →</Btn></div>
        </div>
      )}
      {regStep===2&&(
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <Card style={{ background:`${C.or}06` }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ color:C.muted, fontSize:12 }}>Trabajos subidos</span>
              <span style={{ color:C.or, fontWeight:800 }}>{form.portfolio.length} / {tipo==="estudiante"?3:5} mín.</span>
            </div>
            <Progress v={form.portfolio.length/(tipo==="estudiante"?3:5)*100}/>
          </Card>
          {form.portfolio.map((p,i)=>(
            <Card key={i} style={{ padding:12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}><span style={{ color:C.or, fontFamily:C.fm, fontSize:10 }}>TRABAJO #{i+1}</span><button onClick={()=>setForm(f=>({...f,portfolio:f.portfolio.filter((_,j)=>j!==i)}))} style={{ background:"none",border:"none",color:C.re,cursor:"pointer" }}>✕</button></div>
              <input placeholder="Nombre del proyecto" value={p.titulo}
                onChange={e=>setForm(f=>({...f,portfolio:f.portfolio.map((x,j)=>j===i?{...x,titulo:e.target.value}:x)}))}
                style={{ width:"100%", background:C.white, border:`1px solid ${C.border}`, borderRadius:7, padding:"8px 11px", fontSize:12, fontFamily:C.ff, color:C.dark, outline:"none" }}/>
            </Card>
          ))}
          <button onClick={()=>setForm(f=>({...f,portfolio:[...f.portfolio,{titulo:""}]}))}
            style={{ background:`${C.or}08`, border:`2px dashed ${C.or}44`, borderRadius:10, padding:12, color:C.or, fontWeight:700, cursor:"pointer", fontFamily:C.ff, fontSize:13 }}>+ Agregar trabajo</button>
          <div style={{ display:"flex", gap:10 }}>
            <Btn outline onClick={()=>setRegStep(1)} sm>← Atrás</Btn>
            <Btn full onClick={()=>setView("dashboard")} disabled={form.portfolio.length<(tipo==="estudiante"?3:5)}>ENVIAR PERFIL 🚀</Btn>
          </div>
        </div>
      )}
    </div>
  );

  // Dashboard profesional
  const misDisponibles = [{tarifa:TARIFAS[4],precioCliente:2200000,plazo:"12 días"},{tarifa:TARIFAS[0],precioCliente:15000000,plazo:"15 días"},{tarifa:TARIFAS[6],precioCliente:400000,plazo:"3 días"}];

  const NAV_P=[["misiones","🎯","MISIONES"],["activas","⚡","ACTIVAS"],["perfil","👤","PERFIL"]];
  return (
    <div>
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:"rgba(255,255,255,0.97)", borderTop:`1px solid ${C.border}`, display:"flex", padding:"10px 0 20px", backdropFilter:"blur(20px)", zIndex:100 }}>
        {NAV_P.map(([id,icon,label])=>(
          <button key={id} onClick={()=>setNavTab(id)} style={{ flex:1, background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, color:navTab===id?C.or:C.muted, fontFamily:C.fm, transition:"color 0.2s" }}>
            <span style={{ fontSize:18 }}>{icon}</span>
            <span style={{ fontSize:8, fontWeight:700, letterSpacing:1 }}>{label}</span>
            {navTab===id&&<div style={{ width:12, height:2, borderRadius:2, background:C.or }}/>}
          </button>
        ))}
      </div>
      <div style={{ paddingBottom:80 }}>
        {navTab==="misiones"&&(
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div><div style={{ fontFamily:C.ff, fontWeight:800, fontSize:20, color:C.dark }}>Misiones disponibles</div><div style={{ color:C.muted, fontSize:12 }}>Solo ves lo que cobrás vos (50%)</div></div>
            <Card style={{ background:`${C.re}06`, borderColor:`${C.re}30`, padding:"10px 14px" }}>
              <div style={{ fontFamily:C.fm, fontSize:10, color:C.re }}>⚠️ El precio al cliente es confidencial. Solo ves tu 50%.</div>
            </Card>
            {misDisponibles.map((m,i)=>(
              <Card key={i} style={{ cursor:"pointer" }} onClick={()=>{}}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                  <Badge color={segC(m.tarifa.seg)}>{segI(m.tarifa.seg)} {segL(m.tarifa.seg)}</Badge>
                  <span style={{ fontFamily:C.fm, fontSize:9, color:C.muted }}>{m.plazo}</span>
                </div>
                <div style={{ fontFamily:C.ff, fontWeight:800, color:C.dark, fontSize:15, marginBottom:4 }}>{m.tarifa.n}</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginTop:10 }}>
                  <div style={{ fontFamily:C.fm, fontSize:9, color:C.muted }}>VOS COBRÁS</div>
                  <div style={{ fontFamily:C.ff, fontWeight:900, color:C.gr, fontSize:22 }}>{fmtK(Math.round(m.precioCliente*SPLIT))}</div>
                </div>
              </Card>
            ))}
          </div>
        )}
        {navTab==="perfil"&&(
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <Card accent={C.or}>
              <div style={{ display:"flex", gap:14, marginBottom:16 }}>
                <Avatar name={form.nombre||"M"} size={60}/>
                <div>
                  <div style={{ fontFamily:C.ff, fontWeight:900, fontSize:16, color:C.dark }}>{form.nombre||"María González"}</div>
                  <div style={{ color:C.muted, fontSize:12, marginTop:2 }}>San Juan, Argentina</div>
                  <div style={{ display:"flex", gap:6, marginTop:6 }}>
                    <Badge color={C.or}>{tipo||"disenador"}</Badge>
                    <Badge color={C.gr}>✅ APROBADO</Badge>
                  </div>
                </div>
              </div>
              <div style={{ display:"flex", gap:10 }}>
                {[["18","MISIONES"],["4.7","PUNTAJE"],["$2.1M","GANADO"]].map(([v,l])=>(
                  <div key={l} style={{ flex:1, textAlign:"center", background:C.card2, borderRadius:9, padding:"10px 0" }}>
                    <div style={{ fontFamily:C.ff, fontWeight:900, color:C.or, fontSize:14 }}>{v}</div>
                    <div style={{ fontFamily:C.fm, fontSize:8, color:C.muted }}>{l}</div>
                  </div>
                ))}
              </div>
            </Card>
            <Card style={{ background:`${C.gr}08`, borderColor:`${C.gr}25` }}>
              <Label color={C.gr}>// REGLA 50/50</Label>
              <div style={{ color:C.mid, fontSize:12, lineHeight:1.8 }}>Plot Center opera la plataforma, consigue los clientes y garantiza el cobro. El 50% del precio es tuyo — siempre.</div>
              <div style={{ marginTop:10, padding:"7px 10px", background:C.white, borderRadius:8, border:`1px solid ${C.border}` }}>
                <div style={{ fontFamily:C.fm, fontSize:10, color:C.muted }}>⚡ Los sobrecargos de urgencia también se dividen 50/50.</div>
              </div>
            </Card>
          </div>
        )}
        {navTab==="activas"&&(
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ fontFamily:C.ff, fontWeight:800, fontSize:20, color:C.dark, marginBottom:4 }}>Mis Misiones</div>
            {MISIONES_DEMO.filter(m=>m.dis).map(m=>(
              <Card key={m.id}>
                <div style={{ display:"flex", gap:6, marginBottom:8 }}>
                  <Badge color={m.estado==="en_progreso"?C.or:m.estado==="entregada"?C.pu:C.gr}>{m.estado==="en_progreso"?"⚡ En progreso":m.estado==="entregada"?"📦 Entregada":"✅ Aprobada"}</Badge>
                  {m.sobrecargo>0&&<Badge color={C.ye}>⚡ Urgente</Badge>}
                </div>
                <div style={{ fontFamily:C.ff, fontWeight:800, color:C.dark, fontSize:14, marginBottom:4 }}>{m.titulo}</div>
                <div style={{ color:C.muted, fontSize:12, marginBottom:10 }}>Cliente: {m.cliente}</div>
                <Progress v={m.progreso} color={m.estado==="aprobada"?C.gr:C.or}/>
                <div style={{ display:"flex", justifyContent:"space-between", marginTop:10 }}>
                  <span style={{ fontFamily:C.fm, fontSize:9, color:C.muted }}>VOS COBRÁS</span>
                  <span style={{ fontFamily:C.ff, fontWeight:900, color:C.gr, fontSize:18 }}>{fmtK(Math.round(m.precioCliente*SPLIT))}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// MÓDULO MISIONES
// ══════════════════════════════════════════════════════════════
const ModMisiones = () => {
  const [sel,setSel]=useState(null);
  const [msgs,setMsgs]=useState([
    {de:"sistema",txt:"Misión activada.",ts:"10:00"},
    {de:"cliente",txt:"Hola, te mando el brief completo.",ts:"10:05"},
    {de:"dis",txt:"Perfecto, lo reviso y arranco hoy.",ts:"10:18"},
  ]);
  const [msg,setMsg]=useState("");
  const [blocked,setBlocked]=useState(false);
  const [tab,setTab]=useState("estado");
  const [stars,setStars]=useState({calidad:0,tiempo:0,comunicacion:0});
  const [rated,setRated]=useState(false);
  const chatRef=useRef();

  useEffect(()=>{ if(chatRef.current) chatRef.current.scrollTop=chatRef.current.scrollHeight; },[msgs,tab]);

  const sendMsg=()=>{
    if(!msg.trim())return;
    if(BLOCKED.some(p=>p.test(msg))){ setBlocked(true); setTimeout(()=>setBlocked(false),3000); return; }
    setMsgs(p=>[...p,{de:"cliente",txt:msg,ts:new Date().toLocaleTimeString("es-AR",{hour:"2-digit",minute:"2-digit"})}]);
    setMsg("");
  };

  if(sel) return (
    <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
      <button onClick={()=>setSel(null)} style={{ background:"none", border:"none", color:C.muted, cursor:"pointer", fontFamily:C.fm, fontSize:10, letterSpacing:1, marginBottom:14, display:"flex", alignItems:"center", gap:5, padding:0 }}>← VOLVER</button>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
        <div>
          <div style={{ fontFamily:C.fm, fontSize:9, color:C.muted, marginBottom:4 }}>{sel.id}</div>
          <div style={{ fontFamily:C.ff, fontWeight:900, fontSize:17, color:C.dark, marginBottom:8 }}>{sel.titulo}</div>
          <div style={{ display:"flex", gap:6 }}>
            <Badge color={sel.estado==="en_progreso"?C.or:sel.estado==="entregada"?C.pu:C.gr}>{sel.estado==="en_progreso"?"⚡ En progreso":sel.estado==="entregada"?"📦 Entregada":"✅ Aprobada"}</Badge>
            {sel.sobrecargo>0&&<Badge color={C.ye}>⚡ URGENTE</Badge>}
          </div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontFamily:C.fm, fontSize:9, color:C.muted, marginBottom:2 }}>PRECIO TOTAL</div>
          <div style={{ fontFamily:C.ff, fontWeight:900, color:C.or, fontSize:20 }}>{fmtK(sel.precioCliente)}</div>
          {sel.sobrecargo>0&&<div style={{ fontFamily:C.fm, fontSize:9, color:C.ye }}>incl. urgencia {fmtK(sel.sobrecargo)}</div>}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", borderBottom:`1px solid ${C.border}`, marginBottom:16 }}>
        {["estado","chat","archivos"].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{ flex:1, background:"none", border:"none", borderBottom:`2px solid ${tab===t?C.or:"transparent"}`, color:tab===t?C.or:C.muted, fontWeight:700, fontSize:10, padding:"10px 0", cursor:"pointer", fontFamily:C.fm, letterSpacing:1, transition:"all 0.2s" }}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ESTADO */}
      {tab==="estado"&&(
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <Card>
            <Label>// PROGRESO</Label>
            <div style={{ marginBottom:10 }}><Progress v={sel.progreso} color={sel.estado==="aprobada"?C.gr:C.or}/></div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {[["Cliente",sel.cliente],["Diseñador",sel.dis]].map(([l,v])=>(
                <div key={l} style={{ background:C.card2, borderRadius:8, padding:"10px 12px" }}>
                  <div style={{ fontFamily:C.fm, fontSize:8, color:C.muted, marginBottom:4 }}>{l.toUpperCase()}</div>
                  <div style={{ fontFamily:C.ff, fontWeight:700, color:C.dark, fontSize:12 }}>{v}</div>
                </div>
              ))}
            </div>
          </Card>

          {sel.sobrecargo>0&&(
            <Card style={{ background:`${C.ye}08`, borderColor:`${C.ye}35` }}>
              <Label color={C.ye}>// DESGLOSE — URGENCIA</Label>
              <Row l="Precio base" v={fmtK(sel.precioCliente-sel.sobrecargo)}/>
              <Row l="Sobrecargo 1.5×" v={fmtK(sel.sobrecargo)} vc={C.ye}/>
              <div style={{ display:"flex", justifyContent:"space-between", paddingTop:10, marginTop:4 }}>
                <span style={{ fontFamily:C.ff, fontWeight:800, color:C.dark }}>TOTAL</span>
                <span style={{ fontFamily:C.ff, fontWeight:900, color:C.or, fontSize:20 }}>{fmtK(sel.precioCliente)}</span>
              </div>
            </Card>
          )}

          {/* Rating */}
          {sel.estado==="aprobada"&&!rated&&(
            <Card style={{ background:`${C.gr}06`, borderColor:`${C.gr}30` }}>
              <Label color={C.gr}>// CALIFICAR DISEÑADOR</Label>
              {[["calidad","Calidad del trabajo","50%"],["tiempo","Puntualidad","30%"],["comunicacion","Comunicación","20%"]].map(([k,l,w])=>(
                <div key={k} style={{ marginBottom:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                    <span style={{ color:C.dark, fontSize:12, fontWeight:600 }}>{l}</span>
                    <span style={{ fontFamily:C.fm, fontSize:9, color:C.or }}>{w}</span>
                  </div>
                  <div style={{ display:"flex", gap:6 }}>
                    {[1,2,3,4,5].map(n=>(
                      <span key={n} onClick={()=>setStars(s=>({...s,[k]:n}))} style={{ fontSize:24, cursor:"pointer", color:stars[k]>=n?C.or:"#DDE1E7", transition:"color 0.15s" }}>★</span>
                    ))}
                  </div>
                </div>
              ))}
              <Btn full onClick={()=>setRated(true)} disabled={Object.values(stars).some(v=>v===0)}>ENVIAR CALIFICACIÓN ⭐</Btn>
            </Card>
          )}
          {rated&&<Card style={{ background:`${C.gr}06`, textAlign:"center", padding:28 }}><div style={{ fontSize:36 }}>⭐</div><div style={{ fontFamily:C.ff, fontWeight:800, color:C.gr, marginTop:10 }}>¡Gracias por calificar!</div></Card>}
        </div>
      )}

      {/* CHAT */}
      {tab==="chat"&&(
        <div style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 380px)" }}>
          <div ref={chatRef} style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column", gap:10, paddingBottom:12 }}>
            {msgs.map((m,i)=>{
              if(m.de==="sistema") return <div key={i} style={{ textAlign:"center" }}><span style={{ background:C.card2, borderRadius:20, padding:"3px 12px", fontFamily:C.fm, fontSize:9, color:C.muted }}>⚙ {m.txt}</span></div>;
              const isMe = m.de==="cliente";
              return (
                <div key={i} style={{ display:"flex", justifyContent:isMe?"flex-end":"flex-start", gap:8 }}>
                  {!isMe&&<Avatar name="D" size={28} color={C.bl}/>}
                  <div style={{ maxWidth:"72%" }}>
                    {!isMe&&<div style={{ fontFamily:C.fm, fontSize:8, color:C.muted, marginBottom:3 }}>DISEÑADOR</div>}
                    <div style={{ background:isMe?C.card2:`${C.or}08`, border:`1px solid ${isMe?C.border:`${C.or}25`}`, borderRadius:isMe?"12px 2px 12px 12px":"2px 12px 12px 12px", padding:"9px 12px" }}>
                      <div style={{ color:C.dark, fontSize:13, lineHeight:1.6 }}>{m.txt}</div>
                    </div>
                    <div style={{ fontFamily:C.fm, fontSize:9, color:C.muted, marginTop:2, textAlign:isMe?"right":"left" }}>{m.ts}</div>
                  </div>
                </div>
              );
            })}
            {blocked&&<div style={{ background:`${C.re}08`, border:`1px solid ${C.re}25`, borderRadius:10, padding:"12px 14px" }}>
              <div style={{ color:C.re, fontWeight:700, fontSize:13, marginBottom:4 }}>🚫 Mensaje bloqueado</div>
              <div style={{ color:C.muted, fontSize:12 }}>Los datos de contacto externo no están permitidos en el chat.</div>
            </div>}
          </div>
          <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:10 }}>
            <div style={{ display:"flex", gap:8, alignItems:"flex-end" }}>
              <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Escribí un mensaje..."
                onKeyDown={e=>{if(e.key==="Enter")sendMsg();}}
                style={{ flex:1, background:C.white, border:`1px solid ${C.border}`, borderRadius:9, padding:"10px 12px", fontSize:13, fontFamily:C.ff, color:C.dark, outline:"none" }}/>
              <button onClick={sendMsg} disabled={!msg.trim()} style={{ background:msg.trim()?C.or:C.border, border:"none", borderRadius:8, width:36, height:36, color:msg.trim()?"#fff":C.muted, cursor:msg.trim()?"pointer":"not-allowed", fontSize:16 }}>→</button>
            </div>
            <div style={{ fontFamily:C.fm, fontSize:9, color:C.muted, textAlign:"center", marginTop:5 }}>🔒 Contacto externo bloqueado automáticamente</div>
          </div>
        </div>
      )}

      {/* ARCHIVOS */}
      {tab==="archivos"&&(
        <Card style={{ textAlign:"center", padding:40 }}>
          {sel.estado==="entregada"||sel.estado==="aprobada"
            ? <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                <div style={{ width:44, height:44, borderRadius:10, background:`${C.or}12`, border:`1px solid ${C.or}25`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>📦</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:C.ff, fontWeight:700, color:C.dark, fontSize:13 }}>entrega_final_v2.zip</div>
                  <div style={{ color:C.muted, fontSize:11, fontFamily:C.fm }}>48MB · Entregado ayer</div>
                </div>
                <button style={{ background:C.or, border:"none", borderRadius:8, padding:"7px 13px", color:"#fff", fontWeight:800, cursor:"pointer", fontFamily:C.ff, fontSize:12 }}>↓</button>
              </div>
            : <><div style={{ fontSize:36, marginBottom:10 }}>📂</div><div style={{ color:C.muted, fontSize:13 }}>Sin archivos entregados aún</div></>
          }
        </Card>
      )}
    </div>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <div style={{ fontFamily:C.ff, fontWeight:800, fontSize:20, color:C.dark }}>Misiones</div>

      {/* KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
        {[{i:"⚡",v:MISIONES_DEMO.filter(m=>m.estado==="en_progreso").length,l:"ACTIVAS",c:C.or},
          {i:"📦",v:MISIONES_DEMO.filter(m=>m.estado==="entregada").length,l:"ENTREGAS",c:C.pu},
          {i:"✅",v:MISIONES_DEMO.filter(m=>m.estado==="aprobada").length,l:"OK",c:C.gr}
        ].map(s=>(
          <Card key={s.l} style={{ padding:12, textAlign:"center" }}>
            <div style={{ fontSize:18, marginBottom:4 }}>{s.i}</div>
            <div style={{ fontFamily:C.ff, fontWeight:900, color:s.c, fontSize:22 }}>{s.v}</div>
            <div style={{ fontFamily:C.fm, fontSize:8, color:C.muted, letterSpacing:1 }}>{s.l}</div>
          </Card>
        ))}
      </div>

      {MISIONES_DEMO.map(m=>{
        const eColor=m.estado==="en_progreso"?C.or:m.estado==="entregada"?C.pu:m.estado==="aprobada"?C.gr:C.bl;
        return (
          <Card key={m.id} onClick={()=>setSel(m)} style={{ cursor:"pointer" }} accent={eColor}>
            <div style={{ display:"flex", gap:6, marginBottom:8 }}>
              <Badge color={eColor}>{m.estado==="en_progreso"?"⚡":m.estado==="entregada"?"📦":m.estado==="aprobada"?"✅":"◉"} {m.estado.replace("_"," ")}</Badge>
              {m.sobrecargo>0&&<Badge color={C.ye}>⚡ Urgente</Badge>}
            </div>
            <div style={{ fontFamily:C.ff, fontWeight:800, color:C.dark, fontSize:14, marginBottom:4 }}>{m.titulo}</div>
            <div style={{ color:C.muted, fontSize:12, marginBottom:10 }}>👤 {m.cliente} {m.dis?`· 🎨 ${m.dis}`:""}</div>
            <Progress v={m.progreso} color={eColor}/>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:10 }}>
              <span style={{ fontFamily:C.fm, fontSize:9, color:C.muted }}>{m.id}</span>
              <div style={{ textAlign:"right" }}>
                {m.sobrecargo>0&&<div style={{ fontFamily:C.fm, fontSize:9, color:C.ye }}>+{fmtK(m.sobrecargo)} urgencia</div>}
                <div style={{ fontFamily:C.ff, fontWeight:900, color:C.or, fontSize:17 }}>{fmtK(m.precioCliente)}</div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// PANEL ADMIN
// ══════════════════════════════════════════════════════════════
const ModAdmin = () => {
  const [login,setLogin]=useState(false);
  const [pass,setPass]=useState("");
  const [passErr,setPassErr]=useState(false);
  const [tab,setTab]=useState("dashboard");
  const [toast,setToast]=useState(null);
  const [disState,setDisState]=useState(DISEÑADORES.map(d=>d.id===1||d.id===2||d.id===3||d.id===4?{...d,estado:"activo"}:{...d,estado:"pendiente"}));

  const totalIngresado = MISIONES_DEMO.filter(m=>m.estado==="aprobada").reduce((a,m)=>a+m.precioCliente,0);

  if(!login) return (
    <div style={{ display:"flex", flexDirection:"column", gap:20, paddingTop:20 }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ width:64, height:64, borderRadius:18, background:C.or, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#fff", fontSize:28, margin:"0 auto 16px" }}>P</div>
        <div style={{ fontFamily:C.ff, fontWeight:900, fontSize:20, color:C.dark, marginBottom:4 }}>Panel Admin</div>
        <div style={{ fontFamily:C.fm, fontSize:10, color:C.muted, letterSpacing:2 }}>// ACCESO RESTRINGIDO</div>
      </div>
      <Card>
        <Label color={C.re}>// SOLO PLOT CENTER SRL</Label>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Contraseña de administrador"
            onKeyDown={e=>{if(e.key==="Enter"){if(pass==="plotcenter2025")setLogin(true);else{setPassErr(true);setTimeout(()=>setPassErr(false),2000);}}}}
            style={{ width:"100%", background:C.white, border:`1.5px solid ${passErr?C.re:C.border}`, borderRadius:9, padding:"11px 13px", fontSize:14, fontFamily:C.ff, color:C.dark, outline:"none", transition:"border-color 0.2s" }}/>
          {passErr&&<div style={{ color:C.re, fontSize:12, fontFamily:C.fm }}>⚠ Contraseña incorrecta</div>}
          <Btn full size="lg" onClick={()=>{if(pass==="plotcenter2025")setLogin(true);else{setPassErr(true);setTimeout(()=>setPassErr(false),2000);}}}>INGRESAR →</Btn>
        </div>
        <div style={{ marginTop:12, color:C.muted, fontSize:11, fontFamily:C.fm, textAlign:"center" }}>Demo: plotcenter2025</div>
      </Card>
    </div>
  );

  const TABS_A=[["dashboard","📊","INICIO"],["misiones","⚡","MISIONES"],["disenadores","🎨","PROFES."],["finanzas","💰","FINANZAS"]];

  return (
    <div>
      {toast&&<Toast msg={toast} onClose={()=>setToast(null)} color={C.gr}/>}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:"rgba(255,255,255,0.97)", borderTop:`1px solid ${C.border}`, display:"flex", padding:"10px 0 20px", backdropFilter:"blur(20px)", zIndex:100 }}>
        {TABS_A.map(([id,icon,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{ flex:1, background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, color:tab===id?C.or:C.muted, fontFamily:C.fm, transition:"color 0.2s" }}>
            <span style={{ fontSize:18 }}>{icon}</span>
            <span style={{ fontSize:8, fontWeight:700, letterSpacing:1 }}>{label}</span>
            {tab===id&&<div style={{ width:12, height:2, borderRadius:2, background:C.or }}/>}
          </button>
        ))}
      </div>
      <div style={{ paddingBottom:80 }}>

        {tab==="dashboard"&&(
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ fontFamily:C.ff, fontWeight:800, fontSize:20, color:C.dark }}>Panel de Control</div>
            <Card accent={C.gr}>
              <Label color={C.gr}>// INGRESOS TOTALES — MISIONES COMPLETADAS</Label>
              <div style={{ fontFamily:C.ff, fontWeight:900, fontSize:40, color:C.gr, lineHeight:1, marginBottom:8 }}>{fmtK(totalIngresado)}</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <div style={{ background:`${C.or}08`, borderRadius:9, padding:12, textAlign:"center" }}>
                  <div style={{ fontFamily:C.fm, fontSize:9, color:C.or, marginBottom:4 }}>PLOT CENTER (50%)</div>
                  <div style={{ fontFamily:C.ff, fontWeight:900, color:C.or, fontSize:18 }}>{fmtK(Math.round(totalIngresado*0.5))}</div>
                </div>
                <div style={{ background:`${C.gr}08`, borderRadius:9, padding:12, textAlign:"center" }}>
                  <div style={{ fontFamily:C.fm, fontSize:9, color:C.gr, marginBottom:4 }}>PROFESIONALES (50%)</div>
                  <div style={{ fontFamily:C.ff, fontWeight:900, color:C.gr, fontSize:18 }}>{fmtK(Math.round(totalIngresado*0.5))}</div>
                </div>
              </div>
            </Card>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
              {[{i:"⚡",v:MISIONES_DEMO.filter(m=>m.estado==="en_progreso").length,l:"ACTIVAS",c:C.or},
                {i:"👥",v:disState.filter(d=>d.estado==="activo").length,l:"PROFES.",c:C.bl},
                {i:"⏳",v:disState.filter(d=>d.estado==="pendiente").length,l:"PENDIENTES",c:C.ye}
              ].map(s=>(
                <Card key={s.l} style={{ padding:12, textAlign:"center" }}>
                  <div style={{ fontSize:18 }}>{s.i}</div>
                  <div style={{ fontFamily:C.ff, fontWeight:900, color:s.c, fontSize:22 }}>{s.v}</div>
                  <div style={{ fontFamily:C.fm, fontSize:8, color:C.muted }}>{s.l}</div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {tab==="misiones"&&(
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ fontFamily:C.ff, fontWeight:800, fontSize:20, color:C.dark }}>Misiones — Vista Admin</div>
            <Card style={{ background:`${C.re}06`, borderColor:`${C.re}25` }}>
              <div style={{ fontFamily:C.fm, fontSize:10, color:C.re }}>🔒 El admin ve el precio TOTAL al cliente. El profesional nunca lo ve.</div>
            </Card>
            {MISIONES_DEMO.map(m=>{
              const eColor=m.estado==="en_progreso"?C.or:m.estado==="entregada"?C.pu:m.estado==="aprobada"?C.gr:C.bl;
              return (
                <Card key={m.id}>
                  <div style={{ display:"flex", gap:6, marginBottom:8 }}><Badge color={eColor}>{m.estado.replace("_"," ")}</Badge>{m.sobrecargo>0&&<Badge color={C.ye}>⚡ Urgente</Badge>}</div>
                  <div style={{ fontFamily:C.ff, fontWeight:800, color:C.dark, fontSize:14, marginBottom:8 }}>{m.titulo}</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                    <div style={{ background:C.card2, borderRadius:8, padding:"8px 10px", textAlign:"center" }}>
                      <div style={{ fontFamily:C.fm, fontSize:8, color:C.muted, marginBottom:3 }}>PRECIO CLIENTE</div>
                      <div style={{ fontFamily:C.ff, fontWeight:900, color:C.or, fontSize:13 }}>{fmtK(m.precioCliente)}</div>
                    </div>
                    <div style={{ background:`${C.or}08`, borderRadius:8, padding:"8px 10px", textAlign:"center" }}>
                      <div style={{ fontFamily:C.fm, fontSize:8, color:C.or, marginBottom:3 }}>PLOT CTR</div>
                      <div style={{ fontFamily:C.ff, fontWeight:900, color:C.or, fontSize:13 }}>{fmtK(Math.round(m.precioCliente*0.5))}</div>
                    </div>
                    <div style={{ background:`${C.gr}08`, borderRadius:8, padding:"8px 10px", textAlign:"center" }}>
                      <div style={{ fontFamily:C.fm, fontSize:8, color:C.gr, marginBottom:3 }}>PROFES.</div>
                      <div style={{ fontFamily:C.ff, fontWeight:900, color:C.gr, fontSize:13 }}>{fmtK(Math.round(m.precioCliente*0.5))}</div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {tab==="disenadores"&&(
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ fontFamily:C.ff, fontWeight:800, fontSize:20, color:C.dark }}>Profesionales</div>
            {disState.filter(d=>d.estado==="pendiente").length>0&&(
              <Card style={{ background:`${C.ye}08`, borderColor:`${C.ye}30` }}>
                <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:C.ye, flexShrink:0 }}/>
                  <div style={{ fontFamily:C.ff, fontWeight:700, color:C.ye, fontSize:14 }}>
                    {disState.filter(d=>d.estado==="pendiente").length} perfiles esperando validación
                  </div>
                </div>
              </Card>
            )}
            {disState.map(d=>(
              <Card key={d.id}>
                <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                  <Avatar name={d.n} size={44} color={segC(d.tipo)}/>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between" }}>
                      <div style={{ fontFamily:C.ff, fontWeight:800, color:C.dark, fontSize:14 }}>{d.n}</div>
                      <Badge color={d.estado==="activo"?C.gr:C.ye}>{d.estado==="activo"?"ACTIVO":"⏳ PEND."}</Badge>
                    </div>
                    <div style={{ display:"flex", gap:6, marginTop:4 }}>
                      <Badge color={segC(d.tipo)}>{segI(d.tipo)} {segL(d.tipo)}</Badge>
                      {d.pts>0&&<span style={{ color:C.or, fontSize:11, fontFamily:C.fm }}>★ {d.pts}</span>}
                      <span style={{ color:C.muted, fontSize:11 }}>{d.mis} misiones</span>
                    </div>
                    {d.estado==="pendiente"&&(
                      <div style={{ display:"flex", gap:8, marginTop:8 }}>
                        <button onClick={()=>{ setDisState(prev=>prev.map(x=>x.id===d.id?{...x,estado:"activo"}:x)); setToast("✅ Perfil aprobado"); }}
                          style={{ background:C.gr, border:"none", borderRadius:7, padding:"5px 12px", color:"#fff", fontWeight:700, cursor:"pointer", fontFamily:C.ff, fontSize:11 }}>✅ Aprobar</button>
                        <button onClick={()=>{ setDisState(prev=>prev.filter(x=>x.id!==d.id)); setToast("❌ Perfil rechazado"); }}
                          style={{ background:"transparent", border:`1px solid ${C.re}`, borderRadius:7, padding:"5px 12px", color:C.re, fontWeight:700, cursor:"pointer", fontFamily:C.ff, fontSize:11 }}>❌ Rechazar</button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab==="finanzas"&&(
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ fontFamily:C.ff, fontWeight:800, fontSize:20, color:C.dark }}>Finanzas</div>
            <Card accent={C.gr}>
              <Label color={C.gr}>// INGRESOS TOTALES</Label>
              <div style={{ fontFamily:C.ff, fontWeight:900, fontSize:36, color:C.gr, marginBottom:10 }}>{fmtK(totalIngresado)}</div>
              <Row l="Plot Center cobró (50%)"     v={fmtK(Math.round(totalIngresado*0.5))} vc={C.or}/>
              <Row l="Profesionales cobraron (50%)" v={fmtK(Math.round(totalIngresado*0.5))} vc={C.gr}/>
            </Card>
            <Card style={{ background:`${C.ye}08`, borderColor:`${C.ye}30` }}>
              <Label color={C.ye}>// INGRESOS POR URGENCIA (1.5×)</Label>
              {(() => {
                const totalSob = MISIONES_DEMO.reduce((a,m)=>a+(m.sobrecargo||0),0);
                return <>
                  <Row l="Total sobrecargo urgencia"      v={fmtK(totalSob)} vc={C.ye}/>
                  <Row l="Plot Center (50% sobrecargo)"   v={fmtK(Math.round(totalSob*0.5))} vc={C.or}/>
                  <Row l="Profesionales (50% sobrecargo)" v={fmtK(Math.round(totalSob*0.5))} vc={C.gr}/>
                </>;
              })()}
            </Card>
            <Card style={{ background:`${C.bl}06`, borderColor:`${C.bl}25`, cursor:"pointer" }}>
              <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                <div style={{ width:44, height:44, borderRadius:12, background:`${C.bl}12`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>🧾</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:C.ff, fontWeight:800, color:C.bl, fontSize:14 }}>Módulo Facturación ARCA</div>
                  <div style={{ color:C.muted, fontSize:12, marginTop:2 }}>Integrado con el sistema interno de Plot Center SRL</div>
                </div>
                <span style={{ color:C.bl, fontSize:20 }}>›</span>
              </div>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// APP SHELL
// ══════════════════════════════════════════════════════════════
export default function App() {
  const [module, setModule] = useState(null);

  const MODS = [
    { id:"cliente",     icon:"🏢", title:"Módulo Cliente",      sub:"Brief · Presupuesto · Urgencia · Publicar",     color:C.or,  comp:<ModCliente/> },
    { id:"profesional", icon:"🎨", title:"Módulo Profesional",  sub:"Diseñador · Community · Marketing · Portfolio",  color:C.bl,  comp:<ModProfesional/> },
    { id:"misiones",    icon:"⚡", title:"Módulo Misiones",     sub:"Chat · Entrega · Aprobación · Calificación",    color:C.pu,  comp:<ModMisiones/> },
    { id:"admin",       icon:"🛡️", title:"Panel Admin",         sub:"Dashboard · 50/50 · Validar · Finanzas",       color:C.gr,  comp:<ModAdmin/> },
  ];

  if (module) {
    const mod = MODS.find(m=>m.id===module);
    return (
      <div style={{ background:C.bg, minHeight:"100vh", fontFamily:C.ff }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');* {box-sizing:border-box;margin:0;padding:0;} body{background:${C.bg};} @keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}} input:focus,textarea:focus{outline:none;border-color:${C.or}!important;}`}</style>

        {/* Topbar */}
        <div style={{ position:"sticky", top:0, zIndex:50, background:"rgba(255,255,255,0.97)", borderBottom:`1px solid ${C.border}`, padding:"12px 18px", backdropFilter:"blur(20px)", display:"flex", justifyContent:"space-between", alignItems:"center", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:9, background:mod.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>{mod.icon}</div>
            <div>
              <div style={{ fontFamily:C.ff, fontWeight:900, fontSize:13, color:C.dark }}>{mod.title}</div>
              <div style={{ fontFamily:C.fm, fontSize:8, color:C.muted, letterSpacing:1 }}>PLOT φ · MOCKUP</div>
            </div>
          </div>
          <button onClick={()=>setModule(null)} style={{ background:C.card2, border:`1px solid ${C.border}`, borderRadius:8, padding:"6px 12px", color:C.mid, cursor:"pointer", fontFamily:C.fm, fontSize:9, letterSpacing:1 }}>← VOLVER</button>
        </div>

        <div style={{ padding:"20px 16px 30px", maxWidth:430, margin:"0 auto" }}>
          {mod.comp}
        </div>
      </div>
    );
  }

  // HUB
  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:C.ff }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');*{box-sizing:border-box;margin:0;padding:0;}body{background:${C.bg};} input:focus{outline:none;border-color:${C.or}!important;}`}</style>

      {/* Header */}
      <div style={{ background:C.navy, padding:"36px 24px 32px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 70% 50%,rgba(255,85,0,0.15),transparent 60%)", pointerEvents:"none" }}/>
        <div style={{ position:"relative" }}>
          <div style={{ fontFamily:C.fm, fontSize:9, color:`${C.or}99`, letterSpacing:3, marginBottom:10 }}>// PLOT CENTER SRL · MAYO 2026</div>
          <div style={{ fontFamily:C.ff, fontWeight:900, fontSize:28, color:"#fff", marginBottom:6 }}>
            Plot <span style={{ color:C.or }}>φ</span> — Mockup completo
          </div>
          <div style={{ color:"rgba(255,255,255,0.5)", fontSize:13, marginBottom:20 }}>Seleccioná un módulo para ver cómo funciona</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {["15 días para MVP","Clientes confirmados","Diseñadores listos"].map(t=>(
              <span key={t} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:20, padding:"4px 12px", fontFamily:C.fm, fontSize:10, color:"rgba(255,255,255,0.6)" }}>✓ {t}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding:"24px 16px", maxWidth:430, margin:"0 auto" }}>

        {/* La regla más importante */}
        <div style={{ background:`${C.re}08`, border:`1.5px solid ${C.re}25`, borderRadius:14, padding:"14px 18px", marginBottom:20 }}>
          <div style={{ color:C.re, fontWeight:700, fontSize:13, marginBottom:5 }}>🔒 La regla más importante</div>
          <div style={{ color:C.mid, fontSize:12, lineHeight:1.7 }}>
            <code style={{ background:`${C.re}12`, color:C.re, padding:"2px 6px", borderRadius:4, fontFamily:C.fm, fontSize:11 }}>precio_profesional = precio_cliente * 0.5</code>
            {" "}— Este cálculo vive en el backend. El frontend del profesional nunca recibe <code style={{ background:`${C.re}12`, color:C.re, padding:"2px 6px", borderRadius:4, fontFamily:C.fm, fontSize:11 }}>precio_cliente</code>.
          </div>
        </div>

        {/* Módulos */}
        <div style={{ fontFamily:C.fm, fontSize:9, color:C.muted, letterSpacing:2, marginBottom:12 }}>// MÓDULOS — TOCÁ PARA VER</div>
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:24 }}>
          {MODS.map(mod=>(
            <div key={mod.id} onClick={()=>setModule(mod.id)}
              style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:16, padding:"18px 20px", cursor:"pointer", display:"flex", gap:16, alignItems:"center", boxShadow:"0 1px 4px rgba(0,0,0,0.06)", transition:"all 0.2s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=mod.color;e.currentTarget.style.boxShadow=`0 4px 20px ${mod.color}20`;e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.06)";e.currentTarget.style.transform="none";}}>
              <div style={{ width:54, height:54, borderRadius:14, background:`${mod.color}12`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, border:`1px solid ${mod.color}20`, flexShrink:0 }}>{mod.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:C.ff, fontWeight:800, color:C.dark, fontSize:16, marginBottom:4 }}>{mod.title}</div>
                <div style={{ color:C.muted, fontSize:12 }}>{mod.sub}</div>
              </div>
              <div style={{ width:32, height:32, borderRadius:"50%", background:`${mod.color}12`, display:"flex", alignItems:"center", justifyContent:"center", color:mod.color, fontSize:16, flexShrink:0 }}>›</div>
            </div>
          ))}
        </div>

        {/* Reglas rápidas */}
        <div style={{ fontFamily:C.fm, fontSize:9, color:C.muted, letterSpacing:2, marginBottom:12 }}>// REGLAS DE NEGOCIO</div>
        <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
          {[
            ["50/50","Plot Center retiene siempre el 50%. El profesional nunca ve el precio al cliente.",C.or],
            ["Urgencia 1.5×","sobrecargo = días acortados × precio/día × 1.5. Validado con Diego.",C.ye],
            ["3 segmentos","Estudiante · Junior · Senior — cada uno con requisitos distintos.",C.bl],
            ["Chat bloqueado","Regex filtra teléfonos, emails, redes y links externos automáticamente.",C.re],
          ].map(([t,d,col])=>(
            <div key={t} style={{ display:"flex", gap:12, background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:"12px 14px" }}>
              <div style={{ width:8, height:8, borderRadius:2, background:col, flexShrink:0, marginTop:4 }}/>
              <div><div style={{ fontFamily:C.ff, fontWeight:700, color:C.dark, fontSize:13, marginBottom:2 }}>{t}</div><div style={{ color:C.muted, fontSize:12, lineHeight:1.6 }}>{d}</div></div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ background:C.card2, borderRadius:12, padding:"14px 16px", textAlign:"center" }}>
          <div style={{ fontFamily:C.fm, fontSize:10, color:C.or, letterSpacing:2, marginBottom:4 }}>PLOT φ · PLOT CENTER SRL</div>
          <div style={{ fontFamily:C.fm, fontSize:9, color:C.muted }}>San Juan, Argentina · Design · Print · Deliver</div>
        </div>

      </div>
    </div>
  );
}
