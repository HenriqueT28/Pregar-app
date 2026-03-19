import { useState, useEffect } from "react";

function getSaudacao() {
  const h = new Date().getHours();
  if (h >= 0 && h < 12) return "Bom dia";
  if (h >= 12 && h < 18) return "Boa tarde";
  return "Boa noite";
}

const VERSICULOS = [
  { texto: "O Senhor é o meu pastor, nada me faltará.", ref: "Salmos 23.1" },
  { texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.", ref: "João 3.16" },
  { texto: "Tudo posso naquele que me fortalece.", ref: "Filipenses 4.13" },
  { texto: "Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.", ref: "Mateus 11.28" },
  { texto: "A paz que excede todo o entendimento guardará os vossos corações em Cristo Jesus.", ref: "Filipenses 4.7" },
  { texto: "Nada temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus.", ref: "Isaías 41.10" },
  { texto: "Antes de eu te formar no ventre materno, eu te conheci.", ref: "Jeremias 1.5" },
  { texto: "Entrega o teu caminho ao Senhor, confia nele, e ele tudo fará.", ref: "Salmos 37.5" },
  { texto: "Porque sou eu que conheço os planos que tenho para vocês — planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro.", ref: "Jeremias 29.11" },
  { texto: "O Senhor é a minha luz e a minha salvação; a quem temerei?", ref: "Salmos 27.1" },
];

function getVersiculo() {
  return VERSICULOS[new Date().getDay() % VERSICULOS.length];
}

// ————— TELA DE BOAS-VINDAS CLARA —————
function TelaBoasVindas({ nome, onContinuar }) {
  const saudacao = getSaudacao();
  const primeiroNome = nome?.trim().split(" ")[0] || "";
  const ver = getVersiculo();
  const [segundos, setSegundos] = useState(5);
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setSegundos(s => {
        if (s <= 1) {
          clearInterval(t);
          setSaindo(true);
          setTimeout(onContinuar, 700);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#FAFAF8",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      opacity: saindo ? 0 : 1,
      transition: "opacity 0.7s ease",
    }}>
      {/* Cruz */}
      <div style={{ position: "relative", width: 36, height: 36, marginBottom: 36 }}>
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1.5, background: "#B8912A", transform: "translateY(-50%)", borderRadius: 2 }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 1.5, background: "#B8912A", transform: "translateX(-50%)", borderRadius: 2 }} />
      </div>

      {/* Saudação */}
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#B8912A", marginBottom: 16, textAlign: "center" }}>
        {saudacao}
      </div>

      {/* Nome */}
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 56, fontWeight: 700, color: "#17160F", lineHeight: 1.05, textAlign: "center", marginBottom: 12, letterSpacing: "-0.02em" }}>
        {primeiroNome}!
      </div>

      <div style={{ fontSize: 15, color: "#9A998F", marginBottom: 52, textAlign: "center", fontStyle: "italic" }}>
        Que bom ter você aqui hoje.
      </div>

      {/* Divisor dourado */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 44, width: "100%", maxWidth: 400 }}>
        <div style={{ flex: 1, height: 1, background: "rgba(184,145,42,0.2)" }} />
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#B8912A", opacity: 0.6 }} />
        <div style={{ flex: 1, height: 1, background: "rgba(184,145,42,0.2)" }} />
      </div>

      {/* Versículo */}
      <div style={{ maxWidth: 440, textAlign: "center" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 21, fontStyle: "italic", color: "#3D3C35", lineHeight: 1.8, marginBottom: 14, fontWeight: 500 }}>
          "{ver.texto}"
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B8912A", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          {ver.ref} · NVI
        </div>
      </div>

      {/* Barra de progresso */}
      <div style={{ marginTop: 60, width: 180 }}>
        <div style={{ height: 1.5, background: "#E8E7E2", borderRadius: 2, overflow: "hidden", marginBottom: 10 }}>
          <div style={{ height: "100%", background: "#B8912A", borderRadius: 2, width: ((5 - segundos) / 5 * 100) + "%", transition: "width 1s linear" }} />
        </div>
        <div style={{ fontSize: 11, color: "#C5C4BC", textAlign: "center", letterSpacing: "0.06em" }}>
          {segundos > 0 ? "Entrando em " + segundos + "s" : "Abrindo..."}
        </div>
      </div>

      <button onClick={() => { setSaindo(true); setTimeout(onContinuar, 600); }}
        style={{ marginTop: 18, background: "none", border: "none", fontSize: 13, color: "#B8912A", cursor: "pointer", fontFamily: "sans-serif", fontWeight: 600, letterSpacing: "0.04em", padding: "6px 12px", opacity: 0.8 }}>
        Entrar agora →
      </button>
    </div>
  );
}

// ————— TELA DE LOGIN BRANCA E LIMPA —————
export default function Login({ onLogin }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [step, setStep] = useState("form");
  const saudacao = getSaudacao();
  const ver = getVersiculo();

  function validar() {
    if (!nome.trim()) { setErro("Por favor, informe seu nome."); return false; }
    if (!email.trim() || !email.includes("@")) { setErro("Informe um e-mail válido."); return false; }
    if (senha.length < 4) { setErro("A senha precisa ter pelo menos 4 caracteres."); return false; }
    return true;
  }

  async function handleEntrar() {
    if (!validar()) return;
    setStep("loading");
    await new Promise(r => setTimeout(r, 700));
    const perfil = { nome: nome.trim(), email: email.trim().toLowerCase(), entrou: new Date().toISOString() };
    localStorage.setItem("pregar-user", JSON.stringify(perfil));
    setStep("welcome");
  }

  function handleContinuar() {
    const perfil = JSON.parse(localStorage.getItem("pregar-user"));
    onLogin(perfil);
  }

  if (step === "welcome") return <TelaBoasVindas nome={nome} onContinuar={handleContinuar} />;

  if (step === "loading") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#FAFAF8", gap: 16 }}>
        <div style={{ position: "relative", width: 28, height: 28 }}>
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1.5, background: "#B8912A", transform: "translateY(-50%)" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 1.5, background: "#B8912A", transform: "translateX(-50%)" }} />
        </div>
        <p style={{ fontSize: 13, color: "#9A998F", fontStyle: "italic" }}>Preparando sua jornada...</p>
      </div>
    );
  }

  const inputStyle = {
    width: "100%",
    padding: "13px 16px",
    border: "1px solid #E5E4DC",
    borderRadius: 10,
    background: "#fff",
    color: "#17160F",
    fontSize: 14,
    fontFamily: "sans-serif",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 20px" }}>

      {/* Logo e marca */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
        <div style={{ position: "relative", width: 26, height: 26, flexShrink: 0 }}>
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1.5, background: "#B8912A", transform: "translateY(-50%)" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 1.5, background: "#B8912A", transform: "translateX(-50%)" }} />
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: "#17160F", letterSpacing: "-0.02em" }}>
          Pregar<span style={{ color: "#B8912A" }}>.app</span>
        </div>
      </div>

      {/* Card central */}
      <div style={{ width: "100%", maxWidth: 380, background: "#fff", borderRadius: 20, padding: "40px 36px", boxShadow: "0 2px 40px rgba(23,22,15,0.06), 0 0 0 1px rgba(23,22,15,0.04)" }}>

        {/* Cabeçalho */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8912A", marginBottom: 10 }}>
            {saudacao}
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 700, color: "#17160F", lineHeight: 1.2, marginBottom: 8 }}>
            Bem-vindo
          </div>
          <div style={{ fontSize: 13, color: "#9A998F", lineHeight: 1.6 }}>
            Entre para acessar sua jornada de fé
          </div>
        </div>

        {/* Campos */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Nome */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A8980", display: "block", marginBottom: 6 }}>Nome</label>
            <input value={nome} onChange={e => { setNome(e.target.value); setErro(""); }}
              onKeyDown={e => e.key === "Enter" && handleEntrar()}
              placeholder="Seu nome completo"
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = "#B8912A"; e.target.style.boxShadow = "0 0 0 3px rgba(184,145,42,0.1)"; }}
              onBlur={e => { e.target.style.borderColor = "#E5E4DC"; e.target.style.boxShadow = "none"; }} />
          </div>

          {/* Email */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A8980", display: "block", marginBottom: 6 }}>E-mail</label>
            <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErro(""); }}
              onKeyDown={e => e.key === "Enter" && handleEntrar()}
              placeholder="seu@email.com"
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = "#B8912A"; e.target.style.boxShadow = "0 0 0 3px rgba(184,145,42,0.1)"; }}
              onBlur={e => { e.target.style.borderColor = "#E5E4DC"; e.target.style.boxShadow = "none"; }} />
          </div>

          {/* Senha */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A8980", display: "block", marginBottom: 6 }}>Senha</label>
            <div style={{ position: "relative" }}>
              <input type={mostrarSenha ? "text" : "password"} value={senha}
                onChange={e => { setSenha(e.target.value); setErro(""); }}
                onKeyDown={e => e.key === "Enter" && handleEntrar()}
                placeholder="Mínimo 4 caracteres"
                style={{ ...inputStyle, paddingRight: 44 }}
                onFocus={e => { e.target.style.borderColor = "#B8912A"; e.target.style.boxShadow = "0 0 0 3px rgba(184,145,42,0.1)"; }}
                onBlur={e => { e.target.style.borderColor = "#E5E4DC"; e.target.style.boxShadow = "none"; }} />
              <button onClick={() => setMostrarSenha(o => !o)}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#9A998F", padding: 4 }}>
                {mostrarSenha ? "🙈" : "👁"}
              </button>
            </div>
          </div>
        </div>

        {/* Erro */}
        {erro && (
          <div style={{ fontSize: 13, color: "#E24B4A", marginTop: 12, padding: "8px 12px", background: "#FEF2F2", borderRadius: 8, border: "1px solid #FCA5A5" }}>
            {erro}
          </div>
        )}

        {/* Botão entrar */}
        <button onClick={handleEntrar}
          disabled={!nome.trim() || !email.trim() || !senha}
          style={{
            width: "100%",
            padding: "14px",
            marginTop: 24,
            background: nome.trim() && email.trim() && senha ? "#17160F" : "#E8E7E2",
            color: nome.trim() && email.trim() && senha ? "#fff" : "#9A998F",
            border: "none",
            borderRadius: 12,
            fontSize: 15,
            fontWeight: 700,
            cursor: nome.trim() && email.trim() && senha ? "pointer" : "not-allowed",
            fontFamily: "sans-serif",
            letterSpacing: "0.01em",
            transition: "all 0.2s",
          }}>
          Entrar
        </button>

        {/* Rodapé */}
        <div style={{ fontSize: 11, color: "#C5C4BC", textAlign: "center", marginTop: 20, lineHeight: 1.7 }}>
          Seus dados ficam salvos apenas neste dispositivo.
        </div>
      </div>

      {/* Versículo abaixo do card */}
      <div style={{ marginTop: 36, maxWidth: 360, textAlign: "center" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontStyle: "italic", color: "#9A998F", lineHeight: 1.75, marginBottom: 8 }}>
          "{ver.texto}"
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#B8912A", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          {ver.ref}
        </div>
      </div>
    </div>
  );
}
