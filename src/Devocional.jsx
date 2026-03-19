import { useState, useEffect } from "react";

// Palavras hebraicas com tooltip — aparecem nas reflexões
const HWORDS = {
  "chesed":{heb:"חֶסֶד",tr:"ḥe·sed",def:"Amor leal e inabalável, fidelidade de aliança — vai muito além de 'misericórdia'"},
  "shalom":{heb:"שָׁלוֹם",tr:"šā·lôm",def:"Paz completa, integridade, bem-estar total — não apenas ausência de conflito"},
  "emunah":{heb:"אֱמוּנָה",tr:"ʾĕ·mû·nāh",def:"Fé firme, fidelidade constante — a mesma raiz de 'Amém'"},
  "bara":{heb:"בָּרָא",tr:"bā·rāʾ",def:"Criar do absoluto nada — verbo usado EXCLUSIVAMENTE com Deus como sujeito"},
  "nephesh":{heb:"נֶפֶשׁ",tr:"ne·feš",def:"Alma, ser vivo, pessoa inteira — não apenas a parte espiritual, mas todo o ser"},
  "YHWH":{heb:"יְהוָה",tr:"Yah·weh",def:"O nome próprio de Deus — o Ser eterno, autoexistente, EU SOU O QUE SOU"},
  "elohim":{heb:"אֱלֹהִים",tr:"ʾĕ·lō·hîm",def:"Deus — plural de majestade, antecipando a revelação trinitária"},
  "hesed":{heb:"חֶסֶד",tr:"ḥe·sed",def:"Amor leal de aliança — Deus nunca abandona quem Ele escolheu"},
  "ruach":{heb:"רוּחַ",tr:"rû·aḥ",def:"Espírito, vento, fôlego — o Espírito de Deus que paira sobre o caos"},
  "yeshua":{heb:"יֵשׁוּעַ",tr:"yê·šûaʿ",def:"Jesus — literalmente 'YHWH salva', o nome que contém a missão"},
  "kabod":{heb:"כָּבוֹד",tr:"kā·ḇôḏ",def:"Glória, peso, honra — a presença visível e tangível de Deus"},
  "dabar":{heb:"דָּבָר",tr:"dā·ḇār",def:"Palavra, coisa, evento — a Palavra de Deus que cria realidade"},
  "agape":{heb:"אַהֲבָה",tr:"ʾa·hă·ḇāh",def:"Amor incondicional — Deus ama não pelo que somos mas pelo que Ele é"},
  "ahavah":{heb:"אַהֲבָה",tr:"ʾa·hă·ḇāh",def:"Amor — a escolha deliberada de Deus por você antes de você existir"},
  "berith":{heb:"בְּרִית",tr:"bə·rîṯ",def:"Aliança — compromisso irrevogável de Deus, não depende do seu desempenho"},
  "kadosh":{heb:"קָדוֹשׁ",tr:"qā·ḏôš",def:"Santo, separado, diferente de tudo — a natureza fundamental de Deus"},
  "nasa":{heb:"נָשָׂא",tr:"nā·śāʾ",def:"Carregar, perdoar, levantar — Deus carrega o peso dos nossos pecados"},
  "emet":{heb:"אֱמֶת",tr:"ʾĕ·meṯ",def:"Verdade, fidelidade, confiabilidade — Deus é incapaz de mentir"},
  "tsaddik":{heb:"צַדִּיק",tr:"ṣad·dîq",def:"Justo — a justiça que Deus nos credita por causa de Cristo"},
  "kaphar":{heb:"כָּפַר",tr:"kā·p̄ar",def:"Cobrir, expiar — raiz de Yom Kippur, o dia que Cristo cumpriu definitivamente"},
};

// Tooltip para palavras hebraicas
function HebrewWord({ word, data }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{position:"relative",display:"inline"}}>
      <span
        onClick={()=>setOpen(o=>!o)}
        onMouseEnter={()=>setOpen(true)}
        onMouseLeave={()=>setOpen(false)}
        style={{
          color:"var(--gold)",
          fontWeight:600,
          borderBottom:"2px solid var(--gold)",
          cursor:"pointer",
          fontStyle:"italic",
        }}
      >{word}</span>
      {open && (
        <span style={{
          position:"fixed",
          top:"50%",left:"50%",
          transform:"translate(-50%,-50%)",
          width:300,
          background:"var(--white,#fff)",
          border:"1.5px solid var(--gold,#B8912A)",
          borderRadius:14,
          padding:"16px 18px",
          zIndex:9999,
          boxShadow:"0 12px 40px rgba(0,0,0,0.18)",
          fontSize:13,
          lineHeight:1.6,
          fontStyle:"normal",
          fontFamily:"'DM Sans',sans-serif",
        }}>
          <div style={{fontSize:28,fontFamily:"serif",direction:"rtl",textAlign:"center",color:"var(--ink,#17160F)",marginBottom:8,lineHeight:1.3}}>{data.heb}</div>
          <div style={{textAlign:"center",fontSize:13,color:"var(--muted,#8A8980)",marginBottom:10,fontStyle:"italic"}}>{data.tr}</div>
          <div style={{background:"rgba(184,145,42,0.08)",borderRadius:8,padding:"10px 12px",fontSize:13,color:"var(--ink,#17160F)",lineHeight:1.65,borderLeft:"3px solid var(--gold,#B8912A)"}}>{data.def}</div>
          <div style={{fontSize:10,color:"var(--muted)",textAlign:"center",marginTop:8}}>Clique fora para fechar</div>
        </span>
      )}
    </span>
  );
}

// Renderiza texto com palavras hebraicas clicáveis
function renderText(text) {
  if (!text) return null;
  const pattern = new RegExp('(' + Object.keys(HWORDS).join('|') + ')', 'gi');
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    const key = part.toLowerCase();
    if (HWORDS[key]) return <HebrewWord key={i} word={part} data={HWORDS[key]} />;
    return <span key={i}>{part}</span>;
  });
}

// Gera data real a partir do dia do ano (1-365) e ano atual
function getDateFromDay(dayNum) {
  const year = new Date().getFullYear();
  const date = new Date(year, 0);
  date.setDate(dayNum);
  return date.toLocaleDateString("pt-BR", { day:"2-digit", month:"2-digit", year:"2-digit" });
}

function getTodayDayNum() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / 86400000);
}

const STORAGE_KEY = "pregar-devocionais-v2";

function loadCache() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}
function saveCache(cache) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cache)); } catch {}
}

// System prompt do pastor
const PS = `Você é um pastor-teólogo cristocêntrico de profundidade extraordinária.
Combine a exegese profunda de John Piper, o fogo profético de Raik Carmelo, a clareza de Luciano Subirá e a narrativa poética de Renan Belas.

REGRAS ABSOLUTAS:
- Cristo é sempre o centro e o ponto de chegada de tudo
- Use a versão NVI
- Inclua OBRIGATORIAMENTE 2 a 3 palavras em hebraico/grego no corpo da reflexão (ex: chesed, shalom, YHWH, emunah, bara, nephesh, yeshua, kabod, dabar, ahavah, berith, kadosh)
- Escreva com impacto espiritual real — que mude a manhã da pessoa
- Reflexão com pelo menos 3 parágrafos densos e impactantes
- Oração pessoal e íntima, como se Deus estivesse na sala
- Aplicação concreta e desafiadora

Retorne APENAS JSON válido, sem markdown:
{
  "titulo": "...",
  "versiculo": "texto completo NVI",
  "reflexao": "3+ parágrafos profundos com palavras hebraicas naturalmente integradas no texto",
  "oracao": "oração íntima e pessoal",
  "aplicacao": "desafio concreto e impactante para o dia"
}`;

export default function Devocional() {
  const todayNum = getTodayDayNum();
  const [dia, setDia] = useState(todayNum);
  const [dev, setDev] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const REFS = [
    "Gênesis 1.1","Gênesis 1.26-27","Gênesis 2.7","Gênesis 3.15","Gênesis 12.1-3",
    "Gênesis 15.6","Gênesis 22.8","Gênesis 28.15","Gênesis 32.28","Gênesis 50.20",
    "Êxodo 3.14","Êxodo 12.13","Êxodo 14.14","Êxodo 16.4","Êxodo 20.3",
    "Êxodo 33.14","Levítico 17.11","Números 21.9","Deuteronômio 6.4-5","Deuteronômio 8.3",
    "Deuteronômio 18.15","Deuteronômio 31.6","Josué 1.8","Josué 24.15","Juízes 6.12",
    "Rute 1.16","1 Samuel 16.7","1 Samuel 17.47","2 Samuel 7.12-13","1 Reis 19.12",
    "2 Reis 6.16","1 Crônicas 16.11","2 Crônicas 7.14","Esdras 7.10","Neemias 8.10",
    "Ester 4.14","Jó 1.21","Jó 19.25","Jó 38.4","Salmos 1.1-2",
    "Salmos 8.4","Salmos 16.11","Salmos 19.1","Salmos 22.1","Salmos 23.1",
    "Salmos 27.1","Salmos 32.1","Salmos 34.18","Salmos 37.4","Salmos 42.1",
    "Salmos 46.1","Salmos 51.10","Salmos 62.5","Salmos 63.1","Salmos 73.25",
    "Salmos 84.10","Salmos 90.12","Salmos 91.1","Salmos 103.12","Salmos 110.1",
    "Salmos 119.11","Salmos 121.1-2","Salmos 130.3-4","Salmos 139.13-14","Salmos 145.18",
    "Provérbios 3.5-6","Provérbios 4.23","Provérbios 16.9","Eclesiastes 3.11","Eclesiastes 12.13",
    "Isaías 6.3","Isaías 6.8","Isaías 7.14","Isaías 9.6","Isaías 40.31",
    "Isaías 41.10","Isaías 43.1","Isaías 43.25","Isaías 49.16","Isaías 52.7",
    "Isaías 53.3","Isaías 53.5","Isaías 53.6","Isaías 55.1","Isaías 55.8-9",
    "Isaías 61.1-2","Isaías 64.6","Jeremias 1.5","Jeremias 17.9","Jeremias 29.11",
    "Jeremias 31.3","Jeremias 31.31-34","Ezequiel 36.26","Ezequiel 37.4","Daniel 3.17-18",
    "Daniel 6.22","Oséias 11.1","Joel 2.28","Amós 3.7","Jonas 2.9",
    "Miquéias 6.8","Habacuque 3.17-18","Sofonias 3.17","Malaquias 3.10","Mateus 1.21",
    "Mateus 4.4","Mateus 5.3","Mateus 5.8","Mateus 6.9-10","Mateus 6.33",
    "Mateus 11.28-30","Mateus 16.24","Mateus 16.26","Mateus 18.20","Mateus 22.37-39",
    "Mateus 28.18-20","Marcos 1.15","Marcos 8.34","Marcos 10.45","Lucas 1.37",
    "Lucas 4.18","Lucas 9.23","Lucas 10.27","Lucas 15.20","Lucas 19.10",
    "Lucas 22.42","Lucas 23.34","João 1.1","João 1.14","João 1.29",
    "João 3.3","João 3.16","João 4.14","João 6.35","João 6.44",
    "João 8.12","João 8.32","João 8.36","João 10.10","João 10.28-29",
    "João 11.25-26","João 13.34-35","João 14.1-3","João 14.6","João 14.27",
    "João 15.4-5","João 15.13","João 16.33","João 17.3","João 19.30",
    "João 20.28","Atos 1.8","Atos 2.38","Atos 4.12","Atos 17.28",
    "Romanos 1.16","Romanos 3.23","Romanos 3.24","Romanos 5.1","Romanos 5.8",
    "Romanos 6.4","Romanos 6.23","Romanos 8.1","Romanos 8.11","Romanos 8.28",
    "Romanos 8.31-32","Romanos 8.38-39","Romanos 10.9","Romanos 12.1-2","Romanos 15.13",
    "1 Coríntios 1.18","1 Coríntios 1.30","1 Coríntios 2.2","1 Coríntios 6.19-20","1 Coríntios 10.13",
    "1 Coríntios 13.4-7","1 Coríntios 15.3-4","1 Coríntios 15.20","1 Coríntios 15.55-57","2 Coríntios 1.3-4",
    "2 Coríntios 3.18","2 Coríntios 4.17","2 Coríntios 5.17","2 Coríntios 5.21","2 Coríntios 12.9",
    "Gálatas 2.20","Gálatas 3.13","Gálatas 5.1","Gálatas 5.22-23","Efésios 1.4-5",
    "Efésios 1.7","Efésios 2.4-5","Efésios 2.8-9","Efésios 2.10","Efésios 3.20",
    "Efésios 4.32","Efésios 6.10-12","Filipenses 1.6","Filipenses 2.5-8","Filipenses 3.8",
    "Filipenses 4.6-7","Filipenses 4.11","Filipenses 4.13","Colossenses 1.15-17","Colossenses 1.27",
    "Colossenses 2.9-10","Colossenses 3.1-3","1 Tessalonicenses 5.16-18","2 Tessalonicenses 3.3","1 Timóteo 1.15",
    "1 Timóteo 2.5","1 Timóteo 4.8","2 Timóteo 1.7","2 Timóteo 2.13","2 Timóteo 3.16-17",
    "Tito 2.11-12","Tito 3.5","Filemom 1.15-16","Hebreus 1.1-2","Hebreus 2.14-15",
    "Hebreus 4.12","Hebreus 4.15-16","Hebreus 7.25","Hebreus 9.14","Hebreus 10.14",
    "Hebreus 11.1","Hebreus 11.6","Hebreus 12.1-2","Hebreus 12.6","Hebreus 13.5-6",
    "Tiago 1.2-4","Tiago 1.17","Tiago 4.8","1 Pedro 1.3-4","1 Pedro 1.18-19",
    "1 Pedro 2.9","1 Pedro 2.24","1 Pedro 5.7","1 Pedro 5.8-9","2 Pedro 1.3-4",
    "2 Pedro 3.9","1 João 1.7","1 João 1.9","1 João 2.1-2","1 João 3.1",
    "1 João 4.8","1 João 4.10","1 João 4.18","1 João 5.11-12","Judas 1.24-25",
    "Apocalipse 1.17-18","Apocalipse 3.20","Apocalipse 5.9","Apocalipse 12.11","Apocalipse 21.3-4",
    "Apocalipse 22.17","Salmos 27.4","Salmos 31.15","Salmos 36.7","Salmos 40.1-3",
    "Salmos 55.22","Salmos 68.5","Salmos 86.5","Salmos 94.19","Salmos 107.9",
    "Salmos 116.15","Salmos 126.5-6","Salmos 138.3","Salmos 147.3","Isaías 26.3",
  ];

  const ref = REFS[(dia - 1) % REFS.length];
  const dateLabel = getDateFromDay(dia);
  const progress = Math.round((dia / 365) * 100);

  async function gerarDevocional(d) {
    setLoading(true);
    setError("");
    const cache = loadCache();
    if (cache[d]) { setDev(cache[d]); setLoading(false); return; }
    const r = REFS[(d - 1) % REFS.length];
    try {
      const resp = await fetch("/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1800,
          system: PS,
          messages:[{role:"user",content:`Gere o devocional do DIA ${d} de 365, baseado em: ${r}. Seja profundo, cristocêntrico e impactante. Integre naturalmente 2-3 palavras hebraicas no corpo da reflexão.`}]
        })
      });
      const data = await resp.json();
      if (data.error) throw new Error(data.error.message || "Erro na API");
      const text = data.content?.[0]?.text || "";
      const clean = text.replace(/```json|```/g,"").trim();
      const parsed = JSON.parse(clean);
      cache[d] = parsed;
      saveCache(cache);
      setDev(parsed);
    } catch(e) {
      setError("Erro ao gerar: " + e.message);
    }
    setLoading(false);
  }

  useEffect(() => { gerarDevocional(dia); }, [dia]);

  function navDia(delta) {
    const next = Math.min(365, Math.max(1, dia + delta));
    setDia(next);
    setDev(null);
  }

  const isToday = dia === todayNum;

  return (
    <div style={{padding:"0 4px",maxWidth:680,margin:"0 auto"}}>

      {/* Header com data e navegação */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,gap:12}}>
        <button onClick={()=>navDia(-1)} disabled={dia<=1} style={{
          width:36,height:36,borderRadius:"50%",border:"1.5px solid var(--border)",
          background:"var(--surface)",cursor:"pointer",display:"flex",alignItems:"center",
          justifyContent:"center",fontSize:16,color:"var(--ink)",flexShrink:0,
          opacity:dia<=1?0.3:1,transition:"all .2s",
        }}>‹</button>

        <div style={{textAlign:"center",flex:1}}>
          <div style={{
            display:"inline-flex",alignItems:"center",gap:8,
            background:"var(--gold-bg)",border:"1px solid var(--gold-border)",
            borderRadius:20,padding:"4px 14px",marginBottom:4,
          }}>
            <span style={{fontSize:11,fontWeight:600,color:"var(--gold)"}}>Dia {dia} de 365</span>
            {isToday && <span style={{fontSize:10,background:"var(--gold)",color:"#fff",borderRadius:10,padding:"1px 6px",fontWeight:600}}>HOJE</span>}
          </div>
          <div style={{fontSize:13,fontWeight:600,color:"var(--ink)",letterSpacing:"0.04em"}}>{dateLabel}</div>
          <div style={{fontSize:11,color:"var(--muted)",fontStyle:"italic",marginTop:2}}>{ref}</div>
        </div>

        <button onClick={()=>navDia(1)} disabled={dia>=365} style={{
          width:36,height:36,borderRadius:"50%",border:"1.5px solid var(--border)",
          background:"var(--surface)",cursor:"pointer",display:"flex",alignItems:"center",
          justifyContent:"center",fontSize:16,color:"var(--ink)",flexShrink:0,
          opacity:dia>=365?0.3:1,transition:"all .2s",
        }}>›</button>
      </div>

      {/* Barra de progresso */}
      <div style={{height:2,background:"var(--border)",borderRadius:2,marginBottom:20,overflow:"hidden"}}>
        <div style={{height:"100%",background:"var(--gold)",borderRadius:2,width:progress+"%",transition:"width .4s"}}/>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14,padding:"48px 0"}}>
          <div className="ring"/>
          <p style={{fontSize:13,color:"var(--muted)",textAlign:"center",lineHeight:1.6,maxWidth:220}}>
            Preparando o devocional do dia {dia}...
          </p>
        </div>
      )}

      {/* Erro */}
      {error && !loading && (
        <div style={{background:"rgba(139,26,26,0.06)",border:"1px solid var(--red)",borderRadius:10,padding:16,marginBottom:16}}>
          <p style={{fontSize:13,color:"var(--red)",marginBottom:10}}>{error}</p>
          <button onClick={()=>gerarDevocional(dia)} style={{
            padding:"7px 16px",border:"1px solid var(--red)",borderRadius:8,
            background:"none",color:"var(--red)",cursor:"pointer",fontSize:12,fontWeight:600,
          }}>Tentar novamente</button>
        </div>
      )}

      {/* Conteúdo */}
      {dev && !loading && (
        <div style={{animation:"fu 0.4s ease both"}}>

          {/* Título */}
          <div style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:28,fontWeight:700,lineHeight:1.2,
            color:"var(--ink)",marginBottom:16,
          }}>{dev.titulo}</div>

          {/* Versículo */}
          <div style={{
            background:"var(--surface)",
            borderLeft:"3px solid var(--gold)",
            borderRadius:"0 10px 10px 0",
            padding:"14px 16px",marginBottom:18,
          }}>
            <div style={{fontSize:10,fontWeight:600,color:"var(--gold)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>{ref} · NVI</div>
            <div style={{fontSize:16,lineHeight:1.8,color:"var(--ink)",fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif"}}>"{dev.versiculo}"</div>
          </div>

          {/* Reflexão */}
          <div style={{fontSize:15,lineHeight:1.9,color:"var(--ink2)",marginBottom:18}}>
            {dev.reflexao?.split("\n\n").map((p,i)=>(
              <p key={i} style={{marginBottom:i < dev.reflexao.split("\n\n").length-1 ? 14 : 0}}>
                {renderText(p)}
              </p>
            ))}
          </div>

          {/* Oração */}
          <div style={{
            background:"var(--gold-bg)",border:"1px solid var(--gold-border)",
            borderRadius:12,padding:"16px 18px",marginBottom:18,
          }}>
            <div style={{fontSize:10,fontWeight:600,color:"var(--gold)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>🙏 Oração</div>
            <div style={{fontSize:14,lineHeight:1.8,color:"var(--ink2)",fontStyle:"italic"}}>
              {renderText(dev.oracao)}
            </div>
          </div>

          {/* Aplicação */}
          <div style={{
            borderTop:"2px solid var(--gold)",paddingTop:14,marginBottom:16,
          }}>
            <div style={{fontSize:10,fontWeight:600,color:"var(--gold)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>✦ Para hoje</div>
            <div style={{fontSize:14,fontWeight:500,color:"var(--ink)",lineHeight:1.7}}>
              {renderText(dev.aplicacao)}
            </div>
          </div>

          {/* Botão regenerar */}
          <button onClick={()=>{ const c=loadCache(); delete c[dia]; saveCache(c); setDev(null); gerarDevocional(dia); }}
            style={{
              fontSize:12,color:"var(--muted)",background:"none",border:"none",
              cursor:"pointer",textDecoration:"underline",padding:0,
            }}>
            ↻ Gerar nova reflexão para este dia
          </button>
        </div>
      )}

      {/* Dica sobre palavras hebraicas */}
      {dev && !loading && (
        <div style={{
          marginTop:20,padding:"10px 14px",background:"var(--surface)",
          borderRadius:8,fontSize:11,color:"var(--muted)",lineHeight:1.5,
        }}>
          💡 As palavras em <span style={{color:"var(--gold)",fontWeight:600,fontStyle:"italic"}}>dourado</span> são termos hebraicos — passe o mouse ou clique para ver o significado original.
        </div>
      )}
    </div>
  );
}
