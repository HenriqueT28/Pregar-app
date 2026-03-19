import { useState, useEffect, useRef } from "react";

// Dicionário Strong / Hebraico
const STRONG = {
  "princípio":{h:"H7225",heb:"בְּרֵאשִׁית",tr:"bə·rê·šîṯ",sig:"Começo absoluto — antes de tudo existir",ex:"Pv 8.22 — O Senhor me criou no princípio de sua obra"},
  "Deus":{h:"H430",heb:"אֱלֹהִים",tr:"ʾĕ·lō·hîm",sig:"Plural de majestade — o Deus Todo-Poderoso soberano",ex:"Sl 82.1 — Deus preside no conselho divino"},
  "abismo":{h:"H8415",heb:"תְּהֹום",tr:"tə·hôm",sig:"Oceano primordial, profundeza das águas caóticas",ex:"Sl 104.6 — Tu o cobriste com o tehom como com uma veste"},
  "luz":{h:"H216",heb:"אֹור",tr:"ʾôr",sig:"Luminosidade — oposto das trevas do caos primordial",ex:"Is 60.1 — Levanta-te, resplandece, porque veio a tua luz"},
  "terra":{h:"H776",heb:"אֶרֶץ",tr:"ʾe·reṣ",sig:"Terra, solo, país — toda a esfera terrestre",ex:"Sl 24.1 — Do Senhor é a terra e tudo o que nela há"},
  "céus":{h:"H8064",heb:"שָׁמַיִם",tr:"šā·ma·yim",sig:"Céus — plural dual indicando vastidão ilimitada",ex:"Sl 19.1 — Os céus proclamam a glória de Deus"},
  "Senhor":{h:"H3068",heb:"יְהוָה",tr:"YHWH",sig:"O Ser eterno e autoexistente — nome pessoal de Deus",ex:"Êx 3.14 — EU SOU O QUE SOU"},
  "amor":{h:"H2617",heb:"חֶסֶד",tr:"ḥe·sed",sig:"Amor leal, misericórdia pactuada que jamais desiste",ex:"Sl 136 — a sua misericórdia dura para sempre"},
  "coração":{h:"H3820",heb:"לֵב",tr:"lêḇ",sig:"Centro da personalidade — mente, vontade e emoções",ex:"Pv 4.23 — Guarda o teu coração mais do que tudo"},
  "paz":{h:"H7965",heb:"שָׁלוֹם",tr:"sha·lom",sig:"Inteireza completa — muito além de ausência de conflito",ex:"Is 26.3 — Guardas em paz perfeita aquele cujo pensamento está em Ti"},
  "glória":{h:"H3519",heb:"כָּבוֹד",tr:"ka·vod",sig:"Peso, presença tangível de Deus — o que faz joelhos dobrarem",ex:"Is 6.3 — A terra inteira está cheia da sua glória"},
  "fé":{h:"H530",heb:"אֱמוּנָה",tr:"ʾĕ·mu·nah",sig:"Fidelidade, firmeza — a fé bíblica é fidelidade sustentada",ex:"Hc 2.4 — O justo viverá pela sua fé"},
  "salvar":{h:"H3467",heb:"יָשַׁע",tr:"yā·šaʿ",sig:"Libertar, resgatar — raiz de Yeshua (Jesus)",ex:"Sl 18.3 — Clamo ao Senhor e sou salvo dos meus inimigos"},
  "justo":{h:"H6662",heb:"צַדִּיק",tr:"tsa·diq",sig:"Aquele que está em relacionamento correto com Deus",ex:"Sl 1.6 — O Senhor conhece o caminho dos justos"},
  "santo":{h:"H6944",heb:"קֹדֶשׁ",tr:"ko·desh",sig:"Separado, radicalmente diferente — Deus é outro",ex:"Is 6.3 — Santo, santo, santo é o Senhor dos Exércitos"},
};

// Mapa completo dos 66 livros
const LIVROS = {
  "gn":0,"gênesis":0,"genesis":0,
  "ex":1,"êxodo":1,"exodo":1,
  "lv":2,"levítico":2,"levitico":2,
  "nm":3,"números":3,"numeros":3,
  "dt":4,"deuteronômio":4,"deuteronomio":4,
  "js":5,"josué":5,"josue":5,
  "jz":6,"juízes":6,"juizes":6,
  "rt":7,"rute":7,
  "1sm":8,"1samuel":8,"1 sm":8,
  "2sm":9,"2samuel":9,"2 sm":9,
  "1rs":10,"1reis":10,"1 rs":10,
  "2rs":11,"2reis":11,"2 rs":11,
  "1cr":12,"1crônicas":12,"1cronicas":12,
  "2cr":13,"2crônicas":13,"2cronicas":13,
  "ed":14,"esdras":14,
  "ne":15,"neemias":15,
  "et":16,"ester":16,
  "jó":17,"jo":17,"jó":17,"job":17,
  "sl":18,"salmos":18,"sal":18,
  "pv":19,"provérbios":19,"proverbios":19,
  "ec":20,"eclesiastes":20,
  "ct":21,"cânticos":21,"canticos":21,
  "is":22,"isaías":22,"isaias":22,
  "jr":23,"jeremias":23,
  "lm":24,"lamentações":24,"lamentacoes":24,
  "ez":25,"ezequiel":25,
  "dn":26,"daniel":26,
  "os":27,"oséias":27,"oseias":27,
  "jl":28,"joel":28,
  "am":29,"amós":29,"amos":29,
  "ob":30,"obadias":30,
  "jn":31,"jonas":31,
  "mq":32,"miquéias":32,"miqueias":32,
  "na":33,"naum":33,
  "hc":34,"habacuque":34,
  "sf":35,"sofonias":35,
  "ag":36,"ageu":36,
  "zc":37,"zacarias":37,
  "ml":38,"malaquias":38,
  "mt":39,"mateus":39,
  "mc":40,"marcos":40,
  "lc":41,"lucas":41,
  "jo":42,"joão":42,"joao":42,
  "at":43,"atos":43,
  "rm":44,"romanos":44,
  "1co":45,"1coríntios":45,"1corintios":45,
  "2co":46,"2coríntios":46,"2corintios":46,
  "gl":47,"gálatas":47,"galatas":47,
  "ef":48,"efésios":48,"efesios":48,
  "fp":49,"filipenses":49,
  "cl":50,"colossenses":50,
  "1ts":51,"1tessalonicenses":51,
  "2ts":52,"2tessalonicenses":52,
  "1tm":53,"1timóteo":53,"1timoteo":53,
  "2tm":54,"2timóteo":54,"2timoteo":54,
  "tt":55,"tito":55,
  "fm":56,"filemon":56,
  "hb":57,"hebreus":57,
  "tg":58,"tiago":58,
  "1pe":59,"1pedro":59,
  "2pe":60,"2pedro":60,
  "1jo":61,"1joão":61,"1joao":61,
  "2jo":62,"2joão":62,"2joao":62,
  "3jo":63,"3joão":63,"3joao":63,
  "jd":64,"judas":64,
  "ap":65,"apocalipse":65,
};

const NOMES_LIVROS = [
  "Gênesis","Êxodo","Levítico","Números","Deuteronômio","Josué","Juízes","Rute",
  "1 Samuel","2 Samuel","1 Reis","2 Reis","1 Crônicas","2 Crônicas","Esdras","Neemias",
  "Ester","Jó","Salmos","Provérbios","Eclesiastes","Cânticos","Isaías","Jeremias",
  "Lamentações","Ezequiel","Daniel","Oséias","Joel","Amós","Obadias","Jonas","Miquéias",
  "Naum","Habacuque","Sofonias","Ageu","Zacarias","Malaquias","Mateus","Marcos","Lucas",
  "João","Atos","Romanos","1 Coríntios","2 Coríntios","Gálatas","Efésios","Filipenses",
  "Colossenses","1 Tessalonicenses","2 Tessalonicenses","1 Timóteo","2 Timóteo","Tito",
  "Filêmon","Hebreus","Tiago","1 Pedro","2 Pedro","1 João","2 João","3 João","Judas","Apocalipse"
];

const URLS = {
  NVI:"https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/nvi.json",
  ACF:"https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/acf.json",
  ARA:"https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/aa.json",
};

const HEB_GN1 = [
  {v:1,heb:"בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ׃",pt:"No princípio, Deus criou os céus e a terra."},
  {v:2,heb:"וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ וְחֹשֶׁךְ עַל־פְּנֵי תְהֹום׃",pt:"A terra era caos e vazio; trevas sobre o abismo."},
  {v:3,heb:"וַיֹּאמֶר אֱלֹהִים יְהִי אֹור וַיְהִי־אֹור׃",pt:"E Deus disse: Haja luz. E houve luz."},
  {v:4,heb:"וַיַּרְא אֱלֹהִים אֶת־הָאֹור כִּי־טֹוב׃",pt:"E Deus viu que a luz era boa."},
  {v:5,heb:"וַיִּקְרָא אֱלֹהִים לָאֹור יֹום׃",pt:"E Deus chamou à luz Dia."},
];

const bibleCache = {};

function StrongWord({ word }) {
  const [open, setOpen] = useState(false);
  const d = STRONG[word];
  if (!d) return <span>{word}</span>;
  return (
    <span style={{position:"relative",display:"inline"}}>
      <span
        onMouseEnter={()=>setOpen(true)}
        onMouseLeave={()=>setOpen(false)}
        style={{borderBottom:"1.5px dashed var(--gold,#B8912A)",cursor:"pointer",color:"inherit"}}
      >{word}</span>
      {open && (
        <span style={{
          position:"fixed",top:"auto",
          width:270,background:"#fff",
          border:"1px solid #E5E4DC",borderRadius:12,
          padding:"12px 14px",zIndex:9999,
          boxShadow:"0 8px 32px rgba(0,0,0,0.14)",
          pointerEvents:"none",fontSize:13,lineHeight:1.5,
          fontFamily:"'DM Sans',sans-serif",
          transform:"translateX(-50%)",left:"50%",marginTop:6,
        }}>
          <span style={{display:"block",fontSize:24,fontFamily:"serif",direction:"rtl",textAlign:"right",color:"#17160F",marginBottom:4}}>{d.heb}</span>
          <span style={{display:"inline-block",background:"rgba(184,145,42,0.1)",color:"#B8912A",fontSize:11,fontWeight:600,padding:"1px 7px",borderRadius:6,marginBottom:6}}>{d.h}</span>
          <div style={{display:"flex",justifyContent:"space-between",gap:6,marginBottom:4,paddingBottom:4,borderBottom:"1px solid #E5E4DC"}}>
            <span style={{fontSize:10,fontWeight:600,color:"#8A8980",textTransform:"uppercase",whiteSpace:"nowrap"}}>Pronunciar</span>
            <span style={{fontSize:11,color:"#17160F",fontStyle:"italic"}}>{d.tr}</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",gap:6,marginBottom:6,paddingBottom:4,borderBottom:"1px solid #E5E4DC"}}>
            <span style={{fontSize:10,fontWeight:600,color:"#8A8980",textTransform:"uppercase",whiteSpace:"nowrap"}}>Significado</span>
            <span style={{fontSize:11,color:"#17160F",textAlign:"right",maxWidth:160}}>{d.sig}</span>
          </div>
          <div style={{fontSize:11,color:"#8A8980",fontStyle:"italic",lineHeight:1.5}}>{d.ex}</div>
        </span>
      )}
    </span>
  );
}

function renderStrong(text) {
  const keys = Object.keys(STRONG);
  const parts = []; let rem = text; let k = 0;
  while(rem.length > 0) {
    let first = -1, match = null;
    for(const w of keys) { const i = rem.indexOf(w); if(i !== -1 && (first === -1 || i < first)){first=i;match=w;} }
    if(first === -1){parts.push(<span key={k++}>{rem}</span>);break;}
    if(first > 0) parts.push(<span key={k++}>{rem.slice(0,first)}</span>);
    parts.push(<StrongWord key={k++} word={match}/>);
    rem = rem.slice(first + match.length);
  }
  return parts;
}

function parseRef(q) {
  const norm = q.trim().toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/[\s]+/g," ");
  // Tentar "livro cap:ver" ou "livro cap.ver" ou "livro cap ver" ou "livro cap"
  const m = norm.match(/^(\d?\s?[a-z]+)\s*(\d+)[.:]?(\d*)/);
  if(!m) return null;
  const abrev = m[1].replace(/\s/g,"");
  const idx = LIVROS[abrev];
  if(idx === undefined) return null;
  return { idx, cap: parseInt(m[2]), ver: m[3] ? parseInt(m[3]) : null };
}

export default function Biblia() {
  const [ver, setVer] = useState("NVI");
  const [ddOpen, setDdOpen] = useState(false);
  const [bookIdx, setBookIdx] = useState(0);
  const [ch, setCh] = useState(1);
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [destVer, setDestVer] = useState(null);
  const [totalCaps, setTotalCaps] = useState(1);
  const [erro, setErro] = useState("");

  const QUICK = [
    {l:"Gn 1",b:0,c:1},{l:"Jo 3",b:42,c:3},{l:"Sl 23",b:18,c:23},
    {l:"Is 53",b:22,c:53},{l:"Rm 8",b:44,c:8},{l:"Ef 2",b:48,c:2},
    {l:"Fp 4",b:49,c:4},{l:"Hb 11",b:57,c:11},{l:"Ap 21",b:65,c:21},
  ];

  async function loadBible(v) {
    if(bibleCache[v]) return bibleCache[v];
    const r = await fetch(URLS[v]);
    const d = await r.json();
    bibleCache[v] = d;
    return d;
  }

  async function loadChapter(v, bi, c, highlight=null) {
    if(v === "HEB") {
      if(bi===0 && c===1) { setVerses(HEB_GN1.map(x=>x.pt)); setTotalCaps(50); }
      else { setVerses([]); setErro("Hebraica disponível para Gênesis 1. Mais capítulos em breve."); }
      return;
    }
    setLoading(true); setErro(""); setVerses([]);
    try {
      const bible = await loadBible(v);
      const book = bible[bi];
      if(!book) { setErro("Livro não encontrado."); setLoading(false); return; }
      setTotalCaps(book.chapters.length);
      const chapter = book.chapters[c-1];
      if(!chapter) { setErro("Capítulo não encontrado."); setLoading(false); return; }
      setVerses(chapter);
      if(highlight) setDestVer(highlight);
      else setDestVer(null);
    } catch(e) { setErro("Erro ao carregar. Verifique a conexão."); }
    setLoading(false);
  }

  useEffect(()=>{ loadChapter(ver, bookIdx, ch); }, [ver, bookIdx, ch]);

  function doSearch() {
    if(!search.trim()) return;
    const r = parseRef(search);
    if(r) {
      setBookIdx(r.idx); setCh(r.cap);
      if(r.ver) setDestVer(r.ver);
    } else {
      setErro("Referência não reconhecida. Ex: João 3, Sl 23, Rm 8.28");
    }
  }

  useEffect(()=>{
    if(destVer) {
      setTimeout(()=>{
        const el = document.getElementById("ver-"+destVer);
        if(el) el.scrollIntoView({behavior:"smooth",block:"center"});
      }, 300);
    }
  },[destVer, verses]);

  const verLabel = ver==="HEB"?"Hebraica":ver;
  const VERS = [{c:"NVI",l:"NVI",d:"Nova Versão Internacional"},{c:"ARA",l:"ARA",d:"Almeida Revista e Atualizada"},{c:"ACF",l:"ACF",d:"Almeida Corrigida Fiel"},{c:"HEB",l:"Hebraica",d:"Tanakh WLC"}];

  return (
    <div style={{padding:"0 4px"}}>
      {/* Top */}
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
                {VERS.filter(v=>v.c!=="HEB").map(v=>(
                  <div key={v.c} className={`dd-item${ver===v.c?" sel":""}`} onClick={()=>{setVer(v.c);setDdOpen(false);}}>
                    <div><div className="dd-name">{v.l}</div><div className="dd-sub">{v.d}</div></div>
                  </div>
                ))}
              </div>
              <div className="dd-sec">
                <div className="dd-lbl">Original</div>
                <div className={`dd-item${ver==="HEB"?" sel":""}`} onClick={()=>{setVer("HEB");setDdOpen(false);}}>
                  <div><div className="dd-name">Hebraica</div><div className="dd-sub">Tanakh WLC · hebraico + PT</div></div>
                  <span className="dd-tag">עב</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Busca */}
      <div className="biblia-search" style={{marginBottom:10}}>
        <input
          value={search}
          onChange={e=>{setSearch(e.target.value);setErro("");}}
          onKeyDown={e=>e.key==="Enter"&&doSearch()}
          placeholder="Ex: João 3.16 · Salmos 23 · Romanos 8.28 · Apocalipse 21..."
        />
        <button onClick={doSearch}>Buscar</button>
      </div>

      {/* Acesso rápido */}
      <div className="refbar" style={{marginBottom:10}}>
        {QUICK.map((r,i)=>(
          <span key={i} className={`rc${bookIdx===r.b&&ch===r.c?" active":""}`}
            onClick={()=>{setBookIdx(r.b);setCh(r.c);setSearch("");}}>
            {r.l}
          </span>
        ))}
      </div>

      {/* Navegação livro/capítulo */}
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,flexWrap:"wrap"}}>
        <select
          value={bookIdx}
          onChange={e=>{setBookIdx(+e.target.value);setCh(1);}}
          style={{flex:1,minWidth:140,padding:"6px 10px",border:"1.5px solid var(--border)",borderRadius:8,background:"var(--surface)",color:"var(--ink)",fontSize:13,fontFamily:"'DM Sans',sans-serif",cursor:"pointer"}}
        >
          {NOMES_LIVROS.map((n,i)=><option key={i} value={i}>{n}</option>)}
        </select>
        <div style={{display:"flex",alignItems:"center",gap:4}}>
          <button onClick={()=>setCh(c=>Math.max(1,c-1))} disabled={ch<=1}
            style={{width:32,height:32,borderRadius:8,border:"1.5px solid var(--border)",background:"var(--surface)",cursor:ch<=1?"not-allowed":"pointer",opacity:ch<=1?0.4:1,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--ink)"}}>‹</button>
          <span style={{fontSize:13,fontWeight:600,color:"var(--ink)",minWidth:60,textAlign:"center"}}>Cap. {ch}</span>
          <button onClick={()=>setCh(c=>Math.min(totalCaps,c+1))} disabled={ch>=totalCaps}
            style={{width:32,height:32,borderRadius:8,border:"1.5px solid var(--border)",background:"var(--surface)",cursor:ch>=totalCaps?"not-allowed":"pointer",opacity:ch>=totalCaps?0.4:1,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--ink)"}}>›</button>
        </div>
      </div>

      {/* Hint Strong */}
      {ver !== "HEB" && (
        <div style={{fontSize:11,color:"var(--muted)",marginBottom:10,fontStyle:"italic"}}>
          ✦ Passe o mouse nas palavras sublinhadas para ver o hebraico original
        </div>
      )}

      {/* Erro */}
      {erro && <div style={{fontSize:13,color:"#E24B4A",marginBottom:10,padding:"8px 12px",background:"#FCEBEB",borderRadius:8}}>{erro}</div>}

      {/* Loading */}
      {loading && (
        <div className="biblia-loading"><div className="ring"/><p>Carregando {NOMES_LIVROS[bookIdx]}...</p></div>
      )}

      {/* Hebraica */}
      {!loading && ver==="HEB" && (
        <div>
          <div className="heb-notice">{NOMES_LIVROS[bookIdx]} {ch} · Hebraica (WLC)</div>
          <div className="heb-grid-header">
            <div className="heb-col-hdr">Português</div>
            <div className="heb-col-hdr" style={{textAlign:"right"}}>עברית</div>
          </div>
          {HEB_GN1.map((v,i)=>(
            <div key={i} className="heb-row">
              <div><div className="heb-vnum">v.{v.v}</div><div className="heb-pt">{v.pt}</div></div>
              <div><div className="heb-vnum" style={{textAlign:"right"}}>פ׳ {v.v}</div><div className="heb-text">{v.heb}</div></div>
            </div>
          ))}
        </div>
      )}

      {/* Passagem normal */}
      {!loading && ver!=="HEB" && verses.length > 0 && (
        <div className="passage">
          <div className="passage-ref">{NOMES_LIVROS[bookIdx]} {ch} · {ver}</div>
          {verses.map((v,i)=>(
            <p key={i} id={`ver-${i+1}`} className="verse" style={{
              background: destVer===i+1 ? "rgba(184,145,42,0.12)":"transparent",
              borderRadius: destVer===i+1 ? 6:0,
              padding: destVer===i+1 ? "4px 8px":"0",
              transition:"background 0.5s",
            }}>
              <sup className="vnum">{i+1}</sup>
              {renderStrong(v)}
            </p>
          ))}
        </div>
      )}

      {!loading && ver!=="HEB" && verses.length===0 && !erro && (
        <div className="biblia-empty">Selecione um livro e capítulo acima.</div>
      )}
    </div>
  );
}
