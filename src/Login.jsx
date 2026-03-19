import { useState } from "react";

function getSaudacao() {
  const h = new Date().getHours();
  if (h >= 0 && h < 12) return "Bom dia";
  if (h >= 12 && h < 18) return "Boa tarde";
  return "Boa noite";
}

function getVersiculo() {
  const vers = [
    { texto: "O Senhor é o meu pastor, nada me faltará.", ref: "Salmos 23.1" },
    { texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.", ref: "João 3.16" },
    { texto: "Tudo posso naquele que me fortalece.", ref: "Filipenses 4.13" },
    { texto: "O Senhor é a minha luz e a minha salvação; a quem temerei?", ref: "Salmos 27.1" },
    { texto: "Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.", ref: "Mateus 11.28" },
    { texto: "A paz que excede todo o entendimento guardará os vossos corações.", ref: "Filipenses 4.7" },
    { texto: "Nada temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus.", ref: "Isaías 41.10" },
  ];
  return vers[new Date().getDay() % vers.length];
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
    await new Promise(r => setTimeout(r, 1200));
    const perfil = { nome: nome.trim(), email: email.trim().toLowerCase(), entrou: new Date().toISOString() };
    localStorage.setItem("pregar-user", JSON.stringify(perfil));
    setStep("welcome");
    await new Promise(r => setTimeout(r, 2000));
    onLogin(perfil);
  }

  // Tela de carregando
  if (step === "loading") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#F8F7F3", gap: 20 }}>
        <div className="ring" />
        <p style={{ fontSize: 14, color: "#8A8980", fontStyle: "italic" }}>Preparando sua jornada...</p>
      </div>
    );
  }

  // Tela de boas-vindas após login
  if (step === "welcome") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#17160F", gap: 0, padding: 32, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✦</div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 8 }}>
          {saudacao},<br />{nome.trim().split(" ")[0]}!
        </div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>
          Que bom ter você aqui hoje.
        </div>
        <div style={{ maxWidth: 340, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24 }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: "rgba(255,255,255,0.85)", fontStyle: "italic", lineHeight: 1.7, marginBottom: 8 }}>
            "{ver.texto}"
          </div>
          <div style={{ fontSize: 12, color: "#B8912A", fontWeight: 600, letterSpacing: "0.08em" }}>{ver.ref}</div>
        </div>
      </div>
    );
  }

  // Formulário de login
  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#F8F7F3" }}>

      {/* Painel esquerdo — visual */}
      <div style={{ flex: 1, background: "#17160F", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 40px", minWidth: 0 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
          <div style={{ width: 36, height: 36, position: "relative", flexShrink: 0 }}>
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
          Sermões · Bíblia · Devocional · Estudo Bíblico · e muito mais
        </div>

        <div style={{ marginTop: 48, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 32, width: "100%", maxWidth: 300 }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, color: "rgba(255,255,255,0.7)", fontStyle: "italic", lineHeight: 1.7, marginBottom: 8, textAlign: "center" }}>
            "{ver.texto}"
          </div>
          <div style={{ fontSize: 11, color: "#B8912A", fontWeight: 600, letterSpacing: "0.08em", textAlign: "center" }}>{ver.ref}</div>
        </div>
      </div>

      {/* Painel direito — formulário */}
      <div style={{ width: 420, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 40px", background: "#F8F7F3" }}>

        <div style={{ width: "100%", maxWidth: 340 }}>
          {/* Saudação */}
          <div style={{ fontSize: 13, color: "#B8912A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
            {saudacao}!
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 700, color: "#17160F", lineHeight: 1.2, marginBottom: 6 }}>
            Bem-vindo ao Pregar.app
          </div>
          <div style={{ fontSize: 13, color: "#8A8980", lineHeight: 1.6, marginBottom: 32 }}>
            Entre com seu nome e e-mail para acessar sua jornada de fé.
          </div>

          {/* Campo nome */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A8980", display: "block", marginBottom: 6 }}>
              Seu nome
            </label>
            <input
              value={nome}
              onChange={e => { setNome(e.target.value); setErro(""); }}
              onKeyDown={e => e.key === "Enter" && handleEntrar()}
              placeholder="Ex: Henrique, Pastor João..."
              style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #E5E4DC", borderRadius: 10, background: "#fff", color: "#17160F", fontSize: 14, fontFamily: "sans-serif", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
              onFocus={e => e.target.style.borderColor = "#B8912A"}
              onBlur={e => e.target.style.borderColor = "#E5E4DC"}
            />
          </div>

          {/* Campo email */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A8980", display: "block", marginBottom: 6 }}>
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setErro(""); }}
              onKeyDown={e => e.key === "Enter" && handleEntrar()}
              placeholder="seu@email.com"
              style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #E5E4DC", borderRadius: 10, background: "#fff", color: "#17160F", fontSize: 14, fontFamily: "sans-serif", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
              onFocus={e => e.target.style.borderColor = "#B8912A"}
              onBlur={e => e.target.style.borderColor = "#E5E4DC"}
            />
          </div>

          {/* Erro */}
          {erro && (
            <div style={{ fontSize: 13, color: "#E24B4A", marginBottom: 14, padding: "8px 12px", background: "#FCEBEB", borderRadius: 8 }}>
              {erro}
            </div>
          )}

          {/* Botão entrar */}
          <button
            onClick={handleEntrar}
            disabled={!nome.trim() || !email.trim()}
            style={{ width: "100%", padding: "14px", background: nome.trim() && email.trim() ? "#17160F" : "#E5E4DC", color: nome.trim() && email.trim() ? "#fff" : "#8A8980", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: nome.trim() && email.trim() ? "pointer" : "not-allowed", fontFamily: "sans-serif", letterSpacing: "0.02em", transition: "all 0.2s", marginBottom: 14 }}>
            Entrar
          </button>

          <div style={{ fontSize: 11, color: "#8A8980", textAlign: "center", lineHeight: 1.6 }}>
            Seus dados ficam salvos apenas neste dispositivo.<br />
            Nenhuma senha necessária.
          </div>
        </div>
      </div>
    </div>
  );
}
