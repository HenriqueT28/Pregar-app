import { useState, useEffect } from "react";

const HEBRAICO = {
  "shalom": { heb: "שָׁלוֹם", fonetica: "sha-LOM", significado: "Paz completa e inteireza. Muito alem de ausencia de conflito: ter nada faltando.", strong: "H7965" },
  "hesed": { heb: "חֶסֶד", fonetica: "HE-sed", significado: "Amor leal e pactuado que jamas desiste. O amor fiel de Deus pelo seu povo.", strong: "H2617" },
  "bara": { heb: "בָּרָא", fonetica: "ba-RA", significado: "Criar do absoluto nada. Verbo exclusivo de Deus. Nenhum ser humano pode bara.", strong: "H1254" },
  "Elohim": { heb: "אֱלֹהִים", fonetica: "e-lo-HIM", significado: "Plural de majestade. O Deus Todo-Poderoso. Ja antecipa a revelacao da Trindade.", strong: "H430" },
  "YHWH": { heb: "יְהוָה", fonetica: "Adonai (nome sagrado)", significado: "O Ser que existe por si mesmo, eterno e autoexistente. EU SOU.", strong: "H3068" },
  "ruach": { heb: "רוּחַ", fonetica: "RU-ach", significado: "Vento, folego, Espirito. O sopro vivo de Deus que da vida e movimento.", strong: "H7307" },
  "emunah": { heb: "אֱמוּנָה", fonetica: "e-mu-NA", significado: "Fidelidade firme e sustentada. A fe biblica nao e sentimento, e fidelidade.", strong: "H530" },
  "kabod": { heb: "כָּבוֹד", fonetica: "ka-VOD", significado: "Gloria como peso e presenca tangivel de Deus que faz joelhos dobrarem.", strong: "H3519" },
  "neshama": { heb: "נְשָׁמָה", fonetica: "ne-sha-MA", significado: "Sopro divino pessoal. Voce carrega o sopro de Deus dentro de si.", strong: "H5397" },
  "nasa": { heb: "נָשָׂא", fonetica: "na-SA", significado: "Levantar, carregar, perdoar. Deus levanta e carrega nosso pecado para longe.", strong: "H5375" },
  "dabar": { heb: "דָּבָר", fonetica: "da-VAR", significado: "Palavra que age. A Palavra de Deus nao apenas informa, ela transforma a realidade.", strong: "H1697" },
  "qodesh": { heb: "קֹדֶשׁ", fonetica: "KO-desh", significado: "Santo como separado e radicalmente diferente. Deus nao e apenas bom, e absolutamente outro.", strong: "H6944" },
  "gaal": { heb: "גָּאַל", fonetica: "ga-AL", significado: "Redentor como parente proximo que resgata. Deus se tornou nosso parente em Cristo.", strong: "H1350" },
  "anava": { heb: "עֲנָוָה", fonetica: "a-na-VA", significado: "Humildade como forca, nao fraqueza. A postura de quem sabe quem e Deus e quem e voce.", strong: "H6038" },
  "tsedaqah": { heb: "צְדָקָה", fonetica: "tse-da-KA", significado: "Justica como relacionamento restaurado com Deus, nao punicao fria.", strong: "H6666" },
};

function getDiaAtual() {
  const hoje = new Date();
  const inicioAno = new Date(hoje.getFullYear(), 0, 1);
  inicioAno.setHours(0, 0, 0, 0);
  const hojeZero = new Date(hoje);
  hojeZero.setHours(0, 0, 0, 0);
  return Math.floor((hojeZero - inicioAno) / 86400000) + 1;
}

function getDataDoDia(dia) {
  const ano = new Date().getFullYear();
  const data = new Date(ano, 0, dia);
  return data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" });
}

function getDiasNoAno() {
  const ano = new Date().getFullYear();
  return ((ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0) ? 366 : 365;
}

function buildPromptDevocional(dia, data) {
  const temas = [
    "a graca imerecida de Deus que salva pecadores",
    "a cruz de Cristo como centro de tudo",
    "o Espirito Santo como consolador e guia",
    "a fidelidade de Deus nas trevas e no deserto",
    "identidade segura em Cristo acima das circunstancias",
    "o perdao radical que liberta completamente",
    "a soberania de Deus sobre a dor e o sofrimento",
    "a oracao como intimidade real com o Pai",
    "a Palavra de Deus como alimento da alma",
    "a ressurreicao de Cristo como esperanca viva",
    "o amor hesed de Deus que nunca abandona",
    "a presenca de Deus no vale escuro",
    "o chamado de Deus antes mesmo do nascimento",
    "a santidade como beleza e nao como fardo",
    "a fe que move montanhas e vence o impossivel",
    "o descanso profundo em Deus acima das circunstancias",
    "a transformacao radical pelo Evangelho de Cristo",
    "a gloria futura que supera todo sofrimento presente",
    "a comunhao intima com Cristo como proposito da vida",
    "a misericordia de Deus que se renova cada manha",
  ];
  const tema = temas[(dia - 1) % temas.length];
  return "Voce e um pastor-teologo cristocentrico de altissimo nivel. Estilo: Renan Belas + Raik Carmelo + Luciano Subira.\n\nGere um devocional PROFUNDO para o dia " + dia + " (data: " + data + ").\nTema: \"" + tema + "\"\n\nRegras:\n- Cristo deve ser o centro e a resposta de tudo\n- Use pelo menos uma palavra hebraica (hesed, shalom, kabod, ruach, bara, neshama, emunah, tsedaqah, qodesh, gaal...)\n- Reflexao com 4-5 paragrafos que toquem o coracao\n- Versiculo da NVI\n- Oracao poderosa e pessoal\n- Aplicacao pratica para hoje\n\nResposta APENAS em JSON valido sem markdown:\n{\n  \"titulo\": \"titulo impactante maximo 8 palavras\",\n  \"referencia\": \"Livro Cap.Ver\",\n  \"versiculo\": \"texto completo NVI\",\n  \"reflexao\": \"reflexao com paragrafos separados por \\n\\n\",\n  \"oracao\": \"oracao de 3-4 linhas\",\n  \"aplicacao\": \"aplicacao pratica para hoje\"\n}";
}

function buildPromptEstudoDevocional(dev, dia, data) {
  return "Voce e um pastor-teologo cristocentrico de altissimo nivel, com a profundidade de Rodrigo Silva, a poesia de Renan Belas, a ousadia de Raik Carmelo e a clareza de Luciano Subira.\n\nGere um ESTUDO PROFUNDO E IMPACTANTE sobre o devocional do dia " + dia + " (" + data + ").\n\nDevocional base:\n- Titulo: " + (dev.titulo||"") + "\n- Referencia: " + (dev.referencia||"") + "\n- Versiculo: " + (dev.versiculo||"") + "\n\nO estudo deve:\n1. APROFUNDAR o contexto historico e cultural da passagem\n2. MERGULHAR nas palavras do hebraico ou grego original (minimo 3 palavras com Strong)\n3. REVELAR Cristo neste texto de forma poderosa\n4. DESDOBRAR a teologia central com frases de impacto que paralisem o coracao\n5. DAR uma aplicacao transformadora para hoje\n6. TERMINAR com uma oracao de rendimento total\n\nFrases de impacto: intercale frases curtas e poderosas que choquem e transformem. Exemplo: 'Deus nao precisa da sua forca. Ele precisa da sua rendição.' Use pelo menos 3 frases assim.\n\nResposta APENAS em JSON valido sem markdown:\n{\n  \"frase_abertura\": \"frase de impacto inicial que paralise o coracao\",\n  \"contexto\": \"contexto historico e cultural rico e profundo\",\n  \"exegese\": \"analise palavra por palavra do hebraico grego com Strong e o que a traducao perdeu\",\n  \"cristo\": \"como esta passagem aponta para Cristo de forma poderosa\",\n  \"frases_impacto\": [\"frase1\",\"frase2\",\"frase3\"],\n  \"teologia\": \"verdades teologicas centrais com profundidade\",\n  \"aplicacao\": \"como viver isso hoje de forma concreta e transformadora\",\n  \"oracao_final\": \"oracao de rendimento e entrega total a Deus\"\n}";
}

function HebraicoTooltip({ palavra, dados }) {
  const [aberto, setAberto] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline" }}>
      <span onClick={() => setAberto(o => !o)} onMouseEnter={() => setAberto(true)} onMouseLeave={() => setAberto(false)}
        style={{ borderBottom: "1.5px dashed #B8912A", cursor: "pointer", color: "#B8912A", fontStyle: "italic", fontWeight: 500 }}>
        {palavra}
      </span>
      {aberto && (
        <span onClick={e => { e.stopPropagation(); setAberto(false); }}
          style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 300, background: "#fff", border: "1.5px solid #B8912A", borderRadius: 14, padding: "16px 18px", zIndex: 9999, boxShadow: "0 12px 48px rgba(0,0,0,0.2)", textAlign: "center", fontFamily: "sans-serif" }}>
          <div style={{ fontSize: 34, fontFamily: "serif", direction: "rtl", color: "#17160F", marginBottom: 4 }}>{dados.heb}</div>
          <div style={{ fontSize: 12, color: "#B8912A", fontWeight: 600, marginBottom: 2 }}>{dados.strong}</div>
          <div style={{ fontSize: 13, color: "#8A8980", fontStyle: "italic", marginBottom: 10 }}>"{dados.fonetica}"</div>
          <div style={{ fontSize: 13, color: "#17160F", lineHeight: 1.7, borderTop: "1px solid rgba(184,145,42,0.2)", paddingTop: 10 }}>{dados.significado}</div>
          <div style={{ fontSize: 10, color: "#8A8980", marginTop: 8 }}>clique para fechar</div>
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
  const diasNoAno = getDiasNoAno();
  const [dia, setDia] = useState(diaAtual);
  const [dev, setDev] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [cache, setCache] = useState(() => {
    try { return JSON.parse(localStorage.getItem("pregar-dev-v3") || "{}"); } catch { return {}; }
  });
  // Estudo aprofundado
  const [estudo, setEstudo] = useState(null);
  const [carregandoEstudo, setCarregandoEstudo] = useState(false);
  const [cacheEstudo, setCacheEstudo] = useState(() => {
    try { return JSON.parse(localStorage.getItem("pregar-estudo-dev-v1") || "{}"); } catch { return {}; }
  });

  async function gerarDevocional(d) {
    if (cache[d]) { setDev(cache[d]); setEstudo(null); return; }
    setCarregando(true); setDev(null); setEstudo(null);
    const data = getDataDoDia(d);
    try {
      const resp = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1400,
          system: "Voce e um pastor teologo cristocentrico profundo. Responda SEMPRE em JSON valido sem markdown.",
          messages: [{ role: "user", content: buildPromptDevocional(d, data) }] }),
      });
      const json = await resp.json();
      const limpo = (json.content?.[0]?.text || "").replace(/```json|```/g, "").trim();
      const dados = JSON.parse(limpo);
      const novoCache = { ...cache, [d]: dados };
      setCache(novoCache);
      localStorage.setItem("pregar-dev-v3", JSON.stringify(novoCache));
      setDev(dados);
    } catch (e) {
      setDev({ titulo: "O hesed de Deus nunca falha", referencia: "Lamentacoes 3.22-23",
        versiculo: "As misericordias do Senhor nao tem fim, elas se renovam a cada manha. Grande e a tua fidelidade.",
        reflexao: "O hesed de Deus se renova cada manha. Nao e a tecnologia que te sustenta: e o proprio Deus.",
        oracao: "Senhor, mesmo quando tudo falha, Tu permaneces. Amen.",
        aplicacao: "Leia Lamentacoes 3.22-23 em voz alta e declare: O hesed de Deus se renova sobre mim hoje." });
    }
    setCarregando(false);
  }

  async function gerarEstudoDevocional() {
    if (!dev) return;
    const chave = "dia-" + dia;
    if (cacheEstudo[chave]) { setEstudo(cacheEstudo[chave]); return; }
    setCarregandoEstudo(true);
    const data = getDataDoDia(dia);
    try {
      const resp = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 2500,
          system: "Voce e um pastor teologo cristocentrico de altissimo nivel. Responda SEMPRE em JSON valido sem markdown.",
          messages: [{ role: "user", content: buildPromptEstudoDevocional(dev, dia, data) }] }),
      });
      const json = await resp.json();
      const limpo = (json.content?.[0]?.text || "").replace(/```json|```/g, "").trim();
      const dados = JSON.parse(limpo);
      const novoCache = { ...cacheEstudo, [chave]: dados };
      setCacheEstudo(novoCache);
      localStorage.setItem("pregar-estudo-dev-v1", JSON.stringify(novoCache));
      setEstudo(dados);
    } catch (e) {
      setEstudo({ frase_abertura: "Erro ao carregar. Tente novamente.", contexto: "", exegese: "", cristo: "", frases_impacto: [], teologia: "", aplicacao: "", oracao_final: "" });
    }
    setCarregandoEstudo(false);
  }

  useEffect(() => { gerarDevocional(dia); }, [dia]);

  const progresso = Math.round((dia / diasNoAno) * 100);
  const data = getDataDoDia(dia);

  const btnNav = (disabled) => ({
    width: 38, height: 38, borderRadius: "50%", border: "1.5px solid #E5E4DC",
    background: "#F1F0EB", cursor: disabled ? "not-allowed" : "pointer",
    fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
    opacity: disabled ? 0.3 : 1, color: "#17160F", flexShrink: 0,
  });

  const ss = { fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8A8980", marginBottom: 8, paddingBottom: 6, borderBottom: "1px solid #E5E4DC" };

  return (
    <div style={{ padding: "0 4px", maxWidth: 680 }}>

      {/* Navegação */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <button onClick={() => setDia(d => Math.max(1, d - 1))} disabled={dia <= 1} style={btnNav(dia <= 1)}>←</button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#17160F", letterSpacing: "-0.01em" }}>{data}</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 3 }}>
            <span style={{ fontSize: 11, fontWeight: 600, background: "rgba(30,64,53,0.1)", color: "#1E4035", padding: "2px 10px", borderRadius: 10 }}>Dia {dia} de {diasNoAno}</span>
            {dia === diaAtual && <span style={{ fontSize: 10, background: "rgba(184,145,42,0.15)", color: "#B8912A", padding: "2px 8px", borderRadius: 10, fontWeight: 700 }}>HOJE</span>}
          </div>
        </div>
        <button onClick={() => setDia(d => Math.min(diasNoAno, d + 1))} disabled={dia >= diasNoAno} style={btnNav(dia >= diasNoAno)}>→</button>
      </div>

      {/* Barra progresso */}
      <div style={{ height: 3, background: "#E5E4DC", borderRadius: 2, marginBottom: 20, overflow: "hidden" }}>
        <div style={{ height: "100%", width: progresso + "%", background: "#B8912A", borderRadius: 2, transition: "width 0.5s" }} />
      </div>

      {/* Loading devocional */}
      {carregando && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "60px 0" }}>
          <div className="ring" />
          <p style={{ fontSize: 13, color: "#8A8980", textAlign: "center", lineHeight: 1.8, maxWidth: 240 }}>
            Preparando o devocional de {data}...<br /><span style={{ fontSize: 11, fontStyle: "italic" }}>A Palavra está sendo formada</span>
          </p>
        </div>
      )}

      {/* Devocional */}
      {dev && !carregando && !estudo && (
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 27, fontWeight: 700, color: "#17160F", lineHeight: 1.2, marginBottom: 6 }}>{dev.titulo}</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#B8912A", marginBottom: 14, letterSpacing: "0.05em" }}>{dev.referencia} · NVI</div>
          <div style={{ background: "rgba(184,145,42,0.08)", border: "1.5px solid rgba(184,145,42,0.25)", borderRadius: 10, padding: "14px 18px", marginBottom: 18, position: "relative" }}>
            <span style={{ position: "absolute", top: -14, left: 12, fontSize: 48, color: "#B8912A", opacity: 0.2, fontFamily: "serif", lineHeight: 1 }}>"</span>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, lineHeight: 1.85, color: "#17160F", fontStyle: "italic" }}>{dev.versiculo}</div>
          </div>
          <div style={{ fontSize: 15, lineHeight: 1.95, color: "#3D3C35", marginBottom: 16 }}>
            {dev.reflexao?.split("\n\n").map((p, i, arr) => (
              <p key={i} style={{ marginBottom: i < arr.length - 1 ? 14 : 0 }}>{renderComHebraico(p)}</p>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "#8A8980", marginBottom: 14, fontStyle: "italic", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ color: "#B8912A" }}>✦</span>
            Toque nas palavras <span style={{ color: "#B8912A", fontWeight: 600 }}>douradas</span> para ver o hebraico original
          </div>
          <div style={{ background: "#F1F0EB", border: "1px solid #E5E4DC", borderRadius: 10, padding: "14px 16px", marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8912A", marginBottom: 8 }}>Oração do dia</div>
            <div style={{ fontSize: 14, lineHeight: 1.85, color: "#3D3C35", fontStyle: "italic" }}>{renderComHebraico(dev.oracao)}</div>
          </div>
          <div style={{ borderLeft: "3px solid #B8912A", paddingLeft: 14, marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8912A", marginBottom: 5 }}>Aplicação do dia</div>
            <div style={{ fontSize: 14, lineHeight: 1.75, color: "#17160F", fontWeight: 500 }}>{dev.aplicacao}</div>
          </div>

          {/* BOTÃO APROFUNDAR */}
          <button onClick={gerarEstudoDevocional} disabled={carregandoEstudo}
            style={{
              width: "100%", padding: "14px",
              background: "#17160F", color: "#fff",
              border: "none", borderRadius: 12,
              fontSize: 14, fontWeight: 600,
              cursor: "pointer", fontFamily: "sans-serif",
              letterSpacing: "0.04em",
              marginBottom: 10,
              transition: "opacity 0.2s",
              opacity: carregandoEstudo ? 0.6 : 1,
            }}>
            {carregandoEstudo ? "Preparando estudo..." : "Aprofundar Estudo Devocional"}
          </button>

          {dia !== diaAtual && (
            <button onClick={() => setDia(diaAtual)}
              style={{ width: "100%", padding: 11, border: "1.5px solid #E5E4DC", borderRadius: 10, background: "#F1F0EB", color: "#17160F", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "sans-serif", marginBottom: 8 }}>
              Ir para o devocional de hoje — {getDataDoDia(diaAtual)}
            </button>
          )}
          <button onClick={() => { const novo = { ...cache }; delete novo[dia]; setCache(novo); localStorage.setItem("pregar-dev-v3", JSON.stringify(novo)); gerarDevocional(dia); }}
            style={{ width: "100%", padding: 10, border: "1.5px solid #E5E4DC", borderRadius: 10, background: "none", color: "#8A8980", fontSize: 12, cursor: "pointer", fontFamily: "sans-serif" }}>
            ↺ Gerar novo devocional para {data}
          </button>
        </div>
      )}

      {/* Loading estudo */}
      {carregandoEstudo && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "60px 0" }}>
          <div className="ring" />
          <p style={{ fontSize: 13, color: "#8A8980", textAlign: "center", lineHeight: 1.9, maxWidth: 260 }}>
            Mergulhando nas profundezas da Palavra...<br />
            <span style={{ fontSize: 11, fontStyle: "italic" }}>Contexto · Exegese · Cristo · Teologia</span>
          </p>
        </div>
      )}

      {/* Estudo aprofundado */}
      {estudo && !carregandoEstudo && (
        <div style={{ animation: "fadeInUp 0.5s ease" }}>

          {/* Cabeçalho do estudo */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <button onClick={() => setEstudo(null)}
              style={{ fontSize: 13, color: "#8A8980", background: "none", border: "none", cursor: "pointer", fontFamily: "sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
              ← Voltar ao devocional
            </button>
            <span style={{ fontSize: 11, fontWeight: 600, background: "rgba(184,145,42,0.12)", color: "#B8912A", padding: "3px 12px", borderRadius: 100, border: "1px solid rgba(184,145,42,0.3)" }}>
              Estudo · Dia {dia}
            </span>
          </div>

          {/* Frase de abertura */}
          {estudo.frase_abertura && (
            <div style={{ borderLeft: "4px solid #B8912A", background: "rgba(184,145,42,0.06)", borderRadius: "0 12px 12px 0", padding: "18px 22px", marginBottom: 24, fontFamily: "'Cormorant Garamond',serif", fontSize: 21, fontStyle: "italic", color: "#17160F", lineHeight: 1.6, fontWeight: 600 }}>
              {estudo.frase_abertura}
            </div>
          )}

          {/* Contexto */}
          {estudo.contexto && (
            <div style={{ marginBottom: 20 }}>
              <div style={ss}>📜 Contexto histórico e cultural</div>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: "#3D3C35" }}>{estudo.contexto}</p>
            </div>
          )}

          {/* Exegese */}
          {estudo.exegese && (
            <div style={{ marginBottom: 20 }}>
              <div style={ss}>🔍 Análise exegética — o que a tradução não captura</div>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: "#3D3C35", whiteSpace: "pre-wrap" }}>{estudo.exegese}</p>
            </div>
          )}

          {/* Frases de impacto intercaladas */}
          {estudo.frases_impacto?.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              {estudo.frases_impacto.map((f, i) => (
                <div key={i} style={{ borderLeft: "4px solid #B8912A", background: "rgba(184,145,42,0.05)", borderRadius: "0 10px 10px 0", padding: "14px 18px", marginBottom: 10, fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontStyle: "italic", color: "#17160F", lineHeight: 1.6, fontWeight: 600 }}>
                  {f}
                </div>
              ))}
            </div>
          )}

          {/* Cristo */}
          {estudo.cristo && (
            <div style={{ background: "rgba(184,145,42,0.06)", border: "1.5px solid rgba(184,145,42,0.2)", borderRadius: 12, padding: "16px 18px", marginBottom: 20 }}>
              <div style={{ ...ss, borderColor: "rgba(184,145,42,0.3)", color: "#B8912A" }}>✝️ Cristo neste texto</div>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: "#3D3C35", margin: 0 }}>{estudo.cristo}</p>
            </div>
          )}

          {/* Teologia */}
          {estudo.teologia && (
            <div style={{ marginBottom: 20 }}>
              <div style={ss}>📖 Teologia central</div>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: "#3D3C35" }}>{estudo.teologia}</p>
            </div>
          )}

          {/* Aplicação */}
          {estudo.aplicacao && (
            <div style={{ marginBottom: 20 }}>
              <div style={ss}>🌱 Como viver isso hoje</div>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: "#3D3C35" }}>{estudo.aplicacao}</p>
            </div>
          )}

          {/* Oração final */}
          {estudo.oracao_final && (
            <div style={{ background: "#F1F0EB", border: "1px solid #E5E4DC", borderRadius: 12, padding: "18px 20px", marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8912A", marginBottom: 10 }}>🙏 Oração de entrega</div>
              <div style={{ fontSize: 15, lineHeight: 1.9, color: "#3D3C35", fontStyle: "italic" }}>{estudo.oracao_final}</div>
            </div>
          )}

          {/* Botões finais */}
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button onClick={() => setEstudo(null)}
              style={{ flex: 1, padding: 11, border: "1.5px solid #E5E4DC", borderRadius: 10, background: "#F1F0EB", color: "#17160F", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "sans-serif" }}>
              ← Voltar ao devocional
            </button>
            <button onClick={() => { const chave = "dia-" + dia; const novo = { ...cacheEstudo }; delete novo[chave]; setCacheEstudo(novo); localStorage.setItem("pregar-estudo-dev-v1", JSON.stringify(novo)); setEstudo(null); setTimeout(() => gerarEstudoDevocional(), 100); }}
              style={{ padding: "11px 16px", border: "1.5px solid #E5E4DC", borderRadius: 10, background: "none", color: "#8A8980", fontSize: 12, cursor: "pointer", fontFamily: "sans-serif", whiteSpace: "nowrap" }}>
              ↺ Novo estudo
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
