import { useState, useRef, useEffect } from "react";
import { supabase } from "./supabase";
import Login from "./Login";
import Biblia from "./Biblia";
import Devocional from "./Devocional";
import Estudo from "./Estudo";

import ComoEstou from "./ComoEstou";
const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#F8F7F3;--white:#fff;--ink:#17160F;--ink2:#3D3C35;
  --gold:#B8912A;--gold2:#D4A843;--gold-bg:rgba(184,145,42,0.08);
  --gold-border:rgba(184,145,42,0.25);--muted:#8A8980;--border:#E5E4DC;
  --surface:#F1F0EB;--green:#1E4035;--red:#8B1A1A;
  --shadow:0 2px 12px rgba(23,22,15,0.08);--shadow-lg:0 8px 40px rgba(23,22,15,0.13);
}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--ink);min-height:100vh}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:var(--border);border-radius:4px}
.shell{display:flex;min-height:100vh}

/* SIDEBAR */
.sidebar{width:230px;flex-shrink:0;background:var(--white);border-right:1px solid var(--border);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:100;overflow-y:auto}
.sb-logo{padding:24px 20px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px}
.cross{width:22px;height:22px;position:relative;flex-shrink:0}
.cross::before,.cross::after{content:'';position:absolute;background:var(--gold);border-radius:2px;left:50%;top:50%;transform:translate(-50%,-50%)}
.cross::before{width:3px;height:22px}.cross::after{width:16px;height:3px}
.brand{font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:700}
.brand span{color:var(--gold)}
.sb-body{flex:1;padding:12px 8px}
.sb-sec{font-size:9.5px;font-weight:600;letter-spacing:0.13em;text-transform:uppercase;color:var(--muted);padding:10px 12px 5px}
.nb{display:flex;align-items:center;gap:9px;width:100%;padding:9px 12px;border-radius:8px;border:none;background:none;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--ink2);cursor:pointer;transition:all 0.15s;text-align:left;margin-bottom:1px}
.nb:hover{background:var(--surface)}
.nb.on{background:var(--gold-bg);color:var(--gold);font-weight:500}
.nb-ic{font-size:15px;width:18px;text-align:center}
.sb-saves{padding:10px 8px;border-top:1px solid var(--border)}
.sb-saves-title{font-size:9.5px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);padding:0 10px 7px}
.save-item{padding:7px 10px;border-radius:6px;cursor:pointer;font-size:12px;color:var(--ink2);display:flex;align-items:center;justify-content:space-between;gap:6px;transition:background 0.15s}
.save-item:hover{background:var(--surface)}
.save-item-t{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}
.save-del{opacity:0;font-size:11px;color:var(--muted);background:none;border:none;cursor:pointer;padding:0 2px;flex-shrink:0}
.save-item:hover .save-del{opacity:1}

/* MAIN */
.main{margin-left:230px;flex:1;display:flex;flex-direction:column}
.page{max-width:780px;width:100%;margin:0 auto;padding:40px 32px 80px}

/* FORMS */
.f label{font-size:10.5px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted)}
.f input,.f select,.f textarea{background:var(--surface);border:1.5px solid var(--border);border-radius:9px;padding:11px 13px;font-family:'DM Sans',sans-serif;font-size:13.5px;color:var(--ink);outline:none;transition:all 0.2s;resize:none}
.f input:focus,.f select:focus,.f textarea:focus{border-color:var(--gold);background:var(--white);box-shadow:0 0 0 3px rgba(184,145,42,0.1)}
.f textarea{min-height:68px;line-height:1.6}
.chips{display:flex;gap:7px;flex-wrap:wrap}
.chip{padding:7px 15px;border-radius:100px;border:1.5px solid var(--border);background:none;font-family:'DM Sans',sans-serif;font-size:12.5px;color:var(--muted);cursor:pointer;transition:all 0.2s}
.chip:hover{border-color:var(--gold);color:var(--ink)}
.chip.on{background:var(--gold);border-color:var(--gold);color:#fff;font-weight:500}

/* BUTTONS */
.btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:14px;background:var(--ink);color:#fff;border:none;border-radius:11px;font-family:'DM Sans',sans-serif;font-size:14.5px;font-weight:500;cursor:pointer;transition:all 0.2s}
.btn:hover:not(:disabled){background:var(--green);transform:translateY(-1px);box-shadow:var(--shadow-lg)}
.btn:disabled{opacity:0.45;cursor:not-allowed;transform:none!important}
.btn2{display:inline-flex;align-items:center;center;gap:6px;padding:8px 16px;border:1.5px solid var(--border);background:none;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:12.5px;color:var(--muted);cursor:pointer;transition:all 0.2s}
.btn2:hover{border-color:var(--gold);color:var(--ink)}
.btn2.red:hover{border-color:var(--red);color:var(--red)}
.brow{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}

/* LOADER */
.loader{display:flex;flex-direction:column;align-items:center;gap:12px;padding:48px;animation:fu 0.3s ease both}
.ring{width:44px;height:44px;position:relative}
.ring::before,.ring::after{content:'';position:absolute;inset:0;border-radius:50%;border:2px solid transparent;border-top-color:var(--gold)}
.ring::before{animation:spin 1s linear infinite}
.ring::after{animation:spin 0.7s linear infinite reverse;inset:7px;border-top-color:var(--gold2)}
.loader p{font-size:12.5px;color:var(--muted);text-align:center;max-width:200px;line-height:1.6}
@keyframes spin{to{transform:rotate(360deg)}}

/* OUTPUT */
.out{margin-top:24px;animation:fu 0.5s ease both}
.otag{display:inline-block;font-size:10px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:var(--gold);background:var(--gold-bg);padding:3px 10px;border-radius:100px;margin-bottom:7px}
.otitle{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700;line-height:1.15;margin-bottom:4px}
.oref{font-size:14px;color:var(--muted);font-style:italic}
.obody{background:var(--surface);border-radius:12px;padding:28px;font-size:14px;line-height:2;color:var(--ink2);white-space:pre-wrap;word-break:break-word;margin-top:16px}
.prayer{background:var(--gold-bg);border:1px solid var(--gold-border);border-radius:10px;padding:18px 20px}
.prayer-label{font-size:9.5px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold);margin-bottom:8px}
.prayer-text{font-size:13.5px;line-height:1.8;color:var(--ink2);font-style:italic}
.pbox{background:var(--white);border:1px solid var(--border);border-radius:10px;padding:16px 20px;margin-top:14px}
.pbox-title{font-size:9.5px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);margin-bottom:10px}
.phrase{font-size:13px;color:var(--ink2);padding:7px 10px;border-radius:6px;cursor:pointer;transition:background 0.15s;border-bottom:1px solid var(--border)}
.phrase:last-child{border-bottom:none}
.phrase:hover{background:var(--surface);color:var(--ink)}
.phrase-hint{font-size:10px;color:var(--muted);margin-top:6px;text-align:right}

/* STRONG TOOLTIP */
.strong-word{border-bottom:1.5px dashed var(--gold);cursor:pointer;position:relative;display:inline}
.strong-word:hover{color:var(--gold)}
.strong-tt{display:none;position:absolute;left:50%;transform:translateX(-50%);top:calc(100% + 8px);background:var(--white);border:1px solid var(--border);border-radius:12px;padding:12px 14px;min-width:240px;max-width:280px;z-index:999;box-shadow:var(--shadow-lg);text-align:left}
.strong-word:hover .strong-tt{display:block}
.strong-heb{font-size:22px;font-family:serif;direction:rtl;text-align:right;color:var(--ink);margin-bottom:6px;display:block}
.strong-num{display:inline-block;background:var(--gold-bg);color:var(--gold);font-size:11px;font-weight:600;padding:2px 7px;border-radius:6px;margin-bottom:4px}
.strong-row{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-top:5px;padding-top:5px;border-top:1px solid var(--border)}
.strong-lbl{font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.04em;white-space:nowrap}
.strong-val{font-size:11px;color:var(--ink);text-align:right;max-width:160px}
.strong-ex{font-size:11px;color:var(--ink2);margin-top:6px;padding-top:6px;border-top:1px solid var(--border);line-height:1.5;font-style:italic}

/* BIBLIA */
.biblia-wrap{padding:0 4px}
.biblia-toprow{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.biblia-title{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;color:var(--ink)}
.ver-btn{display:flex;align-items:center;gap:6px;padding:6px 11px;border:1.5px solid var(--border);border-radius:8px;background:var(--surface);cursor:pointer;font-size:12px;font-weight:500;color:var(--ink);font-family:'DM Sans',sans-serif}
.ver-ch{width:7px;height:7px;border-right:1.5px solid var(--muted);border-bottom:1.5px solid var(--muted);transform:rotate(45deg) translateY(-1px);display:inline-block;transition:transform .2s}
.ver-ch.open{transform:rotate(-135deg) translateY(-1px)}
.ver-dd{position:absolute;top:calc(100% + 4px);right:0;background:var(--white);border:1px solid var(--border);border-radius:12px;min-width:240px;z-index:300;box-shadow:var(--shadow-lg)}
.dd-sec{padding:4px 0;border-bottom:1px solid var(--border)}
.dd-sec:last-child{border-bottom:none}
.dd-lbl{font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.06em;padding:6px 12px 2px}
.dd-item{display:flex;align-items:center;justify-content:space-between;padding:9px 12px;cursor:pointer;transition:background .1s}
.dd-item:hover{background:var(--surface)}
.dd-item.sel{background:var(--gold-bg)}
.dd-item.sel .dd-name{color:var(--gold)}
.dd-name{font-size:13px;font-weight:500;color:var(--ink)}
.dd-sub{font-size:11px;color:var(--muted)}
.dd-tag{font-size:10px;padding:2px 7px;border-radius:10px;background:var(--surface);color:var(--muted);font-weight:500;white-space:nowrap}
.dd-item.sel .dd-tag{background:var(--gold-bg);color:var(--gold)}
.biblia-search{display:flex;gap:6px;margin-bottom:10px}
.biblia-search input{flex:1;padding:8px 11px;border:1.5px solid var(--border);border-radius:8px;background:var(--surface);color:var(--ink);font-size:13px;outline:none;font-family:'DM Sans',sans-serif}
.biblia-search input:focus{border-color:var(--gold)}
.biblia-search button{padding:8px 14px;border:1.5px solid var(--border);border-radius:8px;background:var(--surface);color:var(--ink);font-size:13px;cursor:pointer;font-weight:500;font-family:'DM Sans',sans-serif}
.biblia-search button:hover{border-color:var(--gold);color:var(--gold)}
.refbar{display:flex;gap:5px;margin-bottom:12px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px;flex-wrap:wrap}
.rc{font-size:12px;color:var(--muted);padding:4px 10px;border-radius:10px;cursor:pointer;border:1.5px solid transparent;white-space:nowrap;transition:all .15s}
.rc:hover{border-color:var(--border)}
.rc.active{color:var(--gold);background:var(--gold-bg);font-weight:500;border-color:transparent}
.passage{font-size:15px;line-height:1.9;color:var(--ink)}
.passage-ref{font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-bottom:4px}
.passage-hint{font-size:11px;color:var(--muted);margin-bottom:12px;font-style:italic}
.verse{margin-bottom:4px}
.vnum{font-size:10px;font-weight:600;color:var(--muted);vertical-align:super;margin-right:3px}
.biblia-loading{display:flex;flex-direction:column;align-items:center;gap:8px;padding:32px;color:var(--muted);font-size:13px}
.biblia-empty{font-size:13px;color:var(--muted);padding:16px 0;text-align:center;font-style:italic}
.heb-notice{display:inline-flex;font-size:11px;padding:3px 10px;border-radius:10px;background:var(--gold-bg);color:var(--gold);margin-bottom:10px;font-weight:600}
.heb-grid-header{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding-bottom:6px;border-bottom:1px solid var(--border);margin-bottom:4px}
.heb-col-hdr{font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.05em}
.heb-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:8px 0;border-bottom:1px solid var(--border)}
.heb-row:last-child{border-bottom:none}
.heb-vnum{font-size:10px;font-weight:600;color:var(--muted);margin-bottom:2px}
.heb-pt{font-size:13px;color:var(--ink2);line-height:1.65}
.heb-text{font-size:17px;font-family:serif;direction:rtl;text-align:right;line-height:1.9;color:var(--ink)}
.heb-col-pt{}.heb-col-heb{}

/* DEVOCIONAL */
.dev-daypill{display:inline-block;font-size:11px;font-weight:500;background:rgba(30,64,53,0.1);color:var(--green);padding:3px 9px;border-radius:10px;margin-bottom:8px}
.dev-date{font-size:11px;font-weight:500;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px}
.dev-title{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:700;color:var(--ink);margin-bottom:3px;line-height:1.3}
.dev-ref{font-size:12px;color:var(--gold);margin-bottom:12px;font-weight:600}
.dev-verse{background:var(--surface);border-left:3px solid var(--gold);border-radius:0 8px 8px 0;padding:12px 14px;font-size:15px;line-height:1.75;color:var(--ink);margin-bottom:12px;font-style:italic}
.dev-text{font-size:14px;line-height:1.8;color:var(--ink2);margin-bottom:12px}
.dev-prayer{background:var(--gold-bg);border:1px solid var(--gold-border);border-radius:10px;padding:12px 14px;margin-bottom:12px}
.dev-prayer-lbl{font-size:10px;font-weight:600;color:var(--gold);text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px}
.dev-prayer-text{font-size:13px;line-height:1.7;color:var(--ink2);font-style:italic}
.dev-action{font-size:14px;color:var(--ink);font-weight:500;padding:10px 0;border-top:1px solid var(--border);margin-bottom:10px}
.dev-progress-bar{height:3px;background:var(--border);border-radius:2px;overflow:hidden}
.dev-progress-fill{height:100%;background:var(--gold);border-radius:2px}
.dev-progress-label{display:flex;justify-content:space-between;font-size:10px;color:var(--muted);margin-top:4px}

/* LIVE MODE */
.live-overlay{position:fixed;inset:0;background:var(--ink);z-index:1000;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 80px;cursor:pointer}
.live-ref{font-size:16px;color:var(--gold);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:20px;font-family:'DM Sans',sans-serif}
.live-title{font-family:'Cormorant Garamond',serif;font-size:clamp(36px,6vw,72px);font-weight:700;color:#fff;line-height:1.1;text-align:center;margin-bottom:32px}
.live-body{font-family:'Cormorant Garamond',serif;font-size:clamp(18px,2.5vw,28px);color:rgba(255,255,255,0.85);line-height:1.8;text-align:center;max-width:900px;white-space:pre-wrap}
.live-hint{position:absolute;bottom:24px;font-size:12px;color:rgba(255,255,255,0.3)}

/* TOAST */
.toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(8px);background:var(--ink);color:#fff;padding:10px 20px;border-radius:100px;font-size:13px;z-index:500;animation:toastIn 0.2s ease forwards}
@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
.dots{display:inline-flex;gap:4px;align-items:center}
.dots span{width:5px;height:5px;background:currentColor;border-radius:50%;animation:dot 1.2s ease infinite}
.dots span:nth-child(2){animation-delay:0.2s}.dots span:nth-child(3){animation-delay:0.4s}
@keyframes dot{0%,100%{opacity:0.3;transform:scale(0.7)}50%{opacity:1;transform:scale(1)}}
@keyframes fu{from{opacity:0;transform:translateY(13px)}to{opacity:1;transform:translateY(0)}}
@keyframes fi{from{opacity:0}to{opacity:1}}
@media(max-width:680px){
  .sidebar{display:none}.main{margin-left:0}
  .page{padding:16px 14px 60px}.obody{padding:18px}
}
`;

// â API â
async function ai(system, user, tokens = 2200) {
  const r = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: tokens,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });
  const d = await r.json();
  if (d.error) throw new Error(d.error.message);
  return d.content?.[0]?.text || "";
}

async function aiJSON(system, user, tokens = 1500) {
  const t = await ai(system + "\n\nRetorne APENAS JSON vÃ¡lido, sem markdown, sem texto extra.", user, tokens);
  try { return JSON.parse(t.replace(/```json|```/g, "").trim()); } catch { return null; }
}

// â PASTOR SYSTEM PROMPT â
const PS = `VocÃª Ã© um pastor-teÃ³logo cristocÃªntrico de altÃ­ssimo nÃ­vel, com o estilo combinado de:
- Renan Belas: profundidade exegÃ©tica, narrativa envolvente, frases que paralisam o coraÃ§Ã£o, linguagem poÃ©tica
- Raik Carmelo: ousadia profÃ©tica, confronto amoroso, apelos intensos, energia do EspÃ­rito Santo
- Luciano SubirÃ¡: clareza didÃ¡tica, humor contextualizado, ilustraÃ§Ãµes do cotidiano, teologia acessÃ­vel

REGRAS ABSOLUTAS:
+ Cristo Ã© sempre o centro e a resposta de tudo
+ Use a versÃ£o NVI da BÃ­blia SEMPRE
+ Frases de impacto que ficam gravadas no coraÃ§Ã£o
+ Profundidade teolÃ³gica com linguagem simples
+ Temas ILIMITADOS - qualquer assunto humano tem resposta no Evangelho`;

// â SUGGESTIONS â
function Suggestions({ onSelect }) {
  const list = [
    ["Ansiedade","Fp 4.6-7"],["PropÃ³sito de vida","Jr 29.11"],["PerdÃ£o","Mt 18.21-22"],
    ["FamÃ­lia","Js 24.15"],["Identidade em Cristo","Gl 2.20"],["FÃ© e dÃºvida","Mc 9.24"],
    ["Dinheiro e generosidade","Ml 3.10"],["Relacionamentos","1Co 13"],
    ["Sofrimento","Rm 8.28"],["Morte e ressurreiÃ§Ã£o","Jo 11.25"],
    ["Batalha espiritual","Ef 6.10-18"],["GraÃ§a","Ef 2.8-9"],
    ["OraÃ§Ã£o","Mt 6.9-13"],["Pecado e redenÃ§Ã£o","Is 1.18"],
    ["EsperanÃ§a","Rm 15.13"],["ServiÃ§o e vocaÃ§Ã£o","Cl 3.23-24"],
  ];
  return (
    <div className="chips">
      {list.map(([t,r])=>(
        <button key={t} className="chip" onClick={()=>onSelect(t,r)}>{t}</button>
      ))}
    </div>
  );
}

// â LIVE MODE â
function LiveMode({ sermon, onClose }) {
  return (
    <div className="live-overlay" onClick={onClose}>
      <div className="live-ref">{sermon.ref}</div>
      <div className="live-title">{sermon.title}</div>
      <div className="live-body">{sermon.text}</div>
      <div className="live-hint">Clique para sair do modo pregaÃ§Ã£o</div>
    </div>
  );
}

// â SERMON GENERATOR â
function SermonGen({ saves, setSaves, showToast }) {
  const [topic, setTopic] = useState("");
  const [ref, setRef] = useState("");
  const [dur, setDur] = useState("20");
  const [style, setStyle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sermon, setSermon] = useState(null);
  const [prayer, setPrayer] = useState("");
  const [phrases, setPhrases] = useState([]);
  const [live, setLive] = useState(false);

  const styles = ["EvangelÃ­stico","Expositivo","Devocional","ProfÃ©tico","TemÃ¡tico","Para jovens"];

  async function generate() {
    if (!topic) return;
    setLoading(true); setSermon(null); setPrayer(""); setPhrases([]);
    try {
      const sys = PS + `\n\nFormato de saÃ­da JSON:\n{"title":"...","ref":"...","text":"sermÃ£o completo aqui com introduÃ§Ã£o, 3 pontos, conclusÃ£o e apelo","prayer":"oraÃ§Ã£o de fechamento","phrases":["frase1","frase2","frase3","frase4","frase5"]}`;
      const prompt = `Gere um sermÃ£o cristocÃªntrico completo sobre: ${topic}${ref ? ` (referÃªncia: ${ref})` : ""}.
DuraÃ§Ã£o: ${dur} minutos. Estilo: ${style.length ? style.join(", ") : "balanceado"}.
O sermÃ£o deve ter introduÃ§Ã£o impactante, 3 pontos exegÃ©ticos, aplicaÃ§Ã£o prÃ¡tica e apelo ao Evangelho.`;
      const r = await aiJSON(sys, prompt, 2200);
      if (r) { setSermon(r); setPrayer(r.prayer||""); setPhrases(r.phrases||[]); }
    } catch(e) { showToast("Erro: " + e.message); }
    setLoading(false);
  }

  function handleSave() {
    if (!sermon) return;
    const s = { id: Date.now(), title: sermon.title, ref: sermon.ref, text: sermon.text, date: new Date().toLocaleDateString("pt-BR") };
    setSaves(p => [s, ...p.slice(0,19)]);
    showToast("SermÃ£o salvo!");
  }

  function copy() {
    if (!sermon) return;
    navigator.clipboard.writeText(`${sermon.title}\n${sermon.ref}\n\n${sermon.text}`);
    showToast("Copiado!");
  }

  return (
    <div className="page">
      <div className="f" style={{display:"grid",gap:14}}>
        <div style={{display:"grid",gap:4}}>
          <label>Tema ou passagem</label>
          <input value={topic} onChange={e=>setTopic(e.target.value)} onKeyDown={e=>e.key==="Enter"&&generate()} placeholder="Ex: Ansiedade, JoÃ£o 3.16, PropÃ³sito de vida..." />
        </div>
        <Suggestions onSelect={(t,r)=>{setTopic(t);setRef(r);}} />
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div style={{display:"grid",gap:4}}>
            <label>VersÃ­culo base (opcional)</label>
            <input value={ref} onChange={e=>setRef(e.target.value)} placeholder="Ex: Fp 4.13" />
          </div>
          <div style={{display:"grid",gap:4}}>
            <label>DuraÃ§Ã£o (minutos)</label>
            <select value={dur} onChange={e=>setDur(e.target.value)}>
              {["10","15","20","30","45","60"].map(d=><option key={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <div style={{display:"grid",gap:6}}>
          <label>Estilo do sermÃ£o</label>
          <div className="chips">
            {styles.map(s=><button key={s} className={`chip${style.includes(s)?" on":""}`} onClick={()=>setStyle(p=>p.includes(s)?p.filter(x=>x!==s):[...p,s])}>{s}</button>)}
          </div>
        </div>
        <button className="btn" onClick={generate} disabled={!topic||loading}>
          {loading?<><div className="dots"><span/><span/><span/></div>Construindo sermÃ£o cristocÃªntrico...</>:"â¦ Gerar SermÃ£o"}
        </button>
      </div>

      {loading && <div className="loader"><div className="ring"/><p>Construindo sermÃ£o cristocÃªntrico com frases de impacto...</p></div>}

      {sermon && !loading && (
        <div className="out">
          <div className="otag">â¦ SermÃ£o Â· NVI</div>
          <div className="otitle">{sermon.title}</div>
          {sermon.ref && <div className="oref">{sermon.ref}</div>}
          {prayer && (
            <div className="prayer" style={{marginTop:14}}>
              <div className="prayer-label">ð OraÃ§Ã£o de Abertura</div>
              <div className="prayer-text">{prayer}</div>
            </div>
          )}
          <div className="obody">{sermon.text}</div>
          {phrases.length > 0 && (
            <div className="pbox">
              <div className="pbox-title">â¦ Frases de Impacto â Clique para copiar</div>
              {phrases.map((p,i)=>(
                <div key={i} className="phrase" onClick={()=>{navigator.clipboard.writeText(`"${p}"`);showToast("Frase copiada!");}}>{p}</div>
              ))}
              <div className="phrase-hint">Clique para copiar cada frase</div>
            </div>
          )}
          <div className="brow">
            <button className="btn2" onClick={handleSave}>ð¾ Salvar</button>
            <button className="btn2" onClick={copy}>ð Copiar Tudo</button>
            <button className="btn2" onClick={()=>setLive(true)}>ðº Modo PregaÃ§Ã£o</button>
          </div>
        </div>
      )}
      {live && sermon && <LiveMode sermon={sermon} onClose={()=>setLive(false)}/>}
    </div>
  );
}

// â THEME SUGGESTIONS â
function ThemeSugg({ showToast }) {
  const [cat, setCat] = useState(""); const [loading, setLoading] = useState(false); const [items, setItems] = useState([]);
  const cats = ["FamÃ­lia","Jovens","PÃ¡scoa","Natal","Evangelismo","Crise","Identidade","MissÃµes","Batismo","Casamento"];
  async function gen() {
    if(!cat) return; setLoading(true); setItems([]);
    try {
      const r = await aiJSON(PS, `Liste 8 temas de sermÃ£o Ãºnicos e poderosos para: ${cat}. Formato: [{"tema":"...","ref":"...","gancho":"frase de abertura impactante"}]`, 800);
      if(r) setItems(r);
    } catch(e) { showToast("Erro: "+e.message); }
    setLoading(false);
  }
  return (
    <div className="page">
      <div className="f" style={{display:"grid",gap:14}}>
        <div style={{display:"grid",gap:6}}><label>Categoria</label>
          <div className="chips">{cats.map(c=><button key={c} className={`chip${cat===c?" on":""}`} onClick={()=>setCat(c)}>{c}</button>)}</div>
        </div>
        <button className="btn" onClick={gen} disabled={!cat||loading}>{loading?<><div className="dots"><span/><span/><span/></div>Buscando...</>:"â¦ Sugerir Temas"}</button>
      </div>
      {loading && <div className="loader"><div className="ring"/><p>Buscando temas...</p></div>}
      {items.length>0 && !loading && (
        <div className="out" style={{display:"grid",gap:10}}>
          {items.map((it,i)=>(
            <div key={i} style={{background:"var(--surface)",borderRadius:10,padding:"14px 16px",border:"1px solid var(--border)"}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,marginBottom:3}}>{it.tema}</div>
              <div style={{fontSize:11,color:"var(--gold)",fontWeight:600,marginBottom:6}}>{it.ref}</div>
              <div style={{fontSize:13,color:"var(--ink2)",fontStyle:"italic",lineHeight:1.6}}>{it.gancho}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// â VERSE SEARCH â
function VerseSearch({ showToast }) {
  const [q, setQ] = useState(""); const [loading, setLoading] = useState(false); const [res, setRes] = useState([]);
  async function search() {
    if(!q) return; setLoading(true); setRes([]);
    try {
      const r = await aiJSON(PS, `Encontre 5 versÃ­culos NVI mais relevantes para: "${q}". Formato: [{"ref":"...","text":"texto completo","why":"por que se aplica"}]`, 900);
      if(r) setRes(r);
    } catch(e) { showToast("Erro: "+e.message); }
    setLoading(false);
  }
  return (
    <div className="page">
      <div className="f" style={{display:"grid",gap:12}}>
        <div style={{display:"grid",gap:4}}><label>Buscar versÃ­culos</label>
          <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&search()} placeholder="Ex: ansiedade, perdÃ£o, cura, esperanÃ§a..."/>
        </div>
        <button className="btn" onClick={search} disabled={!q||loading}>{loading?<><div className="dots"><span/><span/><span/></div>Buscando...</>:"â¦ Buscar"}</button>
      </div>
      {loading && <div className="loader"><div className="ring"/><p>Buscando...</p></div>}
      {res.length>0 && !loading && (
        <div className="out" style={{display:"grid",gap:10}}>
          {res.map((v,i)=>(
            <div key={i} style={{background:"var(--surface)",borderRadius:10,padding:"14px 16px",border:"1px solid var(--border)"}}>
              <div style={{fontSize:11,color:"var(--gold)",fontWeight:600,marginBottom:6}}>{v.ref}</div>
              <div style={{fontSize:14,lineHeight:1.75,color:"var(--ink)",marginBottom:8,fontStyle:"italic"}}>"{v.text}"</div>
              <div style={{fontSize:12,color:"var(--muted)"}}>{v.why}</div>
              <button className="btn2" style={{marginTop:8}} onClick={()=>{navigator.clipboard.writeText(`${v.ref} â ${v.text}`);showToast("Copiado!");}}>ð Copiar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// â OUTLINE â
function Outline({ showToast }) {
  const [topic, setTopic] = useState(""); const [loading, setLoading] = useState(false); const [outline, setOutline] = useState(null);
  async function gen() {
    if(!topic) return; setLoading(true); setOutline(null);
    try {
      const r = await aiJSON(PS, `Crie um esboÃ§o completo de sermÃ£o sobre: ${topic}. Formato: {"title":"...","ref":"...","intro":"...","points":[{"title":"...","text":"...","verse":"..."}],"conclusion":"...","appeal":"..."}`, 1200);
      if(r) setOutline(r);
    } catch(e) { showToast("Erro: "+e.message); }
    setLoading(false);
  }
  return (
    <div className="page">
      <div className="f" style={{display:"grid",gap:12}}>
        <div style={{display:"grid",gap:4}}><label>Tema do esboÃ§o</label>
          <input value={topic} onChange={e=>setTopic(e.target.value)} onKeyDown={e=>e.key==="Enter"&&gen()} placeholder="Ex: A graÃ§a que transforma, JoÃ£o 3.16..."/>
        </div>
        <button className="btn" onClick={gen} disabled={!topic||loading}>{loading?<><div className="dots"><span/><span/><span/></div>Criando...</>:"â¦ Criar EsboÃ§o"}</button>
      </div>
      {loading && <div className="loader"><div className="ring"/><p>Criando esboÃ§o...</p></div>}
      {outline && !loading && (
        <div className="out">
          <div className="otag">â¦ EsboÃ§o</div>
          <div className="otitle">{outline.title}</div>
          {outline.ref && <div className="oref">{outline.ref}</div>}
          <div className="obody">
            <strong>IntroduÃ§Ã£o:</strong>\n{outline.intro}\n\n
            {outline.points?.map((p,i)=>`${i+1}. ${p.title}\n${p.text}\n(${p.verse})\n\n`).join("")}
            <strong>ConclusÃ£o:</strong>\n{outline.conclusion}\n\n
            <strong>Apelo:</strong>\n{outline.appeal}
          </div>
          <div className="brow">
            <button className="btn2" onClick={()=>{const t=`${outline.title}\n${outline.ref||""}\n\nIntroduÃ§Ã£o:\n${outline.intro}\n\n${outline.points?.map((p,i)=>`${i+1}. ${p.title}\n${p.text}\n(${p.verse})`).join("\n\n")}\n\nConclusÃ£o:\n${outline.conclusion}\n\nApelo:\n${outline.appeal}`;navigator.clipboard.writeText(t);showToast("Copiado!");}}>ð Copiar EsboÃ§o</button>
          </div>
        </div>
      )}
    </div>
  );
}

// â MAIN APP â
export default function App() {
  const [page, setPage] = useState("sermao");
  const [saves, setSaves] = useState(()=>{try{return JSON.parse(localStorage.getItem("pregar-saves")||"[]")}catch{return[]}});
  const [user, setUser] = useState(null);
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const nome = session.user.user_metadata?.nome || session.user.email.split("@")[0];
        const perfil = { nome, email: session.user.email };
        localStorage.setItem("pregar-user", JSON.stringify(perfil));
        setUser(perfil);
      } else {
        try {
          const saved = JSON.parse(localStorage.getItem("pregar-user") || "null");
          if (saved) setUser(saved);
        } catch {}
      }
      setAppLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const nome = session.user.user_metadata?.nome || session.user.email.split("@")[0];
        const perfil = { nome, email: session.user.email };
        localStorage.setItem("pregar-user", JSON.stringify(perfil));
        setUser(perfil);
      } else if (event === "SIGNED_OUT") {
        localStorage.removeItem("pregar-user");
        setUser(null);
      }
      setAppLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (appLoading) return (
    <div style={{minHeight:"100vh",background:"#FAFAF8",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16}}>
      <div style={{position:"relative",width:34,height:34}}>
        <div style={{position:"absolute",top:"50%",left:0,right:0,height:1.5,background:"#B8912A",transform:"translateY(-50%)"}}/>
        <div style={{position:"absolute",top:0,bottom:0,left:"50%",width:1.5,background:"#B8912A",transform:"translateX(-50%)"}}/>
      </div>
      <div style={{fontSize:13,color:"#9A998F"}}>Carregando...</div>
    </div>
  );

  if (!user) return <Login onLogin={u => setUser(u)} />;
  const [toast, setToast] = useState("");
  const [selSave, setSelSave] = useState(null);

  function showToast(msg) { setToast(msg); setTimeout(()=>setToast(""),2200); }

  function handleSaveSaves(s) {
    setSaves(s);
    localStorage.setItem("pregar-saves", JSON.stringify(s));
  }

  const nav = [
    {id:"sermao", ic:"â¦", label:"Gerar SermÃ£o"},
    {id:"temas", ic:"â", label:"Temas"},
    {id:"versiculos", ic:"â", label:"VersÃ­culos"},
    {id:"esboco", ic:"â", label:"EsboÃ§o"},
    {id:"biblia", ic:"ð", label:"BÃ­blia"},
    {id:"devocional", ic:"ð", label:"Devocional"},
    {id:"estudo", ic:"ð", label:"Estudo BÃ­blico"},
    {id:"comoestou", ic:"ð«", label:"Como estou me sentindo"},
  ];

  return (
    <>
      <style>{STYLE}</style>
      <div className="shell">
        <aside className="sidebar">
          <div className="sb-logo">
            <div className="cross"/>
            <div className="brand">Pregar<span>.app</span></div>
          </div>
              <div style={{padding:"10px 18px 12px",borderBottom:"1px solid var(--border)",background:"var(--surface)"}}>
                <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",color:"var(--muted)",marginBottom:2}}>
                  {(()=>{const h=new Date().getHours();return h<12?"Bom dia":h<18?"Boa tarde":"Boa noite";})()}!
                </div>
                <div style={{fontSize:14,fontWeight:700,color:"var(--ink)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span>{user?.nome?.split(" ")[0]}</span>
                  <button onClick={()=>{localStorage.removeItem("pregar-user");setUser(null);}} style={{fontSize:9,color:"var(--muted)",background:"none",border:"none",cursor:"pointer",fontFamily:"sans-serif",padding:0,opacity:0.6}}>sair</button>
                </div>
              </div>
          <div className="sb-body">
            <div className="sb-sec">Menu</div>
            {nav.map(n=>(
              <button key={n.id} className={`nb${page===n.id?" on":""}`} onClick={()=>{setPage(n.id);setSelSave(null);}}>
                <span className="nb-ic">{n.ic}</span>{n.label}
              </button>
            ))}
          </div>
          {saves.length>0 && (
            <div className="sb-saves">
              <div className="sb-saves-title">Salvos</div>
              {saves.map(s=>(
                <div key={s.id} className="save-item" onClick={()=>{setSelSave(s);setPage("saved");}}>
                  <span className="save-item-t">{s.title}</span>
                  <button className="save-del" onClick={e=>{e.stopPropagation();handleSaveSaves(saves.filter(x=>x.id!==s.id));showToast("Removido");}}>â</button>
                </div>
              ))}
            </div>
          )}
        </aside>
        <main className="main">
          {page==="sermao" && <SermonGen saves={saves} setSaves={handleSaveSaves} showToast={showToast}/>}
          {page==="temas" && <ThemeSugg showToast={showToast}/>}
          {page==="versiculos" && <VerseSearch showToast={showToast}/>}
          {page==="esboco" && <Outline showToast={showToast}/>}
          {page==="biblia" && <div className="page"><Biblia/></div>}
          {page==="devocional" && <div className="page"><Devocional/></div>}
                    {page==="estudo" && <div className="page"><Estudo/></div>}
          {page==="comoestou" && <div className="page"><ComoEstou/></div>}
          {page==="saved" && selSave && (
            <div className="page">
              <div className="out">
                <div className="otag">â¦ SermÃ£o Salvo Â· {selSave.date}</div>
                <div className="otitle">{selSave.title}</div>
                {selSave.ref && <div className="oref">{selSave.ref}</div>}
                <div className="obody">{selSave.text}</div>
                <div className="brow">
                  <button className="btn2" onClick={()=>{navigator.clipboard.writeText(`${selSave.title}\n${selSave.ref||""}\n\n${selSave.text}`);showToast("Copiado!");}}>ð Copiar</button>
                  <button className="btn2 red" onClick={()=>{handleSaveSaves(saves.filter(x=>x.id!==selSave.id));setSelSave(null);setPage("sermao");showToast("Removido");}}>ð Remover</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
