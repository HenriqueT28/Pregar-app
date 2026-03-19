import { useState } from "react";

const PLANO = {
  livro:"Gênesis", caps:"1-2",
  contexto:"Gênesis foi escrito por Moisés por volta de 1445 a.C. O relato da criação responde às cosmogonias egípcias, afirmando que há um único Deus soberano. A palavra bara (criar) aparece exclusivamente com Deus como sujeito no Antigo Testamento.",
  cristo:"João 1.1-3 declara que todas as coisas foram feitas por meio d'Ele. O Verbo que disse haja luz é o mesmo que se encarnou (Jo 1.14). A criação já testemunha do Filho.",
  perguntas:["O que revela sobre Deus o fato de Ele criar apenas pela palavra?","Por que o texto usa Elohim (plural) e não o nome pessoal YHWH?","Como o tohu wabohu (caos e vazio) fala à minha vida hoje?","O que significa ser criado à imagem de Deus (Gn 1.26-27)?"],
  palavras:[
    {word:"בָּרָא",trans:"bara",strong:"H1254",def:"Criar do nada — só Deus é sujeito deste verbo"},
    {word:"אֱלֹהִים",trans:"Elohim",strong:"H430",def:"Plural de majestade — antecipa a revelação trinitária"},
    {word:"תֹהוּ וָבֹהוּ",trans:"tohu wabohu",strong:"H8414",def:"Caos e vazio — estado antes da ordenação divina"},
    {word:"צֶלֶם",trans:"tselem",strong:"H6754",def:"Imagem — ser humano como representante de Deus"},
  ]
};

function getDayOfYear(){const n=new Date(),s=new Date(n.getFullYear(),0,0);return Math.floor((n-s)/86400000);}

function buildPrompt(ref){
  return "Voce e um pastor-teologo cristocentrico. Gere ESTUDO BIBLICO PROFUNDO sobre: "+ref+". Inclua: contexto historico, exegese com hebraico/grego original (minimo 3 palavras com Strong), Cristo no texto, teologia central, aplicacao pastoral, 4 perguntas de reflexao, frase de impacto. Versiculos da NVI. Responda APENAS JSON valido: {titulo,contexto,exegese,cristo,teologia,aplicacao,perguntas,frase_impacto}";
}

export default function Estudo(){
  const [cx,setCx]=useState(false);
  const [ref,setRef]=useState("");
  const [estudo,setEstudo]=useState(null);
  const [carregando,setCarregando]=useState(false);
  const day=getDayOfYear();

  async function gerar(referencia){
    const r=referencia||(PLANO.livro+" "+PLANO.caps);
    setCarregando(true);setEstudo(null);
    try{
      const resp=await fetch("/api/chat",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:2000,
          system:"Voce e pastor teologo cristocentrico. Responda SEMPRE JSON valido sem markdown.",
          messages:[{role:"user",content:buildPrompt(r)}]
        })
      });
      const json=await resp.json();
      const raw=json.content?.[0]?.text||"";
      const limpo=raw.replace(/```json|```/g,"").trim();
      setEstudo(JSON.parse(limpo));
    }catch(e){
      setEstudo({titulo:"Erro",contexto:"Tente novamente.",exegese:"",cristo:"",teologia:"",aplicacao:"",perguntas:[],frase_impacto:""});
    }
    setCarregando(false);
  }

  const ss={fontSize:10,fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--muted,#8A8980)",marginBottom:6,paddingBottom:4,borderBottom:"1px solid var(--border,#E5E4DC)"};
  const st={fontSize:14,lineHeight:1.8,color:"var(--ink2,#3D3C35)"};

  return(
    <div style={{padding:"0 4px"}}>
      <div style={{marginBottom:16}}>
        <div style={{fontSize:11,color:"var(--muted,#8A8980)",marginBottom:2}}>Plano: Bíblia em 1 ano</div>
        <div style={{fontSize:15,fontWeight:600,color:"var(--ink,#17160F)",marginBottom:12}}>Dia {day} · {PLANO.livro} {PLANO.caps}</div>
        <div style={{display:"flex",gap:6,marginBottom:4}}>
          <input value={ref} onChange={e=>setRef(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&gerar(ref||undefined)}
            placeholder="Ex: João 3.16, Romanos 8, Salmos 23..."
            style={{flex:1,padding:"8px 12px",border:"1.5px solid var(--border,#E5E4DC)",borderRadius:8,background:"var(--surface,#F1F0EB)",color:"var(--ink,#17160F)",fontSize:13,fontFamily:"sans-serif",outline:"none"}}/>
          <button onClick={()=>gerar(ref||undefined)} disabled={carregando}
            style={{padding:"8px 16px",background:carregando?"#E5E4DC":"var(--ink,#17160F)",color:carregando?"#8A8980":"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:carregando?"not-allowed":"pointer",fontFamily:"sans-serif",whiteSpace:"nowrap"}}>
            {carregando?"...":"Aprofundar ↗"}
          </button>
        </div>
        <div style={{fontSize:11,color:"var(--muted,#8A8980)",fontStyle:"italic"}}>Digite uma referência ou clique em Aprofundar para estudar o plano do dia</div>
      </div>

      {!estudo&&!carregando&&(
        <div>
          <div style={{marginBottom:14}}>
            <div style={ss}>Contexto histórico</div>
            <p style={st}>{PLANO.contexto}</p>
          </div>
          <div style={{marginBottom:14}}>
            <div onClick={()=>setCx(o=>!o)} style={{...ss,cursor:"pointer",display:"flex",justifyContent:"space-between"}}>
              <span>Cristo em Gênesis</span><span style={{color:"var(--gold,#B8912A)"}}>{cx?"−":"+"}</span>
            </div>
            {cx&&<p style={st}>{PLANO.cristo}</p>}
          </div>
          <div style={{marginBottom:14}}>
            <div style={ss}>Perguntas para reflexão</div>
            {PLANO.perguntas.map((q,i)=><div key={i} style={{fontSize:14,lineHeight:1.65,color:"var(--ink,#17160F)",padding:"6px 0",borderBottom:"1px solid var(--border,#E5E4DC)"}}>→ {q}</div>)}
          </div>
          <div style={{marginBottom:14}}>
            <div style={ss}>Palavras-chave do original</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {PLANO.palavras.map((w,i)=>(
                <div key={i} style={{background:"var(--surface,#F1F0EB)",borderRadius:8,padding:"10px 12px",border:"1px solid var(--border,#E5E4DC)"}}>
                  <div style={{fontSize:18,fontFamily:"serif",direction:"rtl",textAlign:"right",marginBottom:2}}>{w.word}</div>
                  <div style={{fontSize:12,fontWeight:600,color:"var(--gold,#B8912A)",marginBottom:2}}>{w.trans}</div>
                  <div style={{fontSize:10,color:"var(--muted,#8A8980)",background:"rgba(184,145,42,0.08)",borderRadius:4,padding:"1px 5px",display:"inline-block",marginBottom:4}}>{w.strong}</div>
                  <div style={{fontSize:11,color:"var(--ink2,#3D3C35)",lineHeight:1.5}}>{w.def}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {carregando&&(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16,padding:"50px 0"}}>
          <div className="ring"/>
          <p style={{fontSize:13,color:"var(--muted,#8A8980)",textAlign:"center",lineHeight:1.8,maxWidth:260}}>
            Gerando estudo profundo...<br/><span style={{fontSize:11,fontStyle:"italic"}}>Exegese, teologia e aplicação pastoral</span>
          </p>
        </div>
      )}

      {estudo&&!carregando&&(
        <div>
          {estudo.frase_impacto&&(
            <div style={{borderLeft:"4px solid var(--gold,#B8912A)",background:"rgba(184,145,42,0.06)",borderRadius:"0 10px 10px 0",padding:"14px 18px",marginBottom:20,fontFamily:"'Cormorant Garamond',serif",fontSize:19,fontStyle:"italic",color:"var(--ink,#17160F)",lineHeight:1.6,fontWeight:600}}>
              {estudo.frase_impacto}
            </div>
          )}
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:700,color:"var(--ink,#17160F)",marginBottom:16,lineHeight:1.3}}>{estudo.titulo}</div>
          {estudo.contexto&&<div style={{marginBottom:14}}><div style={ss}>Contexto histórico</div><p style={st}>{estudo.contexto}</p></div>}
          {estudo.exegese&&<div style={{marginBottom:14}}><div style={ss}>Análise exegética — palavras originais</div><p style={{...st,whiteSpace:"pre-wrap"}}>{estudo.exegese}</p></div>}
          {estudo.cristo&&(
            <div style={{marginBottom:14,background:"rgba(184,145,42,0.05)",border:"1px solid rgba(184,145,42,0.2)",borderRadius:10,padding:"14px 16px"}}>
              <div style={{...ss,borderColor:"rgba(184,145,42,0.3)"}}>Cristo neste texto</div>
              <p style={st}>{estudo.cristo}</p>
            </div>
          )}
          {estudo.teologia&&<div style={{marginBottom:14}}><div style={ss}>Teologia central</div><p style={st}>{estudo.teologia}</p></div>}
          {estudo.aplicacao&&<div style={{marginBottom:14}}><div style={ss}>Aplicação pastoral</div><p style={st}>{estudo.aplicacao}</p></div>}
          {estudo.perguntas?.length>0&&(
            <div style={{marginBottom:14}}>
              <div style={ss}>Perguntas para reflexão</div>
              {estudo.perguntas.map((q,i)=><div key={i} style={{fontSize:14,lineHeight:1.65,color:"var(--ink,#17160F)",padding:"7px 0",borderBottom:"1px solid var(--border,#E5E4DC)"}}>→ {q}</div>)}
            </div>
          )}
          <div style={{display:"flex",gap:8,marginTop:16}}>
            <button onClick={()=>{setEstudo(null);setRef("");}} style={{flex:1,padding:"10px",border:"1.5px solid var(--border,#E5E4DC)",borderRadius:10,background:"var(--surface,#F1F0EB)",color:"var(--ink,#17160F)",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"sans-serif"}}>← Voltar ao plano</button>
            <button onClick={()=>gerar(ref||undefined)} style={{padding:"10px 16px",border:"1.5px solid var(--border,#E5E4DC)",borderRadius:10,background:"none",color:"var(--muted,#8A8980)",fontSize:12,cursor:"pointer",fontFamily:"sans-serif",whiteSpace:"nowrap"}}>↺ Novo</button>
          </div>
        </div>
      )}
    </div>
  );
}
