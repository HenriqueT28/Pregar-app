import { useState, useEffect, useRef } from "react";

const STRONG_DATA = {
  "princípio":{h:"H7225",heb:"בְּרֵאשִׁית",tr:"bə·rê·šîṯ",sig:"Começo absoluto, antes de tudo existir",ex:"Pv 8.22 — O Senhor me criou no princípio de sua obra"},
  "Deus":{h:"H430",heb:"אֱלֹהִים",tr:"ʾĕ·lō·hîm",sig:"Plural de majestade — o Deus poderoso e soberano",ex:"Sl 82.1 — Deus preside no conselho divino"},
  "abismo":{h:"H8415",heb:"תְּהֹום",tr:"tə·hôm",sig:"Oceano primordial, profundeza das águas caóticas",ex:"Sl 104.6 — Tu o cobriste com o tehom como com uma veste"},
  "luz":{h:"H216",heb:"אֹור",tr:"ʾôr",sig:"Luminosidade — oposto das trevas do caos",ex:"Is 60.1 — Levanta-te, resplandece, porque veio a tua luz"},
  "terra":{h:"H776",heb:"אֶרֶץ",tr:"ʾe·reṣ",sig:"Terra, solo, país — toda a esfera terrestre",ex:"Sl 24.1 — Do Senhor é a terra e tudo o que nela há"},
  "céus":{h:"H8064",heb:"שָׁמַיִם",tr:"šā·ma·yim",sig:"Céus — plural dual indicando vastidão ilimitada",ex:"Sl 19.1 — Os céus proclamam a glória de Deus"},
  "Senhor":{h:"H3068",heb:"יְהוָה",tr:"YHWH",sig:"Nome próprio de Deus — o Ser eterno e autoexistente",ex:"Êx 3.14 — EU SOU O QUE SOU"},
  "amor":{h:"H2617",heb:"חֶסֶד",tr:"ḥe·sed",sig:"Amor leal, misericórdia pactuada — amor que não desiste",ex:"Sl 136 — a sua misericórdia dura para sempre"},
  "coração":{h:"H3820",heb:"לֵב",tr:"lêḇ",sig:"Centro da personalidade — mente, vontade e emoções",ex:"Pv 4.23 — Guarda o teu coração mais do que tudo"},
  "salvar":{h:"H3467",heb:"יָשַׁע",tr:"yā·šaʿ",sig:"Libertar, resgatar — raiz de Yeshua (Jesus)",ex:"Sl 18.3 — Clamo ao Senhor e sou salvo dos meus inimigos"},
};

const BOOK_ABBREVS = {
  "gn":0,"ex":1,"lv":2,"nm":3,"dt":4,"js":5,"jz":6,"rt":7,"1sm":8,"2sm":9,
  "1rs":10,"2rs":11,"1cr":12,"2cr":13,"ed":14,"ne":15,"et":16,"jó":17,"sl":18,
  "pv":19,"ec":20,"ct":21,"is":22,"jr":23,"lm":24,"ez":25,"dn":26,"os":27,
  "jl":28,"am":29,"ob":30,"jn":31,"mq":32,"na":33,"hc":34,"sf":35,"ag":36,
  "zc":37,"ml":38,"mt":39,"mc":40,"lc":41,"jo":42,"at":43,"rm":44,"1co":45,
  "2co":46,"gl":47,"ef":48,"fp":49,"cl":50,"1ts":51,"2ts":52,"1tm":53,"2tm":54,
  "tt":55,"fm":56,"hb":57,"tg":58,"1pe":59,"2pe":60,"1jo":61,"2jo":62,"3jo":63,
  "jd":64,"ap":65
};

const BOOK_NAMES = {
  "gn":"Gênesis","ex":"Êxodo","lv":"Levítico","nm":"Números","dt":"Deuteronômio",
  "js":"Josué","jz":"Juízes","rt":"Rute","sl":"Salmos","pv":"Provérbios",
  "is":"Isaías","jr":"Jeremias","ez":"Ezequiel","dn":"Daniel","mt":"Mateus",
  "mc":"Marcos","lc":"Lucas","jo":"João","at":"Atos","rm":"Romanos",
  "1co":"1 Coríntios","2co":"2 Coríntios","gl":"Gálatas","ef":"Efésios",
  "fp":"Filipenses","cl":"Colossenses","hb":"Hebreus","tg":"Tiago","ap":"Apocalipse"
};

const BIBLE_URLS = {
  NVI:"https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/nvi.json",
  ACF:"https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/acf.json",
  ARA:"https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/aa.json",
};

const HEB_STATIC = {
  "gn":{1:[
    {v:1,heb:"בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ׃",pt:"No princípio, Deus criou os céus e a terra."},
    {v:2,heb:"וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ וְחֹשֶׁךְ עַל־פְּנֵי תְהֹום וְרוּחַ אֱלֹהִים מְרַחֶפֶת עַל־פְּנֵי הַמָּיִם׃",pt:"A terra era caos e vazio; trevas sobre o abismo, e o Espírito de Deus pairava sobre as águas."},
    {v:3,heb:"וַיֹּאמֶר אֱלֹהִים יְהִי אֹור וַיְהִי־אֹור׃",pt:"E Deus disse: Haja luz. E houve luz."},
    {v:4,heb:"וַיַּרְא אֱלֹהִים אֶת־הָאֹור כִּי־טֹוב וַיַּבְדֵּל אֱלֹהִים בֵּין הָאֹור וּבֵין הַחֹשֶׁךְ׃",pt:"E Deus viu que a luz era boa, e separou a luz das trevas."},
    {v:5,heb:"וַיִּקְרָא אֱלֹהִים לָאֹור יֹום וְלַחֹשֶׁךְ קָרָא לָיְלָה׃",pt:"E Deus chamou à luz Dia, e às trevas chamou Noite."},
  ]},
};

const VERS_CONFIG = [
  {code:"NVI",label:"NVI",desc:"Nova Versão Internacional",lang:"PT"},
  {code:"ARA",label:"ARA",desc:"Almeida Revista e Atualizada",lang:"PT"},
  {code:"ACF",label:"ACF",desc:"Almeida Corrigida Fiel",lang:"PT"},
  {code:"HEB",label:"Hebraica",desc:"Tanakh WLC · hebraico + PT",lang:"עב"},
];

const QUICK_REFS = [
  {label:"Gn 1",book:"gn",ch:1},{label:"Sl 23",book:"sl",ch:23},
  {label:"Is 53",book:"is",ch:53},{label:"Jo 3",book:"jo",ch:3},
  {label:"Rm 8",book:"rm",ch:8},{label:"Ef 2",book:"ef",ch:2},
  {label:"Fp 4",book:"fp",ch:4},
];

const cache = {};

// Tooltip flutuante — usa state, não CSS hover puro
function StrongWord({ word }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({top:0, left:0});
  const ref = useRef(null);
  const d = STRONG_DATA[word];
  if (!d) return <span>{word}</span>;

  function handleMouseEnter(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    setPos({
      top: rect.bottom + scrollY + 6,
      left: Math.min(rect.left + scrollX, window.innerWidth - 290),
    });
    setOpen(true);
  }

  return (
    <span ref={ref} style={{position:"relative",display:"inline"}}>
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={()=>setOpen(false)}
        style={{
          borderBottom:"1.5px dashed var(--gold)",
          cursor:"pointer",
          color:"inherit",
        }}
      >
        {word}
      </span>
      {open && (
        <span style={{
          position:"fixed",
          top: pos.top - (window.scrollY||0),
          left: Math.max(8, Math.min(pos.left - (window.scrollX||0), window.innerWidth - 290)),
          width:280,
          background:"var(--white,#fff)",
          border:"1px solid var(--border,#E5E4DC)",
          borderRadius:12,
          padding:"12px 14px",
          zIndex:9999,
          boxShadow:"0 8px 32px rgba(0,0,0,0.14)",
          pointerEvents:"none",
          fontSize:13,
          lineHeight:1.5,
          fontFamily:"'DM Sans',sans-serif",
        }}>
          <span style={{
            display:"block",
            fontSize:22,
            fontFamily:"serif",
            direction:"rtl",
            textAlign:"right",
            color:"var(--ink,#17160F)",
            marginBottom:6,
            lineHeight:1.4,
          }}>{d.heb}</span>
          <span style={{
            display:"inline-block",
            background:"rgba(184,145,42,0.1)",
            color:"#B8912A",
            fontSize:11,
            fontWeight:600,
            padding:"1px 7px",
            borderRadius:6,
            marginBottom:8,
          }}>{d.h}</span>
          <div style={{display:"flex",justifyContent:"space-between",gap:8,marginBottom:5,paddingBottom:5,borderBottom:"1px solid var(--border,#E5E4DC)"}}>
            <span style={{fontSize:10,fontWeight:600,color:"var(--muted,#8A8980)",textTransform:"uppercase",letterSpacing:"0.05em",whiteSpace:"nowrap"}}>Como falar</span>
            <span style={{fontSize:12,color:"var(--ink,#17160F)",textAlign:"right",fontStyle:"italic"}}>{d.tr}</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",gap:8,marginBottom:5,paddingBottom:5,borderBottom:"1px solid var(--border,#E5E4DC)"}}>
            <span style={{fontSize:10,fontWeight:600,color:"var(--muted,#8A8980)",textTransform:"uppercase",letterSpacing:"0.05em",whiteSpace:"nowrap"}}>Significado</span>
            <span style={{fontSize:12,color:"var(--ink,#17160F)",textAlign:"right",maxWidth:170}}>{d.sig}</span>
          </div>
          <div style={{fontSize:11,color:"var(--muted,#8A8980)",fontStyle:"italic",lineHeight:1.5,marginTop:4}}>{d.ex}</div>
        </span>
      )}
    </span>
  );
}

function renderWithStrong(text) {
  const words = Object.keys(STRONG_DATA);
  const parts = [];
  let remaining = text;
  let key = 0;
  while (remaining.length > 0) {
    let earliest = -1, matchWord = null;
    for (const w of words) {
      const idx = remaining.indexOf(w);
      if (idx !== -1 && (earliest === -1 || idx < earliest)) {
        earliest = idx; matchWord = w;
      }
    }
    if (earliest === -1) { parts.push(<span key={key++}>{remaining}</span>); break; }
    if (earliest > 0) parts.push(<span key={key++}>{remaining.slice(0, earliest)}</span>);
    parts.push(<StrongWord key={key++} word={matchWord} />);
    remaining = remaining.slice(earliest + matchWord.length);
  }
  return parts;
}

export default function Biblia() {
  const [ver, setVer] = useState("NVI");
  const [ddOpen, setDdOpen] = useState(false);
  const [book, setBook] = useState("gn");
  const [ch, setCh] = useState(1);
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [activeRef, setActiveRef] = useState(0);

  async function loadChapter(v, b, c) {
    if (v === "HEB") {
      const data = HEB_STATIC[b]?.[c];
      setVerses(data ? data.map(x => x.pt) : []);
      return;
    }
    const url = BIBLE_URLS[v];
    if (!url) return;
    setLoading(true);
    try {
      if (!cache[v]) {
        const r = await fetch(url);
        cache[v] = await r.json();
      }
      const bible = cache[v];
      const bIdx = BOOK_ABBREVS[b];
      const chapter = bible[bIdx]?.chapters?.[c - 1] || [];
      setVerses(chapter);
    } catch { setVerses([]); }
    setLoading(false);
  }

  useEffect(() => { loadChapter(ver, book, ch); }, [ver, book, ch]);

  function parseSearch(q) {
    const map = {
      "gênesis":"gn","gn":"gn","genesis":"gn","êxodo":"ex","ex":"ex",
      "salmos":"sl","sl":"sl","sal":"sl","provérbios":"pv","pv":"pv",
      "isaías":"is","is":"is","jeremias":"jr","jr":"jr","ezequiel":"ez","ez":"ez",
      "daniel":"dn","dn":"dn","mateus":"mt","mt":"mt","marcos":"mc","mc":"mc",
      "lucas":"lc","lc":"lc","joão":"jo","jo":"jo","atos":"at","at":"at",
      "romanos":"rm","rm":"rm","efésios":"ef","ef":"ef","filipenses":"fp","fp":"fp",
      "colossenses":"cl","cl":"cl","hebreus":"hb","hb":"hb","tiago":"tg","tg":"tg",
      "apocalipse":"ap","ap":"ap","1co":"1co","2co":"2co","gl":"gl","1pe":"1pe","2pe":"2pe",
    };
    const m = q.trim().toLowerCase().match(/^([a-zêáãéíóúç1-9]+)s*(d+)/);
    if (!m) return null;
    const b = map[m[1]];
    if (!b) return null;
    return { book: b, ch: parseInt(m[2]) };
  }

  function doSearch() {
    const r = parseSearch(search);
    if (r) { setBook(r.book); setCh(r.ch); }
  }

  const verLabel = ver === "HEB" ? "Hebraica" : ver;
  const bookName = BOOK_NAMES[book] || book.toUpperCase();

  return (
    <div style={{padding:"0 4px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
        <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:700,color:"var(--ink)"}}>Bíblia</span>
        <div style={{position:"relative"}}>
          <button className="ver-btn" onClick={()=>setDdOpen(o=>!o)}>
            {verLabel} <span className={`ver-ch${ddOpen?" open":""}`}/>
          </button>
          {ddOpen && (
            <div className="ver-dd">
              <div className="dd-sec">
                <div className="dd-lbl">Português</div>
                {VERS_CONFIG.filter(v=>v.lang==="PT").map(v=>(
                  <div key={v.code} className={`dd-item${ver===v.code?" sel":""}`}
                    onClick={()=>{setVer(v.code);setDdOpen(false);}}>
                    <div><div className="dd-name">{v.label}</div><div className="dd-sub">{v.desc}</div></div>
                    <span className="dd-tag">{v.lang}</span>
                  </div>
                ))}
              </div>
              <div className="dd-sec">
                <div className="dd-lbl">Língua original</div>
                {VERS_CONFIG.filter(v=>v.lang==="עב").map(v=>(
                  <div key={v.code} className={`dd-item${ver===v.code?" sel":""}`}
                    onClick={()=>{setVer(v.code);setDdOpen(false);}}>
                    <div><div className="dd-name">{v.label}</div><div className="dd-sub">{v.desc}</div></div>
                    <span className="dd-tag">{v.lang}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="biblia-search">
        <input value={search} onChange={e=>setSearch(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&doSearch()}
          placeholder="Ex: João 3, Salmos 23, Romanos 8..." />
        <button onClick={doSearch}>Buscar</button>
      </div>

      <div className="refbar">
        {QUICK_REFS.map((r,i)=>(
          <span key={i} className={`rc${activeRef===i?" active":""}`}
            onClick={()=>{setActiveRef(i);setBook(r.book);setCh(r.ch);}}>
            {r.label}
          </span>
        ))}
      </div>

      {loading && (
        <div className="biblia-loading">
          <div className="ring"/>
          <p>Carregando...</p>
        </div>
      )}

      {!loading && ver === "HEB" && (
        <div>
          <div className="heb-notice">{bookName} {ch} · Hebraica (WLC)</div>
          <div className="heb-grid-header">
            <div className="heb-col-hdr">Português</div>
            <div className="heb-col-hdr" style={{textAlign:"right"}}>עברית</div>
          </div>
          {(HEB_STATIC[book]?.[ch] || []).map((v,i)=>(
            <div key={i} className="heb-row">
              <div>
                <div className="heb-vnum">v.{v.v}</div>
                <div className="heb-pt">{v.pt}</div>
              </div>
              <div>
                <div className="heb-vnum" style={{textAlign:"right"}}>פ׳ {v.v}</div>
                <div className="heb-text">{v.heb}</div>
              </div>
            </div>
          ))}
          {!(HEB_STATIC[book]?.[ch]) && (
            <div className="biblia-empty">Gênesis 1 disponível como exemplo. Mais capítulos em breve.</div>
          )}
        </div>
      )}

      {!loading && ver !== "HEB" && (
        <div className="passage">
          <div className="passage-ref">{bookName} {ch} · {ver}</div>
          <div className="passage-hint">Passe o mouse nas palavras sublinhadas para ver o hebraico</div>
          {verses.map((v, i) => (
            <p key={i} className="verse">
              <sup className="vnum">{i+1}</sup>
              {renderWithStrong(v)}
            </p>
          ))}
          {verses.length === 0 && !loading && (
            <div className="biblia-empty">Capítulo não encontrado. Tente outra referência.</div>
          )}
        </div>
      )}
    </div>
  );
}
