import { useState } from "react";

const EMOCOES_RAPIDAS = [
  { emoji: "😔", label: "Triste" },
  { emoji: "😰", label: "Ansioso" },
  { emoji: "😤", label: "Com raiva" },
  { emoji: "😔", label: "Perdido" },
  { emoji: "💔", label: "Magoado" },
  { emoji: "😩", label: "Cansado" },
  { emoji: "😟", label: "Com medo" },
  { emoji: "🥺", label: "Carente" },
  { emoji: "😐", label: "Vazio" },
  { emoji: "🌧️", label: "Sofrendo" },
];

function buildPrompt(sentimento) {
  const aleatorio = Math.random().toString(36).substring(7);
  return "Voce e um pastor cristocentrico de altissimo nivel, com alma de poeta e coracao de profeta. ID unico desta resposta: " + aleatorio + "\n\nUma pessoa esta sentindo: \"" + sentimento + "\"\n\nGere uma palavra de conforto UNICA e NUNCA REPETIDA para essa pessoa. A palavra deve:\n\n1. COMECAR com um paragrafo que acolha o sentimento da pessoa com profundidade emocional e empatia genuina, como se Cristo mesmo estivesse falando para ela\n\n2. TER UMA FRASE DE IMPACTO no meio do texto. Essa frase deve ser poderosa, inesperada, e que paralise o coracao. Pode ser emocional, profetica, poetica ou reveladora. Coloque-a entre os simbolos ||IMPACTO|| e ||FIM_IMPACTO||\n\n3. USAR um versiculo da Biblia NVI que se conecte profundamente com o sentimento. Sempre cristocentrico.\n\n4. TERMINAR com uma palavra de esperanca que aponte para Cristo como a resposta\n\nRegras:\n- NUNCA repita textos anteriores. Esta resposta e unica\n- O texto deve fluir naturalmente, sem titulos ou topicos\n- Toque o coracao antes de tocar a mente\n- Profundidade teologica com linguagem simples\n- Entre 250 e 350 palavras\n\nResponda APENAS em JSON valido sem markdown:\n{\n  \"texto\": \"texto completo com ||IMPACTO|| frase de impacto ||FIM_IMPACTO|| incorporado naturalmente\",\n  \"versiculo_texto\": \"texto do versiculo NVI\",\n  \"versiculo_ref\": \"Livro Cap.Ver\"\n}";
}

function renderTexto(texto) {
  if (!texto) return null;
  const partes = texto.split(/(\|\|IMPACTO\|\|.*?\|\|FIM_IMPACTO\|\|)/s);
  return partes.map((parte, i) => {
    if (parte.startsWith("||IMPACTO||")) {
      const frase = parte.replace("||IMPACTO||", "").replace("||FIM_IMPACTO||", "").trim();
      return (
        <div key={i} style={{
          margin: "20px 0",
          padding: "16px 20px",
          borderLeft: "4px solid #B8912A",
          background: "rgba(184,145,42,0.06)",
          borderRadius: "0 10px 10px 0",
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 20,
          fontStyle: "italic",
          color: "#17160F",
          lineHeight: 1.6,
          fontWeight: 600,
        }}>
          {frase}
        </div>
      );
    }
    return (
      <span key={i} style={{ whiteSpace: "pre-wrap" }}>{parte}</span>
    );
  });
}

export default function ComoEstou() {
  const [sentimento, setSentimento] = useState("");
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [historico, setHistorico] = useState([]);

  async function gerar(texto) {
    if (!texto.trim()) return;
    setCarregando(true);
    setResultado(null);
    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 900,
          system: "Voce e um pastor cristocentrico profundo e poetico. Responda SEMPRE em JSON valido sem markdown.",
          messages: [{ role: "user", content: buildPrompt(texto) }],
        }),
      });
      const json = await resp.json();
      const raw = json.content?.[0]?.text || "";
      const limpo = raw.replace(/```json|```/g, "").trim();
      const dados = JSON.parse(limpo);
      setResultado({ ...dados, sentimento: texto });
      setHistorico(prev => [{ sentimento: texto, ref: dados.versiculo_ref }, ...prev.slice(0, 4)]);
    } catch (e) {
      setResultado({
        sentimento: texto,
        texto: "Deus ve voce. Exatamente onde voce esta. ||IMPACTO|| Voce nao esta sozinho — o mesmo Deus que ressuscitou Cristo dos mortos, conhece o seu nome. ||FIM_IMPACTO|| Ele nao esta distante olhando sua dor: Ele desceu ate ela. Cristo carregou nas suas costas tudo o que voce esta carregando agora.",
        versiculo_texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigenito, para que todo aquele que nele cre nao pereca, mas tenha a vida eterna.",
        versiculo_ref: "Joao 3.16"
      });
    }
    setCarregando(false);
  }

  function handleEmocao(label) {
    setSentimento(label);
    gerar(label);
  }

  return (
    <div style={{ padding: "0 4px", maxWidth: 680 }}>

      {/* Titulo */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 700, color: "#17160F", lineHeight: 1.2, marginBottom: 6 }}>
          Como estou me sentindo hoje
        </div>
        <div style={{ fontSize: 13, color: "#8A8980", lineHeight: 1.6 }}>
          Compartilhe o que voce esta sentindo. Uma palavra de Deus sera gerada especialmente para voce agora.
        </div>
      </div>

      {/* Emocoes rapidas */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        {EMOCOES_RAPIDAS.map((e, i) => (
          <button key={i} onClick={() => handleEmocao(e.label)}
            style={{
              display: "flex", alignItems: "center", gap: 5,
              padding: "6px 12px",
              border: "1.5px solid #E5E4DC",
              borderRadius: 100,
              background: sentimento === e.label ? "rgba(184,145,42,0.1)" : "#F1F0EB",
              borderColor: sentimento === e.label ? "#B8912A" : "#E5E4DC",
              cursor: "pointer", fontSize: 13,
              color: sentimento === e.label ? "#B8912A" : "#3D3C35",
              fontWeight: sentimento === e.label ? 600 : 400,
              transition: "all 0.15s",
              fontFamily: "sans-serif",
            }}>
            <span style={{ fontSize: 14 }}>{e.emoji}</span>
            {e.label}
          </button>
        ))}
      </div>

      {/* Campo de texto */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <textarea
          value={sentimento}
          onChange={e => setSentimento(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); gerar(sentimento); } }}
          placeholder="Escreva o que esta sentindo... Ex: Estou me sentindo sozinho e sem esperança. Ou: Estou com medo do futuro."
          rows={3}
          style={{
            flex: 1, padding: "12px 14px",
            border: "1.5px solid #E5E4DC",
            borderRadius: 12,
            background: "#F1F0EB",
            color: "#17160F",
            fontSize: 14,
            fontFamily: "sans-serif",
            resize: "none",
            outline: "none",
            lineHeight: 1.6,
          }}
        />
        <button
          onClick={() => gerar(sentimento)}
          disabled={!sentimento.trim() || carregando}
          style={{
            padding: "0 20px",
            background: sentimento.trim() && !carregando ? "#17160F" : "#E5E4DC",
            color: sentimento.trim() && !carregando ? "#fff" : "#8A8980",
            border: "none", borderRadius: 12,
            cursor: sentimento.trim() && !carregando ? "pointer" : "not-allowed",
            fontSize: 20, alignSelf: "stretch",
            transition: "all 0.2s",
            flexShrink: 0,
          }}>
          {carregando ? "..." : "→"}
        </button>
      </div>

      {/* Carregando */}
      {carregando && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "50px 0" }}>
          <div className="ring" />
          <p style={{ fontSize: 13, color: "#8A8980", textAlign: "center", lineHeight: 1.8, maxWidth: 260 }}>
            Deus esta preparando uma palavra<br />
            <span style={{ fontSize: 11, fontStyle: "italic" }}>especialmente para voce agora...</span>
          </p>
        </div>
      )}

      {/* Resultado */}
      {resultado && !carregando && (
        <div style={{ animation: "fadeIn 0.5s ease" }}>

          {/* Tag do sentimento */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8980" }}>
              Uma palavra para quem esta
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#B8912A", background: "rgba(184,145,42,0.1)", padding: "2px 10px", borderRadius: 100, border: "1px solid rgba(184,145,42,0.3)" }}>
              {resultado.sentimento}
            </div>
          </div>

          {/* Versiculo */}
          <div style={{ background: "rgba(184,145,42,0.08)", border: "1.5px solid rgba(184,145,42,0.2)", borderRadius: 12, padding: "14px 18px", marginBottom: 18, position: "relative" }}>
            <span style={{ position: "absolute", top: -12, left: 12, fontSize: 40, color: "#B8912A", opacity: 0.2, fontFamily: "serif", lineHeight: 1 }}>"</span>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, lineHeight: 1.8, color: "#17160F", fontStyle: "italic" }}>
              {resultado.versiculo_texto}
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#B8912A", marginTop: 8, letterSpacing: "0.05em" }}>
              — {resultado.versiculo_ref} · NVI
            </div>
          </div>

          {/* Texto principal com frase de impacto */}
          <div style={{ fontSize: 15, lineHeight: 1.95, color: "#3D3C35", marginBottom: 24 }}>
            {renderTexto(resultado.texto)}
          </div>

          {/* Divisor */}
          <div style={{ borderTop: "1px solid #E5E4DC", paddingTop: 16, marginBottom: 16, display: "flex", gap: 8 }}>
            <button
              onClick={() => { setSentimento(""); setResultado(null); }}
              style={{ flex: 1, padding: "10px", border: "1.5px solid #E5E4DC", borderRadius: 10, background: "#F1F0EB", color: "#17160F", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "sans-serif" }}>
              Compartilhar outro sentimento
            </button>
            <button
              onClick={() => gerar(resultado.sentimento)}
              style={{ padding: "10px 16px", border: "1.5px solid #E5E4DC", borderRadius: 10, background: "none", color: "#8A8980", fontSize: 12, cursor: "pointer", fontFamily: "sans-serif", whiteSpace: "nowrap" }}>
              ↺ Nova palavra
            </button>
          </div>
        </div>
      )}

      {/* Historico */}
      {historico.length > 1 && (
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8980", marginBottom: 8 }}>
            Ultimas buscas
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {historico.slice(1).map((h, i) => (
              <button key={i} onClick={() => { setSentimento(h.sentimento); gerar(h.sentimento); }}
                style={{ fontSize: 12, padding: "4px 10px", border: "1px solid #E5E4DC", borderRadius: 100, background: "none", color: "#8A8980", cursor: "pointer", fontFamily: "sans-serif" }}>
                {h.sentimento}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
