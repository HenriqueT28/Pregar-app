import { useState } from "react";
const ESTUDO = {
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
export default function Estudo({onGerarEstudo}){
  const [cx,setCx]=useState(false);
  const day=getDayOfYear();
  const s=ESTUDO;
  return(<div style={{padding:"0 4px"}}>
    <div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Plano: Bíblia em 1 ano</div>
    <div style={{fontSize:15,fontWeight:600,color:"var(--ink)",marginBottom:14}}>Dia {day} · {s.livro} {s.caps}</div>
    <div style={{marginBottom:14}}>
      <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--muted)",marginBottom:6,paddingBottom:4,borderBottom:"1px solid var(--border)"}}>Contexto histórico</div>
      <p style={{fontSize:14,lineHeight:1.75,color:"var(--ink2)"}}>{s.contexto}</p>
    </div>
    <div style={{marginBottom:14}}>
      <div onClick={()=>setCx(o=>!o)} style={{fontSize:10,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--muted)",marginBottom:6,paddingBottom:4,borderBottom:"1px solid var(--border)",cursor:"pointer",display:"flex",justifyContent:"space-between"}}>
        <span>Cristo em Gênesis</span><span style={{color:"var(--gold)"}}>{cx?"−":"+"}</span>
      </div>
      {cx&&<p style={{fontSize:14,lineHeight:1.75,color:"var(--ink2)"}}>{s.cristo}</p>}
    </div>
    <div style={{marginBottom:14}}>
      <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--muted)",marginBottom:6,paddingBottom:4,borderBottom:"1px solid var(--border)"}}>Perguntas para reflexão</div>
      {s.perguntas.map((q,i)=><div key={i} style={{fontSize:14,lineHeight:1.65,color:"var(--ink)",padding:"6px 0",borderBottom:"1px solid var(--border)"}}>→ {q}</div>)}
    </div>
    <div style={{marginBottom:14}}>
      <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--muted)",marginBottom:8,paddingBottom:4,borderBottom:"1px solid var(--border)"}}>Palavras-chave do original</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {s.palavras.map((w,i)=>(
          <div key={i} style={{background:"var(--surface)",borderRadius:8,padding:"10px 12px",border:"1px solid var(--border)"}}>
            <div style={{fontSize:18,fontFamily:"serif",direction:"rtl",textAlign:"right",marginBottom:2}}>{w.word}</div>
            <div style={{fontSize:12,fontWeight:600,color:"var(--gold)",marginBottom:2}}>{w.trans}</div>
            <div style={{fontSize:10,color:"var(--muted)",background:"var(--gold-bg)",borderRadius:4,padding:"1px 5px",display:"inline-block",marginBottom:4}}>{w.strong}</div>
            <div style={{fontSize:11,color:"var(--ink2)",lineHeight:1.5}}>{w.def}</div>
          </div>
        ))}
      </div>
    </div>
    <button className="btn" onClick={onGerarEstudo} style={{marginTop:4}}>Aprofundar com IA ↗</button>
  </div>);
}
