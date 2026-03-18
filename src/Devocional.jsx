import { useState } from "react";

const PLANO = [
  {dia:78,ref:"Gênesis 1.3",titulo:"A voz que cria do nada",
   reflexao:"Deus não precisou de matéria-prima. Ele simplesmente falou — e o que não existia passou a existir. A palavra hebraica yəhî ʾôr (que haja luz) é um jussivo soberano: não uma ordem para alguém, mas uma declaração que cria realidade. Isso revela quem é Deus: Sua fala não descreve o mundo, ela o faz.\n\nEsse mesmo Deus fala à sua vida hoje. Onde há caos, Ele pode pronunciar ordem. Onde há trevas, Ele pode declarar luz. Não é magia — é a natureza do Criador agindo sobre a Sua criação.",
   aplicacao:"Hoje, antes de falar sobre seus problemas, fale primeiro a Palavra de Deus sobre eles.",
   oracao:"Senhor, fala sobre o caos da minha vida. Onde há trevas, dize haja luz. Confio que Tua palavra ainda cria, ainda transforma, ainda sustenta. Amém.",
   versiculo:"Disse Deus: Haja luz; e houve luz."},
  {dia:79,ref:"Gênesis 2.7",titulo:"O sopro que nos fez vivos",
   reflexao:"Deus formou o homem do pó — mas a vida veio do Seu sopro pessoal. A palavra hebraica nišmat ḥayyîm (sopro de vida) é a mesma raiz de neshama, alma. Você não é apenas biologia: você carrega o sopro do Criador.\n\nIsso muda tudo. Sua dignidade não vem de suas conquistas, beleza ou utilidade. Vem do fato de que Deus colocou algo de Si mesmo em você.",
   aplicacao:"Trate as pessoas como portadoras do sopro de Deus — inclusive você mesmo.",
   oracao:"Pai, obrigado por não me criar à distância, mas de perto, com Tuas mãos e com Teu sopro. Que eu nunca esqueça o que sou: portador da Tua imagem. Amém.",
   versiculo:"O Senhor Deus formou o homem do pó da terra e soprou em suas narinas o fôlego de vida."},
  {dia:80,ref:"João 1.1",titulo:"A Palavra que existia antes de tudo",
   reflexao:"Antes do primeiro átomo, antes da primeira estrela, havia o Verbo. João usa En archê — exatamente as mesmas palavras de Gênesis 1.1 em grego. Ele quer que você veja: o Deus que criou tudo no começo é o mesmo que se encarnou em Jesus.\n\nCristo não começou em Belém. Ele simplesmente entrou na história que já era Sua.",
   aplicacao:"Medite hoje que Jesus não é apenas seu Salvador — Ele é o Criador e Sustentador de toda a realidade.",
   oracao:"Senhor Jesus, Tu eras antes de tudo. Toda a criação veio por meio de Ti. Me ajuda a te ver não apenas como Salvador, mas como Senhor de todas as coisas. Amém.",
   versiculo:"No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus."},
];

function getDayOfYear() {
  const now = new Date();
  return Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
}

export default function Devocional() {
  const dayOfYear = getDayOfYear();
  const devo = PLANO[(dayOfYear - 1) % PLANO.length];
  const progresso = Math.round((dayOfYear / 365) * 100);

  const hoje = new Date().toLocaleDateString("pt-BR", {weekday:"long",day:"numeric",month:"long",year:"numeric"});
  const hojeLabel = hoje.charAt(0).toUpperCase() + hoje.slice(1);

  return (
    <div style={{paddingBottom:8}}>
      <div style={{display:"inline-block",fontSize:11,fontWeight:600,background:"rgba(30,180,80,0.12)",color:"var(--green)",padding:"3px 9px",borderRadius:10,marginBottom:8}}>
        Dia {dayOfYear} de 365
      </div>
      <div style={{fontSize:11,fontWeight:600,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>{hojeLabel}</div>
      <div style={{fontSize:18,fontWeight:700,color:"var(--ink)",marginBottom:4,lineHeight:1.35}}>{devo.titulo}</div>
      <div style={{fontSize:12,color:"var(--gold)",marginBottom:12,fontWeight:600}}>{devo.ref} · NVI</div>

      <div style={{background:"var(--surface)",borderLeft:"2px solid var(--gold)",borderRadius:"0 8px 8px 0",padding:"11px 13px",fontSize:15,lineHeight:1.75,color:"var(--ink)",marginBottom:12,fontStyle:"italic"}}>
        "{devo.versiculo}"
      </div>

      <div style={{fontSize:14,lineHeight:1.8,color:"var(--ink2)",marginBottom:12}}>
        {devo.reflexao.split("\n\n").map((p,i)=>(<p key={i} style={{marginBottom:i===0?10:0}}>{p}</p>))}
      </div>

      <div style={{background:"var(--surface)",borderRadius:8,padding:"11px 13px",marginBottom:12}}>
        <div style={{fontSize:10,fontWeight:600,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>Oração do dia</div>
        <div style={{fontSize:13,lineHeight:1.7,color:"var(--ink2)"}}>{devo.oracao}</div>
      </div>

      <div style={{fontSize:14,color:"var(--ink)",fontWeight:500,padding:"10px 0",borderTop:"1px solid var(--border)",marginBottom:10}}>
        <span style={{color:"var(--gold)",marginRight:6}}>✦</span>{devo.aplicacao}
      </div>

      <div style={{height:3,background:"var(--border)",borderRadius:2,overflow:"hidden"}}>
        <div style={{height:"100%",width:progresso+"%",background:"var(--gold)",borderRadius:2}}/>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"var(--muted)",marginTop:4}}>
        <span>Plano: Bíblia em 1 ano</span>
        <span>{progresso}% concluído</span>
      </div>
    </div>
  );
}
