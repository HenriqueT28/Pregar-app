import { useState } from "react";

const SUGESTOES = [
  "Ansioso e com medo do futuro",
  "Triste e sem esperança",
  "Me sinto sozinho e abandonado",
  "Culpado por erros do passado",
  "Com raiva e sem paz",
  "Cansado e sem forças",
  "Confuso, sem saber o que fazer",
  "Me sinto indigno do amor de Deus",
  "Passando por luto e perda",
  "Sentindo que Deus está distante",
];

const PS_SENTIMENTOS = `Você é um pastor amoroso, profundo e cristocêntrico.
Quando alguém compartilha o que está sentindo, você responde com:
- Humanidade real — você entende a dor sem minimizá-la
- Cristo como resposta — não como clichê religioso, mas como realidade viva
- Uma frase de impacto que ficará gravada no coração
- Um versículo NVI perfeitamente escolhido para aquele momento
- Uma oração curta e íntima, como se Deus estivesse presente

REGRAS:
- Nunca diga "tudo vai ficar bem" de forma vazia
- Nunca minimize a dor — valide-a primeiro
- Cristo é a resposta, mas apresente-O com ternura e profundidade
- Inclua 1 palavra em hebraico com seu significado de forma natural
- A resposta deve tocar o coração, não apenas dar informação

Retorne APENAS JSON:
{
  "acolhimento": "2-3 frases que validam o sentimento sem minimizar",
  "frase_impacto": "UMA frase poderosa que ficará gravada — cristocêntrica",
  "reflexao": "2 parágrafos profundos, com Cristo no centro, usando 1 palavra hebraica",
  "versiculo": "referência e texto completo NVI perfeitamente escolhido",
  "oracao": "oração curta, íntima, como conversa com Deus",
  "proximo_passo": "uma ação concreta e possível para este momento"
}`;

export default function Sentimentos() {
  const [sentimento, setSentimento] = useState("");
  const [resposta, setResposta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function gerar() {
    if (!sentimento.trim()) return;
    setLoading(true); setResposta(null); setError("");
    try {
      const resp = await fetch("/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1400,
          system: PS_SENTIMENTOS,
          messages:[{role:"user",content:`Estou me sentindo: ${sentimento}`}]
        })
      });
      const data = await resp.json();
      if(data.error) throw new Error(data.error.message||"Erro");
      const text = data.content?.[0]?.text||"";
      const clean = text.replace(/```json|```/g,"").trim();
      setResposta(JSON.parse(clean));
    } catch(e) { setError("Erro ao gerar: "+e.message); }
    setLoading(false);
  }

  return (
    <div style={{padding:"0 4px",maxWidth:680,margin:"0 auto"}}>

      {/* Header */}
      <div style={{marginBottom:20}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:700,color:"var(--ink)",marginBottom:4}}>
          Como você está se sentindo hoje?
        </div>
        <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.6}}>
          Compartilhe o que está no seu coração. Deus tem uma palavra específica para você agora.
        </div>
      </div>

      {/* Input */}
      <div style={{marginBottom:12}}>
        <textarea
          value={sentimento}
          onChange={e=>setSentimento(e.target.value)}
          onKeyDown={e=>{ if(e.key==="Enter" && !e.shiftKey){ e.preventDefault(); gerar(); }}}
          placeholder="Ex: Estou ansioso com o futuro, me sinto só, com raiva, sem esperança..."
          style={{
            width:"100%",minHeight:80,padding:"12px 14px",
            border:"1.5px solid var(--border)",borderRadius:10,
            background:"var(--surface)",color:"var(--ink)",
            fontSize:14,lineHeight:1.6,fontFamily:"'DM Sans',sans-serif",
            outline:"none",resize:"none",transition:"border-color .2s",
          }}
          onFocus={e=>e.target.style.borderColor="var(--gold)"}
          onBlur={e=>e.target.style.borderColor="var(--border)"}
        />
      </div>

      {/* Sugestões */}
      {!resposta && !loading && (
        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,color:"var(--muted)",marginBottom:8,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em"}}>Ou escolha uma situação:</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {SUGESTOES.map((s,i)=>(
              <button key={i} onClick={()=>setSentimento(s)} style={{
                padding:"5px 12px",border:"1.5px solid var(--border)",borderRadius:20,
                background:"none",color:"var(--ink2)",fontSize:12,cursor:"pointer",
                fontFamily:"'DM Sans',sans-serif",transition:"all .15s",
              }}
              onMouseEnter={e=>{ e.target.style.borderColor="var(--gold)"; e.target.style.color="var(--gold)"; }}
              onMouseLeave={e=>{ e.target.style.borderColor="var(--border)"; e.target.style.color="var(--ink2)"; }}
              >{s}</button>
            ))}
          </div>
        </div>
      )}

      {/* Botão */}
      <button onClick={gerar} disabled={!sentimento.trim()||loading} className="btn" style={{marginBottom:20}}>
        {loading
          ? <><div className="dots"><span/><span/><span/></div>Deus tem uma palavra para você...</>
          : "✦ Receber uma palavra de Deus"}
      </button>

      {/* Erro */}
      {error && <div style={{color:"var(--red)",fontSize:13,marginBottom:12}}>{error}</div>}

      {/* Resposta */}
      {resposta && !loading && (
        <div style={{animation:"fu 0.4s ease both"}}>

          {/* Acolhimento */}
          <div style={{
            background:"var(--surface)",borderRadius:12,padding:"16px 18px",
            marginBottom:16,borderLeft:"3px solid var(--gold)",
          }}>
            <div style={{fontSize:15,lineHeight:1.8,color:"var(--ink2)",fontStyle:"italic"}}>
              {resposta.acolhimento}
            </div>
          </div>

          {/* Frase de impacto */}
          <div style={{
            background:"var(--ink)",borderRadius:14,padding:"20px 22px",
            marginBottom:18,textAlign:"center",
          }}>
            <div style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:22,fontWeight:700,color:"#fff",lineHeight:1.3,
            }}>"{resposta.frase_impacto}"</div>
          </div>

          {/* Reflexão */}
          <div style={{fontSize:15,lineHeight:1.9,color:"var(--ink2)",marginBottom:16}}>
            {resposta.reflexao?.split("\n\n").map((p,i)=>(
              <p key={i} style={{marginBottom:10}}>{p}</p>
            ))}
          </div>

          {/* Versículo */}
          <div style={{
            background:"var(--gold-bg)",border:"1px solid var(--gold-border)",
            borderRadius:12,padding:"14px 16px",marginBottom:16,
          }}>
            <div style={{fontSize:10,fontWeight:600,color:"var(--gold)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>
              {resposta.versiculo?.split(" — ")?.[0] || "Palavra de Deus"} · NVI
            </div>
            <div style={{fontSize:15,lineHeight:1.8,color:"var(--ink)",fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif"}}>
              "{resposta.versiculo?.split(" — ").slice(1).join(" — ") || resposta.versiculo}"
            </div>
          </div>

          {/* Oração */}
          <div style={{
            background:"var(--surface)",borderRadius:12,padding:"14px 16px",marginBottom:16,
          }}>
            <div style={{fontSize:10,fontWeight:600,color:"var(--muted)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>🙏 Oração para agora</div>
            <div style={{fontSize:14,lineHeight:1.8,color:"var(--ink2)",fontStyle:"italic"}}>{resposta.oracao}</div>
          </div>

          {/* Próximo passo */}
          <div style={{borderTop:"2px solid var(--gold)",paddingTop:14,marginBottom:16}}>
            <div style={{fontSize:10,fontWeight:600,color:"var(--gold)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>✦ Um passo agora</div>
            <div style={{fontSize:14,fontWeight:500,color:"var(--ink)",lineHeight:1.7}}>{resposta.proximo_passo}</div>
          </div>

          {/* Nova busca */}
          <button onClick={()=>{ setResposta(null); setSentimento(""); }}
            style={{
              fontSize:12,color:"var(--muted)",background:"none",border:"none",
              cursor:"pointer",textDecoration:"underline",padding:0,
            }}>
            ← Compartilhar outro sentimento
          </button>
        </div>
      )}
    </div>
  );
}
