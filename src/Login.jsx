import { useState, useEffect } from "react";
import { supabase } from "./supabase";

function getSaudacao() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

const VERSICULOS = [
  { texto: "O Senhor é o meu pastor, nada me faltará.", ref: "Salmos 23.1" },
  { texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.", ref: "João 3.16" },
  { texto: "Tudo posso naquele que me fortalece.", ref: "Filipenses 4.13" },
  { texto: "Vinde a mim, todos os que estais cansados, e eu vos aliviarei.", ref: "Mateus 11.28" },
  { texto: "A paz que excede todo o entendimento guardará os vossos corações.", ref: "Filipenses 4.7" },
  { texto: "Nada temas, porque eu sou contigo; eu sou o teu Deus.", ref: "Isaías 41.10" },
  { texto: "Entrega o teu caminho ao Senhor, confia nele, e ele tudo fará.", ref: "Salmos 37.5" },
];
const getVer = () => VERSICULOS[new Date().getDay() % VERSICULOS.length];

// —— BOAS-VINDAS ——
function TelaBoasVindas({ nome, onContinuar }) {
  const pnome = nome?.trim().split(" ")[0] || "";
  const ver = getVer();
  const [seg, setSeg] = useState(5);
  const [saindo, setSaindo] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setSeg(s => {
      if (s <= 1) { clearInterval(t); setSaindo(true); setTimeout(onContinuar, 700); return 0; }
      return s - 1;
    }), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ minHeight:"100vh", background:"#FAFAF8", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px", opacity:saindo?0:1, transition:"opacity 0.7s ease" }}>
      <div style={{ position:"relative", width:34, height:34, marginBottom:32 }}>
        <div style={{ position:"absolute", top:"50%", left:0, right:0, height:1.5, background:"#B8912A", transform:"translateY(-50%)" }}/>
        <div style={{ position:"absolute", top:0, bottom:0, left:"50%", width:1.5, background:"#B8912A", transform:"translateX(-50%)" }}/>
      </div>
      <div style={{ fontSize:12, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#B8912A", marginBottom:14 }}>{getSaudacao()}</div>
      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:54, fontWeight:700, color:"#17160F", lineHeight:1.05, marginBottom:10 }}>{pnome}!</div>
      <div style={{ fontSize:15, color:"#9A998F", marginBottom:48, fontStyle:"italic" }}>Que bom ter você aqui hoje.</div>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:42, width:"100%", maxWidth:380 }}>
        <div style={{ flex:1, height:1, background:"rgba(184,145,42,0.18)" }}/>
        <div style={{ width:5, height:5, borderRadius:"50%", background:"#B8912A", opacity:0.5 }}/>
        <div style={{ flex:1, height:1, background:"rgba(184,145,42,0.18)" }}/>
      </div>
      <div style={{ maxWidth:420, textAlign:"center" }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:21, fontStyle:"italic", color:"#3D3C35", lineHeight:1.8, marginBottom:12 }}>"{ver.texto}"</div>
        <div style={{ fontSize:11, fontWeight:700, color:"#B8912A", letterSpacing:"0.12em", textTransform:"uppercase" }}>{ver.ref} · NVI</div>
      </div>
      <div style={{ marginTop:52, width:160 }}>
        <div style={{ height:1.5, background:"#ECEAE3", borderRadius:2, overflow:"hidden", marginBottom:8 }}>
          <div style={{ height:"100%", background:"#B8912A", width:((5-seg)/5*100)+"%", transition:"width 1s linear" }}/>
        </div>
        <div style={{ fontSize:11, color:"#C5C4BC", textAlign:"center" }}>{seg>0?"Entrando em "+seg+"s":"Abrindo..."}</div>
      </div>
      <button onClick={()=>{ setSaindo(true); setTimeout(onContinuar,600); }} style={{ marginTop:16, background:"none", border:"none", fontSize:13, color:"#B8912A", cursor:"pointer", fontFamily:"sans-serif", fontWeight:600 }}>Entrar agora →</button>
    </div>
  );
}

// —— COMPONENTE BASE ——
export default function Login({ onLogin }) {
  const [tela, setTela] = useState("login"); // login | cadastro | confirmar | boasvindas
  const [nomeUser, setNomeUser] = useState("");
  const ver = getVer();
  const saudacao = getSaudacao();

  function handleContinuarApp() {
    const perfil = JSON.parse(localStorage.getItem("pregar-user") || "{}");
    onLogin(perfil);
  }

  if (tela === "boasvindas") return <TelaBoasVindas nome={nomeUser} onContinuar={handleContinuarApp}/>;

  return (
    <div style={{ minHeight:"100vh", background:"#FAFAF8", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"28px 20px" }}>
      {/* Logo */}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:28 }}>
        <div style={{ position:"relative", width:24, height:24 }}>
          <div style={{ position:"absolute", top:"50%", left:0, right:0, height:1.5, background:"#B8912A", transform:"translateY(-50%)" }}/>
          <div style={{ position:"absolute", top:0, bottom:0, left:"50%", width:1.5, background:"#B8912A", transform:"translateX(-50%)" }}/>
        </div>
        <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:19, fontWeight:700, color:"#17160F" }}>Pregar<span style={{ color:"#B8912A" }}>.app</span></div>
      </div>

      {/* Card */}
      <div style={{ width:"100%", maxWidth:390, background:"#fff", borderRadius:22, padding:"36px 32px 32px", boxShadow:"0 2px 48px rgba(23,22,15,0.07), 0 0 0 1px rgba(23,22,15,0.04)" }}>
        {tela === "login"    && <TelaLogin saudacao={saudacao} onLogin={(nome)=>{ setNomeUser(nome); setTela("boasvindas"); }} onCadastrar={()=>setTela("cadastro")}/>}
        {tela === "cadastro" && <TelaCadastro onVoltar={()=>setTela("login")} onConfirmar={(email)=>{ setTela("confirmar"); }}/>}
        {tela === "confirmar"&& <TelaConfirmar onVoltar={()=>setTela("login")} onConfirmado={(nome)=>{ setNomeUser(nome); setTela("boasvindas"); }}/>}
      </div>

      {/* Versículo */}
      <div style={{ marginTop:28, maxWidth:360, textAlign:"center" }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:16, fontStyle:"italic", color:"#9A998F", lineHeight:1.75, marginBottom:6 }}>"{ver.texto}"</div>
        <div style={{ fontSize:10, fontWeight:700, color:"#B8912A", letterSpacing:"0.12em", textTransform:"uppercase" }}>{ver.ref}</div>
      </div>
    </div>
  );
}

// —— TELA LOGIN ——
function TelaLogin({ saudacao, onLogin, onCadastrar }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrar, setMostrar] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleEntrar() {
    if (!email.trim()) { setErro("Informe seu e-mail."); return; }
    if (!senha) { setErro("Informe sua senha."); return; }
    setCarregando(true); setErro("");
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password: senha });
    if (error) {
      if (error.message.includes("Email not confirmed")) setErro("Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.");
      else if (error.message.includes("Invalid login") || error.message.includes("invalid_credentials")) setErro("E-mail ou senha incorretos.");
      else setErro(error.message);
      setCarregando(false); return;
    }
    const nome = data.user.user_metadata?.nome || data.user.email.split("@")[0];
    localStorage.setItem("pregar-user", JSON.stringify({ nome, email: data.user.email }));
    onLogin(nome);
  }

  return (
    <div>
      <div style={{ textAlign:"center", marginBottom:26 }}>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#B8912A", marginBottom:8 }}>{saudacao}</div>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:700, color:"#17160F" }}>Bem-vindo de volta</div>
      </div>

      {erro && <div style={{ fontSize:13, color:"#EF4444", marginBottom:14, padding:"10px 12px", background:"#FEF2F2", borderRadius:8, border:"1px solid #FCA5A5" }}>⚠ {erro}</div>}

      <Campo label="E-mail" type="email" value={email} onChange={e=>{setEmail(e.target.value);setErro("");}} placeholder="seu@email.com"/>
      <div style={{ marginBottom:20 }}>
        <label style={lbStyle}>Senha</label>
        <div style={{ position:"relative" }}>
          <input type={mostrar?"text":"password"} value={senha} onChange={e=>{setSenha(e.target.value);setErro("");}}
            onKeyDown={e=>e.key==="Enter"&&handleEntrar()} placeholder="Sua senha"
            style={{ ...inpStyle }} onFocus={inpFocus} onBlur={inpBlur}/>
          <button onClick={()=>setMostrar(o=>!o)} style={olhoStyle}>{mostrar?"🙈":"👁"}</button>
        </div>
      </div>

      <button onClick={handleEntrar} disabled={carregando} style={{ ...btnStyle, background:carregando?"#E8E7E2":"#17160F", color:carregando?"#9A998F":"#fff", cursor:carregando?"not-allowed":"pointer" }}>
        {carregando ? "Verificando..." : "Entrar"}
      </button>

      <div style={{ textAlign:"center", marginTop:20, fontSize:14, color:"#9A998F" }}>
        Não tem conta?{" "}
        <button onClick={onCadastrar} style={{ background:"none", border:"none", color:"#B8912A", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"sans-serif" }}>
          Cadastrar-se
        </button>
      </div>
    </div>
  );
}

// —— TELA CADASTRO ——
function TelaCadastro({ onVoltar, onConfirmar }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mostrar, setMostrar] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleCadastrar() {
    if (!nome.trim()) { setErro("Informe seu nome."); return; }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { setErro("Informe um e-mail válido."); return; }
    if (senha.length < 6) { setErro("A senha precisa ter pelo menos 6 caracteres."); return; }
    if (senha !== confirmar) { setErro("As senhas não coincidem."); return; }
    setCarregando(true); setErro("");
    const { error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password: senha,
      options: {
        data: { nome: nome.trim() },
        emailRedirectTo: undefined,
      }
    });
    if (error) {
      if (error.message.includes("already registered")) setErro("Este e-mail já está cadastrado. Faça login.");
      else setErro(error.message);
      setCarregando(false); return;
    }
    setCarregando(false);
    onConfirmar(email.trim().toLowerCase());
  }

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:22 }}>
        <button onClick={onVoltar} style={{ background:"none", border:"none", cursor:"pointer", color:"#9A998F", fontSize:18, padding:0, lineHeight:1 }}>←</button>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:"#17160F" }}>Criar conta</div>
      </div>

      {erro && <div style={{ fontSize:13, color:"#EF4444", marginBottom:14, padding:"10px 12px", background:"#FEF2F2", borderRadius:8, border:"1px solid #FCA5A5" }}>⚠ {erro}</div>}

      <Campo label="Nome completo" value={nome} onChange={e=>setNome(e.target.value)} placeholder="Seu nome"/>
      <Campo label="E-mail" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@email.com"/>
      <div style={{ marginBottom:14 }}>
        <label style={lbStyle}>Senha</label>
        <div style={{ position:"relative" }}>
          <input type={mostrar?"text":"password"} value={senha} onChange={e=>setSenha(e.target.value)}
            placeholder="Mínimo 6 caracteres" style={{ ...inpStyle }} onFocus={inpFocus} onBlur={inpBlur}/>
          <button onClick={()=>setMostrar(o=>!o)} style={olhoStyle}>{mostrar?"🙈":"👁"}</button>
        </div>
      </div>
      <Campo label="Confirmar senha" type="password" value={confirmar} onChange={e=>setConfirmar(e.target.value)} placeholder="Repita a senha"/>

      <button onClick={handleCadastrar} disabled={carregando} style={{ ...btnStyle, background:carregando?"#E8E7E2":"#17160F", color:carregando?"#9A998F":"#fff", cursor:carregando?"not-allowed":"pointer", marginTop:4 }}>
        {carregando ? "Criando conta..." : "Criar conta"}
      </button>

      <div style={{ fontSize:12, color:"#C5C4BC", textAlign:"center", marginTop:12 }}>
        Você receberá um código de confirmação por e-mail.
      </div>
    </div>
  );
}

// —— TELA CONFIRMAR CÓDIGO ——
function TelaConfirmar({ onVoltar, onConfirmado }) {
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  async function handleConfirmar() {
    if (!email.trim()) { setErro("Informe o e-mail usado no cadastro."); return; }
    if (codigo.length !== 6) { setErro("O código tem 6 dígitos."); return; }
    setCarregando(true); setErro("");
    const { data, error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: codigo.trim(),
      type: "signup"
    });
    if (error) {
      setErro("Código inválido ou expirado. Tente novamente.");
      setCarregando(false); return;
    }
    const nome = data.user?.user_metadata?.nome || email.split("@")[0];
    localStorage.setItem("pregar-user", JSON.stringify({ nome, email: data.user.email }));
    setSucesso(true);
    setTimeout(() => onConfirmado(nome), 1000);
  }

  if (sucesso) {
    return (
      <div style={{ textAlign:"center", padding:"20px 0" }}>
        <div style={{ fontSize:48, marginBottom:16 }}>✅</div>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, color:"#17160F" }}>Conta confirmada!</div>
        <div style={{ fontSize:14, color:"#9A998F", marginTop:8 }}>Entrando no app...</div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:22 }}>
        <button onClick={onVoltar} style={{ background:"none", border:"none", cursor:"pointer", color:"#9A998F", fontSize:18, padding:0, lineHeight:1 }}>←</button>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:"#17160F" }}>Confirmar código</div>
      </div>

      <div style={{ fontSize:14, color:"#9A998F", lineHeight:1.7, marginBottom:22, padding:"14px 16px", background:"#F8F7F3", borderRadius:10 }}>
        📧 Verifique sua caixa de entrada e insira o código de 6 dígitos que enviamos para seu e-mail.
      </div>

      {erro && <div style={{ fontSize:13, color:"#EF4444", marginBottom:14, padding:"10px 12px", background:"#FEF2F2", borderRadius:8, border:"1px solid #FCA5A5" }}>⚠ {erro}</div>}

      <Campo label="E-mail do cadastro" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@email.com"/>

      <div style={{ marginBottom:20 }}>
        <label style={lbStyle}>Código de 6 dígitos</label>
        <input value={codigo} onChange={e=>setCodigo(e.target.value.replace(/\D/g,"").slice(0,6))}
          onKeyDown={e=>e.key==="Enter"&&handleConfirmar()} placeholder="000000" maxLength={6}
          style={{ width:"100%", padding:"14px 16px", border:"1px solid #E5E4DC", borderRadius:10, background:"#fff", color:"#17160F", fontSize:24, fontWeight:700, textAlign:"center", letterSpacing:"0.25em", outline:"none", boxSizing:"border-box" }}
          onFocus={e=>{ e.target.style.borderColor="#B8912A"; e.target.style.boxShadow="0 0 0 3px rgba(184,145,42,0.1)"; }}
          onBlur={e=>{ e.target.style.borderColor="#E5E4DC"; e.target.style.boxShadow="none"; }}/>
      </div>

      <button onClick={handleConfirmar} disabled={carregando||codigo.length!==6||!email.trim()}
        style={{ ...btnStyle, background:(carregando||codigo.length!==6||!email.trim())?"#E8E7E2":"#17160F", color:(carregando||codigo.length!==6||!email.trim())?"#9A998F":"#fff", cursor:(carregando||codigo.length!==6||!email.trim())?"not-allowed":"pointer" }}>
        {carregando ? "Verificando..." : "Confirmar e entrar"}
      </button>

      <div style={{ fontSize:12, color:"#C5C4BC", textAlign:"center", marginTop:14 }}>
        Não recebeu? Verifique o spam ou volte e cadastre-se novamente.
      </div>
    </div>
  );
}

// —— ESTILOS COMPARTILHADOS ——
const lbStyle = { fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"#8A8980", display:"block", marginBottom:6 };
const inpStyle = { width:"100%", padding:"13px 44px 13px 16px", border:"1px solid #E5E4DC", borderRadius:10, background:"#fff", color:"#17160F", fontSize:14, fontFamily:"sans-serif", outline:"none", boxSizing:"border-box", transition:"all 0.2s" };
const inpFocus = e => { e.target.style.borderColor="#B8912A"; e.target.style.boxShadow="0 0 0 3px rgba(184,145,42,0.1)"; };
const inpBlur  = e => { e.target.style.borderColor="#E5E4DC"; e.target.style.boxShadow="none"; };
const olhoStyle = { position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:16, color:"#9A998F", padding:4 };
const btnStyle = { width:"100%", padding:"14px", border:"none", borderRadius:12, fontSize:15, fontWeight:700, fontFamily:"sans-serif", transition:"all 0.2s" };

function Campo({ label, type="text", value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom:14 }}>
      <label style={lbStyle}>{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{ width:"100%", padding:"13px 16px", border:"1px solid #E5E4DC", borderRadius:10, background:"#fff", color:"#17160F", fontSize:14, fontFamily:"sans-serif", outline:"none", boxSizing:"border-box", transition:"all 0.2s" }}
        onFocus={inpFocus} onBlur={inpBlur}/>
    </div>
  );
}
