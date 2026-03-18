import { useState, useEffect } from "react";

const REFS = [
  {r:"Gênesis 1.1",t:"No princípio era Deus"},{r:"Gênesis 1.26-27",t:"Feitos à imagem de Deus"},
  {r:"Gênesis 2.7",t:"O sopro que nos fez vivos"},{r:"Gênesis 3.15",t:"A primeira promessa do Redentor"},
  {r:"Gênesis 12.1-3",t:"A fé que obedece sem ver"},{r:"Gênesis 15.6",t:"Crer é ser contado como justo"},
  {r:"Gênesis 22.8",t:"Deus proverá o cordeiro"},{r:"Gênesis 28.15",t:"Eu estou contigo"},
  {r:"Gênesis 32.28",t:"Lutando com Deus até a bênção"},{r:"Gênesis 50.20",t:"O mal que homens planejam, Deus usa para o bem"},
  {r:"Êxodo 3.14",t:"EU SOU O QUE SOU"},{r:"Êxodo 12.13",t:"O sangue será o sinal"},
  {r:"Êxodo 14.14",t:"O Senhor combaterá por vós"},{r:"Êxodo 16.4",t:"O pão que vem do céu"},
  {r:"Êxodo 20.3",t:"Nenhum outro deus diante de Mim"},{r:"Êxodo 33.14",t:"A minha presença irá contigo"},
  {r:"Levítico 17.11",t:"A vida está no sangue"},{r:"Números 21.9",t:"A serpente de bronze — Cristo levantado"},
  {r:"Deuteronômio 6.4-5",t:"Amarás o Senhor teu Deus de todo o coração"},{r:"Deuteronômio 8.3",t:"Nem só de pão viverá o homem"},
  {r:"Deuteronômio 18.15",t:"O profeta que há de vir"},{r:"Deuteronômio 31.6",t:"Forte e corajoso — Deus está contigo"},
  {r:"Josué 1.8",t:"Medita na lei dia e noite"},{r:"Josué 24.15",t:"Quanto a mim e à minha casa"},
  {r:"Juízes 6.12",t:"O Senhor está contigo, homem valente"},{r:"Rute 1.16",t:"Onde tu morreres, eu morrerei"},
  {r:"1 Samuel 16.7",t:"O Senhor olha para o coração"},{r:"1 Samuel 17.47",t:"A batalha pertence ao Senhor"},
  {r:"2 Samuel 7.12-13",t:"O trono eterno do filho de Davi"},{r:"1 Reis 18.21",t:"Até quando coxeareis entre dois pensamentos"},
  {r:"1 Reis 19.12",t:"A voz mansa e delicada"},{r:"2 Reis 6.16",t:"Mais são os que estão conosco"},
  {r:"1 Crônicas 16.11",t:"Buscai o Senhor e a sua força"},{r:"2 Crônicas 7.14",t:"Se o meu povo se humilhar e orar"},
  {r:"Esdras 7.10",t:"Coração preparado para buscar a lei de Deus"},{r:"Neemias 8.10",t:"A alegria do Senhor é a vossa força"},
  {r:"Ester 4.14",t:"Para um tempo como este"},{r:"Jó 1.21",t:"O Senhor deu, o Senhor tomou"},
  {r:"Jó 19.25",t:"Eu sei que o meu Redentor vive"},{r:"Jó 38.4",t:"Onde estavas tu quando lancei os fundamentos da terra"},
  {r:"Salmos 1.1-2",t:"Bem-aventurado o homem que medita na lei"},{r:"Salmos 8.4",t:"Que é o homem para que te lembres dele"},
  {r:"Salmos 16.11",t:"Na tua presença há plenitude de alegria"},{r:"Salmos 19.1",t:"Os céus proclamam a glória de Deus"},
  {r:"Salmos 22.1",t:"Deus meu, por que me abandonaste"},{r:"Salmos 23.1",t:"O Senhor é o meu pastor"},
  {r:"Salmos 27.1",t:"O Senhor é a minha luz e salvação"},{r:"Salmos 32.1",t:"Bem-aventurado aquele cujas transgressões são perdoadas"},
  {r:"Salmos 34.18",t:"Perto está o Senhor dos que têm o coração quebrantado"},{r:"Salmos 37.4",t:"Deleita-te no Senhor"},
  {r:"Salmos 42.1",t:"Como o cervo anseia pelas correntes das águas"},{r:"Salmos 46.1",t:"Deus é o nosso refúgio e força"},
  {r:"Salmos 51.10",t:"Cria em mim, ó Deus, um coração puro"},{r:"Salmos 62.5",t:"A minha alma espera só em Deus"},
  {r:"Salmos 63.1",t:"Ó Deus, tu és o meu Deus, eu te busco"},{r:"Salmos 73.25",t:"A quem tenho eu no céu senão a ti"},
  {r:"Salmos 84.10",t:"Melhor é um dia nos teus átrios"},{r:"Salmos 90.12",t:"Ensina-nos a contar os nossos dias"},
  {r:"Salmos 91.1",t:"Aquele que habita no esconderijo do Altíssimo"},{r:"Salmos 103.12",t:"Removeu de nós as nossas transgressões"},
  {r:"Salmos 110.1",t:"O Senhor disse ao meu Senhor"},{r:"Salmos 119.11",t:"Escondi as tuas palavras no meu coração"},
  {r:"Salmos 121.1-2",t:"O meu socorro vem do Senhor"},{r:"Salmos 130.3-4",t:"Se guardares as iniquidades, quem subsistirá"},
  {r:"Salmos 139.13-14",t:"Formidavelmente maravilhoso sou feito"},{r:"Salmos 145.18",t:"Perto está o Senhor de todos os que o invocam"},
  {r:"Provérbios 3.5-6",t:"Confia no Senhor de todo o teu coração"},{r:"Provérbios 4.23",t:"Guarda o teu coração mais do que tudo"},
  {r:"Provérbios 16.9",t:"O coração do homem traça o seu caminho"},{r:"Eclesiastes 3.11",t:"Ele fez tudo belo no seu tempo"},
  {r:"Eclesiastes 12.13",t:"Teme a Deus e guarda os seus mandamentos"},{r:"Cantares 2.16",t:"O meu amado é meu e eu sou dele"},
  {r:"Isaías 6.3",t:"Santo, santo, santo é o Senhor dos Exércitos"},{r:"Isaías 6.8",t:"Aqui estou eu, envia-me"},
  {r:"Isaías 7.14",t:"Uma virgem conceberá — Emanuel"},{r:"Isaías 9.6",t:"Um menino nos nasceu, um filho nos foi dado"},
  {r:"Isaías 40.28-29",t:"O eterno Deus não se cansa nem se fatiga"},{r:"Isaías 40.31",t:"Os que esperam no Senhor renovam as forças"},
  {r:"Isaías 41.10",t:"Não temas, porque eu sou contigo"},{r:"Isaías 43.1",t:"Eu te resgatei, és meu"},
  {r:"Isaías 43.25",t:"Eu mesmo apago as tuas transgressões"},{r:"Isaías 46.4",t:"Até a velhice eu serei o mesmo"},
  {r:"Isaías 49.15-16",t:"Gravei-te nas palmas das minhas mãos"},{r:"Isaías 53.3",t:"Desprezado e rejeitado pelos homens"},
  {r:"Isaías 53.5",t:"Ele foi ferido pelas nossas transgressões"},{r:"Isaías 53.6",t:"Todos nós como ovelhas nos desviamos"},
  {r:"Isaías 55.1",t:"Vinde, comprai sem dinheiro e sem preço"},{r:"Isaías 55.8-9",t:"Os meus pensamentos não são os vossos pensamentos"},
  {r:"Isaías 61.1-2",t:"O Espírito do Senhor está sobre mim"},{r:"Jeremias 1.5",t:"Antes de te formar no ventre te conheci"},
  {r:"Jeremias 17.9",t:"Enganoso é o coração, mais do que tudo"},{r:"Jeremias 29.11",t:"Eu sei os planos que tenho para vocês"},
  {r:"Jeremias 31.31-33",t:"O novo pacto escrito no coração"},{r:"Lamentações 3.22-23",t:"As misericórdias do Senhor se renovam cada manhã"},
  {r:"Ezequiel 36.26",t:"Darei um coração novo e um espírito novo"},{r:"Ezequiel 37.5",t:"Farei entrar sopro em vós e vivereis"},
  {r:"Daniel 3.17-18",t:"Nosso Deus pode nos livrar — e mesmo que não"},{r:"Daniel 6.10",t:"Daniel orou três vezes ao dia"},
  {r:"Oseias 6.6",t:"Quero misericórdia e não sacrifício"},{r:"Joel 2.28",t:"Derramarei o meu Espírito sobre toda a carne"},
  {r:"Amós 5.24",t:"Corra o direito como as águas"},{r:"Jonas 2.9",t:"A salvação pertence ao Senhor"},
  {r:"Miquéias 5.2",t:"De Belém sairá o que governará Israel"},{r:"Miquéias 6.8",t:"Pratica a justiça, ama a misericórdia"},
  {r:"Habacuque 2.4",t:"O justo viverá pela sua fé"},{r:"Sofonias 3.17",t:"O Senhor teu Deus está no meio de ti"},
  {r:"Ageu 2.7",t:"O desejado de todas as nações virá"},{r:"Zacarias 9.9",t:"O teu rei vem a ti, justo e salvador"},
  {r:"Zacarias 12.10",t:"Olharão para mim, a quem traspassaram"},{r:"Malaquias 3.1",t:"Eis que envio o meu mensageiro"},
  {r:"Malaquias 4.2",t:"O sol da justiça nascerá com cura nas asas"},{r:"Mateus 1.21",t:"Ele salvará o seu povo dos seus pecados"},
  {r:"Mateus 3.17",t:"Este é o meu Filho amado"},{r:"Mateus 4.4",t:"Nem só de pão viverá o homem"},
  {r:"Mateus 5.3",t:"Bem-aventurados os pobres de espírito"},{r:"Mateus 5.8",t:"Bem-aventurados os puros de coração"},
  {r:"Mateus 6.9-10",t:"Pai nosso que estás no céu"},{r:"Mateus 6.33",t:"Buscai primeiro o reino de Deus"},
  {r:"Mateus 7.7",t:"Pedi e dar-se-vos-á"},{r:"Mateus 11.28",t:"Vinde a mim todos os que estais cansados"},
  {r:"Mateus 16.16",t:"Tu és o Cristo, o Filho do Deus vivo"},{r:"Mateus 16.24",t:"Tome a sua cruz e siga-me"},
  {r:"Mateus 22.37-39",t:"Amarás o Senhor teu Deus — e ao próximo"},{r:"Mateus 26.28",t:"O meu sangue do novo pacto"},
  {r:"Mateus 28.18-20",t:"Toda a autoridade me foi dada — ide"},{r:"Marcos 1.15",t:"O reino de Deus está próximo — arrependei-vos"},
  {r:"Marcos 8.36",t:"Que aproveita ao homem ganhar o mundo"},{r:"Marcos 10.45",t:"Para servir e dar a sua vida em resgate"},
  {r:"Lucas 1.37",t:"Para Deus nada é impossível"},{r:"Lucas 2.11",t:"Nasceu o Salvador, que é Cristo o Senhor"},
  {r:"Lucas 4.18",t:"O Espírito do Senhor está sobre mim"},{r:"Lucas 7.47",t:"Perdoados são muito, muito amam"},
  {r:"Lucas 9.23",t:"Tome a sua cruz e siga-me cada dia"},{r:"Lucas 15.4",t:"A ovelha perdida — ele vai atrás"},
  {r:"Lucas 15.20",t:"Quando ainda estava longe, o pai o viu"},{r:"Lucas 15.24",t:"Este meu filho estava morto e reviveu"},
  {r:"Lucas 19.10",t:"O Filho do Homem veio buscar e salvar o perdido"},{r:"Lucas 23.34",t:"Pai, perdoa-lhes, porque não sabem o que fazem"},
  {r:"Lucas 24.27",t:"Interpretou em todas as Escrituras o que dizia respeito a ele"},{r:"João 1.1",t:"No princípio era o Verbo"},
  {r:"João 1.14",t:"O Verbo se fez carne e habitou entre nós"},{r:"João 1.29",t:"Eis o Cordeiro de Deus que tira o pecado do mundo"},
  {r:"João 3.3",t:"Importa nascer de novo"},{r:"João 3.16",t:"Porque Deus amou o mundo de tal maneira"},
  {r:"João 3.30",t:"É necessário que ele cresça e eu diminua"},{r:"João 4.14",t:"A água que eu der será fonte de vida eterna"},
  {r:"João 6.35",t:"Eu sou o pão da vida"},{r:"João 6.44",t:"Ninguém pode vir a mim se o Pai não o trouxer"},
  {r:"João 8.12",t:"Eu sou a luz do mundo"},{r:"João 8.32",t:"A verdade vos libertará"},
  {r:"João 8.36",t:"Se o Filho vos libertar, sereis verdadeiramente livres"},{r:"João 10.10",t:"Eu vim para que tenham vida em abundância"},
  {r:"João 10.11",t:"Eu sou o bom pastor — dou a vida pelas ovelhas"},{r:"João 10.27-28",t:"As minhas ovelhas ouvem a minha voz"},
  {r:"João 11.25",t:"Eu sou a ressurreição e a vida"},{r:"João 13.34",t:"Amai-vos uns aos outros como eu vos amei"},
  {r:"João 14.1",t:"Não se turbe o vosso coração"},{r:"João 14.6",t:"Eu sou o caminho, a verdade e a vida"},
  {r:"João 14.16",t:"Eu rogarei ao Pai e ele vos dará outro Consolador"},{r:"João 14.27",t:"Deixo-vos a paz — a minha paz vos dou"},
  {r:"João 15.1",t:"Eu sou a videira verdadeira"},{r:"João 15.5",t:"Separados de mim nada podeis fazer"},
  {r:"João 15.13",t:"Maior amor do que este ninguém tem"},{r:"João 16.33",t:"Neste mundo tereis tribulações — mas tende bom ânimo"},
  {r:"João 17.3",t:"A vida eterna é conhecer-te a ti"},{r:"João 19.30",t:"Está consumado"},
  {r:"João 20.28",t:"Senhor meu e Deus meu"},{r:"João 21.17",t:"Tu sabes tudo — tu sabes que te amo"},
  {r:"Atos 1.8",t:"Recebereis poder quando o Espírito Santo vier"},{r:"Atos 2.38",t:"Arrependei-vos e sede batizados"},
  {r:"Atos 4.12",t:"Em nenhum outro há salvação"},{r:"Atos 9.4",t:"Saulo, Saulo, por que me persegues"},
  {r:"Atos 16.31",t:"Crê no Senhor Jesus e serás salvo"},{r:"Romanos 1.16",t:"Não me envergonho do evangelho de Cristo"},
  {r:"Romanos 1.17",t:"O justo viverá pela fé"},{r:"Romanos 3.23",t:"Todos pecaram e carecem da glória de Deus"},
  {r:"Romanos 3.24",t:"Sendo justificados gratuitamente pela sua graça"},{r:"Romanos 5.1",t:"Justificados pela fé, temos paz com Deus"},
  {r:"Romanos 5.8",t:"Deus prova o seu amor para conosco"},{r:"Romanos 6.4",t:"Sepultados com ele pelo batismo na morte"},
  {r:"Romanos 6.23",t:"O salário do pecado é a morte — mas o dom de Deus"},{r:"Romanos 8.1",t:"Nenhuma condenação há para os que estão em Cristo"},
  {r:"Romanos 8.11",t:"O Espírito que ressuscitou Jesus habita em vós"},{r:"Romanos 8.15",t:"Não recebestes espírito de escravidão — mas de adoção"},
  {r:"Romanos 8.28",t:"Todas as coisas contribuem para o bem dos que amam a Deus"},{r:"Romanos 8.31",t:"Se Deus é por nós, quem será contra nós"},
  {r:"Romanos 8.35",t:"Quem nos separará do amor de Cristo"},{r:"Romanos 8.38-39",t:"Nada nos separará do amor de Deus"},
  {r:"Romanos 10.9",t:"Se confessares com a tua boca que Jesus é Senhor"},{r:"Romanos 12.1",t:"Apresentai os vossos corpos como sacrifício vivo"},
  {r:"Romanos 12.2",t:"Não vos conformeis com este século"},{r:"1 Coríntios 1.18",t:"A palavra da cruz é loucura para os que perecem"},
  {r:"1 Coríntios 1.30",t:"Cristo Jesus é para nós sabedoria e justiça"},{r:"1 Coríntios 6.19-20",t:"O vosso corpo é templo do Espírito Santo"},
  {r:"1 Coríntios 10.13",t:"Não vos sobreveio tentação que não fosse humana"},{r:"1 Coríntios 13.4-7",t:"O amor é sofredor, é benigno"},
  {r:"1 Coríntios 15.3-4",t:"Cristo morreu pelos nossos pecados e ressuscitou"},{r:"1 Coríntios 15.55",t:"Onde está, ó morte, o teu aguilhão"},
  {r:"2 Coríntios 3.18",t:"Transformados de glória em glória"},{r:"2 Coríntios 4.7",t:"Temos este tesouro em vasos de barro"},
  {r:"2 Coríntios 4.17",t:"A nossa leve e momentânea tribulação"},{r:"2 Coríntios 5.17",t:"Se alguém está em Cristo, é uma nova criatura"},
  {r:"2 Coríntios 5.21",t:"Aquele que não conheceu pecado, por nós foi feito pecado"},{r:"2 Coríntios 12.9",t:"A minha graça te é suficiente"},
  {r:"Gálatas 2.20",t:"Já não sou eu que vivo, mas Cristo vive em mim"},{r:"Gálatas 3.13",t:"Cristo nos resgatou da maldição da lei"},
  {r:"Gálatas 3.26",t:"Todos sois filhos de Deus mediante a fé"},{r:"Gálatas 4.4-5",t:"Deus enviou o seu Filho para nos resgatar"},
  {r:"Gálatas 5.1",t:"Para a liberdade foi que Cristo nos libertou"},{r:"Gálatas 5.22-23",t:"O fruto do Espírito é amor, alegria, paz"},
  {r:"Efésios 1.3",t:"Nos abençoou com toda espiritual bênção"},{r:"Efésios 1.4",t:"Nos elegeu nele antes da fundação do mundo"},
  {r:"Efésios 1.7",t:"Nele temos a redenção pelo seu sangue"},{r:"Efésios 2.4-5",t:"Deus, sendo rico em misericórdia, nos vivificou"},
  {r:"Efésios 2.8-9",t:"Pela graça sois salvos mediante a fé"},{r:"Efésios 2.10",t:"Somos sua obra — criados para boas obras"},
  {r:"Efésios 3.17-19",t:"Que Cristo habite no vosso coração pela fé"},{r:"Efésios 3.20",t:"Aquele que pode fazer muito mais"},
  {r:"Efésios 4.22-24",t:"Renovai-vos no espírito da vossa mente"},{r:"Efésios 6.10",t:"Fortalecei-vos no Senhor e no poder da sua força"},
  {r:"Filipenses 1.6",t:"Aquele que começou a boa obra a completará"},{r:"Filipenses 1.21",t:"Para mim o viver é Cristo e o morrer é ganho"},
  {r:"Filipenses 2.5-8",t:"Tende em vós o mesmo sentimento de Cristo Jesus"},{r:"Filipenses 2.9-11",t:"Deus o exaltou soberanamente"},
  {r:"Filipenses 3.8",t:"Tudo considero perda por amor a Cristo"},{r:"Filipenses 4.4",t:"Regozijai-vos no Senhor sempre"},
  {r:"Filipenses 4.6-7",t:"Em nada estejais ansiosos"},{r:"Filipenses 4.11",t:"Aprendi a estar contente em todo estado"},
  {r:"Filipenses 4.13",t:"Tudo posso naquele que me fortalece"},{r:"Colossenses 1.15",t:"Ele é a imagem do Deus invisível"},
  {r:"Colossenses 1.17",t:"Nele tudo subsiste"},{r:"Colossenses 2.3",t:"Nele estão escondidos todos os tesouros da sabedoria"},
  {r:"Colossenses 3.3",t:"A vossa vida está escondida com Cristo em Deus"},{r:"1 Tessalonicenses 5.16-18",t:"Regozijai-vos sempre — orai sem cessar"},
  {r:"2 Tessalonicenses 3.3",t:"O Senhor é fiel e vos confirmará"},{r:"1 Timóteo 1.15",t:"Cristo Jesus veio ao mundo para salvar os pecadores"},
  {r:"2 Timóteo 1.7",t:"Deus não nos deu espírito de covardia"},{r:"2 Timóteo 3.16",t:"Toda Escritura é divinamente inspirada"},
  {r:"2 Timóteo 4.7",t:"Combati o bom combate, acabei a carreira"},{r:"Tito 3.5",t:"Nos salvou não por obras, mas pela sua misericórdia"},
  {r:"Filemom 1.16",t:"Não mais como escravo, mas como irmão amado"},{r:"Hebreus 1.1-2",t:"Deus nos falou pelo Filho"},
  {r:"Hebreus 1.3",t:"O resplendor da glória e a imagem exata de Deus"},{r:"Hebreus 4.12",t:"A palavra de Deus é viva e eficaz"},
  {r:"Hebreus 4.15",t:"Um sumo sacerdote que pode compadecer-se"},{r:"Hebreus 4.16",t:"Cheguemos com confiança ao trono da graça"},
  {r:"Hebreus 7.25",t:"Ele pode salvar totalmente os que se aproximam de Deus"},{r:"Hebreus 10.14",t:"Com uma só oferta aperfeiçoou para sempre"},
  {r:"Hebreus 11.1",t:"A fé é a certeza do que se espera"},{r:"Hebreus 12.1-2",t:"Corramos com perseverança — fixando os olhos em Jesus"},
  {r:"Hebreus 12.6",t:"O Senhor disciplina aquele a quem ama"},{r:"Hebreus 13.5",t:"Nunca te deixarei, nunca te abandonarei"},
  {r:"Tiago 1.2-3",t:"Considerai motivo de alegria as tribulações"},{r:"Tiago 1.17",t:"Todo bom dom vem do Pai das luzes"},
  {r:"Tiago 4.8",t:"Chegai-vos a Deus e ele se chegará a vós"},{r:"Tiago 5.16",t:"A oração eficaz do justo pode muito"},
  {r:"1 Pedro 1.3",t:"Regenerou-nos para uma viva esperança"},{r:"1 Pedro 1.18-19",t:"Resgatados com o precioso sangue de Cristo"},
  {r:"1 Pedro 2.9",t:"Vós sois a geração eleita, sacerdócio real"},{r:"1 Pedro 2.24",t:"Pelas suas feridas fostes sarados"},
  {r:"1 Pedro 5.7",t:"Lançai sobre ele toda a vossa ansiedade"},{r:"2 Pedro 1.3",t:"O poder de Deus nos deu tudo para a vida e a piedade"},
  {r:"2 Pedro 3.9",t:"Não quer que nenhum pereça"},{r:"1 João 1.9",t:"Se confessarmos os nossos pecados, ele é fiel e justo"},
  {r:"1 João 3.1",t:"Vede que amor o Pai nos deu"},{r:"1 João 4.9",t:"Deus enviou o seu unigênito ao mundo"},
  {r:"1 João 4.10",t:"Não que nós tenhamos amado a Deus — mas ele nos amou"},{r:"1 João 4.19",t:"Nós amamos porque ele nos amou primeiro"},
  {r:"1 João 5.11-12",t:"Deus nos deu vida eterna e essa vida está no Filho"},{r:"2 João 1.6",t:"Andar conforme os mandamentos — este é o amor"},
  {r:"3 João 1.4",t:"Não tenho maior alegria do que ouvir que meus filhos andam na verdade"},{r:"Judas 1.24",t:"Àquele que é poderoso para vos guardar sem tropeço"},
  {r:"Apocalipse 1.8",t:"Eu sou o Alfa e o Ômega"},{r:"Apocalipse 1.17-18",t:"Sou o primeiro e o último — vivo para sempre"},
  {r:"Apocalipse 3.20",t:"Eis que estou à porta e bato"},{r:"Apocalipse 4.11",t:"Digno és, Senhor e Deus nosso"},
  {r:"Apocalipse 5.9",t:"Digno és de tomar o livro — foste morto"},{r:"Apocalipse 7.9",t:"Uma grande multidão que ninguém podia contar"},
  {r:"Apocalipse 12.11",t:"Venceram-no pelo sangue do Cordeiro"},{r:"Apocalipse 19.16",t:"Rei dos reis e Senhor dos senhores"},
  {r:"Apocalipse 21.3-4",t:"O tabernáculo de Deus está com os homens"},{r:"Apocalipse 21.5",t:"Eis que faço novas todas as coisas"},
  {r:"Apocalipse 22.4",t:"Verão a sua face"},{r:"Apocalipse 22.13",t:"Eu sou o Alfa e o Ômega, o primeiro e o último"},
  {r:"Apocalipse 22.20",t:"Certamente venho sem demora — Amém, vem Senhor Jesus"},
];

const HEBREW = {
  "shalom":{heb:"שָׁלוֹם",trans:"shalom",strong:"H7965",def:"Paz perfeita, inteireza e bem-estar completo — vai muito além de ausência de conflito; é a realidade de estar completamente inteiro em Deus"},
  "chesed":{heb:"חֶסֶד",trans:"chesed",strong:"H2617",def:"Amor leal e inabalável do pacto — amor que não desiste jamais, mesmo quando o outro é infiel. É a misericórdia que só Deus possui"},
  "emunah":{heb:"אֱמוּנָה",trans:"emunah",strong:"H530",def:"Fidelidade, firmeza, confiabilidade absoluta — a raiz da qual vem a palavra 'amém'. É a fé como postura de vida, não apenas crença intelectual"},
  "bara":{heb:"בָּרָא",trans:"bara",strong:"H1254",def:"Criar do absoluto nada — este verbo no hebraico aparece EXCLUSIVAMENTE com Deus como sujeito. Nenhum ser humano jamais 'bara'. Só Deus cria do nada"},
  "ruach":{heb:"רוּחַ",trans:"ruach",strong:"H7307",def:"Espírito, vento, sopro — o mesmo Espírito que pairava sobre as águas no início da criação e que hoje age em cada nova criação em Cristo"},
  "elohim":{heb:"אֱלֹהִים",trans:"Elohim",strong:"H430",def:"Plural de majestade — o Deus poderoso e soberano. Este plural misterioso já aponta para a riqueza da revelação trinitária que ainda viria"},
  "yahweh":{heb:"יְהוָה",trans:"YHWH",strong:"H3068",def:"Nome próprio e pessoal de Deus — EU SOU O QUE SOU. O Ser eterno, autoexistente, que sempre foi, é e será. Tão sagrado que os judeus não o pronunciavam"},
  "kaphar":{heb:"כָּפַר",trans:"kaphar",strong:"H3722",def:"Cobrir, expiar, fazer propiciação — raiz de 'Yom Kippur' (Dia da Expiação). A ideia é de cobrir o pecado com sangue para que Deus não o veja"},
  "yeshua":{heb:"יֵשׁוּעַ",trans:"Yeshua",strong:"H3442",def:"Salvação, libertação, redenção — este é o nome de Jesus em hebraico. Cada vez que alguém chamava 'Jesus', estava proclamando: 'YHWH salva'"},
  "emet":{heb:"אֱמֶת",trans:"emet",strong:"H571",def:"Verdade sólida como rocha, fidelidade inabalável — não é apenas informação correta, mas realidade que sustenta tudo. A verdade de Deus é o fundamento do universo"},
  "ahavah":{heb:"אַהֲבָה",trans:"ahavah",strong:"H0160",def:"Amor profundo, íntimo, escolhido pela vontade — diferente de emoção passageira, é amor que se decide. O amor de Deus por você foi uma escolha soberana e eterna"},
  "nephesh":{heb:"נֶפֶשׁ",trans:"nephesh",strong:"H5315",def:"Alma, ser vivo, vida — toda a pessoa integrada: corpo, mente e espírito. Quando Deus ama sua nephesh, ele ama o ser completo que você é"},
  "dabar":{heb:"דָּבָר",trans:"dabar",strong:"H1697",def:"Palavra, coisa, evento — no hebraico, a palavra de Deus não é apenas comunicação, ela CRIA e SUSTENTA a realidade. O universo existe porque Deus falou"},
  "tsaddiq":{heb:"צַדִּיק",trans:"tsaddiq",strong:"H6662",def:"Justo, reto — aquele que é declarado justo por Deus, não por méritos próprios. Cristo é o único tsaddiq perfeito, e sua justiça nos é imputada gratuitamente"},
  "racham":{heb:"רַחַם",trans:"racham",strong:"H7355",def:"Misericórdia visceral, compaixão profunda — vem da mesma raiz de 'ventre materno' (rechem). É o amor que uma mãe tem pelo filho que carregou no ventre"},
  "qadosh":{heb:"קָדוֹשׁ",trans:"qadosh",strong:"H6918",def:"Santo, separado, completamente outro — Deus é qadosh de uma forma que nenhum ser criado jamais será. Sua santidade não é apenas perfeição moral, é uma categoria de existência única"},
  "berith":{heb:"בְּרִית",trans:"berith",strong:"H1285",def:"Aliança, pacto sagrado — no mundo antigo, um berith era um compromisso de vida ou morte. Deus fez um berith com você em Cristo, selado com o seu próprio sangue"},
  "hesed":{heb:"חֶסֶד",trans:"hesed",strong:"H2617",def:"Amor inabalável do pacto — amor que permanece fiel mesmo quando o outro é infiel. Este é o amor que Deus tem por você: incondicional, eterno, inabalável"},
  "lev":{heb:"לֵב",trans:"lev",strong:"H3820",def:"Coração — no hebraico, o lev é o centro de toda a personalidade: mente, vontade, emoções e escolhas. Quando Deus pede seu coração, ele quer tudo que você é"},
  "shub":{heb:"שׁוּב",trans:"shub",strong:"H7725",def:"Retornar, arrepender-se — não é apenas sentir culpa, mas uma virada completa de direção. Shub é voltar-se inteiramente para Deus, como o filho pródigo que 'caiu em si' e voltou para casa"},
};

function HebrewWord({ word }) {
  const [open, setOpen] = useState(false);
  const d = HEBREW[word.toLowerCase()];
  if (!d) return <span style={{fontStyle:"italic",color:"var(--gold)"}}>{word}</span>;
  return (
    <span style={{position:"relative",display:"inline"}}>
      <span
        onClick={()=>setOpen(o=>!o)}
        style={{fontStyle:"italic",color:"var(--gold)",borderBottom:"1.5px dotted var(--gold)",cursor:"pointer",fontWeight:500}}
        title="Clique para ver o hebraico original"
      >{word}</span>
      {open && (
        <span style={{
          position:"fixed",
          top:"50%",left:"50%",
          transform:"translate(-50%,-50%)",
          width:300,
          background:"var(--white,#fff)",
          border:"1.5px solid var(--gold-border,rgba(184,145,42,0.35))",
          borderRadius:14,
          padding:"16px 18px",
          zIndex:99999,
          boxShadow:"0 12px 48px rgba(0,0,0,0.18)",
        }}>
          <span style={{display:"block",fontSize:32,fontFamily:"serif",direction:"rtl",textAlign:"center",color:"var(--ink,#17160F)",marginBottom:8,lineHeight:1.3}}>{d.heb}</span>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <span style={{fontSize:13,fontStyle:"italic",fontWeight:600,color:"var(--gold,#B8912A)"}}>{d.trans}</span>
            <span style={{fontSize:11,fontWeight:700,background:"rgba(184,145,42,0.12)",color:"#B8912A",padding:"2px 8px",borderRadius:6}}>{d.strong}</span>
          </div>
          <div style={{fontSize:13,color:"var(--ink2,#3D3C35)",lineHeight:1.7,borderTop:"1px solid var(--border,#E5E4DC)",paddingTop:10,marginBottom:10}}>{d.def}</div>
          <button onClick={()=>setOpen(false)} style={{width:"100%",padding:"8px",border:"1px solid var(--border,#E5E4DC)",borderRadius:8,background:"none",color:"var(--muted,#8A8980)",fontSize:12,cursor:"pointer"}}>Fechar</button>
        </span>
      )}
      {open && <span onClick={()=>setOpen(false)} style={{position:"fixed",inset:0,zIndex:99998,background:"rgba(0,0,0,0.25)"}}/>}
    </span>
  );
}

function renderText(text) {
  if (!text) return null;
  const keys = Object.keys(HEBREW);
  const parts = [];
  let rem = text, k = 0;
  while (rem.length > 0) {
    let earliest = -1, mw = null;
    for (const w of keys) {
      const re = new RegExp("\\b" + w + "\\b", "i");
      const m = rem.search(re);
      if (m !== -1 && (earliest === -1 || m < earliest)) { earliest = m; mw = w; }
    }
    if (earliest === -1) { parts.push(<span key={k++}>{rem}</span>); break; }
    if (earliest > 0) parts.push(<span key={k++}>{rem.slice(0, earliest)}</span>);
    parts.push(<HebrewWord key={k++} word={mw} />);
    rem = rem.slice(earliest + mw.length);
  }
  return parts;
}

function getDateFromIndex(idx) {
  const d = new Date(new Date().getFullYear(), 0, 1 + idx);
  return d.toLocaleDateString("pt-BR", {day:"2-digit",month:"2-digit",year:"2-digit"});
}

function getTodayIndex() {
  const now = new Date();
  return Math.floor((now - new Date(now.getFullYear(),0,0)) / 86400000) - 1;
}

const PS = `Você é um pastor-teólogo cristocêntrico de profundidade extraordinária. Estilo: exegese profunda de Renan Belas + fogo profético de Raik Carmelo + clareza de Luciano Subirá.

MISSÃO: Devocional que transforma vidas — profundo, bíblico, que acerta o coração.

REGRAS:
+ Cristo é sempre o centro e a resposta de tudo
+ Use NVI
+ Inclua ao menos UMA palavra hebraica-chave no texto (em minúsculas itálico): shalom, chesed, emunah, bara, ruach, elohim, yahweh, kaphar, yeshua, emet, ahavah, nephesh, dabar, tsaddiq, racham, qadosh, berith, hesed, lev, shub
+ Reflexão com 3 parágrafos profundos — cada um revelando uma faceta de Deus ou de Cristo
+ Linguagem do coração, não acadêmica
+ Frases que param o coração e ficam gravadas na alma
+ Aplicação prática e desafiadora

FORMATO JSON EXATO (sem markdown):
{"titulo":"título impactante","versiculo":"texto completo NVI","reflexao":"parágrafo1\n\nparágrafo2\n\nparágrafo3","aplicacao":"aplicação desafiadora do dia","oracao":"oração íntima e profunda"}`;

export default function Devocional() {
  const todayIdx = getTodayIndex();
  const [dayIdx, setDayIdx] = useState(todayIdx);
  const [devo, setDevo] = useState(null);
  const [loading, setLoading] = useState(false);

  const cacheKey = idx => `devo-${new Date().getFullYear()}-${idx}`;

  async function load(idx) {
    const cached = localStorage.getItem(cacheKey(idx));
    if (cached) { try { setDevo(JSON.parse(cached)); return; } catch {} }
    setDevo(null); setLoading(true);
    try {
      const ref = REFS[idx % REFS.length];
      const res = await fetch("/api/chat", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000, system:PS,
          messages:[{role:"user",content:`Crie o devocional do DIA ${idx+1} com base em ${ref.r} ("${ref.t}"). Retorne APENAS JSON válido, sem markdown.`}]
        }),
      });
      const data = await res.json();
      const raw = data.content?.[0]?.text || "";
      const parsed = JSON.parse(raw.replace(/\`\`\`json|\`\`\`/g,"").trim());
      parsed.ref = ref.r;
      localStorage.setItem(cacheKey(idx), JSON.stringify(parsed));
      setDevo(parsed);
    } catch(e) { setDevo({erro:true}); }
    setLoading(false);
  }

  useEffect(() => { load(dayIdx); }, [dayIdx]);

  // Virar automaticamente à meia-noite
  useEffect(() => {
    const now = new Date();
    const ms = new Date(now.getFullYear(),now.getMonth(),now.getDate()+1) - now;
    const t = setTimeout(() => setDayIdx(getTodayIndex()), ms);
    return () => clearTimeout(t);
  }, []);

  const isToday = dayIdx === todayIdx;
  const prog = Math.round(((dayIdx+1)/365)*100);
  const ref = REFS[dayIdx % REFS.length];

  return (
    <div style={{padding:"0 4px"}}>

      {/* Navegação */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
        <button onClick={()=>setDayIdx(d=>Math.max(0,d-1))} disabled={dayIdx===0}
          style={{width:38,height:38,borderRadius:"50%",border:"1.5px solid var(--border)",background:"none",cursor:dayIdx===0?"not-allowed":"pointer",fontSize:18,color:"var(--ink)",display:"flex",alignItems:"center",justifyContent:"center",opacity:dayIdx===0?0.25:1,flexShrink:0}}>
          ←
        </button>
        <div style={{textAlign:"center",flex:1,padding:"0 8px"}}>
          <div style={{fontSize:11,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--muted)",marginBottom:2}}>
            {getDateFromIndex(dayIdx)}{isToday?" · Hoje":""}
          </div>
          <div style={{fontSize:14,fontWeight:600,color:"var(--gold)"}}>Dia {dayIdx+1} de 365</div>
        </div>
        <button onClick={()=>setDayIdx(d=>Math.min(364,d+1))} disabled={dayIdx===364}
          style={{width:38,height:38,borderRadius:"50%",border:"1.5px solid var(--border)",background:"none",cursor:dayIdx===364?"not-allowed":"pointer",fontSize:18,color:"var(--ink)",display:"flex",alignItems:"center",justifyContent:"center",opacity:dayIdx===364?0.25:1,flexShrink:0}}>
          →
        </button>
      </div>

      {/* Barra de progresso */}
      <div style={{height:3,background:"var(--border)",borderRadius:2,marginBottom:16,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${prog}%`,background:"var(--gold)",borderRadius:2,transition:"width 0.5s"}}/>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12,padding:"48px 0",textAlign:"center"}}>
          <div className="ring"/>
          <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.6,maxWidth:240}}>
            Preparando o devocional do dia {dayIdx+1}...<br/>
            <span style={{fontSize:11,opacity:0.7}}>{ref.r} — {ref.t}</span>
          </p>
        </div>
      )}

      {/* Conteúdo */}
      {!loading && devo && !devo.erro && (
        <div style={{animation:"fi 0.5s ease both"}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--gold)",marginBottom:4}}>{devo.ref}</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:27,fontWeight:700,color:"var(--ink)",lineHeight:1.2,marginBottom:14}}>{devo.titulo}</div>

          {/* Versículo */}
          <div style={{background:"var(--surface)",borderLeft:"3px solid var(--gold)",borderRadius:"0 10px 10px 0",padding:"13px 16px",marginBottom:14,fontSize:15,lineHeight:1.8,color:"var(--ink)",fontStyle:"italic"}}>
            "{devo.versiculo}"
          </div>

          {/* Reflexão */}
          <div style={{fontSize:14,lineHeight:1.95,color:"var(--ink2)",marginBottom:12}}>
            {devo.reflexao?.split("\n\n").map((p,i)=>(
              <p key={i} style={{marginBottom:12}}>{renderText(p)}</p>
            ))}
          </div>

          {/* Dica hebraico */}
          <div style={{fontSize:11,color:"var(--muted)",fontStyle:"italic",marginBottom:14,padding:"7px 12px",background:"var(--gold-bg)",borderRadius:8,border:"1px solid var(--gold-border)"}}>
            ✦ As palavras em <span style={{color:"var(--gold)",fontWeight:600}}>itálico dourado</span> são termos hebraicos originais — clique para ver o significado real
          </div>

          {/* Aplicação */}
          <div style={{background:"var(--surface)",borderRadius:10,padding:"13px 16px",marginBottom:14,border:"1px solid var(--border)"}}>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--gold)",marginBottom:7}}>✦ Aplicação do dia</div>
            <div style={{fontSize:14,lineHeight:1.7,color:"var(--ink)",fontWeight:500}}>{devo.aplicacao}</div>
          </div>

          {/* Oração */}
          <div style={{background:"var(--gold-bg)",border:"1px solid var(--gold-border)",borderRadius:10,padding:"14px 16px",marginBottom:14}}>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--gold)",marginBottom:8}}>🙏 Oração</div>
            <div style={{fontSize:14,lineHeight:1.85,color:"var(--ink2)",fontStyle:"italic"}}>{renderText(devo.oracao)}</div>
          </div>

          {/* Botão próximo dia */}
          {isToday && dayIdx < 364 && (
            <button onClick={()=>setDayIdx(d=>d+1)}
              style={{width:"100%",padding:"10px",border:"1.5px solid var(--border)",borderRadius:10,background:"none",color:"var(--muted)",fontSize:13,cursor:"pointer",marginTop:4}}>
              Adiantar devocional de amanhã →
            </button>
          )}
        </div>
      )}

      {!loading && devo?.erro && (
        <div style={{fontSize:13,color:"var(--red,#8B1A1A)",padding:"24px 0",textAlign:"center"}}>
          Erro ao gerar. Verifique sua conexão e tente novamente.
        </div>
      )}
    </div>
  );
}
