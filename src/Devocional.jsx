import { useState, useEffect } from "react";

const HEBRAICO = {
  "shalom": { heb: "שָׁלוֹם", fonetica: "sha-LOM", significado: "Paz completa e inteireza — muito além de 'ausência de conflito'. É ter nada faltando em nenhuma área da vida.", strong: "H7965" },
  "hesed": { heb: "חֶסֶד", fonetica: "HÊ-sed", significado: "Amor leal e pactuado que jamais desiste — o amor fiel de Deus pelo seu povo, mesmo quando falham.", strong: "H2617" },
  "bara": { heb: "בָּרָא", fonetica: "ba-RÁ", significado: "Criar do absoluto nada — verbo exclusivo de Deus. Nenhum ser humano pode 'bara'. Só Deus cria do zero.", strong: "H1254" },
  "Elohim": { heb: "אֱלֹהִים", fonetica: "e-lo-HIM", significado: "Plural de majestade — o Deus Todo-Poderoso. O plural já antecipa a revelação da Trindade desde o princípio.", strong: "H430" },
  "YHWH": { heb: "יְהוָה", fonetica: "Adonai (nome sagrado)", significado: "O Ser que existe por si mesmo, eterno e autoexistente. O nome pessoal de Deus revelado a Moisés: EU SOU.", strong: "H3068" },
  "ruach": { heb: "רוּחַ", fonetica: "RÚ-ach", significado: "Vento, fôlego, Espírito — o sopro vivo de Deus que dá vida, movimento e poder a tudo que existe.", strong: "H7307" },
  "emunah": { heb: "אֱמוּנָה", fonetica: "e-mu-NÁ", significado: "Fidelidade firme e sustentada — a fé bíblica não é sentimento passageiro, é fidelidade que persiste.", strong: "H530" },
  "tsedaqah": { heb: "צְדָקָה", fonetica: "tse-da-KÁ", significado: "Justiça como relacionamento restaurado — não punição fria, mas alinhamento com o padrão de Deus.", strong: "H6666" },
  "kabod": { heb: "כָּבוֹד", fonetica: "ka-VOD", significado: "Glória como peso e presença tangível — a presença esmagadora de Deus que faz joelhos dobrarem.", strong: "H3519" },
  "neshama": { heb: "נְשָׁמָה", fonetica: "ne-sha-MÁ", significado: "O sopro divino pessoal — o que te diferencia de toda criatura: você carrega o sopro de Deus dentro de si.", strong: "H5397" },
  "nasa": { heb: "נָשָׂא", fonetica: "na-SÁ", significado: "Levantar, carregar, perdoar — o mesmo verbo: Deus levanta e carrega nosso pecado para longe de nós.", strong: "H5375" },
  "dabar": { heb: "דָּבָר", fonetica: "da-VÁR", significado: "Palavra que age — a Palavra de Deus não apenas informa, ela executa e transforma a própria realidade.", strong: "H1697" },
  "anava": { heb: "עֲנָוָה", fonetica: "a-na-VÁ", significado: "Humildade como força, não fraqueza — a postura de quem sabe exatamente quem é Deus e quem é você.", strong: "H6038" },
  "qodesh": { heb: "קֹדֶשׁ", fonetica: "KÔ-desh", significado: "Santo como separado e radicalmente diferente — Deus não é apenas bom, Ele é absolutamente outro.", strong: "H6944" },
  "gaal": { heb: "גָּאַל", fonetica: "ga-ÁL", significado: "Redentor como parente próximo que resgata — Deus se tornou nosso parente em Cristo para nos libertar.", strong: "H1350" },
};

// Dia do ano atual: 18/03/2026 = dia 77 do ano 2026
function getDiaAtual() {
  const hoje = new Date();
  const inicioAno = new Date(hoje.getFullYear(), 0, 1);
  inicioAno.setHours(0,0,0,0);
  const hojeZero = new Date(hoje);
  hojeZero.setHours(0,0,0,0);
  return Math.floor((hojeZero - inicioAno) / 86400000) + 1;
}

// Data formatada para o dia do ano atual
function getDataDoDia(dia) {
  const ano = new Date().getFullYear();
  const data = new Date(ano, 0, 1);
  data.setDate(data.getDate() + dia - 1);
  return data.toLocaleDateString("pt-BR", { day:"2-digit", month:"2-digit", year:"2-digit" });
}

function buildPrompt(dia, data) {
  const temas = [
    "a graça imerecida de Deus que salva pecadores",
    "a cruz de Cristo como centro de tudo",
    "o Espírito Santo como consolador e guia",
    "a fidelidade de Deus nas trevas e no deserto",
    "identidade segura em Cristo acima de tudo",
    "o perdão radical que liberta completamente",
    "a soberania de Deus sobre a dor e o sofrimento",
    "a oração como intimidade real com o Pai",
    "a Palavra de Deus como alimento diário da alma",
    "a ressurreição de Cristo como esperança viva",
    "o amor hesed de Deus que nunca abandona",
    "a presença de Deus no deserto e no vale escuro",
    "o chamado de Deus antes mesmo do nascimento",
    "a santidade como beleza e não como fardo",
    "a fé que move montanhas e vence o impossível",
    "o descanso profundo em Deus acima das circunstâncias",
    "a transformação radical pelo Evangelho de Cristo",
    "a glória futura que supera todo sofrimento presente",
    "a comunhão íntima com Cristo como propósito da vida",
    "a misericórdia de Deus que se renova cada manhã",
  ];
  const tema = temas[(dia - 1) % temas.length];
  return `Você é um pastor-teólogo cristocêntrico de altíssimo nível. Seu estilo combina:
- Renan Belas: profundidade exegética, frases que paralisam o coração, poesia teológica
- Raik Carmelo: ousadia profética, confronto amoroso, apelos intensos ao Espírito
- Luciano Subirá: clareza didática, ilustrações do cotidiano, teologia acessível

Gere um devocional PROFUNDO E IMPACTANTE para o dia ${dia} (data: ${data}).
Tema central: "${tema}"

REGRAS:
- Cristo deve ser o centro e a resposta de tudo
- Use pelo menos uma palavra em hebraico do vocabulário bíblico (ex: hesed, shalom, kabod, ruach, bara, neshama, emunah, tsedaqah...)
- A reflexão deve ter 4-5 parágrafos que toquem o coração e transformem a mente
- O versículo deve ser da NVI
- A oração deve ser poderosa e pessoal
- A aplicação deve ser prática e específica para o dia de hoje

Responda APENAS em JSON válido, sem markdown:
{
  "titulo": "título impactante e poético (máximo 8 palavras)",
  "referencia": "Livro Capítulo.Versículo",
  "versiculo": "texto completo do versículo NVI",
  "reflexao": "reflexão profunda com 4-5 parágrafos separados por \\n\\n",
  "oracao": "oração poderosa de 3-4 linhas",
  "aplicacao": "aplicação prática e específica para hoje"
}`;
}

function HebraicoTooltip({ palavra, dados }) {
  const [aberto, setAberto] = useState(false);
  return (
    <span style={{position:"relative",display:"inline"}}>
      <span
        onClick={()=>setAberto(o=>!o)}
        onMouseEnter={()=>setAberto(true)}
        onMouseLeave={()=>setAberto(false)}
        style={{borderBottom:"1.5px dashed #B8912A",cursor:"pointer",color:"#B8912A",fontStyle:"italic",fontWeight:500}}
      >{palavra}</span>
      {aberto && (
        <span style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:300,background:"#fff",border:"1.5px solid #B8912A",borderRadius:14,padding:"16px 18px",zIndex:9999,boxShadow:"0 12px 48px rgba(0,0,0,0.2)",textAlign:"center",fontFamily:"'DM Sans',sans-serif"}}
          onClick={e=>e.stopPropagation()}>
          <div style={{fontSize:34,fontFamily:"serif",direction:"rtl",color:"#17160F",marginBottom:4,lineHeight:1.3}}>{dados.heb}</div>
          <div style={{fontSize:12,color:"#B8912A",fontWeight:600,marginBottom:2}}>{dados.strong}</div>
          <div style={{fontSize:13,color:"#8A8980",fontStyle:"italic",marginBottom:10}}>"{dados.fonetica}"</div>
          <div style={{fontSize:13,color:"#17160F",lineHeight:1.7,borderTop:"1px solid rgba(184,145,42,0.2)",paddingTop:10}}>{dados.significado}</div>
          <div style={{fontSize:10,color:"#8A8980",marginTop:10}}>clique em qualquer lugar para fechar</div>
        </span>
      )}
    </span>
  );
}

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
    try { return JSON.parse(localStorage.getItem("dev-cache-2026") || "{}"); } catch { return {}; }
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
          max_tokens:1400,
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
      localStorage.setItem("dev-cache-2026", JSON.stringify(novoCache));
      setDev(dados);
    } catch(e) {
      setDev({
        titulo:"O hesed de Deus nunca falha",
        referencia:"Lamentações 3.22-23",
        versiculo:"As misericórdias do Senhor não têm fim, elas se renovam a cada manhã. Grande é a tua fidelidade.",
        reflexao:"Houve um erro técnico, mas a Palavra permanece.

O hesed de Deus — Seu amor leal e pactuado — se renova cada manhã. Não é a tecnologia que te sustenta: é o próprio Deus.

Ele é fiel quando tudo ao redor falha.",
        oracao:"Senhor, mesmo quando tudo falha, Tu permaneces. Renova em mim hoje a certeza de que Tua fidelidade é maior que qualquer circunstância. Amém.",
        aplicacao:"Leia Lamentações 3.22-23 em voz alta e declare: 'O hesed de Deus se renova sobre mim hoje.'"
      });
    }
    setCarregando(false);
  }

  useEffect(() => { gerarDevocional(dia); }, [dia]);

  const totalDias = new Date(new Date().getFullYear(), 11, 31);
  const inicioAno = new Date(new Date().getFullYear(), 0, 1);
  const diasNoAno = Math.floor((totalDias - inicioAno) / 86400000) + 1;
  const progresso = Math.round((dia / diasNoAno) * 100);
  const data = getDataDoDia(dia);

  return (
    <div style={{padding:"0 4px",maxWidth:680}}>

      {/* Navegação com setas e data */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <button
          onClick={()=>setDia(d=>Math.max(1,d-1))}
          disabled={dia<=1}
          style={{width:38,height:38,borderRadius:"50%",border:"1.5px solid var(--border,#E5E4DC)",background:"var(--surface,#F1F0EB)",cursor:dia<=1?"not-allowed":"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",opacity:dia<=1?0.3:1,color:"var(--ink,#17160F)",transition:"all 0.15s"}}
        >←</button>

        <div style={{textAlign:"center"}}>
          <div style={{fontSize:16,fontWeight:700,color:"var(--ink,#17160F)",fontFamily:"'DM Sans',sans-serif",letterSpacing:"-0.01em"}}>
            {data}
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:3}}>
            <span style={{fontSize:11,fontWeight:600,background:"rgba(30,64,53,0.1)",color:"var(--green,#1E4035)",padding:"2px 10px",borderRadius:10}}>
              Dia {dia} de {diasNoAno}
            </span>
            {dia === diaAtual && (
              <span style={{fontSize:10,background:"rgba(184,145,42,0.15)",color:"#B8912A",padding:"2px 8px",borderRadius:10,fontWeight:700}}>HOJE</span>
            )}
          </div>
        </div>

        <button
          onClick={()=>setDia(d=>Math.min(diasNoAno,d+1))}
          disabled={dia>=diasNoAno}
          style={{width:38,height:38,borderRadius:"50%",border:"1.5px solid var(--border,#E5E4DC)",background:"var(--surface,#F1F0EB)",cursor:dia>=diasNoAno?"not-allowed":"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",opacity:dia>=diasNoAno?0.3:1,color:"var(--ink,#17160F)",transition:"all 0.15s"}}
        >→</button>
      </div>

      {/* Barra de progresso */}
      <div style={{height:3,background:"var(--border,#E5E4DC)",borderRadius:2,marginBottom:20,overflow:"hidden"}}>
        <div style={{height:"100%",width:progresso+"%",background:"#B8912A",borderRadius:2,transition:"width 0.5s"}}/>
      </div>

      {/* Carregando */}
      {carregando && (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16,padding:"60px 0"}}>
          <div className="ring"/>
          <p style={{fontSize:13,color:"var(--muted,#8A8980)",textAlign:"center",lineHeight:1.8,maxWidth:240}}>
            Preparando o devocional de {data}...
            <br/><span style={{fontSize:11,fontStyle:"italic"}}>A Palavra está sendo formada</span>
          </p>
        </div>
      )}

      {/* Conteúdo */}
      {dev && !carregando && (
        <div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:27,fontWeight:700,color:"var(--ink,#17160F)",lineHeight:1.2,marginBottom:6}}>
            {dev.titulo}
          </div>
          <div style={{fontSize:12,fontWeight:600,color:"#B8912A",marginBottom:14,letterSpacing:"0.05em"}}>
            {dev.referencia} · NVI
          </div>

          {/* Versículo */}
          <div style={{background:"rgba(184,145,42,0.08)",border:"1.5px solid rgba(184,145,42,0.25)",borderRadius:10,padding:"14px 18px",marginBottom:18,position:"relative"}}>
            <span style={{position:"absolute",top:-14,left:12,fontSize:48,color:"#B8912A",opacity:0.2,fontFamily:"serif",lineHeight:1}}>"</span>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,lineHeight:1.85,color:"var(--ink,#17160F)",fontStyle:"italic"}}>
              {dev.versiculo}
            </div>
          </div>

          {/* Reflexão */}
          <div style={{fontSize:15,lineHeight:1.95,color:"var(--ink2,#3D3C35)",marginBottom:16}}>
            {dev.reflexao?.split("\n\n").map((p,i)=>(
              <p key={i} style={{marginBottom:i < dev.reflexao.split("\n\n").length-1 ? 14 : 0}}>
                {renderComHebraico(p)}
              </p>
            ))}
          </div>

          {/* Dica tooltip */}
          <div style={{fontSize:11,color:"var(--muted,#8A8980)",marginBottom:14,fontStyle:"italic",display:"flex",alignItems:"center",gap:5}}>
            <span style={{color:"#B8912A"}}>✦</span>
            Toque ou passe o mouse nas palavras <span style={{color:"#B8912A",fontWeight:600}}>douradas</span> para ver o hebraico original com significado profundo
          </div>

          {/* Oração */}
          <div style={{background:"var(--surface,#F1F0EB)",border:"1px solid var(--border,#E5E4DC)",borderRadius:10,padding:"14px 16px",marginBottom:14}}>
            <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"#B8912A",marginBottom:8}}>🙏 Oração do dia</div>
            <div style={{fontSize:14,lineHeight:1.85,color:"var(--ink2,#3D3C35)",fontStyle:"italic"}}>
              {renderComHebraico(dev.oracao)}
            </div>
          </div>

          {/* Aplicação */}
          <div style={{borderLeft:"3px solid #B8912A",paddingLeft:14,marginBottom:20}}>
            <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"#B8912A",marginBottom:5}}>Aplicação do dia</div>
            <div style={{fontSize:14,lineHeight:1.75,color:"var(--ink,#17160F)",fontWeight:500}}>
              {dev.aplicacao}
            </div>
          </div>

          {/* Botão ir para hoje */}
          {dia !== diaAtual && (
            <button onClick={()=>setDia(diaAtual)}
              style={{width:"100%",padding:"11px",border:"1.5px solid var(--border,#E5E4DC)",borderRadius:10,background:"var(--surface,#F1F0EB)",color:"var(--ink,#17160F)",fontSize:13,fontWeight:500,cursor:"pointer",marginBottom:8,fontFamily:"'DM Sans',sans-serif"}}>
              Ir para o devocional de hoje — {getDataDoDia(diaAtual)}
            </button>
          )}

          {/* Regerar */}
          <button
            onClick={()=>{
              const novo = {...cache};
              delete novo[dia];
              setCache(novo);
              localStorage.setItem("dev-cache-2026", JSON.stringify(novo));
              gerarDevocional(dia);
            }}
            style={{width:"100%",padding:"10px",border:"1.5px solid var(--border,#E5E4DC)",borderRadius:10,background:"none",color:"var(--muted,#8A8980)",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
            ↺ Gerar novo devocional para {data}
          </button>
        </div>
      )}
    </div>
  );
}
