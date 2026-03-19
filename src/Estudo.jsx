import { useState } from "react";

function buildPrompt(referencia) {
  return "Voce e um pastor-teologo cristocentrico de altissimo nivel. Seu estilo combina a profundidade exegetica de Rodrigo Silva, a clareza didatica de Luciano Subira, a poesia teologica de Renan Belas, a ousadia profetica de Raik Carmelo e o rigor academico dos grandes reformadores.\n\nGere um ESTUDO BIBLICO COMPLETO, PROFUNDO E IMPACTANTE sobre: " + referencia + "\n\nO estudo deve ter:\n\n1. TITULO - impactante e teologicamente rico\n\n2. CONTEXTO HISTORICO E CULTURAL - quem escreveu, quando, para quem, o que estava acontecendo na epoca, o que o autor queria comunicar\n\n3. ANALISE EXEGETICA - palavras-chave do hebraico ou grego original. Para cada palavra: a palavra no idioma original, transliteracao, numero Strong, e o que ela revela que a traducao nao captura completamente\n\n4. CRISTO NO TEXTO - como esta passagem aponta para Cristo? Conexoes diretas e indiretas com o Evangelho e o Novo Testamento\n\n5. TEOLOGIA CENTRAL - as grandes verdades doutrinarias desta passagem\n\n6. APLICACAO PASTORAL - como viver isso hoje, de forma pratica e transformadora\n\n7. PERGUNTAS PARA REFLEXAO - 4 perguntas profundas que desafiem o leitor\n\n8. FRASE DE IMPACTO - uma frase teologica poderosa que resuma a essencia da passagem\n\nIMPORTANTE:\n- Cristo deve ser o centro absoluto\n- Linguagem profunda mas acessivel\n- Cada secao deve ter pelo menos 2 paragrafos ricos\n- Use versiculos da NVI\n- Seja especifico, nao generico\n\nResponda APENAS em JSON valido, sem markdown, sem explicacoes fora do JSON:\n{\n  \"titulo\": \"...\" ,\n  \"contexto\": \"...\" ,\n  \"exegese\": \"...\" ,\n  \"cristo\": \"...\" ,\n  \"teologia\": \"...\" ,\n  \"aplicacao\": \"...\" ,\n  \"perguntas\": [\"...\" ,\"...\" ,\"...\" ,\"...\"] ,\n  \"frase_impacto\": \"...\"\n}";
}

export default function Estudo() {
  const [busca, setBusca] = useState("");
  const [estudo, setEstudo] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [refAtual, setRefAtual] = useState("");

  async function gerarEstudo() {
    if (!busca.trim()) return;
    setCarregando(true);
    setEstudo(null);
    setRefAtual(busca.trim());
    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2500,
          system: "Voce e um pastor teologo cristocentrico de altissimo nivel. Responda SEMPRE em JSON valido sem markdown.",
          messages: [{ role: "user", content: buildPrompt(busca.trim()) }],
        }),
      });
      const json = await resp.json();
      const raw = json.content?.[0]?.text || "";
      const limpo = raw.replace(/```json|```/g, "").trim();
      setEstudo(JSON.parse(limpo));
    } catch (e) {
      setEstudo({
        titulo: "Erro ao gerar estudo",
        contexto: "Houve um problema de conexao. Verifique e tente novamente.",
        exegese: "", cristo: "", teologia: "", aplicacao: "",
        perguntas: [], frase_impacto: ""
      });
    }
    setCarregando(false);
  }

  const secao = (icone, titulo, texto) => texto ? (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8A8980", marginBottom: 8, paddingBottom: 6, borderBottom: "1px solid #E5E4DC", display: "flex", alignItems: "center", gap: 6 }}>
        <span>{icone}</span>{titulo}
      </div>
      <p style={{ fontSize: 14.5, lineHeight: 1.9, color: "#3D3C35", whiteSpace: "pre-wrap", margin: 0 }}>{texto}</p>
    </div>
  ) : null;

  return (
    <div style={{ padding: "0 4px", maxWidth: 700 }}>

      {/* Titulo da aba */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 700, color: "#17160F", marginBottom: 4 }}>
          Estudo Bíblico
        </div>
        <div style={{ fontSize: 13, color: "#8A8980", lineHeight: 1.5 }}>
          Digite um versículo, capítulo ou livro e gere um estudo profundo baseado nos maiores teólogos cristocêntricos.
        </div>
      </div>

      {/* Barra de busca */}
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <input
          value={busca}
          onChange={e => setBusca(e.target.value)}
          onKeyDown={e => e.key === "Enter" && gerarEstudo()}
          placeholder="Ex: João 3.16 · Romanos 8 · Salmos 23 · Filipenses 4.13 · Isaías 53..."
          style={{
            flex: 1, padding: "11px 14px",
            border: "1.5px solid #E5E4DC",
            borderRadius: 10, background: "#F1F0EB",
            color: "#17160F", fontSize: 14,
            fontFamily: "sans-serif", outline: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={e => e.target.style.borderColor = "#B8912A"}
          onBlur={e => e.target.style.borderColor = "#E5E4DC"}
        />
        <button
          onClick={gerarEstudo}
          disabled={!busca.trim() || carregando}
          style={{
            padding: "11px 20px",
            background: busca.trim() && !carregando ? "#17160F" : "#E5E4DC",
            color: busca.trim() && !carregando ? "#fff" : "#8A8980",
            border: "none", borderRadius: 10,
            fontSize: 14, fontWeight: 600,
            cursor: busca.trim() && !carregando ? "pointer" : "not-allowed",
            fontFamily: "sans-serif",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}>
          {carregando ? "..." : "Estudar ↗"}
        </button>
      </div>

      {/* Sugestões rápidas */}
      {!estudo && !carregando && (
        <div>
          <div style={{ fontSize: 11, color: "#8A8980", marginBottom: 10, fontStyle: "italic" }}>
            Sugestões:
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
            {["João 3.16","Romanos 8","Salmos 23","Gênesis 1","Isaías 53","Filipenses 4","Efésios 2","Hebreus 11","Apocalipse 21","1 Coríntios 13"].map(s => (
              <button key={s} onClick={() => { setBusca(s); }}
                style={{ fontSize: 12, padding: "5px 12px", border: "1.5px solid #E5E4DC", borderRadius: 100, background: "#F1F0EB", color: "#3D3C35", cursor: "pointer", fontFamily: "sans-serif", transition: "all 0.15s" }}
                onMouseEnter={e => { e.target.style.borderColor = "#B8912A"; e.target.style.color = "#B8912A"; }}
                onMouseLeave={e => { e.target.style.borderColor = "#E5E4DC"; e.target.style.color = "#3D3C35"; }}>
                {s}
              </button>
            ))}
          </div>

          {/* Banner explicativo */}
          <div style={{ background: "#F1F0EB", border: "1px solid #E5E4DC", borderRadius: 12, padding: "16px 18px" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#17160F", marginBottom: 6 }}>
              📖 Como funciona o Estudo Bíblico
            </div>
            <div style={{ fontSize: 13, color: "#3D3C35", lineHeight: 1.75 }}>
              Digite qualquer referência bíblica e a IA gera um estudo completo incluindo: contexto histórico, análise exegética com hebraico e grego original, Cristo no texto, teologia central, aplicação pastoral, perguntas de reflexão e frase de impacto — no estilo dos grandes teólogos cristocêntricos.
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {carregando && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "60px 0" }}>
          <div className="ring" />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#17160F", marginBottom: 4 }}>
              Gerando estudo sobre {refAtual}...
            </div>
            <div style={{ fontSize: 12, color: "#8A8980", fontStyle: "italic" }}>
              Contexto histórico · Exegese · Cristo no texto · Teologia · Aplicação
            </div>
          </div>
        </div>
      )}

      {/* Estudo gerado */}
      {estudo && !carregando && (
        <div style={{ animation: "fadeInUp 0.4s ease" }}>

          {/* Tag da referência */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 600, background: "rgba(184,145,42,0.12)", color: "#B8912A", padding: "3px 12px", borderRadius: 100, border: "1px solid rgba(184,145,42,0.3)" }}>
              {refAtual}
            </span>
          </div>

          {/* Frase de impacto */}
          {estudo.frase_impacto && (
            <div style={{ borderLeft: "4px solid #B8912A", background: "rgba(184,145,42,0.06)", borderRadius: "0 12px 12px 0", padding: "16px 20px", marginBottom: 22, fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontStyle: "italic", color: "#17160F", lineHeight: 1.6, fontWeight: 600 }}>
              {estudo.frase_impacto}
            </div>
          )}

          {/* Título */}
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 700, color: "#17160F", marginBottom: 20, lineHeight: 1.2 }}>
            {estudo.titulo}
          </div>

          {/* Seções */}
          {secao("📜", "Contexto histórico e cultural", estudo.contexto)}
          {secao("🔍", "Análise exegética — hebraico e grego original", estudo.exegese)}

          {/* Cristo em destaque */}
          {estudo.cristo && (
            <div style={{ background: "rgba(184,145,42,0.06)", border: "1.5px solid rgba(184,145,42,0.2)", borderRadius: 12, padding: "16px 18px", marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8912A", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                ✝️ Cristo neste texto
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.9, color: "#3D3C35", margin: 0 }}>{estudo.cristo}</p>
            </div>
          )}

          {secao("📖", "Teologia central", estudo.teologia)}
          {secao("🌱", "Aplicação pastoral — como viver isso hoje", estudo.aplicacao)}

          {/* Perguntas */}
          {estudo.perguntas?.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8A8980", marginBottom: 8, paddingBottom: 6, borderBottom: "1px solid #E5E4DC" }}>
                ❓ Perguntas para reflexão
              </div>
              {estudo.perguntas.map((q, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: "1px solid #E5E4DC" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#B8912A", flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ fontSize: 14, lineHeight: 1.7, color: "#17160F" }}>{q}</span>
                </div>
              ))}
            </div>
          )}

          {/* Botões */}
          <div style={{ display: "flex", gap: 8, marginTop: 20, paddingTop: 16, borderTop: "1px solid #E5E4DC" }}>
            <button onClick={() => { setEstudo(null); setBusca(""); setRefAtual(""); }}
              style={{ flex: 1, padding: "11px", border: "1.5px solid #E5E4DC", borderRadius: 10, background: "#F1F0EB", color: "#17160F", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "sans-serif" }}>
              ← Nova busca
            </button>
            <button onClick={gerarEstudo}
              style={{ padding: "11px 18px", border: "1.5px solid #E5E4DC", borderRadius: 10, background: "none", color: "#8A8980", fontSize: 12, cursor: "pointer", fontFamily: "sans-serif", whiteSpace: "nowrap" }}>
              ↺ Gerar novo
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
