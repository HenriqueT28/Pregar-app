import { useState, useEffect } from "react";

// 365 referências cristocêntricas
const REFS = [
  {r:"Gênesis 1.1",t:"No princípio era Deus"},{r:"Gênesis 1.26-27",t:"Feitos à imagem de Deus"},
  {r:"Gênesis 2.7",t:"O sopro que nos fez vivos"},{r:"Gênesis 3.15",t:"A primeira promessa do Redentor"},
  {r:"Gênesis 12.1-3",t:"A fé que obedece sem ver"},{r:"Gênesis 15.6",t:"Crer é ser contado justo"},
  {r:"Gênesis 22.8",t:"Deus proverá o cordeiro"},{r:"Gênesis 28.15",t:"Eu estou contigo"},
  {r:"Gênesis 32.26",t:"Não te deixarei ir sem que me abençoes"},{r:"Gênesis 50.20",t:"O que era para o mal, Deus usou para o bem"},
  {r:"Êxodo 3.14",t:"EU SOU O QUE SOU"},{r:"Êxodo 12.13",t:"O sangue será o sinal"},
  {r:"Êxodo 14.14",t:"O Senhor combaterá por vós"},{r:"Êxodo 20.3",t:"Nenhum outro deus diante de Mim"},
  {r:"Êxodo 33.14",t:"A minha presença irá contigo"},{r:"Levítico 17.11",t:"A vida está no sangue"},
  {r:"Números 21.9",t:"A serpente levantada — Cristo prefigurado"},{r:"Deuteronômio 6.4-5",t:"Amarás o Senhor teu Deus"},
  {r:"Deuteronômio 8.3",t:"Nem só de pão viverá o homem"},{r:"Deuteronômio 18.15",t:"O profeta que há de vir"},
  {r:"Deuteronômio 31.6",t:"Forte e corajoso, pois Deus está contigo"},{r:"Josué 1.8",t:"Medita na lei dia e noite"},
  {r:"Josué 24.15",t:"Quanto a mim e à minha casa"},{r:"1 Samuel 16.7",t:"O Senhor olha para o coração"},
  {r:"1 Samuel 17.47",t:"A batalha pertence ao Senhor"},{r:"2 Samuel 7.12-13",t:"O trono eterno do Filho de Davi"},
  {r:"1 Reis 18.21",t:"Até quando coxeareis entre dois pensamentos"},{r:"1 Reis 19.12",t:"A voz mansa e delicada"},
  {r:"2 Reis 6.16",t:"Mais são os que estão conosco"},{r:"2 Crônicas 7.14",t:"Se o meu povo se humilhar"},
  {r:"Neemias 8.10",t:"A alegria do Senhor é a vossa força"},{r:"Ester 4.14",t:"Para um tempo como este"},
  {r:"Jó 1.21",t:"O Senhor deu, o Senhor tomou"},{r:"Jó 19.25",t:"Eu sei que o meu Redentor vive"},
  {r:"Jó 38.4",t:"Onde estavas tu quando lancei os fundamentos"},{r:"Salmos 1.1-2",t:"Bem-aventurado o que medita na lei"},
  {r:"Salmos 8.4",t:"Que é o homem para que te lembres dele"},{r:"Salmos 16.11",t:"Na tua presença há plenitude de alegria"},
  {r:"Salmos 19.1",t:"Os céus proclamam a glória de Deus"},{r:"Salmos 22.1",t:"Por que me abandonaste"},
  {r:"Salmos 23.1",t:"O Senhor é o meu pastor"},{r:"Salmos 27.1",t:"O Senhor é a minha luz e salvação"},
  {r:"Salmos 32.1",t:"Bem-aventurado aquele cujo pecado é perdoado"},{r:"Salmos 34.18",t:"Perto dos que têm o coração quebrantado"},
  {r:"Salmos 37.4",t:"Deleita-te no Senhor"},{r:"Salmos 42.1",t:"Como o cervo anseia pelas águas"},
  {r:"Salmos 46.1",t:"Deus é o nosso refúgio e força"},{r:"Salmos 51.10",t:"Cria em mim um coração puro"},
  {r:"Salmos 62.5",t:"A minha alma espera só em Deus"},{r:"Salmos 63.1",t:"Ó Deus, tu és o meu Deus"},
  {r:"Salmos 73.25",t:"A quem tenho eu no céu senão a ti"},{r:"Salmos 84.10",t:"Melhor é um dia nos teus átrios"},
  {r:"Salmos 90.12",t:"Ensina-nos a contar os nossos dias"},{r:"Salmos 91.1",t:"No esconderijo do Altíssimo"},
  {r:"Salmos 103.12",t:"Removeu as transgressões para longe"},{r:"Salmos 110.1",t:"O Senhor disse ao meu Senhor"},
  {r:"Salmos 119.11",t:"Escondi a tua palavra no meu coração"},{r:"Salmos 121.1-2",t:"O meu socorro vem do Senhor"},
  {r:"Salmos 130.3-4",t:"Há perdão em ti"},{r:"Salmos 139.13-14",t:"Formidavelmente maravilhoso sou feito"},
  {r:"Salmos 145.18",t:"Perto de todos os que o invocam"},{r:"Provérbios 3.5-6",t:"Confia no Senhor de todo o coração"},
  {r:"Provérbios 4.23",t:"Guarda o teu coração"},{r:"Isaías 6.3",t:"Santo, santo, santo"},
  {r:"Isaías 9.6",t:"Um filho nos foi dado"},{r:"Isaías 40.31",t:"Os que esperam no Senhor"},
  {r:"Isaías 41.10",t:"Não temas, pois eu sou contigo"},{r:"Isaías 43.1",t:"Eu te resgatei, és meu"},
  {r:"Isaías 43.25",t:"Eu mesmo apago as tuas transgressões"},{r:"Isaías 49.15-16",t:"Gravei-te nas palmas das minhas mãos"},
  {r:"Isaías 53.3",t:"Desprezado e rejeitado pelos homens"},{r:"Isaías 53.5",t:"Ferido pelas nossas transgressões"},
  {r:"Isaías 53.6",t:"Todos nós como ovelhas nos desviamos"},{r:"Isaías 55.1",t:"Vinde sem dinheiro e sem preço"},
  {r:"Isaías 55.8-9",t:"Os meus pensamentos não são os vossos"},{r:"Isaías 61.1-2",t:"O Espírito do Senhor está sobre mim"},
  {r:"Jeremias 1.5",t:"Antes de te formar no ventre te conheci"},{r:"Jeremias 17.9",t:"O coração é enganoso"},
  {r:"Jeremias 29.11",t:"Planos de paz e não de calamidade"},{r:"Jeremias 31.3",t:"Amor eterno te amei"},
  {r:"Jeremias 31.31-34",t:"A nova aliança"},{r:"Lamentações 3.22-23",t:"Novas são as tuas misericórdias"},
  {r:"Ezequiel 36.26",t:"Darei a vós coração novo"},{r:"Ezequiel 37.3",t:"Podem reviver estes ossos?"},
  {r:"Daniel 3.17-18",t:"Mesmo que não nos livre, não serviremos"},
  {r:"Daniel 6.10",t:"Orava três vezes por dia"},{r:"Oseias 6.6",t:"Quero misericórdia e não sacrifício"},
  {r:"Joel 2.28",t:"Derramarei o meu Espírito sobre toda carne"},{r:"Amós 3.7",t:"Deus nada faz sem revelar aos profetas"},
  {r:"Miqueias 5.2",t:"De Belém sairá o governante"},{r:"Miqueias 6.8",t:"Fazer justiça, amar bondade e andar humildemente"},
  {r:"Habacuque 2.4",t:"O justo viverá pela fé"},{r:"Sofonias 3.17",t:"O Senhor está no meio de ti"},
  {r:"Malaquias 3.6",t:"Eu sou o Senhor, não mudo"},{r:"Mateus 1.23",t:"Emanuel, Deus conosco"},
  {r:"Mateus 3.17",t:"Este é o meu Filho amado"},{r:"Mateus 4.4",t:"Nem só de pão viverá o homem"},
  {r:"Mateus 5.3",t:"Bem-aventurados os pobres de espírito"},{r:"Mateus 5.8",t:"Bem-aventurados os puros de coração"},
  {r:"Mateus 6.9-10",t:"Pai nosso que estás nos céus"},{r:"Mateus 6.33",t:"Buscai primeiro o Reino de Deus"},
  {r:"Mateus 7.7",t:"Pedi e será dado"},{r:"Mateus 11.28",t:"Vinde a mim todos os que estais cansados"},
  {r:"Mateus 16.16",t:"Tu és o Cristo, o Filho do Deus vivo"},{r:"Mateus 16.24",t:"Tome a sua cruz e siga-me"},
  {r:"Mateus 18.20",t:"Onde dois ou três se reúnem em meu nome"},{r:"Mateus 22.37-39",t:"Amarás o Senhor teu Deus"},
  {r:"Mateus 26.39",t:"Não seja o que eu quero, mas o que tu queres"},{r:"Mateus 28.18-20",t:"Toda autoridade me foi dada"},
  {r:"Marcos 1.15",t:"O Reino de Deus está próximo, arrependei-vos"},{r:"Marcos 10.45",t:"Para servir e dar a vida em resgate"},
  {r:"Lucas 1.37",t:"Nada é impossível para Deus"},{r:"Lucas 2.10-11",t:"Grandes novas de grande alegria"},
  {r:"Lucas 4.18",t:"O Espírito do Senhor está sobre mim"},{r:"Lucas 15.20",t:"Ainda estava longe e o pai o viu"},
  {r:"Lucas 19.10",t:"O Filho do Homem veio buscar e salvar"},{r:"Lucas 22.19",t:"Fazei isso em memória de mim"},
  {r:"Lucas 23.34",t:"Pai, perdoa-lhes"},{r:"Lucas 24.6",t:"Não está aqui, ressuscitou"},
  {r:"João 1.1",t:"No princípio era o Verbo"},{r:"João 1.14",t:"O Verbo se fez carne"},
  {r:"João 1.29",t:"Eis o Cordeiro de Deus"},{r:"João 3.16",t:"Porque Deus amou o mundo"},
  {r:"João 3.30",t:"É necessário que ele cresça"},
  {r:"João 4.14",t:"Água que jorra para a vida eterna"},{r:"João 6.35",t:"Eu sou o pão da vida"},
  {r:"João 8.12",t:"Eu sou a luz do mundo"},{r:"João 8.32",t:"A verdade vos libertará"},
  {r:"João 8.36",t:"Se o Filho vos libertar"},{r:"João 10.10",t:"Vim para que tenham vida e a tenham em abundância"},
  {r:"João 10.11",t:"Eu sou o bom pastor"},{r:"João 11.25",t:"Eu sou a ressurreição e a vida"},
  {r:"João 13.34",t:"Amai-vos uns aos outros como eu vos amei"},{r:"João 14.1",t:"Não se turbe o vosso coração"},
  {r:"João 14.6",t:"Eu sou o caminho, a verdade e a vida"},{r:"João 14.16-17",t:"O Consolador virá"},
  {r:"João 15.5",t:"Eu sou a videira, vós os ramos"},{r:"João 15.13",t:"Amor maior do que este"},
  {r:"João 16.33",t:"No mundo tereis tribulações, mas eu venci"},{r:"João 17.3",t:"A vida eterna é conhecer a Deus"},
  {r:"João 19.30",t:"Está consumado"},{r:"João 20.28",t:"Senhor meu e Deus meu"},
  {r:"Atos 1.8",t:"Recebereis poder quando o Espírito vier"},{r:"Atos 2.38",t:"Arrependei-vos e sede batizados"},
  {r:"Atos 4.12",t:"Em nenhum outro há salvação"},{r:"Atos 16.31",t:"Crê no Senhor Jesus e serás salvo"},
  {r:"Romanos 1.16",t:"Não me envergonho do evangelho"},{r:"Romanos 1.17",t:"O justo viverá pela fé"},
  {r:"Romanos 3.23",t:"Todos pecaram e carecem da glória de Deus"},{r:"Romanos 3.24",t:"Justificados gratuitamente pela sua graça"},
  {r:"Romanos 5.1",t:"Justificados pela fé, temos paz com Deus"},{r:"Romanos 5.8",t:"Deus prova o seu amor para conosco"},
  {r:"Romanos 6.23",t:"O dom gratuito de Deus é a vida eterna"},{r:"Romanos 8.1",t:"Nenhuma condenação para os que estão em Cristo"},
  {r:"Romanos 8.11",t:"O mesmo Espírito que ressuscitou Jesus vive em vós"},{r:"Romanos 8.28",t:"Todas as coisas cooperam para o bem"},
  {r:"Romanos 8.31",t:"Se Deus é por nós, quem será contra nós"},{r:"Romanos 8.38-39",t:"Nada nos separará do amor de Deus"},
  {r:"Romanos 10.9",t:"Confessa com a boca e crê no coração"},{r:"Romanos 10.17",t:"A fé vem pelo ouvir a palavra de Cristo"},
  {r:"Romanos 12.1",t:"Ofereçais os vossos corpos em sacrifício vivo"},{r:"Romanos 12.2",t:"Não vos conformeis a este século"},
  {r:"1 Coríntios 1.18",t:"A pregação da cruz é loucura aos que perecem"},{r:"1 Coríntios 1.30",t:"Cristo nos foi feito sabedoria"},
  {r:"1 Coríntios 2.2",t:"Nada resolvi saber senão Jesus Cristo"},{r:"1 Coríntios 6.19-20",t:"Fostes comprados por bom preço"},
  {r:"1 Coríntios 10.13",t:"Deus é fiel e não vos deixará ser tentados além do que podeis"},{r:"1 Coríntios 13.4-7",t:"O amor é paciente e bondoso"},
  {r:"1 Coríntios 15.3-4",t:"Cristo morreu, foi sepultado e ressuscitou"},{r:"1 Coríntios 15.55",t:"Onde está, ó morte, o teu aguilhão"},
  {r:"2 Coríntios 1.3-4",t:"Deus de toda consolação"},{r:"2 Coríntios 4.7",t:"Tesouros em vasos de barro"},
  {r:"2 Coríntios 4.17",t:"A leve e momentânea tribulação"},{r:"2 Coríntios 5.17",t:"Nova criatura em Cristo"},
  {r:"2 Coríntios 5.21",t:"O que não conheceu pecado, por nós foi feito pecado"},{r:"2 Coríntios 12.9",t:"A minha graça é suficiente para ti"},
  {r:"Gálatas 2.20",t:"Já não sou eu que vivo, mas Cristo"},{r:"Gálatas 3.13",t:"Cristo nos resgatou da maldição da lei"},
  {r:"Gálatas 5.1",t:"Para a liberdade Cristo nos libertou"},{r:"Efésios 1.3",t:"Abençoados com toda bênção espiritual"},
  {r:"Efésios 1.7",t:"Temos a redenção pelo seu sangue"},{r:"Efésios 2.4-5",t:"Ricos em misericórdia, nos deu vida"},
  {r:"Efésios 2.8-9",t:"Pela graça sois salvos mediante a fé"},{r:"Efésios 3.20",t:"Fazer muito mais do que pedimos ou pensamos"},
  {r:"Efésios 4.22-24",t:"Renovai-vos no espírito da vossa mente"},{r:"Efésios 6.10-11",t:"Revesti-vos de toda a armadura de Deus"},
  {r:"Filipenses 1.6",t:"O que começou a boa obra a completará"},{r:"Filipenses 2.5-8",t:"Tende em vós o sentimento de Cristo"},
  {r:"Filipenses 3.10",t:"Conhecê-lo e o poder da sua ressurreição"},{r:"Filipenses 4.6-7",t:"Em tudo fazei as vossas petições conhecidas a Deus"},
  {r:"Filipenses 4.11",t:"Aprendi a estar contente em todo estado"},{r:"Filipenses 4.13",t:"Tudo posso naquele que me fortalece"},
  {r:"Colossenses 1.15",t:"Imagem do Deus invisível, primogênito"},{r:"Colossenses 1.27",t:"Cristo em vós, a esperança da glória"},
  {r:"Colossenses 2.9-10",t:"Nele habita toda a plenitude da divindade"},{r:"Colossenses 3.1-2",t:"Buscai as coisas que são de cima"},
  {r:"1 Tessalonicenses 5.16-18",t:"Regozijai-vos sempre, orai sem cessar"},{r:"2 Tessalonicenses 3.3",t:"O Senhor é fiel"},
  {r:"1 Timóteo 1.15",t:"Cristo Jesus veio ao mundo para salvar pecadores"},{r:"1 Timóteo 2.5",t:"Um só Deus e um só mediador"},
  {r:"2 Timóteo 1.7",t:"Deus não nos deu espírito de covardia"},{r:"2 Timóteo 3.16-17",t:"Toda Escritura é inspirada por Deus"},
  {r:"Hebreus 1.1-2",t:"Deus nos falou pelo Filho"},{r:"Hebreus 4.15-16",t:"Um sumo sacerdote que se compadece"},
  {r:"Hebreus 9.22",t:"Sem derramamento de sangue não há remissão"},{r:"Hebreus 10.19-22",t:"Temos ousadia para entrar no santuário"},
  {r:"Hebreus 11.1",t:"A fé é a certeza do que se espera"},{r:"Hebreus 11.6",t:"Sem fé é impossível agradar a Deus"},
  {r:"Hebreus 12.1-2",t:"Corramos com perseverança a carreira"},{r:"Hebreus 13.5",t:"Nunca te deixarei nem te abandonarei"},
  {r:"Tiago 1.2-4",t:"Considerai motivo de grande alegria as provações"},{r:"Tiago 1.22",t:"Sede cumpridores da palavra"},
  {r:"Tiago 4.8",t:"Chegai-vos a Deus e ele se chegará a vós"},{r:"1 Pedro 1.3",t:"Regeneração para uma esperança viva"},
  {r:"1 Pedro 2.24",t:"Pelas suas chagas fostes sarados"},{r:"1 Pedro 5.7",t:"Lançai sobre ele toda a vossa ansiedade"},
  {r:"2 Pedro 1.4",t:"Participantes da natureza divina"},{r:"1 João 1.9",t:"Se confessarmos nossos pecados, ele é fiel"},
  {r:"1 João 3.1",t:"Vede que grande amor nos deu o Pai"},{r:"1 João 4.8",t:"Deus é amor"},
  {r:"1 João 4.18",t:"O perfeito amor lança fora o temor"},{r:"1 João 5.11-12",t:"Quem tem o Filho tem a vida"},
  {r:"Apocalipse 1.8",t:"Eu sou o Alfa e o Ômega"},{r:"Apocalipse 3.20",t:"Estou à porta e bato"},
  {r:"Apocalipse 5.9",t:"Digno és de tomar o livro"},{r:"Apocalipse 19.16",t:"Rei dos reis e Senhor dos senhores"},
  {r:"Apocalipse 21.3-4",t:"Deus habitará com os homens"},{r:"Apocalipse 21.5",t:"Eis que faço novas todas as coisas"},
  {r:"Apocalipse 22.13",t:"Eu sou o Alfa e o Ômega, o primeiro e o último"},
  // Dias extras para completar 365
  {r:"Salmos 2.7",t:"Tu és meu Filho, eu hoje te gerei"},
  {r:"Salmos 16.10",t:"Não abandonarás a minha alma no além"},
  {r:"Salmos 118.22",t:"A pedra que os construtores rejeitaram"},
  {r:"Salmos 118.24",t:"Este é o dia que o Senhor fez"},
  {r:"Isaías 25.8",t:"Devorará a morte para sempre"},
  {r:"Ezequiel 18.23",t:"Não quero a morte do ímpio, mas que se converta"},
  {r:"Miqueias 7.18",t:"Quem é Deus como tu, que perdoa a iniquidade"},
  {r:"Zacarias 9.9",t:"Eis que te vem o teu rei, justo e salvador"},
  {r:"Mateus 5.14",t:"Vós sois a luz do mundo"},
  {r:"Mateus 9.36",t:"Vendo as multidões, compadeceu-se delas"},
  {r:"Marcos 4.39",t:"Aquieta-te, cala-te"},
  {r:"Marcos 9.24",t:"Creio, ajuda a minha incredulidade"},
  {r:"Lucas 1.45",t:"Bem-aventurada a que creu"},
  {r:"Lucas 7.47",t:"São perdoados os seus muitos pecados"},
  {r:"Lucas 10.27",t:"Amarás o Senhor teu Deus com todo o teu coração"},
  {r:"João 12.24",t:"Se o grão de trigo não cair na terra e morrer"},
  {r:"João 13.35",t:"Nisso todos conhecerão que sois meus discípulos"},
  {r:"João 20.29",t:"Bem-aventurados os que não viram e creram"},
  {r:"Atos 3.19",t:"Arrependei-vos e convertei-vos"},
  {r:"Atos 13.38-39",t:"Por meio dele é anunciada a remissão dos pecados"},
  {r:"Romanos 4.5",t:"A fé lhe é imputada como justiça"},
  {r:"Romanos 6.4",t:"Sepultados com Cristo pelo batismo"},
  {r:"Romanos 11.33",t:"Ó profundidade das riquezas da sabedoria de Deus"},
  {r:"1 Coríntios 3.11",t:"Ninguém pode pôr outro fundamento senão Cristo"},
  {r:"2 Coríntios 3.18",t:"Transformados de glória em glória"},
  {r:"Gálatas 4.4-5",t:"No cumprimento dos tempos, Deus enviou seu Filho"},
  {r:"Efésios 3.17-19",t:"Que Cristo habite nos vossos corações pela fé"},
  {r:"Efésios 5.25-27",t:"Cristo amou a Igreja e a si mesmo se entregou"},
  {r:"Colossenses 3.16",t:"A palavra de Cristo habite ricamente em vós"},
  {r:"1 Timóteo 3.16",t:"Grande é o mistério da piedade"},
  {r:"Hebreus 2.14-15",t:"Participou da carne e do sangue para destruir a morte"},
  {r:"Hebreus 7.25",t:"Pode salvar totalmente os que por ele se aproximam"},
  {r:"1 Pedro 1.18-19",t:"Resgatados com o precioso sangue de Cristo"},
  {r:"2 Pedro 3.9",t:"O Senhor não retarda a sua promessa"},
  {r:"Judas 24",t:"Aquele que é poderoso para vos guardar"},
  {r:"Apocalipse 7.17",t:"O Cordeiro os apascentará"},
  {r:"Apocalipse 12.11",t:"Venceram pelo sangue do Cordeiro"},
];

const DIAS_SEMANA = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
const MESES = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];

// Data base: 1 Jan 2026 = Dia 1
const BASE = new Date(2026, 0, 1);

function getDayIndex() {
  const hoje = new Date();
  const hojeZero = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
  const diff = Math.floor((hojeZero - BASE) / 86400000);
  return Math.max(0, diff % 365);
}

function dateFromIndex(idx) {
  const d = new Date(BASE);
  d.setDate(d.getDate() + idx);
  return d;
}

function formatDate(d) {
  const dia = String(d.getDate()).padStart(2,'0');
  const mes = String(d.getMonth()+1).padStart(2,'0');
  const ano = String(d.getFullYear()).slice(-2);
  return `${dia}/${mes}/${ano}`;
}

function formatDateFull(d) {
  return `${DIAS_SEMANA[d.getDay()]}, ${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`;
}

async function ai(system, user) {
  const r = await fetch("/api/chat", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      model:"claude-sonnet-4-20250514",
      max_tokens:1800,
      system,
      messages:[{role:"user",content:user}]
    })
  });
  const d = await r.json();
  if(d.error) throw new Error(d.error.message);
  return d.content?.[0]?.text || "";
}

const SYSTEM = `Você é um pastor-teólogo cristocêntrico de altíssimo nível espiritual. Gere um devocional profundo, impactante e transformador. Regras:
- SEMPRE centralize tudo em Cristo — ele é a resposta de cada texto
- Use profundidade exegética real: cite o hebraico/grego original quando relevante, com a palavra entre asteriscos ex: *shalom* e seu significado entre colchetes [paz completa, inteireza]
- Reflexão de pelo menos 4 parágrafos: contexto histórico, significado profundo, aplicação cristocêntrica, desafio pessoal
- Oração poderosa e específica ao tema
- Uma aplicação prática transformadora
- Linguagem: profunda mas acessível, que toque o coração
- Retorne APENAS JSON válido sem markdown: {"reflexao":"...","oracao":"...","aplicacao":"...","versiculo":"versículo completo em NVI"}`;

// Tooltip de palavras hebraicas/gregas
function HebrewTooltip({ word, meaning }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{position:"relative",display:"inline"}}>
      <span
        onMouseEnter={()=>setOpen(true)}
        onMouseLeave={()=>setOpen(false)}
        onClick={()=>setOpen(o=>!o)}
        style={{
          color:"var(--gold)",fontWeight:600,cursor:"pointer",
          borderBottom:"1.5px solid var(--gold)",fontStyle:"italic"
        }}
      >
        {word}
      </span>
      {open && (
        <span style={{
          position:"fixed",
          top:"50%",left:"50%",
          transform:"translate(-50%,-50%)",
          background:"var(--white,#fff)",
          border:"1.5px solid var(--gold-border,rgba(184,145,42,0.3))",
          borderRadius:14,
          padding:"16px 18px",
          width:280,
          zIndex:9999,
          boxShadow:"0 16px 48px rgba(0,0,0,0.18)",
          textAlign:"center",
          pointerEvents:"none",
        }}>
          <div style={{fontSize:28,fontFamily:"serif",color:"var(--ink,#17160F)",marginBottom:6,lineHeight:1.3,direction:"rtl"}}>{meaning.heb}</div>
          <div style={{fontSize:12,fontWeight:600,color:"var(--gold,#B8912A)",marginBottom:8,fontStyle:"normal"}}>{word} · {meaning.h}</div>
          <div style={{fontSize:13,color:"var(--ink2,#3D3C35)",lineHeight:1.6,marginBottom:6}}>{meaning.sig}</div>
          <div style={{fontSize:11,color:"var(--muted,#8A8980)",fontStyle:"italic",lineHeight:1.5}}>{meaning.ex}</div>
        </span>
      )}
    </span>
  );
}

// Renderiza texto substituindo *palavra* [significado] por tooltips
const HEBREW_DB = {
  "shalom":{heb:"שָׁלוֹם",h:"H7965",sig:"Paz completa, inteireza, bem-estar total — muito mais que ausência de conflito",ex:"Nm 6.26 — O Senhor levante sobre ti a sua face e te dê shalom"},
  "hesed":{heb:"חֶסֶד",h:"H2617",sig:"Amor leal, misericórdia da aliança — amor que nunca desiste, nunca falha",ex:"Sl 136 — A sua hesed dura para sempre (repetido 26 vezes)"},
  "bara":{heb:"בָּרָא",h:"H1254",sig:"Criar do nada — verbo usado exclusivamente com Deus como sujeito",ex:"Gn 1.1 — No princípio Deus bara os céus e a terra"},
  "emunah":{heb:"אֱמוּנָה",h:"H530",sig:"Fidelidade, firmeza — a fé bíblica é confiança baseada em caráter provado",ex:"Hc 2.4 — O justo viverá pela sua emunah"},
  "yada":{heb:"יָדַע",h:"H3045",sig:"Conhecer intimamente — não informação, mas relacionamento experiencial profundo",ex:"Jr 1.5 — Antes de te formar no ventre te yada"},
  "ruach":{heb:"רוּחַ",h:"H7307",sig:"Espírito, vento, sopro — a presença ativa e poderosa de Deus",ex:"Gn 1.2 — O ruach de Deus se movia sobre as águas"},
  "kadosh":{heb:"קָדוֹשׁ",h:"H6918",sig:"Santo, separado, completamente diferente — Deus é radicalmente outro",ex:"Is 6.3 — Kadosh, kadosh, kadosh é o Senhor dos Exércitos"},
  "agape":{heb:"ἀγάπη",h:"G26",sig:"Amor incondicional, sacrificial — o amor que age pelo bem do outro independente de mérito",ex:"Jo 3.16 — Deus tanto agapao o mundo que deu seu Filho unigênito"},
  "grace":{heb:"χάρις",h:"G5485",sig:"Graça — favor imerecido, presente não comprado, amor que vai além da justiça",ex:"Ef 2.8 — Pela charis sois salvos mediante a fé"},
  "logos":{heb:"λόγος",h:"G3056",sig:"Palavra, razão, sentido — em João, a revelação completa e pessoal de Deus",ex:"Jo 1.1 — No princípio era o logos, e o logos estava com Deus"},
  "emet":{heb:"אֱמֶת",h:"H571",sig:"Verdade, fidelidade, realidade — aquilo que é sólido, no qual se pode confiar",ex:"Jo 14.6 — Eu sou o caminho, a emet e a vida"},
  "nasa":{heb:"נָשָׂא",h:"H5375",sig:"Carregar, suportar, perdoar — literalmente levantar e remover o peso do pecado",ex:"Is 53.4 — Certamente ele nasa as nossas enfermidades"},
  "psuche":{heb:"ψυχή",h:"G5590",sig:"Alma, vida, ser interior — a essência da pessoa, o eu profundo que só Deus pode satisfazer",ex:"Mt 11.28 — Descansarei as vossas psuchai"},
};

function renderReflexao(text) {
  if (!text) return null;
  const parts = [];
  const regex = /\*(\w+)\*\s*\[([^\]]+)\]/g;
  let last = 0; let key = 0; let m;
  const str = text;
  const matches = [];
  let match;
  while ((match = regex.exec(str)) !== null) matches.push(match);
  
  for (const m of matches) {
    if (m.index > last) parts.push(<span key={key++}>{str.slice(last, m.index)}</span>);
    const word = m[1];
    const dbKey = word.toLowerCase();
    if (HEBREW_DB[dbKey]) {
      parts.push(<HebrewTooltip key={key++} word={word} meaning={HEBREW_DB[dbKey]} />);
    } else {
      parts.push(<span key={key++} style={{color:"var(--gold)",fontWeight:600,fontStyle:"italic"}}>{word} <span style={{fontSize:11,color:"var(--muted)"}}>[{m[2]}]</span></span>);
    }
    last = m.index + m[0].length;
  }
  if (last < str.length) parts.push(<span key={key++}>{str.slice(last)}</span>);
  return parts.length > 0 ? parts : text;
}

export default function Devocional() {
  const [dayIdx, setDayIdx] = useState(getDayIndex);
  const [dev, setDev] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ref = REFS[dayIdx % REFS.length];
  const date = dateFromIndex(dayIdx);
  const todayIdx = getDayIndex();
  const isToday = dayIdx === todayIdx;

  // Checa se virou meia-noite
  useEffect(() => {
    const check = setInterval(() => {
      const newIdx = getDayIndex();
      if (newIdx !== todayIdx) window.location.reload();
    }, 60000);
    return () => clearInterval(check);
  }, [todayIdx]);

  // Carrega do cache ou gera
  useEffect(() => {
    const key = `dev-${dayIdx}`;
    const cached = localStorage.getItem(key);
    if (cached) { try { setDev(JSON.parse(cached)); return; } catch {} }
    generate(dayIdx);
  }, [dayIdx]);

  async function generate(idx) {
    setLoading(true); setError(""); setDev(null);
    try {
      const r = REFS[idx % REFS.length];
      const prompt = `Gere um devocional cristocêntrico profundo para o dia ${idx+1}/365.
Referência: ${r.r} — "${r.t}"
Data: ${formatDateFull(dateFromIndex(idx))}

Inclua pelo menos 2 palavras em hebraico/grego original no formato *palavra* [tradução literal] dentro da reflexão.
A reflexão deve ter 4 parágrafos profundos que transformem o leitor.`;
      const raw = await ai(SYSTEM, prompt);
      const clean = raw.replace(/```json|```/g,"").trim();
      const parsed = JSON.parse(clean);
      localStorage.setItem(`dev-${idx}`, JSON.stringify(parsed));
      setDev(parsed);
    } catch(e) { setError("Erro ao gerar: " + e.message); }
    setLoading(false);
  }

  const progresso = Math.round(((dayIdx+1)/365)*100);

  return (
    <div style={{padding:"0 4px",maxWidth:680}}>
      {/* Header com navegação */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <button
          onClick={()=>setDayIdx(i=>Math.max(0,i-1))}
          disabled={dayIdx===0}
          style={{width:36,height:36,borderRadius:"50%",border:"1.5px solid var(--border)",background:"none",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",color:dayIdx===0?"var(--border)":"var(--ink)",transition:"all .15s"}}
        >←</button>

        <div style={{textAlign:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,justifyContent:"center",marginBottom:2}}>
            <span style={{background:"rgba(30,64,53,0.1)",color:"var(--green,#1E4035)",fontSize:12,fontWeight:600,padding:"3px 10px",borderRadius:10}}>
              Dia {dayIdx+1} de 365
            </span>
            {isToday && <span style={{background:"var(--gold-bg)",color:"var(--gold)",fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:10}}>HOJE</span>}
          </div>
          <div style={{fontSize:13,fontWeight:600,color:"var(--ink)",letterSpacing:"0.03em"}}>{formatDate(date)}</div>
          <div style={{fontSize:11,color:"var(--muted)",marginTop:1}}>{formatDateFull(date)}</div>
        </div>

        <button
          onClick={()=>setDayIdx(i=>Math.min(364,i+1))}
          disabled={dayIdx===364}
          style={{width:36,height:36,borderRadius:"50%",border:"1.5px solid var(--border)",background:"none",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",color:dayIdx===364?"var(--border)":"var(--ink)",transition:"all .15s"}}
        >→</button>
      </div>

      {/* Referência do dia */}
      <div style={{textAlign:"center",marginBottom:16,padding:"12px 0",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)"}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:"var(--ink)",marginBottom:3}}>{ref.t}</div>
        <div style={{fontSize:12,color:"var(--gold)",fontWeight:600}}>{ref.r}</div>
      </div>

      {loading && (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12,padding:"40px 0"}}>
          <div className="ring"/>
          <p style={{fontSize:13,color:"var(--muted)",textAlign:"center",lineHeight:1.6}}>Preparando o devocional de hoje...<br/>Aguarde um momento</p>
        </div>
      )}

      {error && (
        <div style={{background:"rgba(139,26,26,0.07)",border:"1px solid rgba(139,26,26,0.2)",borderRadius:10,padding:"12px 14px",marginBottom:12}}>
          <p style={{fontSize:13,color:"var(--red,#8B1A1A)"}}>{error}</p>
          <button onClick={()=>generate(dayIdx)} style={{marginTop:8,fontSize:12,color:"var(--gold)",background:"none",border:"none",cursor:"pointer",fontWeight:600}}>↺ Tentar novamente</button>
        </div>
      )}

      {dev && !loading && (
        <div style={{animation:"fu 0.5s ease both"}}>
          {/* Versículo */}
          {dev.versiculo && (
            <div style={{background:"var(--surface)",borderLeft:"3px solid var(--gold)",borderRadius:"0 10px 10px 0",padding:"14px 16px",marginBottom:16,fontSize:15,lineHeight:1.8,color:"var(--ink)",fontStyle:"italic"}}>
              "{dev.versiculo}"
            </div>
          )}

          {/* Reflexão com tooltips hebraicos */}
          <div style={{marginBottom:16}}>
            <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--muted)",marginBottom:8}}>Reflexão</div>
            <div style={{fontSize:14,lineHeight:1.9,color:"var(--ink2)"}}>
              {dev.reflexao?.split("\n\n").map((p,i)=>(
                <p key={i} style={{marginBottom:12}}>{renderReflexao(p)}</p>
              ))}
            </div>
            <p style={{fontSize:11,color:"var(--muted)",fontStyle:"italic",marginTop:4}}>
              * Passe o mouse ou toque nas palavras douradas para ver o hebraico/grego original
            </p>
          </div>

          {/* Oração */}
          <div style={{background:"var(--gold-bg)",border:"1px solid var(--gold-border)",borderRadius:12,padding:"14px 16px",marginBottom:14}}>
            <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--gold)",marginBottom:8}}>🙏 Oração do dia</div>
            <div style={{fontSize:13,lineHeight:1.75,color:"var(--ink2)",fontStyle:"italic"}}>{dev.oracao}</div>
          </div>

          {/* Aplicação */}
          <div style={{borderTop:"1px solid var(--border)",paddingTop:12,marginBottom:14}}>
            <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--muted)",marginBottom:6}}>✦ Aplicação do dia</div>
            <div style={{fontSize:14,color:"var(--ink)",fontWeight:500,lineHeight:1.7}}>{dev.aplicacao}</div>
          </div>
        </div>
      )}

      {/* Barra de progresso */}
      {!loading && (
        <>
          <div style={{height:3,background:"var(--border)",borderRadius:2,overflow:"hidden",marginTop:8}}>
            <div style={{height:"100%",background:"var(--gold)",borderRadius:2,width:`${progresso}%`,transition:"width 0.5s ease"}}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"var(--muted)",marginTop:4}}>
            <span>Plano: 365 dias com Deus</span>
            <span>{progresso}% · {dayIdx+1} dias</span>
          </div>
        </>
      )}
    </div>
  );
      }
