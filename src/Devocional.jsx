import { useState, useEffect } from "react";

// Palavras hebraicas com significado profundo
const HEBRAICO = {
  "shalom": { heb: "שָׁלוֹם", fonetica: "sha-LOM", significado: "Paz completa, inteireza, ausência de nada faltando — muito além de 'ausência de conflito'", strong: "H7965" },
  "hesed": { heb: "חֶסֶד", fonetica: "HE-sed", significado: "Amor leal, misericórdia pactuada que jamais desiste — o amor fiel de Deus pelo seu povo", strong: "H2617" },
  "bara": { heb: "בָּרָא", fonetica: "ba-RA", significado: "Criar do absoluto nada — verbo exclusivo de Deus, nenhum ser humano pode 'bara'", strong: "H1254" },
  "Elohim": { heb: "אֱלֹהִים", fonetica: "e-lo-HIM", significado: "Plural de majestade — o Deus Todo-Poderoso. O plural já antecipa a Trindade", strong: "H430" },
  "YHWH": { heb: "יְהוָה", fonetica: "Adonai (impronunciável)", significado: "O Ser que existe por si mesmo, eterno, autoexistente — o nome pessoal de Deus revelado a Moisés", strong: "H3068" },
  "ruach": { heb: "רוּחַ", fonetica: "RU-ach", significado: "Vento, fôlego, Espírito — o sopro vivo de Deus que dá vida e movimento", strong: "H7307" },
  "emunah": { heb: "אֱמוּנָה", fonetica: "e-mu-NA", significado: "Fidelidade, firmeza, confiança sustentada — a fé bíblica não é sentimento, é fidelidade", strong: "H530" },
  "tsedaqah": { heb: "צְדָקָה", fonetica: "tse-da-KA", significado: "Justiça como relacionamento restaurado — não punição, mas alinhamento com o padrão de Deus", strong: "H6666" },
  "kabod": { heb: "כָּבוֹד", fonetica: "ka-VOD", significado: "Glória, peso, importância — a presença tangível e esmagadora de Deus que faz joelhos dobrarem", strong: "H3519" },
  "neshama": { heb: "נְשָׁמָה", fonetica: "ne-sha-MA", significado: "Sopro de vida divino — o que te diferencia de toda criatura: você carrega o sopro pessoal de Deus", strong: "H5397" },
  "nasa": { heb: "נָשָׂא", fonetica: "na-SA", significado: "Levantar, carregar, perdoar — o mesmo verbo: Deus levanta e carrega o nosso pecado para longe", strong: "H5375" },
  "dabar": { heb: "דָּבָר", fonetica: "da-VAR", significado: "Palavra que age — a Palavra de Deus não apenas informa, ela executa e transforma a realidade", strong: "H1697" },
  "anava": { heb: "עֲנָוָה", fonetica: "a-na-VA", significado: "Humildade como força, não fraqueza — a postura de quem sabe quem é Deus e quem é você", strong: "H6038" },
  "qodesh": { heb: "קֹדֶשׁ", fonetica: "KO-desh", significado: "Santo, separado, diferente de tudo — Deus não é apenas bom, Ele é radicalmente outro", strong: "H6944" },
  "gaal": { heb: "גָּאַל", fonetica: "ga-AL", significado: "Redentor, parente próximo que resgata — Deus se tornou nosso parente em Cristo para nos resgatar", strong: "H1350" },
};

// Sistema: dia começa em 01/01/2025 = dia 1
function getDiaAtual() {
  const inicio = new Date(2025, 0, 1); // 01/01/2025
  const hoje = new Date();
  hoje.setHours(0,0,0,0);
  const diff = Math.floor((hoje - inicio) / 86400000) + 1;
  return Math.max(1, Math.min(diff, 365));
}

function getDataDoDia(dia) {
  const inicio = new Date(2025, 0, 1);
  const data = new Date(inicio);
  data.setDate(data.getDate() + dia - 1);
  return data.toLocaleDateString("pt-BR", { day:"2-digit", month:"2-digit", year:"2-digit" });
}

// Prompt para gerar devocional profundo via IA
function buildPrompt(dia, data) {
  const temas = [
    "a graça imerecida de Deus","a cruz de Cristo","o Espírito Santo como consolador",
    "a fidelidade de Deus nas trevas","identidade em Cristo","o perdão radical",
    "a soberania de Deus sobre a dor","a oração como intimidade","a Palavra como alimento",
    "a ressurreição como esperança","o amor hesed de Deus","a presença de Deus no deserto",
    "o chamado antes do nascimento","a santidade como beleza","a fé que move montanhas",
    "o descanso em Deus","a transformação pelo Evangelho","a glória futura","a comunhão com Cristo",
  ];
  const tema = temas[(dia - 1) % temas.length];
  return `Você é um teólogo pastor cristocêntrico profundo no estilo de Renan Belas, Raik Carmelo e Luciano Subirá combinados.

Gere um devocional para o DIA ${dia} (data: ${data}) com este tema central: "${tema}".

O devocional DEVE:
- Ter um TÍTULO impactante e poético (máximo 8 palavras)
- Ter uma REFERÊNCIA bíblica NVI (versículo específico e poderoso)
- Ter o VERSÍCULO completo na NVI
- Ter uma REFLEXÃO profunda de 4-6 parágrafos que: conecte o versículo com Cristo, use pelo menos UMA palavra em hebraico com seu significado real (ex: hesed, shalom, kabod...), toque o coração com profundidade teológica e linguagem acessível, e inclua uma ilustração do cotidiano
- Ter uma ORAÇÃO poderosa de 3-4 linhas que nasça da reflexão
- Ter uma APLICAÇÃO prática e específica para o dia

Responda APENAS em JSON válido neste formato exato:
{
  "titulo": "...",
  "referencia": "...",
  "versiculo": "...",
  "reflexao": "...",
  "oracao": "...",
  "aplicacao": "..."
}`;
}

// Componente tooltip hebraico
function HebraicoTooltip({ palavra, dados }) {
  const [aberto, setAberto] = useState(false);
  return (
    <span style={{position:"relative",display:"inline"}}>
      <span
        onClick={()=>setAberto(o=>!o)}
        onMouseEnter={()=>setAberto(true)}
        onMouseLeave={()=>setAberto(false)}
        style={{
          borderBottom:"1.5px dashed var(--gold)",
          cursor:"pointer",
          color:"var(--gold)",
          fontStyle:"italic",
          fontWeight:500,
        }}
      >
        {palavra}
      </span>
      {aberto && (
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
          boxShadow:"0 12px 48px rgba(0,0,0,0.18)",
          textAlign:"center",
        }}>
          <div style={{fontSize:32,fontFamily:"serif",direction:"rtl",color:"var(--ink,#17160F)",marginBottom:6,lineHeight:1.3}}>{dados.heb}</div>
          <div style={{fontSize:12,color:"var(--gold,#B8912A)",fontWeight:600,marginBottom:2}}>{dados.strong}</div>
          <div style={{fontSize:13,color:"var(--muted,#8A8980)",fontStyle:"italic",marginBottom:8}}>"{dados.fonetica}"</div>
          <div style={{fontSize:13,color:"var(--ink,#17160F)",lineHeight:1.65,borderTop:"1px solid rgba(184,145,42,0.2)",paddingTop:10}}>{dados.significado}</div>
          <div style={{fontSize:10,color:"var(--muted)",marginTop:8}}>clique em qualquer lugar para fechar</div>
        </span>
      )}
    </span>
  );
}

// Renderizar texto com tooltips hebraicos automáticos
function renderComHebraico(texto) {
  if (!texto) return null;
  const palavras = Object.keys(HEBRAICO);
  const partes = [];
  let restante = texto;
  let key = 0;
  while (restante.length > 0) {
    let menor = -1, achada = null;
    for (const p of palavras) {
      const idx = restante.indexOf(p);
      if (idx !== -1 && (menor === -1 || idx < menor)) { menor = idx; achada = p; }
    }
    if (menor === -1) { partes.push(<span key={key++}>{restante}</span>); break; }
    if (menor > 0) partes.push(<span key={key++}>{restante.slice(0, menor)}</span>);
    partes.push(<HebraicoTooltip key={key++} palavra={achada} dados={HEBRAICO[achada]} />);
    restante = restante.slice(menor + achada.length);
  }
  return partes;
}

export default function Devocional() {
  const diaAtual = getDiaAtual();
  const [dia, setDia] = useState(diaAtual);
  const [dev, setDev] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [cache, setCache] = useState(() => {
    try { return JSON.parse(localStorage.getItem("dev-cache") || "{}"); } catch { return {}; }
  });

  async function gerarDevocional(d) {
    if (cache[d]) { setDev(cache[d]); return; }
    setCarregando(true); setDev(null);
    const data = getDataDoDia(d);
    try {
      const resp = await fetch("/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1200,
          system:"Você é um pastor teólogo cristocêntrico profundo. Responda SEMPRE em JSON válido sem markdown.",
          messages:[{role:"user", content: buildPrompt(d, data)}],
        }),
      });
      const json = await resp.json();
      const texto = json.content?.[0]?.text || "";
      const limpo = texto.replace(/```json|```/g,"").trim();
      const dados = JSON.parse(limpo);
      const novoCache = {...cache, [d]: dados};
      setCache(novoCache);
      localStorage.setItem("dev-cache", JSON.stringify(novoCache));
      setDev(dados);
    } catch(e) {
      setDev({
        titulo:"Deus nunca falha",
        referencia:"Lamentações 3.22-23",
        versiculo:"As misericórdias do Senhor não têm fim, elas se renovam a cada manhã. Grande é a tua fidelidade.",
        reflexao:"Houve um erro ao carregar o devocional. Mas a Palavra permanece: o hesed de Deus — Seu amor leal e pactuado — se renova cada manhã. Não é o devocional que te sustenta: é Deus mesmo.",
        oracao:"Senhor, mesmo quando a tecnologia falha, Tu nunca falhas. Renova em mim a certeza de que Tua fidelidade é maior do que qualquer circunstância. Amém.",
        aplicacao:"Leia Lamentações 3.22-23 em voz alta três vezes e deixe entrar."
      });
    }
    setCarregando(false);
  }

  useEffect(() => { gerarDevocional(dia); }, [dia]);

  const progresso = Math.round((dia / 365) * 100);
  const data = getDataDoDia(dia);

  return (
    <div style={{padding:"0 4px", maxWidth:680}}>

      {/* Cabeçalho com data e navegação */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <button
          onClick={()=>setDia(d=>Math.max(1,d-1))}
          disabled={dia<=1}
          style={{width:36,height:36,borderRadius:"50%",border:"1.5px solid var(--border)",background:"var(--surface)",cursor:dia<=1?"not-allowed":"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",opacity:dia<=1?0.3:1,color:"var(--ink)"}}
        >←</button>

        <div style={{textAlign:"center"}}>
          <div style={{fontSize:11,fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--muted)",marginBottom:2}}>
            {data}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{display:"inline-block",fontSize:11,fontWeight:600,background:"rgba(30,64,53,0.1)",color:"var(--green,#1E4035)",padding:"2px 10px",borderRadius:10}}>
              Dia {dia} de 365
            </span>
            {dia === diaAtual && (
              <span style={{display:"inline-block",fontSize:10,background:"var(--gold-bg)",color:"var(--gold)",padding:"2px 8px",borderRadius:10,fontWeight:600}}>HOJE</span>
            )}
          </div>
        </div>

        <button
          onClick={()=>setDia(d=>Math.min(365,d+1))}
          disabled={dia>=365}
          style={{width:36,height:36,borderRadius:"50%",border:"1.5px solid var(--border)",background:"var(--surface)",cursor:dia>=365?"not-allowed":"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",opacity:dia>=365?0.3:1,color:"var(--ink)"}}
        >→</button>
      </div>

      {/* Barra de progresso */}
      <div style={{height:3,background:"var(--border)",borderRadius:2,marginBottom:20,overflow:"hidden"}}>
        <div style={{height:"100%",width:progresso+"%",background:"var(--gold)",borderRadius:2,transition:"width 0.5s"}}/>
      </div>

      {/* Carregando */}
      {carregando && (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16,padding:"60px 0"}}>
          <div className="ring"/>
          <p style={{fontSize:13,color:"var(--muted)",textAlign:"center",lineHeight:1.7,maxWidth:220}}>
            Preparando o devocional do dia {dia}...
            <br/><span style={{fontSize:11}}>A Palavra está sendo formada</span>
          </p>
        </div>
      )}

      {/* Conteúdo */}
      {dev && !carregando && (
        <div>
          {/* Título */}
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:700,color:"var(--ink)",lineHeight:1.2,marginBottom:6}}>
            {dev.titulo}
          </div>

          {/* Referência */}
          <div style={{fontSize:12,fontWeight:600,color:"var(--gold)",marginBottom:14,letterSpacing:"0.05em"}}>
            {dev.referencia} · NVI
          </div>

          {/* Versículo */}
          <div style={{background:"var(--gold-bg)",border:"1.5px solid var(--gold-border,rgba(184,145,42,0.25))",borderRadius:10,padding:"14px 16px",marginBottom:18,fontFamily:"'Cormorant Garamond',serif",fontSize:17,lineHeight:1.8,color:"var(--ink)",fontStyle:"italic",position:"relative"}}>
            <span style={{position:"absolute",top:-10,left:14,fontSize:40,color:"var(--gold)",opacity:0.3,fontFamily:"serif",lineHeight:1}}>"</span>
            {dev.versiculo}
          </div>

          {/* Reflexão com tooltips hebraicos */}
          <div style={{fontSize:15,lineHeight:1.9,color:"var(--ink2)",marginBottom:18}}>
            {renderComHebraico(dev.reflexao)}
          </div>

          {/* Dica hebraico */}
          <div style={{fontSize:11,color:"var(--muted)",marginBottom:16,fontStyle:"italic",display:"flex",alignItems:"center",gap:6}}>
            <span style={{color:"var(--gold)"}}>✦</span>
            Passe o mouse ou clique nas palavras em dourado para ver o hebraico original
          </div>

          {/* Oração */}
          <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:10,padding:"14px 16px",marginBottom:16}}>
            <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--gold)",marginBottom:8}}>🙏 Oração do dia</div>
            <div style={{fontSize:14,lineHeight:1.8,color:"var(--ink2)",fontStyle:"italic"}}>
              {renderComHebraico(dev.oracao)}
            </div>
          </div>

          {/* Aplicação */}
          <div style={{borderLeft:"3px solid var(--gold)",paddingLeft:14,marginBottom:20}}>
            <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--gold)",marginBottom:5}}>Aplicação do dia</div>
            <div style={{fontSize:14,lineHeight:1.7,color:"var(--ink)",fontWeight:500}}>
              {dev.aplicacao}
            </div>
          </div>

          {/* Navegar para o dia atual */}
          {dia !== diaAtual && (
            <button
              onClick={()=>setDia(diaAtual)}
              style={{width:"100%",padding:"10px",border:"1.5px solid var(--border)",borderRadius:10,background:"var(--surface)",color:"var(--ink)",fontSize:13,fontWeight:500,cursor:"pointer",marginBottom:8}}
            >
              Ir para o devocional de hoje ({getDataDoDia(diaAtual)})
            </button>
          )}

          {/* Regerar */}
          <button
            onClick={()=>{
              const novoCache = {...cache};
              delete novoCache[dia];
              setCache(novoCache);
              localStorage.setItem("dev-cache", JSON.stringify(novoCache));
              gerarDevocional(dia);
            }}
            style={{width:"100%",padding:"10px",border:"1.5px solid var(--border)",borderRadius:10,background:"none",color:"var(--muted)",fontSize:12,cursor:"pointer"}}
          >
            ↺ Gerar novo devocional para este dia
          </button>
        </div>
      )}
    </div>
  );
}
