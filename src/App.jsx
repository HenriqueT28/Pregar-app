  const [user, setUser] = useState(null);
  const [appLoading, setAppLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [selSave, setSelSave] = useState(null);

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

  if (!user) return <Login onLogin={u => setUser(u)} />;port { supabase } from "./supabase";

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
.main{margin-left:230px;flex:1;min-height:100vh}
.topbar{background:var(--white);border-bottom:1px solid var(--border);padding:14px 28px;position:sticky;top:0;z-index:50}
.topbar-t{font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:600}
.topbar-s{font-size:11px;color:var(--muted);margin-top:1px}
.page{padding:28px;max-width:840px;margin:0 auto;padding-bottom:60px}

/* HERO */
.hero{text-align:center;padding:0 0 32px;animation:fu 0.5s ease both}
.badge{display:inline-flex;align-items:center;gap:6px;background:var(--gold-bg);border:1px solid var(--gold-border);border-radius:100px;padding:5px 14px;font-size:10.5px;color:var(--gold);font-weight:500;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:18px}
.hero h1{font-family:'Cormorant Garamond',serif;font-size:clamp(32px,5vw,50px);font-weight:300;line-height:1.1;margin-bottom:10px}
.hero h1 em{font-style:italic;color:var(--gold)}
.hero p{font-size:14.5px;color:var(--muted);max-width:460px;margin:0 auto;line-height:1.7;font-weight:300}

/* CARD */
.card{background:var(--white);border:1px solid var(--border);border-radius:16px;padding:28px;box-shadow:var(--shadow)}
.card+.card{margin-top:18px}

/* FORM */
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px}
.f{display:flex;flex-direction:column;gap:6px}
.f.full{grid-column:1/-1}
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
.btn2{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border:1.5px solid var(--border);background:none;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:12.5px;color:var(--muted);cursor:pointer;transition:all 0.2s}
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
.dots{display:inline-flex;gap:4px;align-items:center}
.dots span{width:5px;height:5px;background:currentColor;border-radius:50%;animation:dot 1.2s ease infinite}
.dots span:nth-child(2){animation-delay:0.2s}.dots span:nth-child(3){animation-delay:0.4s}
@keyframes dot{0%,100%{opacity:0.3;transform:scale(0.7)}50%{opacity:1;transform:scale(1)}}

/* OUTPUT */
.out{margin-top:24px;animation:fu 0.5s ease both}
.otag{display:inline-block;font-size:10px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:var(--gold);background:var(--gold-bg);padding:3px 10px;border-radius:100px;margin-bottom:7px}
.otitle{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700;line-height:1.15;margin-bottom:4px}
.oref{font-size:12.5px;color:var(--muted);font-style:italic}
.obody{background:var(--surface);border-radius:12px;padding:28px;font-size:14px;line-height:2;color:var(--ink2);white-space:pre-wrap;word-break:break-word;margin-top:16px}

/* PHRASES */
.pbox{margin-top:14px;border:1px solid var(--gold-border);border-radius:12px;padding:20px;background:var(--gold-bg)}
.pbox-title{font-size:10.5px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold);margin-bottom:14px}
.phrase{border-left:3px solid var(--gold);padding:11px 14px;margin-bottom:10px;background:rgba(255,255,255,0.5);border-radius:0 9px 9px 0;font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:400;font-style:italic;color:var(--ink);line-height:1.4;cursor:pointer;transition:all 0.2s}
.phrase:hover{background:rgba(255,255,255,0.9);transform:translateX(2px)}
.phrase:last-child{margin-bottom:0}
.phrase-hint{font-size:10.5px;color:var(--gold);margin-top:6px;opacity:0.7}

/* PRAYER BOX */
.prayer{background:var(--gold-bg);border:1px solid var(--gold-border);border-radius:12px;padding:24px;text-align:center}
.prayer-label{font-size:10.5px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold);margin-bottom:14px}
.prayer-text{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:300;font-style:italic;line-height:1.7;color:var(--ink)}

/* SEARCH BAR */
.srow{display:flex;gap:8px;margin-bottom:20px;animation:fu 0.5s ease both}
.sinput{flex:1;background:var(--surface);border:1.5px solid var(--border);border-radius:11px;padding:12px 15px;font-family:'DM Sans',sans-serif;font-size:13.5px;color:var(--ink);outline:none;transition:all 0.2s}
.sinput:focus{border-color:var(--gold);background:var(--white)}
.sbtn{padding:12px 22px;background:var(--ink);color:#fff;border:none;border-radius:11px;font-family:'DM Sans',sans-serif;font-size:13.5px;font-weight:500;cursor:pointer;transition:all 0.2s;white-space:nowrap}
.sbtn:hover:not(:disabled){background:var(--green)}
.sbtn:disabled{opacity:0.45;cursor:not-allowed}

/* SUGGESTIONS */
.sug-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px}
.sug{background:var(--white);border:1.5px solid var(--border);border-radius:12px;padding:18px;cursor:pointer;transition:all 0.2s;position:relative;overflow:hidden}
.sug::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--gold),transparent);opacity:0;transition:opacity 0.2s}
.sug:hover{border-color:var(--gold-border);transform:translateY(-2px);box-shadow:var(--shadow)}
.sug:hover::after{opacity:1}
.sug-cat{font-size:9.5px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold);margin-bottom:6px}
.sug-t{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:700;margin-bottom:5px;line-height:1.25}
.sug-v{font-size:11px;color:var(--gold);margin-bottom:7px;font-weight:500}
.sug-d{font-size:11.5px;color:var(--muted);line-height:1.6}

/* VERSE */
.vres{background:var(--surface);border-radius:12px;padding:26px;animation:fu 0.4s ease both}
.vlab{font-size:10px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:var(--gold);margin-bottom:11px}
.vmean{font-size:13.5px;color:var(--ink2);line-height:1.9;border-top:1px solid var(--border);padding-top:16px;white-space:pre-wrap}

/* ILLUS */
.illus-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px}
.illus{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:20px;cursor:pointer;transition:all 0.2s}
.illus:hover{border-color:var(--gold-border);box-shadow:var(--shadow)}
.illus-type{font-size:9.5px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-bottom:7px}
.illus-title{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:700;margin-bottom:7px}
.illus-text{font-size:12.5px;color:var(--ink2);line-height:1.7}
.illus-moral{font-size:11.5px;color:var(--gold);margin-top:9px;font-style:italic;border-top:1px solid var(--border);padding-top:9px}

/* SERIES */
.ser-card{background:var(--white);border:1.5px solid var(--border);border-radius:12px;padding:20px;margin-bottom:12px;cursor:pointer;transition:all 0.2s}
.ser-card:hover{border-color:var(--gold-border);box-shadow:var(--shadow)}
.ser-n{font-size:9.5px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold);margin-bottom:5px}
.ser-t{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;margin-bottom:3px}
.ser-m{font-size:11.5px;color:var(--muted)}
.ser-exp{background:var(--surface);border-radius:9px;padding:18px;margin-top:12px;font-size:13px;line-height:1.8;white-space:pre-wrap}

/* ANALYSIS */
.scores{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:20px}
.sbox{flex:1;min-width:110px;background:var(--surface);border-radius:11px;padding:14px 18px;text-align:center}
.snum{font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:700;line-height:1}
.snum.hi{color:var(--green)}.snum.mid{color:var(--gold)}.snum.lo{color:var(--red)}
.slabel{font-size:10.5px;color:var(--muted);margin-top:4px}
.atext{background:var(--surface);border-radius:11px;padding:22px;font-size:13.5px;line-height:1.9;white-space:pre-wrap;color:var(--ink2)}

/* LIVE */
.live{position:fixed;inset:0;background:#0C0B07;z-index:1000;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;animation:fi 0.4s ease}
.live-bar{position:absolute;top:0;left:0;right:0;background:rgba(184,145,42,0.08);border-bottom:1px solid rgba(184,145,42,0.18);padding:11px 26px;display:flex;align-items:center;justify-content:space-between}
.live-badge{font-size:10px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:var(--gold2);display:flex;align-items:center;gap:7px}
.live-dot{width:6px;height:6px;background:#E53E3E;border-radius:50%;animation:lp 1s ease infinite}
@keyframes lp{0%,100%{opacity:1}50%{opacity:0.2}}
.live-x{background:none;border:1px solid rgba(255,255,255,0.13);color:rgba(255,255,255,0.55);padding:5px 13px;border-radius:7px;font-family:'DM Sans',sans-serif;font-size:12.5px;cursor:pointer;transition:all 0.2s}
.live-x:hover{color:#fff;border-color:rgba(255,255,255,0.4)}
.live-title{font-family:'Cormorant Garamond',serif;font-size:17px;color:rgba(212,168,67,0.7);text-align:center;margin-bottom:28px;font-style:italic}
.live-text{font-family:'Cormorant Garamond',serif;font-weight:300;color:#F4EFE6;line-height:1.75;text-align:center;max-width:800px;overflow-y:auto;max-height:62vh;scrollbar-width:thin;scrollbar-color:rgba(184,145,42,0.3) transparent}
.live-ctrls{position:absolute;bottom:22px;display:flex;gap:12px;align-items:center}
.live-c{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.65);padding:9px 18px;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:12.5px;cursor:pointer;transition:all 0.2s}
.live-c:hover{background:rgba(184,145,42,0.18);border-color:var(--gold2);color:#fff}

/* MISC */
.empty{text-align:center;padding:50px 20px;color:var(--muted);font-size:13.5px}
.empty-ic{font-size:34px;margin-bottom:11px;opacity:0.45}
.toast{position:fixed;bottom:22px;right:22px;background:var(--ink);color:#fff;padding:11px 18px;border-radius:9px;font-size:12.5px;font-weight:500;z-index:9999;animation:toastIn 0.3s ease;box-shadow:var(--shadow-lg)}
@keyframes toastIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes fu{from{opacity:0;transform:translateY(13px)}to{opacity:1;transform:translateY(0)}}
@keyframes fi{from{opacity:0}to{opacity:1}}

@media(max-width:680px){
  .sidebar{display:none}.main{margin-left:0}
  .grid2{grid-template-columns:1fr}.card{padding:18px 14px}
  .page{padding:16px 14px 60px}.obody{padding:18px}
}
`;

// ── API ──────────────────────────────────────────────────────────────────────
async function ai(system, user, tokens = 2200) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
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
  const t = await ai(system + "\n\nRetorne APENAS JSON válido, sem markdown, sem texto extra.", user, tokens);
  try { return JSON.parse(t.replace(/```json|```/g, "").trim()); } catch { return null; }
}

// ── PASTOR SYSTEM PROMPT ─────────────────────────────────────────────────────
const PS = `Você é um pastor-teólogo cristocêntrico de altíssimo nível, com o estilo combinado de:
- Renan Belas: profundidade exegética, narrativa envolvente, frases que paralisam o coração, linguagem poética
- Raik Carmelo: ousadia profética, confronto amoroso, apelos intensos, energia do Espírito Santo
- Luciano Subirá: clareza didática, humor contextualizado, ilustrações do cotidiano, teologia acessível

REGRAS ABSOLUTAS:
✦ Cristo é sempre o centro e a resposta de tudo
✦ Use a versão NVI da Bíblia SEMPRE
✦ Frases de impacto que ficam gravadas no coração
✦ Profundidade teológica com linguagem simples
✦ Temas ILIMITADOS — qualquer assunto humano tem resposta no Evangelho
✦ Nunca seja superficial ou genérico`;

const DURATIONS = ["20 min","30 min","45 min","60 min","90 min","Livre"];
const AUDIENCES = ["Congregação geral","Jovens","Crianças","Casais","Líderes","Evangelístico","Enlutados","Recém-convertidos","Células"];
const STORAGE_KEY = "pregar_v2";

function load() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; } }
function save(arr) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); } catch {} }

// ── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ msg }) {
  if (!msg) return null;
  return <div className="toast">✦ {msg}</div>;
}

// ── DOTS LOADER ──────────────────────────────────────────────────────────────
function Dots() { return <div className="dots"><span/><span/><span/></div>; }

// ── LIVE MODE ────────────────────────────────────────────────────────────────
function LiveMode({ sermon, onClose }) {
  const [fs, setFs] = useState(30);
  const ref = useRef();
  return (
    <div className="live">
      <div className="live-bar">
        <div className="live-badge"><div className="live-dot"/>AO VIVO</div>
        <div style={{color:"rgba(255,255,255,0.5)",fontSize:13}}>{sermon.title}</div>
        <button className="live-x" onClick={onClose}>✕ Fechar</button>
      </div>
      <div className="live-title">{sermon.title} · {sermon.ref}</div>
      <div className="live-text" ref={ref} style={{fontSize:`${fs}px`}}>{sermon.text}</div>
      <div className="live-ctrls">
        <button className="live-c" onClick={()=>setFs(s=>Math.max(18,s-4))}>A−</button>
        <span style={{color:"rgba(255,255,255,0.35)",fontSize:12}}>{fs}px</span>
        <button className="live-c" onClick={()=>setFs(s=>Math.min(54,s+4))}>A+</button>
        <button className="live-c" onClick={()=>{if(ref.current)ref.current.scrollTop=0}}>⬆ Início</button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// GENERATOR
// ══════════════════════════════════════════════════════════════════════════════
function Generator({ onSave, showToast }) {
  const [f, setF] = useState({ theme:"", passage:"", audience:"Congregação geral", duration:"45 min", emotion:"", notes:"" });
  const [loading, setLoading] = useState(false);
  const [sermon, setSermon] = useState(null);
  const [phrases, setPhrases] = useState([]);
  const [prayer, setPrayer] = useState("");
  const [live, setLive] = useState(false);
  const set = (k,v) => setF(p=>({...p,[k]:v}));

  const generate = async () => {
    if (!f.theme && !f.passage) return;
    setLoading(true); setSermon(null); setPhrases([]); setPrayer("");
    try {
      const text = await ai(PS, `Crie um SERMÃO COMPLETO E PODEROSO:
TEMA: ${f.theme||"(baseado na passagem)"}
PASSAGEM: ${f.passage||"(escolha a melhor para o tema)"}
PÚBLICO: ${f.audience} | DURAÇÃO: ${f.duration}
EMOÇÃO/CONTEXTO: ${f.emotion||"transformação e esperança"}
NOTAS: ${f.notes||"nenhuma"}

ESTRUTURA:
TÍTULO: [título poderoso]
TEXTO BASE: [versículo NVI]
PROPOSIÇÃO: [verdade central em 1 frase impactante]

INTRODUÇÃO:
[Gancho forte — história, paradoxo ou pergunta]
[Conexão com a realidade do ouvinte]
[Transição para o texto]

PONTO 1: [TÍTULO]
[Versículo NVI] | [Exegese acessível] | [Ilustração impactante]
FRASE DE IMPACTO: "..."
[Aplicação prática]

PONTO 2: [TÍTULO]
[mesma estrutura]

PONTO 3: [TÍTULO]
[mesma estrutura]

CONCLUSÃO E APELO:
[Retoma a proposição] | [Apelo emocional genuíno]
[Convite à transformação] | [Versículo final NVI]`, 2800);

      const titleLine = text.split("\n").find(l => l.match(/TÍTULO:/i));
      const refLine = text.split("\n").find(l => l.match(/TEXTO BASE:/i));
      const title = titleLine?.replace(/.*TÍTULO:\s*/i,"").trim() || f.theme || "Sermão";
      const ref = refLine?.replace(/.*TEXTO BASE:\s*/i,"").trim() || f.passage || "";

      setSermon({ title, ref, text, audience: f.audience, duration: f.duration, date: new Date().toLocaleDateString("pt-BR") });

      // Frases de impacto
      const pd = await aiJSON(PS, `Gere 6 FRASES DE IMPACTO MEMORÁVEIS sobre "${f.theme||f.passage}".
Estilo Renan Belas + Raik Carmelo + Luciano Subirá.
Frases que ficam no coração, vão para o status do WhatsApp, fazem chorar.
Poéticas, proféticas, curtas. JSON: [{"frase":"..."}]`, 700);
      if (pd) setPhrases(pd.map(p=>p.frase));

      // Oração
      const pr = await ai(PS, `Escreva uma oração de abertura poderosa para o sermão sobre "${f.theme||f.passage}". Máx 5 linhas genuínas. Só a oração, sem título.`, 350);
      setPrayer(pr);
    } catch(e) {
      setSermon({ title:"Erro ao gerar", ref:"", text:"Ocorreu um erro. Verifique sua conexão e tente novamente.", date:"" });
    }
    setLoading(false);
  };

  const handleSave = () => {
    if (!sermon) return;
    const saved = load();
    const entry = { id: Date.now(), ...sermon, phrases };
    save([entry, ...saved]);
    onSave?.();
    showToast("Sermão salvo com sucesso!");
  };

  const copy = () => {
    if (!sermon) return;
    navigator.clipboard.writeText(`${sermon.title}\n${sermon.ref}\n\n${sermon.text}\n\n═══ FRASES DE IMPACTO ═══\n${phrases.join("\n")}`);
    showToast("Copiado!");
  };

  return (
    <div className="page">
      <div className="hero">
        <div className="badge">✦ Cristocêntrico · NVI · Ilimitado</div>
        <h1>Pregue com <em>poder</em><br/>e transformação</h1>
        <p>Sermões completos no estilo Renan Belas, Raik Carmelo e Luciano Subirá — com frases que marcam o coração.</p>
      </div>
      <div className="card">
        <div className="grid2">
          <div className="f"><label>Tema do Sermão</label><input placeholder="Qualquer tema — sem limites!" value={f.theme} onChange={e=>set("theme",e.target.value)}/></div>
          <div className="f"><label>Passagem Bíblica</label><input placeholder="Ex: João 3:16, Romanos 8..." value={f.passage} onChange={e=>set("passage",e.target.value)}/></div>
          <div className="f"><label>Público-alvo</label>
            <select value={f.audience} onChange={e=>set("audience",e.target.value)}>{AUDIENCES.map(a=><option key={a}>{a}</option>)}</select>
          </div>
          <div className="f"><label>Emoção / Contexto</label><input placeholder="Ex: Páscoa, crise, avivamento..." value={f.emotion} onChange={e=>set("emotion",e.target.value)}/></div>
          <div className="f full"><label>Duração</label>
            <div className="chips">{DURATIONS.map(d=><button key={d} className={`chip ${f.duration===d?"on":""}`} onClick={()=>set("duration",d)}>{d}</button>)}</div>
          </div>
          <div className="f full"><label>Notas (opcional)</label><textarea placeholder="Contexto especial da igreja, evento, enfoque..." value={f.notes} onChange={e=>set("notes",e.target.value)}/></div>
        </div>
        <button className="btn" onClick={generate} disabled={loading||(!f.theme&&!f.passage)}>
          {loading ? <><Dots/> Gerando sermão...</> : "✦ Gerar Sermão Completo"}
        </button>
      </div>

      {loading && <div className="loader"><div className="ring"/><p>Construindo sermão cristocêntrico com frases de impacto...</p></div>}

      {sermon && !loading && (
        <div className="out">
          <div className="otag">✦ Sermão · NVI</div>
          <div className="otitle">{sermon.title}</div>
          {sermon.ref && <div className="oref">{sermon.ref}</div>}

          {prayer && (
            <div className="prayer" style={{marginTop:14}}>
              <div className="prayer-label">🙏 Oração de Abertura</div>
              <div className="prayer-text">{prayer}</div>
            </div>
          )}

          <div className="obody">{sermon.text}</div>

          {phrases.length > 0 && (
            <div className="pbox">
              <div className="pbox-title">✦ Frases de Impacto — Clique para copiar</div>
              {phrases.map((p,i)=>(
                <div key={i} className="phrase" onClick={()=>{navigator.clipboard.writeText(`"${p}"`);showToast("Frase copiada!");}}>"{p}"</div>
              ))}
              <div className="phrase-hint">Clique para copiar cada frase</div>
            </div>
          )}

          <div className="brow">
            <button className="btn2" onClick={handleSave}>💾 Salvar</button>
            <button className="btn2" onClick={copy}>📋 Copiar Tudo</button>
            <button className="btn2" onClick={()=>setLive(true)}>🎙 Modo Pregação</button>
          </div>
        </div>
      )}
      {live && sermon && <LiveMode sermon={sermon} onClose={()=>setLive(false)}/>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SUGGESTIONS
// ══════════════════════════════════════════════════════════════════════════════
function Suggestions({ showToast }) {
  const [ctx, setCtx] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const CATS = ["Fé","Graça","Sofrimento","Família","Missão","Identidade","Evangelismo","Santificação","Esperança","Oração","Dinheiro","Ansiedade","Morte","Avivamento","Jovens","Casamento","Luto","Perdão"];

  const gen = async (q) => {
    setLoading(true); setItems([]);
    try {
      const d = await aiJSON(PS, `Gere 12 sugestões de sermão cristocêntrico${q?` sobre "${q}"`:" — temas variados e ilimitados da vida humana"}.
Temas: qualquer assunto humano com resposta no Evangelho.
JSON: [{"tema":"...","versiculo":"...","categoria":"...","descricao":"..."}]`, 1600);
      if (d) setItems(d);
    } catch {} setLoading(false);
  };

  return (
    <div className="page">
      <div className="hero" style={{paddingBottom:26}}>
        <div className="badge">✦ Temas Ilimitados</div>
        <h1>Inspiração <em>infinita</em></h1>
        <p>Qualquer tema da vida humana pode ser pregado com o Evangelho.</p>
      </div>
      <div className="srow">
        <input className="sinput" placeholder="Tema, contexto ou categoria..." value={ctx} onChange={e=>setCtx(e.target.value)} onKeyDown={e=>e.key==="Enter"&&gen(ctx)}/>
        <button className="sbtn" onClick={()=>gen(ctx)} disabled={loading}>{loading?"...":"Gerar"}</button>
      </div>
      <div style={{marginBottom:18}}>
        <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--muted)",marginBottom:9}}>Explorar por categoria:</div>
        <div className="chips">{CATS.map(c=><button key={c} className="chip" onClick={()=>{setCtx(c);gen(c);}}>{c}</button>)}</div>
      </div>
      {loading && <div className="loader"><div className="ring"/><p>Gerando temas...</p></div>}
      {items.length>0 && (
        <div className="sug-grid">
          {items.map((it,i)=>(
            <div key={i} className="sug" onClick={()=>{navigator.clipboard.writeText(`${it.tema} — ${it.versiculo}`);showToast("Tema copiado!");}}>
              <div className="sug-cat">{it.categoria}</div>
              <div className="sug-t">{it.tema}</div>
              <div className="sug-v">{it.versiculo}</div>
              <div className="sug-d">{it.descricao}</div>
            </div>
          ))}
        </div>
      )}
      {!loading&&items.length===0&&<div className="empty"><div className="empty-ic">✦</div>Clique em "Gerar" ou escolha uma categoria</div>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// VERSES
// ══════════════════════════════════════════════════════════════════════════════
function Verses() {
  const [q,setQ]=useState(""); const [loading,setLoading]=useState(false); const [res,setRes]=useState(null);
  const search = async () => {
    if(!q.trim())return; setLoading(true); setRes(null);
    try {
      const text = await ai(PS+"\n\nVocê é exegeta especialista na NVI.", `PESQUISA BÍBLICA: "${q}"
1. Versículo(s) NVI com referência exata
2. Contexto histórico-cultural
3. Significado original e teologia cristocêntrica
4. Aplicação prática hoje
5. 4 versículos relacionados (NVI) com explicação
6. Uma frase de impacto pastoral sobre o texto`, 1800);
      setRes({q,text});
    } catch{} setLoading(false);
  };
  return (
    <div className="page">
      <div className="hero" style={{paddingBottom:26}}>
        <div className="badge">✦ Estudo Bíblico · NVI</div>
        <h1>As <em>Escrituras</em> abertas</h1>
        <p>Pesquise versículos ou temas com profundidade exegética e aplicação pastoral.</p>
      </div>
      <div className="srow">
        <input className="sinput" placeholder="Ex: João 3:16, graça, sofrimento, Salmo 23..." value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&search()}/>
        <button className="sbtn" onClick={search} disabled={loading||!q.trim()}>{loading?"...":"Pesquisar"}</button>
      </div>
      {loading&&<div className="loader"><div className="ring"/><p>Consultando as Escrituras...</p></div>}
      {res&&!loading&&<div className="vres"><div className="vlab">Resultado: {res.q}</div><div className="vmean">{res.text}</div></div>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// OUTLINE
// ══════════════════════════════════════════════════════════════════════════════
function Outline({ showToast }) {
  const [theme,setTheme]=useState(""); const [passage,setPassage]=useState("");
  const [loading,setLoading]=useState(false); const [out,setOut]=useState(null);
  const gen = async () => {
    if(!theme&&!passage)return; setLoading(true); setOut(null);
    try {
      const text = await ai(PS, `Esboço completo de sermão:
Tema: ${theme||"(da passagem)"} | Passagem: ${passage||"(escolha ideal)"}

TÍTULO: | TEXTO BASE (NVI): | PROPOSIÇÃO: | OBJETIVO:
ABERTURA: (gancho + contextualização + transição)
PONTO I — [TÍTULO]: Texto NVI | Exegese | Ilustração | Aplicação | "Frase de impacto"
PONTO II — [mesma estrutura]
PONTO III — [mesma estrutura]
CONCLUSÃO: Recapitulação | Apelo | Versículo final NVI
VERSÍCULOS DE SUPORTE: (6 versículos NVI)
ORAÇÃO SUGERIDA:`, 2000);
      setOut({text});
    } catch{} setLoading(false);
  };
  return (
    <div className="page">
      <div className="hero" style={{paddingBottom:26}}>
        <div className="badge">✦ Homilética</div>
        <h1>Esboço <em>pronto</em></h1>
        <p>Estrutura completa pronta para o púlpito.</p>
      </div>
      <div className="card">
        <div className="grid2">
          <div className="f"><label>Tema</label><input placeholder="Ex: O amor que não desiste" value={theme} onChange={e=>setTheme(e.target.value)}/></div>
          <div className="f"><label>Passagem</label><input placeholder="Ex: Romanos 8:31-39" value={passage} onChange={e=>setPassage(e.target.value)}/></div>
        </div>
        <button className="btn" onClick={gen} disabled={loading||(!theme&&!passage)}>
          {loading?<><Dots/> Estruturando...</>:"✦ Gerar Esboço Completo"}
        </button>
      </div>
      {loading&&<div className="loader"><div className="ring"/><p>Estruturando...</p></div>}
      {out&&!loading&&(
        <div style={{marginTop:20,animation:"fu 0.4s ease both"}}>
          <div className="brow" style={{marginBottom:12}}><button className="btn2" onClick={()=>{navigator.clipboard.writeText(out.text);showToast("Esboço copiado!");}}>📋 Copiar</button></div>
          <div className="card" style={{whiteSpace:"pre-wrap",fontSize:13.5,lineHeight:1.9}}>{out.text}</div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ILLUSTRATIONS
// ══════════════════════════════════════════════════════════════════════════════
function Illustrations({ showToast }) {
  const [topic,setTopic]=useState(""); const [loading,setLoading]=useState(false); const [items,setItems]=useState([]);
  const gen = async () => {
    if(!topic.trim())return; setLoading(true); setItems([]);
    try {
      const d = await aiJSON(PS, `8 ilustrações poderosas para sermão sobre "${topic}".
Tipos: histórias reais, metáforas do cotidiano, paradoxos, dados científicos, dilemas morais.
Estilo que arranca lágrimas e risadas. JSON: [{"tipo":"...","titulo":"...","texto":"...","moral":"..."}]`, 1800);
      if(d) setItems(d);
    } catch{} setLoading(false);
  };
  return (
    <div className="page">
      <div className="hero" style={{paddingBottom:26}}>
        <div className="badge">✦ Ilustrações</div>
        <h1>Histórias que <em>transformam</em></h1>
        <p>Histórias e metáforas poderosas que fazem o povo rir, chorar e encontrar Cristo.</p>
      </div>
      <div className="srow">
        <input className="sinput" placeholder="Ex: graça, perseverança, fé, amor de Deus..." value={topic} onChange={e=>setTopic(e.target.value)} onKeyDown={e=>e.key==="Enter"&&gen()}/>
        <button className="sbtn" onClick={gen} disabled={loading||!topic.trim()}>{loading?"...":"Gerar"}</button>
      </div>
      {loading&&<div className="loader"><div className="ring"/><p>Criando ilustrações...</p></div>}
      {items.length>0&&(
        <div className="illus-grid">
          {items.map((it,i)=>(
            <div key={i} className="illus" onClick={()=>{navigator.clipboard.writeText(`${it.titulo}\n\n${it.texto}\n\n💡 ${it.moral}`);showToast("Ilustração copiada!");}}>
              <div className="illus-type">{it.tipo}</div>
              <div className="illus-title">{it.titulo}</div>
              <div className="illus-text">{it.texto}</div>
              {it.moral&&<div className="illus-moral">💡 {it.moral}</div>}
            </div>
          ))}
        </div>
      )}
      {!loading&&items.length===0&&<div className="empty"><div className="empty-ic">📖</div>Digite um tema para gerar ilustrações</div>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SERIES
// ══════════════════════════════════════════════════════════════════════════════
function Series({ showToast }) {
  const [f,setF]=useState({title:"",book:"",weeks:"4",audience:"Congregação geral"});
  const [loading,setLoading]=useState(false); const [serie,setSerie]=useState(null); const [exp,setExp]=useState(null);
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  const gen = async () => {
    if(!f.title&&!f.book)return; setLoading(true); setSerie(null);
    try {
      const d = await aiJSON(PS, `Série de ${f.weeks} sermões cristocêntrica:
${f.title?`Título: "${f.title}"`:""}${f.book?`\nLivro: "${f.book}"`:""}
Público: ${f.audience}
JSON: {"serieTitulo":"...","serieDescricao":"...","sermoes":[{"numero":1,"titulo":"...","passagem":"...","proposicao":"...","pontos":["...","...","..."],"frase":"..."}]}`, 2000);
      if(d) setSerie(d);
    } catch{} setLoading(false);
  };
  return (
    <div className="page">
      <div className="hero" style={{paddingBottom:26}}>
        <div className="badge">✦ Séries</div>
        <h1>Séries que <em>discipulam</em></h1>
        <p>Plano completo de série de sermões conectados.</p>
      </div>
      <div className="card">
        <div className="grid2">
          <div className="f"><label>Título da Série</label><input placeholder="Ex: Raízes Profundas" value={f.title} onChange={e=>set("title",e.target.value)}/></div>
          <div className="f"><label>Livro Bíblico</label><input placeholder="Ex: Filipenses, João..." value={f.book} onChange={e=>set("book",e.target.value)}/></div>
          <div className="f"><label>Semanas</label>
            <div className="chips">{["4","6","8","12"].map(n=><button key={n} className={`chip ${f.weeks===n?"on":""}`} onClick={()=>set("weeks",n)}>{n} sem.</button>)}</div>
          </div>
          <div className="f"><label>Público</label>
            <select value={f.audience} onChange={e=>set("audience",e.target.value)}>{AUDIENCES.map(a=><option key={a}>{a}</option>)}</select>
          </div>
        </div>
        <button className="btn" onClick={gen} disabled={loading||(!f.title&&!f.book)}>
          {loading?<><Dots/> Planejando série...</>:"✦ Gerar Série Completa"}
        </button>
      </div>
      {loading&&<div className="loader"><div className="ring"/><p>Planejando série...</p></div>}
      {serie&&!loading&&(
        <div style={{marginTop:22,animation:"fu 0.4s ease both"}}>
          <div className="otag">✦ Série Gerada</div>
          <div className="otitle">{serie.serieTitulo}</div>
          <div className="oref" style={{marginBottom:20}}>{serie.serieDescricao}</div>
          {serie.sermoes?.map((s,i)=>(
            <div key={i} className="ser-card" onClick={()=>setExp(exp===i?null:i)}>
              <div className="ser-n">Sermão {s.numero} {exp===i?"▲":"▼"}</div>
              <div className="ser-t">{s.titulo}</div>
              <div className="ser-m">{s.passagem} · {s.proposicao}</div>
              {exp===i&&(
                <div className="ser-exp">
                  {s.pontos?.map((p,j)=>`${j+1}. ${p}`).join("\n")}
                  {s.frase&&`\n\n✦ "${s.frase}"`}
                </div>
              )}
            </div>
          ))}
          <button className="btn2" onClick={()=>{navigator.clipboard.writeText(serie.serieTitulo+"\n"+serie.sermoes?.map(s=>`${s.numero}. ${s.titulo} — ${s.passagem}`).join("\n"));showToast("Série copiada!");}}>📋 Copiar Série</button>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// IMPACT PHRASES
// ══════════════════════════════════════════════════════════════════════════════
function Phrases({ showToast }) {
  const [topic,setTopic]=useState(""); const [loading,setLoading]=useState(false); const [items,setItems]=useState([]);
  const gen = async () => {
    setLoading(true); setItems([]);
    try {
      const d = await aiJSON(PS, `15 FRASES DE IMPACTO no estilo Renan Belas + Raik Carmelo + Luciano Subirá.
${topic?`Tema: "${topic}"`:"Temas variados da vida cristã"}
Frases que paralisam o coração, ficam na memória, fazem chorar. Poéticas, proféticas, memoráveis.
JSON: [{"frase":"...","tema":"..."}]`, 1300);
      if(d) setItems(d);
    } catch{} setLoading(false);
  };
  return (
    <div className="page">
      <div className="hero" style={{paddingBottom:26}}>
        <div className="badge">✦ Frases de Impacto</div>
        <h1>Palavras que <em>paralisam</em></h1>
        <p>Frases poderosas para o púlpito, redes sociais e vida — clique para copiar.</p>
      </div>
      <div className="srow">
        <input className="sinput" placeholder="Tema opcional: graça, sofrimento, identidade..." value={topic} onChange={e=>setTopic(e.target.value)} onKeyDown={e=>e.key==="Enter"&&gen()}/>
        <button className="sbtn" onClick={gen} disabled={loading}>{loading?"...":"Gerar"}</button>
      </div>
      {loading&&<div className="loader"><div className="ring"/><p>Gerando frases de impacto...</p></div>}
      {items.length>0&&(
        <div style={{animation:"fu 0.4s ease both"}}>
          {items.map((p,i)=>(
            <div key={i} className="phrase" style={{marginBottom:10,fontSize:19}}
              onClick={()=>{navigator.clipboard.writeText(`"${p.frase}"`);showToast("Frase copiada!");}}>
              "{p.frase}"
              <div style={{fontSize:11,color:"var(--gold)",marginTop:5,fontFamily:"'DM Sans',sans-serif",fontStyle:"normal",fontWeight:500}}>{p.tema}</div>
            </div>
          ))}
        </div>
      )}
      {!loading&&items.length===0&&<div className="empty"><div className="empty-ic">✦</div>Clique em "Gerar" para criar frases de impacto</div>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PRAYER
// ══════════════════════════════════════════════════════════════════════════════
function Prayer({ showToast }) {
  const [f,setF]=useState({type:"abertura",ctx:"",moment:""});
  const [loading,setLoading]=useState(false); const [prayer,setPrayer]=useState("");
  const types=[{k:"abertura",l:"Abertura"},{k:"encerramento",l:"Encerramento"},{k:"ceia",l:"Santa Ceia"},{k:"batismo",l:"Batismo"},{k:"ungir",l:"Ungir doente"},{k:"casamento",l:"Casamento"},{k:"funeral",l:"Funeral"},{k:"intercession",l:"Intercessão"}];
  const gen = async () => {
    setLoading(true); setPrayer("");
    try {
      const text = await ai(PS, `Oração de ${f.type} — profunda, genuína, bíblica.
Contexto: ${f.ctx||"culto dominical"}${f.moment?`\nMomento especial: ${f.moment}`:""}
Máx 10 linhas. Só a oração.`, 500);
      setPrayer(text);
    } catch{} setLoading(false);
  };
  return (
    <div className="page">
      <div className="hero" style={{paddingBottom:26}}>
        <div className="badge">✦ Orações Pastorais</div>
        <h1>Orações que <em>tocam</em> o céu</h1>
        <p>Para cada momento especial do ministério — profundas e genuínas.</p>
      </div>
      <div className="card">
        <div className="f" style={{marginBottom:14}}><label>Tipo</label>
          <div className="chips">{types.map(t=><button key={t.k} className={`chip ${f.type===t.k?"on":""}`} onClick={()=>setF(p=>({...p,type:t.k}))}>{t.l}</button>)}</div>
        </div>
        <div className="grid2">
          <div className="f"><label>Contexto</label><input placeholder="Ex: Culto de domingo..." value={f.ctx} onChange={e=>setF(p=>({...p,ctx:e.target.value}))}/></div>
          <div className="f"><label>Momento especial</label><input placeholder="Ex: Alguém em tratamento..." value={f.moment} onChange={e=>setF(p=>({...p,moment:e.target.value}))}/></div>
        </div>
        <button className="btn" onClick={gen} disabled={loading}>{loading?<><Dots/> Orando...</>:"🙏 Gerar Oração"}</button>
      </div>
      {loading&&<div className="loader"><div className="ring"/><p>Gerando oração...</p></div>}
      {prayer&&!loading&&(
        <div className="prayer" style={{marginTop:20}}>
          <div className="prayer-label">🙏 {types.find(t=>t.k===f.type)?.l}</div>
          <div className="prayer-text">{prayer}</div>
          <div className="brow" style={{justifyContent:"center",marginTop:14}}>
            <button className="btn2" onClick={()=>{navigator.clipboard.writeText(prayer);showToast("Oração copiada!");}}>📋 Copiar</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ANALYSIS
// ══════════════════════════════════════════════════════════════════════════════
function Analysis() {
  const [text,setText]=useState(""); const [loading,setLoading]=useState(false); const [res,setRes]=useState(null);
  const analyze = async () => {
    if(!text.trim())return; setLoading(true); setRes(null);
    try {
      const d = await aiJSON(PS, `Analise este sermão como mentor pastoral:
"""${text}"""
JSON: {"cristocentricidade":{"nota":0,"feedback":""},"profundidade":{"nota":0,"feedback":""},"clareza":{"nota":0,"feedback":""},"aplicacao":{"nota":0,"feedback":""},"impacto":{"nota":0,"feedback":""},"sugestoes":["..."]}`, 1400);
      if(d) setRes(d);
    } catch{} setLoading(false);
  };
  const sc=(n)=>n>=80?"hi":n>=60?"mid":"lo";
  const crit=res?[{k:"cristocentricidade",l:"Cristocentricidade"},{k:"profundidade",l:"Profundidade"},{k:"clareza",l:"Clareza"},{k:"aplicacao",l:"Aplicação"},{k:"impacto",l:"Impacto"}]:[];
  return (
    <div className="page">
      <div className="hero" style={{paddingBottom:26}}>
        <div className="badge">✦ Análise Pastoral</div>
        <h1>Afie sua <em>pregação</em></h1>
        <p>Cole um sermão e receba análise com pontuação e sugestões de melhoria.</p>
      </div>
      <div className="card">
        <div className="f"><label>Cole seu sermão aqui</label>
          <textarea style={{minHeight:160}} placeholder="Cole o texto do sermão..." value={text} onChange={e=>setText(e.target.value)}/>
        </div>
        <button className="btn" style={{marginTop:14}} onClick={analyze} disabled={loading||!text.trim()}>
          {loading?<><Dots/> Analisando...</>:"✦ Analisar Pregação"}
        </button>
      </div>
      {loading&&<div className="loader"><div className="ring"/><p>Analisando com critérios pastorais...</p></div>}
      {res&&!loading&&(
        <div style={{marginTop:22,animation:"fu 0.4s ease both"}}>
          <div className="scores">{crit.map(c=><div key={c.k} className="sbox"><div className={`snum ${sc(res[c.k]?.nota)}`}>{res[c.k]?.nota}</div><div className="slabel">{c.l}</div></div>)}</div>
          <div className="atext">
            {crit.map(c=>`📊 ${c.l.toUpperCase()}: ${res[c.k]?.nota}/100\n${res[c.k]?.feedback}\n\n`).join("")}
            {res.sugestoes?.length>0&&`💡 SUGESTÕES:\n${res.sugestoes.map((s,i)=>`${i+1}. ${s}`).join("\n")}`}
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SAVED
// ══════════════════════════════════════════════════════════════════════════════
function Saved({ saved, onDelete, showToast }) {
  const [open,setOpen]=useState(null); const [live,setLive]=useState(null);
  if(!saved.length) return (
    <div className="page">
      <div className="hero"><div className="badge">✦ Biblioteca</div><h1>Biblioteca <em>vazia</em></h1><p>Gere e salve sermões para acessá-los aqui.</p></div>
      <div className="empty"><div className="empty-ic">📚</div>Nenhum sermão salvo ainda</div>
    </div>
  );
  return (
    <div className="page">
      <div className="hero" style={{paddingBottom:26}}>
        <div className="badge">✦ {saved.length} Sermão{saved.length>1?"s":""} Salvo{saved.length>1?"s":""}</div>
        <h1>Minha <em>biblioteca</em></h1>
      </div>
      {saved.map((s,i)=>(
        <div key={s.id} className="card" style={{marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12}}>
            <div style={{cursor:"pointer",flex:1}} onClick={()=>setOpen(open===i?null:i)}>
              <div className="otag">✦ {s.audience||"Sermão"} · {s.date}</div>
              <div className="otitle" style={{fontSize:22}}>{s.title}</div>
              {s.ref&&<div className="oref">{s.ref}</div>}
            </div>
            <div style={{display:"flex",gap:7,flexShrink:0}}>
              <button className="btn2" onClick={()=>setLive(s)}>🎙</button>
              <button className="btn2 red" onClick={()=>{onDelete(s.id);showToast("Removido");}}>🗑</button>
            </div>
          </div>
          {open===i&&(
            <div style={{marginTop:14}}>
              {s.phrases?.length>0&&(
                <div className="pbox">
                  <div className="pbox-title">✦ Frases de Impacto</div>
                  {s.phrases.map((p,j)=><div key={j} className="phrase" onClick={()=>{navigator.clipboard.writeText(`"${p}"`);showToast("Frase copiada!");}}>&ldquo;{p}&rdquo;</div>)}
                </div>
              )}
              <div className="obody">{s.text}</div>
              <div className="brow">
                <button className="btn2" onClick={()=>{navigator.clipboard.writeText(s.text);showToast("Copiado!");}}>📋 Copiar</button>
              </div>
            </div>
          )}
        </div>
      ))}
      {live&&<LiveMode sermon={live} onClose={()=>setLive(null)}/>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// APP SHELL
// ══════════════════════════════════════════════════════════════════════════════
const NAV = [
  {id:"generator",ic:"✦",label:"Gerar Sermão",sec:"Principal"},
  {id:"suggestions",ic:"💡",label:"Sugestões",sec:"Principal"},
  {id:"outline",ic:"📋",label:"Esboço",sec:"Principal"},
  {id:"series",ic:"📚",label:"Séries",sec:"Principal"},
  {id:"phrases",ic:"🔥",label:"Frases de Impacto",sec:"Ferramentas"},
  {id:"illustrations",ic:"🎭",label:"Ilustrações",sec:"Ferramentas"},
  {id:"verses",ic:"📖",label:"Versículos NVI",sec:"Ferramentas"},
  {id:"prayer",ic:"🙏",label:"Orações",sec:"Ferramentas"},
  {id:"analysis",ic:"📊",label:"Análise",sec:"Ferramentas"},
  {id:"saved",ic:"💾",label:"Meus Sermões",sec:"Biblioteca"},
];
const TITLES = {
  generator:{t:"Gerador de Sermão",s:"Cristocêntrico · NVI · Ilimitado"},
  suggestions:{t:"Sugestões de Temas",s:"Infinitos e sem limites"},
  outline:{t:"Esboço Completo",s:"Estrutura homilética pronta"},
  series:{t:"Séries de Sermões",s:"Planejamento por livro ou tema"},
  phrases:{t:"Frases de Impacto",s:"Palavras que marcam o coração"},
  illustrations:{t:"Banco de Ilustrações",s:"Histórias que transformam"},
  verses:{t:"Pesquisa Bíblica",s:"NVI com profundidade teológica"},
  prayer:{t:"Orações Pastorais",s:"Para cada momento especial"},
  analysis:{t:"Análise de Pregação",s:"Feedback pastoral profundo"},
  saved:{t:"Meus Sermões",s:"Biblioteca pessoal"},
};
const PAGES = {generator:Generator,suggestions:Suggestions,outline:Outline,series:Series,phrases:Phrases,illustrations:Illustrations,verses:Verses,prayer:Prayer,analysis:Analysis,saved:Saved};
const SECS = [...new Set(NAV.map(n=>n.sec))];

export default function App() {
  const [tab,setTab] = useState("generator");
  const [savedList,setSavedList] = useState(load);
  const [toast,setToast] = useState("");
  const toastRef = useRef();

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(()=>setToast(""),2800);
  };

  const refreshSaved = () => setSavedList(load());

  const handleDelete = (id) => {
    const updated = savedList.filter(s=>s.id!==id);
    setSavedList(updated);
    save(updated);
  };

  const Screen = PAGES[tab];
  const pg = TITLES[tab];

  return (
    <>
      <style>{STYLE}</style>
      <div className="shell">
        <aside className="sidebar">
          <div className="sb-logo">
            <div className="cross"/>
            <div>
              <div className="brand">Pregar<span>.app</span></div>
              <div style={{fontSize:9.5,color:"var(--muted)",letterSpacing:"0.1em",textTransform:"uppercase",marginTop:2}}>Pastor AI · NVI</div>
            </div>
          </div>
          <div className="sb-body">
            {SECS.map(sec=>(
              <div key={sec}>
                <div className="sb-sec">{sec}</div>
                {NAV.filter(n=>n.sec===sec).map(n=>(
                  <button key={n.id} className={`nb ${tab===n.id?"on":""}`} onClick={()=>setTab(n.id)}>
                    <span className="nb-ic">{n.ic}</span>{n.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="sb-saves">
            <div className="sb-saves-title">Salvos recentemente</div>
            {savedList.length===0
              ? <div style={{fontSize:12,color:"var(--muted)",padding:"2px 10px",fontStyle:"italic"}}>Nenhum salvo</div>
              : savedList.slice(0,5).map(s=>(
                  <div key={s.id} className="save-item" onClick={()=>setTab("saved")}>
                    <span className="save-item-t">{s.title}</span>
                    <button className="save-del" onClick={e=>{e.stopPropagation();handleDelete(s.id);showToast("Removido");}}>✕</button>
                  </div>
                ))
            }
          </div>
        </aside>

        <div className="main">
          <div className="topbar">
            <div className="topbar-t">{pg?.t}</div>
            <div className="topbar-s">{pg?.s}</div>
          </div>
          {tab==="saved"
            ? <Saved saved={savedList} onDelete={handleDelete} showToast={showToast}/>
            : <Screen onSave={refreshSaved} showToast={showToast}/>
          }
        </div>
      </div>
      <Toast msg={toast}/>
    </>
  );
}
