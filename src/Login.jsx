import { useState, useEffect } from "react";

function getSaudacao() {
  const h = new Date().getHours();
  if (h >= 0 && h < 12) return "Bom dia";
  if (h >= 12 && h < 18) return "Boa tarde";
  return "Boa noite";
}

const VERSICULOS = [
  { texto: "O Senhor é o meu pastor, nada me faltará.", ref: "Salmos 23.1" },
  { texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.", ref: "João 3.16" },
  { texto: "Tudo posso naquele que me fortalece.", ref: "Filipenses 4.13" },
  { texto: "A paz que excede todo o entendimento guardará os vossos corações.", ref: "Filipenses 4.7" },
  { texto: "Nada temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus.", ref: "Isaías 41.10" },
  { texto: "O Senhor é a minha luz e a minha salvação; a quem temerei?", ref: "Salmos 27.1" },
  { texto: "Sede fortes e corajosos. Não temais nem vos assusteis, porque o Senhor, vosso Deus, vai convosco.", ref: "Deuteronômio 31.6" },
];

export default function Login({ onLogin }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [fase, setFase] = useState("form"); // form | entrando | bemvindo
  const [verIdx] = useState(() => new Date().getDay() % VERSICULOS.length);
  const [visivel, setVisivel] = useState(false);
  const saudacao = getSaudacao();
  const ver = VERSICULOS[verIdx];

  useEffect(() => {
    setTimeout(() => setVisivel(true), 80);
  }, []);

  function validar() {
    if (!nome.trim()) { setErro("Por favor, informe seu nome."); return false; }
    if (!email.trim() || !email.includes("@")) { setErro("Informe um e-mail válido."); return false; }
    return true;
  }

  async function entrar() {
    if (!validar()) return;
    setFase("entrando");
    await new Promise(r => setTimeout(r, 900));
    setFase("bemvindo");
    const perfil = { nome: nome.trim(), email: email.trim().toLowerCase() };
    localStorage.setItem("pregar-user", JSON.stringify(perfil));
    await new Promise(r => setTimeout(r, 2200));
    onLogin(perfil);
  }

  // Tela de boas-vindas após login
  if (fase === "bemvindo") {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: "#0F0E09", padding: 40, textAlign: "center",
      }}>
        <div style={{ animation: "aparecer 0.8s ease forwards", opacity: 0 }}>
          <div style={{ fontSize: 44, marginBottom: 24, color: "#B8912A" }}>✦</div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 42, fontWeight: 300, color: "#fff", lineHeight: 1.2, marginBottom: 8, letterSpacing: "-0.01em" }}>
            {saudacao},
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 48, fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 32, letterSpacing: "-0.02em" }}>
            {nome.trim().split(" ")[0]}.
          </div>
          <div style={{ width: 48, height: 1, background: "rgba(184,145,42,0.5)", margin: "0 auto 28px" }} />
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 19, color: "rgba(255,255,255,0.6)", fontStyle: "italic", lineHeight: 1.75, maxWidth: 320, margin: "0 auto 12px" }}>
            "{ver.texto}"
          </div>
          <div style={{ fontSize: 11, color: "#B8912A", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {ver.ref}
          </div>
        </div>
        <style>{`
          @keyframes aparecer {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#F8F7F3",
      padding: "40px 20px",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        width: "100%", maxWidth: 420,
        opacity: visivel ? 1 : 0,
        transform: visivel ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}>

        {/* Logo e cruz */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 36 }}>
          <div style={{ position: "relative", width: 28, height: 28, marginBottom: 14 }}>
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, background: "#B8912A", transform: "translateY(-50%)", borderRadius: 1 }} />
            <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 2, background: "#B8912A", transform: "translateX(-50%)", borderRadius: 1 }} />
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 700, color: "#17160F", letterSpacing: "-0.02em", lineHeight: 1 }}>
            Pregar<span style={{ color: "#B8912A" }}>.app</span>
          </div>
        </div>

        {/* Saudação */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#B8912A", marginBottom: 10 }}>
            {saudacao}
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, fontWeight: 700, color: "#17160F", lineHeight: 1.25, marginBottom: 10 }}>
            A Palavra de Deus<br />na palma da sua mão
          </div>
          <div style={{ fontSize: 13, color: "#8A8980", lineHeight: 1.7, maxWidth: 320, margin: "0 auto" }}>
            Entre com seu nome e e-mail para acessar sermões, devocional, estudos bíblicos e muito mais.
          </div>
        </div>

        {/* Versículo do dia */}
        <div style={{
          background: "rgba(184,145,42,0.07)",
          border: "1px solid rgba(184,145,42,0.2)",
          borderRadius: 12,
          padding: "16px 20px",
          marginBottom: 28,
          textAlign: "center",
        }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontStyle: "italic", color: "#3D3C35", lineHeight: 1.75, marginBottom: 6 }}>
            "{ver.texto}"
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#B8912A", letterSpacing: "0.08em" }}>{ver.ref} · NVI</div>
        </div>

        {/* Formulário */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8980", display: "block", marginBottom: 6 }}>
              Seu nome
            </label>
            <input
              value={nome}
              onChange={e => { setNome(e.target.value); setErro(""); }}
              onKeyDown={e => e.key === "Enter" && entrar()}
              placeholder="Como posso te chamar?"
              style={{
                width: "100%", padding: "13px 16px",
                border: "1.5px solid #E5E4DC", borderRadius: 10,
                background: "#fff", color: "#17160F",
                fontSize: 14, fontFamily: "inherit",
                outline: "none", boxSizing: "border-box",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={e => { e.target.style.borderColor = "#B8912A"; e.target.style.boxShadow = "0 0 0 3px rgba(184,145,42,0.1)"; }}
              onBlur={e => { e.target.style.borderColor = "#E5E4DC"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8980", display: "block", marginBottom: 6 }}>
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setErro(""); }}
              onKeyDown={e => e.key === "Enter" && entrar()}
              placeholder="seu@email.com"
              style={{
                width: "100%", padding: "13px 16px",
                border: "1.5px solid #E5E4DC", borderRadius: 10,
                background: "#fff", color: "#17160F",
                fontSize: 14, fontFamily: "inherit",
                outline: "none", boxSizing: "border-box",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={e => { e.target.style.borderColor = "#B8912A"; e.target.style.boxShadow = "0 0 0 3px rgba(184,145,42,0.1)"; }}
              onBlur={e => { e.target.style.borderColor = "#E5E4DC"; e.target.style.boxShadow = "none"; }}
            />
          </div>
        </div>

        {/* Erro */}
        {erro && (
          <div style={{ fontSize: 13, color: "#C0392B", marginBottom: 12, padding: "8px 12px", background: "rgba(192,57,43,0.07)", borderRadius: 8, border: "1px solid rgba(192,57,43,0.2)" }}>
            {erro}
          </div>
        )}

        {/* Botão */}
        <button
          onClick={entrar}
          disabled={fase === "entrando" || !nome.trim() || !email.trim()}
          style={{
            width: "100%", padding: "15px",
            background: nome.trim() && email.trim() && fase !== "entrando" ? "#17160F" : "#E5E4DC",
            color: nome.trim() && email.trim() && fase !== "entrando" ? "#fff" : "#8A8980",
            border: "none", borderRadius: 12,
            fontSize: 15, fontWeight: 600,
            cursor: nome.trim() && email.trim() && fase !== "entrando" ? "pointer" : "not-allowed",
            fontFamily: "inherit", letterSpacing: "0.02em",
            transition: "all 0.2s",
            marginBottom: 16,
          }}>
          {fase === "entrando" ? "Entrando..." : "Entrar"}
        </button>

        {/* Rodapé */}
        <div style={{ textAlign: "center", fontSize: 11, color: "#AEADA4", lineHeight: 1.7 }}>
          Seus dados ficam salvos apenas neste dispositivo.<br />
          Nenhuma senha necessária.
        </div>

      </div>
    </div>
  );
}
