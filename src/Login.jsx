import { useState, useEffect } from "react";

function getSaudacao() {
  const h = new Date().getHours();
  if (h >= 0 && h < 12) return "Bom dia";
  if (h >= 12 && h < 18) return "Boa tarde";
  return "Boa noite";
}

function getPrimeroNome(nome) {
  return nome?.trim().split(" ")[0] || "";
}

const VERSICULOS = [
  { texto: "O Senhor é o meu pastor, nada me faltará.", ref: "Salmos 23.1" },
  { texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.", ref: "João 3.16" },
  { texto: "Tudo posso naquele que me fortalece.", ref: "Filipenses 4.13" },
  { texto: "O Senhor é a minha luz e a minha salvação; a quem temerei?", ref: "Salmos 27.1" },
  { texto: "Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.", ref: "Mateus 11.28" },
  { texto: "A paz que excede todo o entendimento guardará os vossos corações e os vossos pensamentos em Cristo Jesus.", ref: "Filipenses 4.7" },
  { texto: "Nada temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus.", ref: "Isaías 41.10" },
  { texto: "Antes de eu te formar no ventre materno, eu te conheci; antes de nasceres, eu te consagrei.", ref: "Jeremias 1.5" },
  { texto: "Entrega o teu caminho ao Senhor, confia nele, e ele tudo fará.", ref: "Salmos 37.5" },
  { texto: "Porque sou eu que conheço os planos que tenho para vocês, diz o Senhor, planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro.", ref: "Jeremias 29.11" },
];

function getVersiculo() {
  return VERSICULOS[new Date().getDay() % VERSICULOS.length];
}

// Tela de boas-vindas — CLARA, bonita, 5 segundos
function TelaBoasVindas({ nome, onContinuar }) {
  const saudacao = getSaudacao();
  const primeiroNome = getPrimeroNome(nome);
  const ver = getVersiculo();
  const [segundos, setSegundos] = useState(5);
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSegundos(s => {
        if (s <= 1) {
          clearInterval(timer);
          setSaindo(true);
          setTimeout(onContinuar, 600);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F8F7F3",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      opacity: saindo ? 0 : 1,
      transition: "opacity 0.6s ease",
    }}>
      {/* Cruz decorativa */}
      <div style={{ position: "relative", width: 40, height: 40, marginBottom: 32 }}>
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, background: "#B8912A", transform: "translateY(-50%)", borderRadius: 2 }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 2, background: "#B8912A", transform: "translateX(-50%)", borderRadius: 2 }} />
      </div>

      {/* Saudação */}
      <div style={{
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#B8912A",
        marginBottom: 12,
        textAlign: "center",
      }}>
        {saudacao}
      </div>

      {/* Nome */}
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 52,
        fontWeight: 700,
        color: "#17160F",
        lineHeight: 1.1,
        textAlign: "center",
        marginBottom: 8,
        letterSpacing: "-0.02em",
      }}>
        {primeiroNome}!
      </div>

      <div style={{
        fontSize: 15,
        color: "#8A8980",
        marginBottom: 48,
        textAlign: "center",
      }}>
        Que bom ter você aqui hoje.
      </div>

      {/* Linha separadora */}
      <div style={{ width: 48, height: 1, background: "rgba(184,145,42,0.3)", marginBottom: 40 }} />

      {/* Versículo */}
      <div style={{ maxWidth: 460, textAlign: "center" }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 22,
          fontStyle: "italic",
          color: "#3D3C35",
          lineHeight: 1.75,
          marginBottom: 16,
          fontWeight: 500,
        }}>
          "{ver.texto}"
        </div>
        <div style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#B8912A",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          {ver.ref} · NVI
        </div>
      </div>

      {/* Barra de progresso */}
      <div style={{ marginTop: 56, width: 200, textAlign: "center" }}>
        <div style={{ height: 2, background: "#E5E4DC", borderRadius: 2, overflow: "hidden", marginBottom: 10 }}>
          <div style={{
            height: "100%",
            background: "#B8912A",
            borderRadius: 2,
            width: ((5 - segundos) / 5 * 100) + "%",
            transition: "width 1s linear",
          }} />
        </div>
        <div style={{ fontSize: 11, color: "#C5C4BC", letterSpacing: "0.06em" }}>
          Entrando em {segundos}s
        </div>
      </div>

      {/* Botão para entrar já */}
      <button
        onClick={() => { setSaindo(true); setTimeout(onContinuar, 500); }}
        style={{
          marginTop: 20,
          background: "none",
          border: "none",
          fontSize: 13,
          color: "#B8912A",
          cursor: "pointer",
          fontFamily: "sans-serif",
          fontWeight: 600,
          letterSpacing: "0.04em",
          padding: "6px 12px",
        }}
      >
        Entrar agora →
      </button>
    </div>
  );
}

export default function Login({ onLogin }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [step, setStep] = useState("form"); // form | loading | welcome
  const saudacao = getSaudacao();
  const ver = getVersiculo();

  function validar() {
    if (!nome.trim()) { setErro("Por favor, informe seu nome."); return false; }
    if (!email.trim() || !email.includes("@")) { setErro("Informe um e-mail válido."); return false; }
    return true;
  }

  async function handleEntrar() {
    if (!validar()) return;
    setStep("loading");
    await new Promise(r => setTimeout(r, 800));
    const perfil = { nome: nome.trim(), email: email.trim().toLowerCase(), entrou: new Date().toISOString() };
    localStorage.setItem("pregar-user", JSON.stringify(perfil));
    setStep("welcome");
  }

  function handleContinuar() {
    const perfil = JSON.parse(localStorage.getItem("pregar-user"));
    onLogin(perfil);
  }

  // Tela de boas-vindas (clara e bonita)
  if (step === "welcome") {
    return <TelaBoasVindas nome={nome} onContinuar={handleContinuar} />;
  }

  // Tela de carregando
  if (step === "loading") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#F8F7F3", gap: 20 }}>
        <div style={{ position: "relative", width: 32, height: 32 }}>
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, background: "#B8912A", transform: "translateY(-50%)" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 2, background: "#B8912A", transform: "translateX(-50%)" }} />
        </div>
        <div className="ring" />
        <p style={{ fontSize: 13, color: "#8A8980", fontStyle: "italic", marginTop: 8 }}>Preparando sua jornada...</p>
      </div>
    );
  }

  // Tela de login (formulário)
  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#F8F7F3" }}>

      {/* Lado esquerdo — visual escuro */}
      <div style={{ flex: 1, background: "#17160F", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 40px", minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
          <div style={{ width: 32, height: 32, position: "relative", flexShrink: 0 }}>
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, background: "#B8912A", transform: "translateY(-50%)" }} />
            <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 2, background: "#B8912A", transform: "translateX(-50%)" }} />
          </div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
            Pregar<span style={{ color: "#B8912A" }}>.app</span>
          </div>
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: 16, textAlign: "center", maxWidth: 300 }}>
          A Palavra de Deus na palma da sua mão
        </div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", textAlign: "center", lineHeight: 1.7, maxWidth: 280 }}>
          Sermões · Bíblia · Devocional · Estudo Bíblico
        </div>
        <div style={{ marginTop: 48, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 32, width: "100%", maxWidth: 300 }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, color: "rgba(255,255,255,0.7)", fontStyle: "italic", lineHeight: 1.7, marginBottom: 8, textAlign: "center" }}>
            "{ver.texto}"
          </div>
          <div style={{ fontSize: 11, color: "#B8912A", fontWeight: 600, letterSpacing: "0.08em", textAlign: "center" }}>{ver.ref}</div>
        </div>
      </div>

      {/* Lado direito — formulário */}
      <div style={{ width: 420, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 40px", background: "#F8F7F3" }}>
        <div style={{ width: "100%", maxWidth: 340 }}>
          <div style={{ fontSize: 13, color: "#B8912A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
            {saudacao}!
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 700, color: "#17160F", lineHeight: 1.2, marginBottom: 6 }}>
            Bem-vindo ao Pregar.app
          </div>
          <div style={{ fontSize: 13, color: "#8A8980", lineHeight: 1.6, marginBottom: 32 }}>
            Entre com seu nome e e-mail para acessar sua jornada de fé.
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A8980", display: "block", marginBottom: 6 }}>Seu nome</label>
            <input value={nome} onChange={e => { setNome(e.target.value); setErro(""); }}
              onKeyDown={e => e.key === "Enter" && handleEntrar()}
              placeholder="Ex: Henrique, Pastor João..."
              style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #E5E4DC", borderRadius: 10, background: "#fff", color: "#17160F", fontSize: 14, fontFamily: "sans-serif", outline: "none", boxSizing: "border-box" }}
              onFocus={e => e.target.style.borderColor = "#B8912A"}
              onBlur={e => e.target.style.borderColor = "#E5E4DC"} />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A8980", display: "block", marginBottom: 6 }}>E-mail</label>
            <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErro(""); }}
              onKeyDown={e => e.key === "Enter" && handleEntrar()}
              placeholder="seu@email.com"
              style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #E5E4DC", borderRadius: 10, background: "#fff", color: "#17160F", fontSize: 14, fontFamily: "sans-serif", outline: "none", boxSizing: "border-box" }}
              onFocus={e => e.target.style.borderColor = "#B8912A"}
              onBlur={e => e.target.style.borderColor = "#E5E4DC"} />
          </div>

          {erro && (
            <div style={{ fontSize: 13, color: "#E24B4A", marginBottom: 14, padding: "8px 12px", background: "#FCEBEB", borderRadius: 8 }}>{erro}</div>
          )}

          <button onClick={handleEntrar} disabled={!nome.trim() || !email.trim()}
            style={{ width: "100%", padding: "14px", background: nome.trim() && email.trim() ? "#17160F" : "#E5E4DC", color: nome.trim() && email.trim() ? "#fff" : "#8A8980", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: nome.trim() && email.trim() ? "pointer" : "not-allowed", fontFamily: "sans-serif", marginBottom: 14, transition: "all 0.2s" }}>
            Entrar
          </button>

          <div style={{ fontSize: 11, color: "#8A8980", textAlign: "center", lineHeight: 1.6 }}>
            Seus dados ficam salvos apenas neste dispositivo.<br />Nenhuma senha necessária.
          </div>
        </div>
      </div>
    </div>
  );
}
