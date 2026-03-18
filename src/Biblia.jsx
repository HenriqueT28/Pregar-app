import { useState, useEffect } from "react";

const STRONG_DATA = {
  "princípio":{h:"H7225",heb:"בְּרֵאשִׁית",tr:"bərēʾšîṯ",sig:"Começo absoluto, antes de tudo existir",ex:"Pv 8.22 — O Senhor me criou no princípio de sua obra"},
  "Deus":{h:"H430",heb:"אֱלֹהִים",tr:"ʾĕlōhîm",sig:"Plural de majestade — o Deus poderoso e soberano",ex:"Sl 82.1 — Deus preside no conselho divino"},
  "abismo":{h:"H8415",heb:"תְּהֹום",tr:"tĕhôm",sig:"Oceano primordial, profundeza das águas caóticas",ex:"Sl 104.6 — Tu o cobriste com o tehom como com uma veste"},
  "luz":{h:"H216",heb:"אֹור",tr:"ʾôr",sig:"Luminosidade — oposto das trevas do caos",ex:"Is 60.1 — Levanta-te, resplandece, porque veio a tua luz"},
  "terra":{h:"H776",heb:"אֶרֶץ",tr:"ʾereṣ",sig:"Terra, solo, país — toda a esfera terrestre",ex:"Sl 24.1 — Do Senhor é a terra e tudo o que nela há"},
  "céus":{h:"H8064",heb:"שָׁמַיִם",tr:"šāmayim",sig:"Céus — plural dual indicando vastidão ilimitada",ex:"Sl 19.1 — Os céus proclamam a glória de Deus"},
  "Senhor":{h:"H3068",heb:"יְהוָה",tr:"YHWH",sig:"Nome próprio de Deus — o Ser eterno e autoexistente",ex:"Êx 3.14 — EU SOU O QUE SOU"},
  "amor":{h:"H2617",heb:"חֶסֶד",tr:"ḥesed",sig:"Amor leal, misericórdia pactuada — amor que não desiste",ex:"Sl 136 — a sua misericórdia dura para sempre"},
  "coração":{h:"H3820",heb:"לֵב",tr:"lēb",sig:"Centro da personalidade — mente, vontade e emoções",ex:"Pv 4.23 — Guarda o teu coração mais do que tudo"},
  "salvar":{h:"H3467",heb:"יָשַׁע",tr:"yāšaʿ",sig:"Libertar, resgatar — raiz de Yeshua (Jesus)",ex:"Sl 18.3 — Clamo ao Senhor e sou salvo dos meus inimigos"},
};

const BOOK_ABBREVS = {"gn":0,"ex":1,"lv":2,"nm":3,"dt":4,"js":5,"jz":6,"rt":7,"1sm":8,"2sm":9,"1rs":10,"2rs":11,"1cr":12,"2cr":13,"ed":14,"ne":15,"et":16,"jo_at":17,"sl":18,"pv":19,"ec":20,"ct":21,"is":22,"jr":23,"lm":24,"ez":25,"dn":26,"os":27,"jl":28,"am":29,"ob":30,"jn":31,"mq":32,"na":33,"hc":34,"sf":35,"ag":36,"zc":37,"ml":38,"mt":39,"mc":40,"lc":41,"jo":42,"at":43,"rm":44,"1co":45,"2co":46,"gl":47,"ef":48,"fp":49,"cl":50,"1ts":51,"2ts":52,"1tm":53,"2tm":54,"tt":55,"fm":56,"hb":57,"tg":58,"1pe":59,"2pe":60,"1jo":61,"2jo":62,"3jo":63,"jd":64,"ap":65};
const BOOK_NAMES = {"gn":"Gênesis","ex":"Êxodo","lv":"Levítico","nm":"Números","dt":"Deuteronômio","js":"Josué","jz":"Juízes","rt":"Rute","sl":"Salmos","pv":"Provérbios","is":"Isaías","jr":"Jeremias","ez":"Ezequiel","dn":"Daniel","mt":"Mateus","mc":"Marcos","lc":"Lucas","jo":"João","at":"Atos","rm":"Romanos","1co":"1 Coríntios","2co":"2 Coríntios","gl":"Gálatas","ef":"Efésios","fp":"Filipenses","cl":"Colossenses","hb":"Hebreus","tg":"Tiago","ap":"Apocalipse"};
const BIBLE_URLS = {NVI:"https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/nvi.json",ACF:"https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/acf.json",ARA:"https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/aa.json"};
const HEB_STATIC = {"gn":{1:[{v:1,heb:"בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ׃",pt:"No princípio, Deus criou os céus e a terra."},{v:2,heb:"וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ וְחֹשֶׁךְ עַל־פְּנֵי תְהֹום׃",pt:"A terra era caos e vazio; trevas sobre o abismo."},{v:3,heb:"וַיֹּאמֶר אֱלֹהִים יְהִי אֹור וַיְהִי־אֹור׃",pt:"E Deus disse: Haja luz. E houve luz."},{v:4,heb:"וַיַּרְא אֱלֹהִים אֶת־הָאֹור כִּי־טֹוב׃",pt:"E Deus viu que a luz era boa."},{v:5,heb:"וַיִּקְרָא אֱלֹהִים לָאֹור יֹום וְלַחֹשֶׁךְ קָרָא לָיְלָה׃",pt:"E Deus chamou à luz Dia, e às trevas Noite."}]}};
const VERS_CONFIG = [{code:"NVI",label:"NVI",desc:"Nova Versão Internacional",lang:"PT"},{code:"ARA",label:"ARA",desc:"Almeida Revista e Atualizada",lang:"PT"},{code:"ACF",label:"ACF",desc:"Almeida Corrigida Fiel",lang:"PT"},{code:"HEB",label:"Hebraica",desc:"Tanakh WLC · hebraico + PT",lang:"עב"}];
const QUICK_REFS = [{label:"Gn 1",book:"gn",ch:1},{label:"Sl 23",book:"sl",ch:23},{label:"Is 53",book:"is",ch:53},{label:"Jo 3",book:"jo",ch:3},{label:"Rm 8",book:"rm",ch:8},{label:"Ef 2",book:"ef",ch:2},{label:"Fp 4",book:"fp",ch:4}];
const cache = {};

function StrongWord({word}) {
  const d = STRONG_DATA[word];
  if (!d) return <span>{word}</span>;
  return (
    <span style={{position:"relative",display:"inline"}}>
      <span style={{borderBottom:"1.5px dashed #B8912A",cursor:"pointer",position:"relative"}} className="sword">
        {word}
        <span className="stt">
          <span className="snum">{d.h}</span>
          <span className="sheb">{d.heb}</span>
          <div className="srow"><span className="slbl">Pronunciar</span><span className="sval">{d.tr}</span></div>
          <div className="srow"><span className="slbl">Significado</span><span className="sval">{d.sig}</span></div>
          <div className="sex">{d.ex}</div>
        </span>
      </span>
    </span>
  );
}

function renderStrong(text) {
  const words = Object.keys(STRONG_DATA);
  const parts = [];
  let rem = text, k = 0;
  while (rem.length > 0) {
    let ei = -1, mw = null;
    for (const w of words) { const i = rem.indexOf(w); if (i !== -1 && (ei === -1 || i < ei)) { ei = i; mw = w; } }
    if (ei === -1) { parts.push(<span key={k++}>{rem}</span>); break; }
    if (ei > 0) parts.push(<span key={k++}>{rem.slice(0, ei)}</span>);
    parts.push(<StrongWord key={k++} word={mw} />);
    rem = rem.slice(ei + mw.length);
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
    if (v === "HEB") { setVerses([]); return; }
    const url = BIBLE_URLS[v];
    if (!url) return;
    setLoading(true);
    try {
      if (!cache[v]) { const r = await fetch(url); cache[v] = await r.json(); }
      const bIdx = BOOK_ABBREVS[b];
      setVerses(cache[v][bIdx]?.chapters?.[c - 1] || []);
    } catch { setVerses([]); }
    setLoading(false);
  }

  useEffect(() => { loadChapter(ver, book, ch); }, [ver, book, ch]);

  function parseSearch(q) {
    const map = {"gênesis":"gn","gn":"gn","êxodo":"ex","ex":"ex","salmos":"sl","sl":"sl","provérbios":"pv","pv":"pv","isaías":"is","is":"is","jeremias":"jr","jr":"jr","ezequiel":"ez","ez":"ez","daniel":"dn","dn":"dn","mateus":"mt","mt":"mt","marcos":"mc","mc":"mc","lucas":"lc","lc":"lc","joão":"jo","jo":"jo","atos":"at","at":"at","romanos":"rm","rm":"rm","efésios":"ef","ef":"ef","filipenses":"fp","fp":"fp","hebreus":"hb","hb":"hb","apocalipse":"ap","ap":"ap"};
    const m = q.trim().toLowerCase().match(/^([a-zêáãéíóúç1-9]+)\s*(\d+)/);
    if (!m) return null;
    return { book: map[m[1]], ch: parseInt(m[2]) };
  }

  function doSearch() {
    const r = parseSearch(search);
    if (r?.book) { setBook(r.book); setCh(r.ch); setActiveRef(-1); }
  }

  return (
    <div className="biblia-wrap">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
        <span style={{fontSize:16,fontWeight:600,color:"var(--ink)"}}>Bíblia</span>
        <div style={{position:"relative"}}>
          <button className="btn2" onClick={() => setDdOpen(o=>!o)} style={{padding:"6px 12px",display:"flex",alignItems:"center",gap:6}}>
            {ver === "HEB" ? "Hebraica" : ver}
            <span style={{fontSize:9,opacity:.6}}>{ddOpen?"▲":"▼"}</span>
          </button>
          {ddOpen && (
            <div style={{position:"absolute",top:"calc(100% + 4px)",right:0,background:"var(--white)",border:"1.5px solid var(--border)",borderRadius:10,minWidth:230,zIndex:300,overflow:"hidden"}} onClick={e=>e.stopPropagation()}>
              {[{sec:"Português",items:VERS_CONFIG.filter(v=>v.lang==="PT")},{sec:"Original",items:VERS_CONFIG.filter(v=>v.lang==="עב")}].map(({sec,items})=>(
                <div key={sec} style={{borderBottom:"1px solid var(--border)"}}>
                  <div style={{fontSize:10,fontWeight:600,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".06em",padding:"6px 12px 2px"}}>{sec}</div>
                  {items.map(v=>(
                    <div key={v.code} onClick={()=>{setVer(v.code);setDdOpen(false);}}
                      style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 12px",cursor:"pointer",background:ver===v.code?"var(--gold-bg)":"transparent"}}>
                      <div>
                        <div style={{fontSize:13,fontWeight:500,color:ver===v.code?"var(--gold)":"var(--ink)"}}>{v.label}</div>
                        <div style={{fontSize:11,color:"var(--muted)"}}>{v.desc}</div>
                      </div>
                      <span style={{fontSize:11,padding:"2px 7px",borderRadius:10,background:"var(--surface)",color:"var(--muted)",fontWeight:500}}>{v.lang}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{display:"flex",gap:6,marginBottom:10}}>
        <input className="f input" value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSearch()} placeholder="Ex: João 3, Salmos 23..." style={{flex:1,padding:"7px 10px",fontSize:13}}/>
        <button className="btn2" onClick={doSearch} style={{padding:"7px 14px",flexShrink:0}}>Buscar</button>
      </div>

      <div className="chips" style={{marginBottom:10}}>
        {QUICK_REFS.map((r,i)=>(
          <span key={i} className={"chip"+(activeRef===i?" on":"")} onClick={()=>{setActiveRef(i);setBook(r.book);setCh(r.ch);}}>{r.label}</span>
        ))}
      </div>

      {loading && <div className="loader"><div className="ring"/><p>Carregando...</p></div>}

      {!loading && ver === "HEB" && (
        <div>
          <div style={{display:"inline-flex",fontSize:11,padding:"3px 10px",borderRadius:10,background:"var(--gold-bg)",color:"var(--gold)",marginBottom:12,fontWeight:600}}>{BOOK_NAMES[book]||book} {ch} · Hebraica (WLC)</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:6}}>
            <div style={{fontSize:10,fontWeight:600,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".05em",paddingBottom:5,borderBottom:"1px solid var(--border)"}}>Português</div>
            <div style={{fontSize:10,fontWeight:600,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".05em",paddingBottom:5,borderBottom:"1px solid var(--border)",textAlign:"right"}}>עברית</div>
          </div>
          {(HEB_STATIC[book]?.[ch]||[]).map((v,i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,padding:"10px 0",borderBottom:"1px solid var(--border)"}}>
              <div>
                <div style={{fontSize:10,fontWeight:500,color:"var(--muted)",marginBottom:2}}>v.{v.v}</div>
                <div style={{fontSize:13,color:"var(--ink2)",lineHeight:1.65}}>{v.pt}</div>
              </div>
              <div>
                <div style={{fontSize:10,fontWeight:500,color:"var(--muted)",marginBottom:2,textAlign:"right"}}>פ׳ {v.v}</div>
                <div style={{fontSize:17,fontFamily:"'Times New Roman',serif",direction:"rtl",textAlign:"right",lineHeight:1.9,color:"var(--ink)"}}>{v.heb}</div>
              </div>
            </div>
          ))}
          {!(HEB_STATIC[book]?.[ch]) && <div style={{fontSize:13,color:"var(--muted)",padding:"20px 0",textAlign:"center"}}>Gênesis 1 disponível. Em breve mais capítulos.</div>}
        </div>
      )}

      {!loading && ver !== "HEB" && (
        <div>
          <div style={{fontSize:11,fontWeight:600,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>{BOOK_NAMES[book]||book} {ch} · {ver}</div>
          <div style={{fontSize:11,color:"var(--muted)",marginBottom:10,fontStyle:"italic"}}>Passe o mouse nas palavras sublinhadas para ver o significado hebraico</div>
          {verses.map((v,i)=>(
            <p key={i} style={{marginBottom:8,fontSize:15,lineHeight:1.85,color:"var(--ink)"}}>
              <sup style={{fontSize:9,fontWeight:600,color:"var(--muted)",marginRight:2,verticalAlign:"super"}}>{i+1}</sup>
              {renderStrong(v)}
            </p>
          ))}
          {verses.length===0 && <div style={{fontSize:13,color:"var(--muted)",padding:"20px 0",textAlign:"center"}}>Capítulo não encontrado.</div>}
        </div>
      )}
    </div>
  );
}
