import type { ReactNode } from 'react';

/* ================================================================
   CONTEÚDO DAS DUAS PÁGINAS — edite aqui.
   Pendências marcadas (preencher quando o livro e a Cakto existirem):
   - N: número de receitas de cada livro
   - links: checkouts da Cakto (essencial e completa)
   - img: fotos reais (enquanto vazias, aparece um espaço marcado)
   ================================================================ */

export type Img = { src?: string; legenda: string };
export type Bonus = { titulo: string; itens: string[]; valor: string; img: Img };
export type Plano = {
  tag: string; nome: string; features: string[];
  bonus?: string[]; bonusFaltando?: string[];
  de: string; por: string; link: string; destaque?: boolean;
};

export type Produto = {
  nomeCurto: string;
  promo: string[];
  hero: { titulo: ReactNode; subtitulo: string; botao: string; abaixo: ReactNode; seloMeio: string; seloBaixo: string; banner: Img; figura: string };
  beneficios: { titulo: ReactNode; itens: { t: string; d: string }[] };
  verde: { titulo: ReactNode; texto: string; lista: string[]; img: Img };
  capitulos: { titulo: ReactNode; texto: string; itens: { t: string; s: string }[]; galeria: string };
  bonus: { titulo: ReactNode; itens: Bonus[] };
  planos: Plano[];
  porDentro: { titulo: ReactNode; paginas: Img[]; botao: string };
  faq: { q: string; a: string }[];
  rodape: { titulo: ReactNode; aviso?: string };
  sticky: string;
};

const N = '[N]'; // ← número de receitas
const LINK_ESSENCIAL = '#LINK_ESSENCIAL';
const LINK_COMPLETA = '#LINK_COMPLETA';

/* ---------------------------------------------------------------- */
/* PRODUTO 1 — POUCA COMIDA, MUITA PROTEÍNA (canetinha)             */
/* ---------------------------------------------------------------- */
const bonusCanetinha: Bonus[] = [
  {
    titulo: 'Guia dos Dias de Enjoo',
    itens: ['O que comer quando nada desce', 'Organizado por sintoma: enjoo, sem fome, intestino preso', 'Receitas leves de 5 minutos'],
    valor: 'R$ 47',
    img: { legenda: 'Mockup do PDF Guia dos Dias de Enjoo' },
  },
  {
    titulo: 'Cardápio de 4 Semanas em Porções Pequenas',
    itens: ['5 pequenas refeições por dia', 'Lista de compras de cada semana', 'Alinhado com as receitas do livro'],
    valor: 'R$ 67',
    img: { legenda: 'Mockup do PDF Cardápio de 4 Semanas' },
  },
  {
    titulo: 'Lista de Compras Proteica Barata',
    itens: ['Proteína de mercado sem suplemento', 'Preço médio por grama de proteína', 'Trocas inteligentes'],
    valor: 'R$ 37',
    img: { legenda: 'Mockup do PDF Lista de Compras Proteica' },
  },
];

const featuresCanetinha = [
  `${N} receitas em porções pequenas`,
  'Gramas de proteína em cada receita',
  'Tempo de freezer em cada receita',
  'Suporte + garantia de 30 dias',
  'Acesso vitalício',
];

const canetinha: Produto = {
  nomeCurto: 'Pouca Comida, Muita Proteína',
  promo: ['Acesso vitalício', `${N} receitas`, 'Proteína em gramas em cada receita', 'Garantia incondicional de 30 dias', 'Entrega digital imediata'],
  hero: {
    titulo: (
      <>
        Pouca <span className="italic font-normal">comida</span>,
        <br />
        muita <span className="text-terracotta underline-wavy">proteína.</span>
      </>
    ),
    subtitulo: 'Para quem usa canetinha e não consegue mais comer um prato inteiro.',
    botao: 'Quero as receitas',
    abaixo: (
      <>
        <span className="text-ink font-medium">{N} receitas</span> em porções pequenas, leves no estômago, com os gramas de proteína calculados em cada uma.
      </>
    ),
    seloMeio: N,
    seloBaixo: 'receitas',
    banner: { legenda: 'Capa do livro em pé + 3 pratinhos reais (quibe, creme, bola proteica) em bancada clara · 4:3' },
    figura: 'Fig. 01 — porção real',
  },
  beneficios: {
    titulo: (
      <>
        Você come menos. A sua <span className="italic">proteína</span> não precisa cair junto.
      </>
    ),
    itens: [
      { t: 'Porção pequena, proteína grande', d: 'Receitas pensadas para caber em poucas garfadas.' },
      { t: 'Gramas de proteína em cada receita', d: 'Você sabe quanto comeu sem fazer conta.' },
      { t: 'Leve no estômago', d: 'Sem fritura, pouca gordura, nada de cheiro forte.' },
      { t: 'Pronta em 15 minutos ou do freezer', d: 'Para os dias sem vontade de cozinhar.' },
      { t: 'Ingredientes de mercado', d: 'Frango, ovo, iogurte e feijão, sem suplemento caro.' },
      { t: 'Nada estraga na geladeira', d: 'Porções certas e congeladas, sem jogar comida fora.' },
    ],
  },
  verde: {
    titulo: (
      <>
        Comer pouco não é comer <span className="italic text-ochre">mal</span>.
      </>
    ),
    texto: 'Quando o apetite some, é fácil passar o dia com café e bolacha. Com as receitas certas, cada garfada conta. Dentro do livro você vai preparar:',
    lista: [
      'Quibe de forno com 37 g de proteína',
      'Hambúrguer de frango que vai direto do freezer para a frigideira',
      'Creme de abóbora com frango desfiado para os dias de enjoo',
      'Bola proteica para comer no meio da tarde',
      'Bolo de banana proteico para a vontade de doce',
      'Shake caseiro sem whey',
    ],
    img: { legenda: 'Prato pequeno com a porção real ao lado de um prato grande vazio · 4:5' },
  },
  capitulos: {
    titulo: (
      <>
        Seis <span className="italic">capítulos</span> para a sua rotina nova.
      </>
    ),
    texto: 'Para o almoço que não desce inteiro, o lanche que segura até o jantar e os dias em que nada parece bom.',
    itens: [
      { t: 'Pratinhos Proteicos', s: 'Porção de mão fechada' },
      { t: 'Dias de Enjoo', s: 'Leve no estômago' },
      { t: 'Lanchinhos de Bolso', s: 'Proteína em 3 mordidas' },
      { t: 'Doce sem Culpa', s: 'Para a vontade de doce' },
      { t: 'Bebidas e Shakes Caseiros', s: 'Sem whey caro' },
      { t: 'Porções para Congelar', s: 'Cozinha uma vez, come a semana' },
    ],
    galeria: 'Página do livro com a caixa "X g de proteína"',
  },
  bonus: {
    titulo: (
      <>
        Compre hoje e ganhe <span className="italic">R$ 151 em bônus.</span>
      </>
    ),
    itens: bonusCanetinha,
  },
  planos: [
    {
      tag: 'Edição essencial',
      nome: 'Pouca Comida, Muita Proteína',
      features: featuresCanetinha,
      bonusFaltando: bonusCanetinha.map((b) => b.titulo),
      de: 'R$ 147', por: 'R$ 18,90', link: LINK_ESSENCIAL,
    },
    {
      tag: 'Edição completa',
      nome: 'Pouca Comida, Muita Proteína + Guia dos Dias de Enjoo',
      features: featuresCanetinha,
      bonus: [...bonusCanetinha.map((b) => b.titulo), 'Atualizações vitalícias'],
      de: 'R$ 247', por: 'R$ 29,90', link: LINK_COMPLETA, destaque: true,
    },
  ],
  porDentro: {
    titulo: (
      <>
        Abra o livro <span className="italic">antes</span> de comprar.
      </>
    ),
    paginas: [
      { legenda: 'Receita com a proteína calculada' },
      { legenda: 'Guia dos Dias de Enjoo' },
      { legenda: 'Uma semana do cardápio' },
    ],
    botao: 'Quero minhas receitas',
  },
  faq: [
    { q: 'Serve para quem não usa canetinha?', a: 'Sim. Serve para qualquer pessoa que quer comer menos sem perder proteína.' },
    { q: 'O livro substitui meu médico ou nutricionista?', a: 'Não. É um livro de receitas. A quantidade de proteína que você precisa é definida com quem acompanha você; o livro ajuda a chegar lá na cozinha.' },
    { q: 'Preciso de whey ou suplemento?', a: 'Não. Todas as receitas usam ingredientes de mercado.' },
    { q: 'E nos dias em que não consigo comer nada?', a: 'Tem um capítulo inteiro e um bônus só para esses dias.' },
    { q: 'Como recebo?', a: 'Por WhatsApp e e-mail, assim que o pagamento é confirmado.' },
    { q: 'E se eu não gostar?', a: 'Garantia incondicional de 30 dias. Devolvemos 100% pelo WhatsApp.' },
  ],
  rodape: {
    titulo: (
      <>
        Pouca <span className="italic">comida</span>,
        <br />
        muita <span className="text-ochre">proteína.</span>
      </>
    ),
    aviso: 'Este material não substitui orientação médica ou nutricional.',
  },
  sticky: 'Quero as receitas',
};

/* ---------------------------------------------------------------- */
/* PRODUTO 2 — LANCHES SAUDÁVEIS PARA A SEMANA                      */
/* ---------------------------------------------------------------- */
const bonusLanches: Bonus[] = [
  {
    titulo: 'Lancheira da Semana',
    itens: ['4 semanas de lancheira escolar montadas', 'De segunda a sexta', 'Com as receitas do livro'],
    valor: 'R$ 47',
    img: { legenda: 'Mockup do PDF Lancheira da Semana' },
  },
  {
    titulo: 'Lista de Compras e Preparo de Domingo',
    itens: ['Tudo o que comprar para a semana', 'A ordem de preparo', 'A semana pronta em 2 horas'],
    valor: 'R$ 37',
    img: { legenda: 'Mockup do PDF Preparo de Domingo' },
  },
  {
    titulo: 'Etiquetas para Imprimir',
    itens: ['Etiquetas de pote e de freezer', 'Com nome e data', 'Prontas para imprimir'],
    valor: 'R$ 27',
    img: { legenda: 'Mockup do PDF Etiquetas' },
  },
];

const featuresLanches = [
  `${N} receitas de lanches`,
  'Calorias e rendimento em cada receita',
  'Se congela e por quanto tempo',
  'Suporte + garantia de 30 dias',
  'Acesso vitalício',
];

const lanches: Produto = {
  nomeCurto: 'Lanches Saudáveis para a Semana',
  promo: ['Acesso vitalício', `${N} receitas`, 'Lancheira da Semana de bônus', 'Garantia incondicional de 30 dias', 'Entrega digital imediata'],
  hero: {
    titulo: (
      <>
        Lanches <span className="italic font-normal">saudáveis</span>{' '}
        <span className="text-terracotta">para</span>
        <br />
        a <span className="underline-wavy">semana.</span>
      </>
    ),
    subtitulo: 'Chega de bolacha recheada às 4 da tarde.',
    botao: 'Quero os lanches',
    abaixo: (
      <>
        <span className="text-ink font-medium">{N} receitas</span> de lanches para fazer no domingo e ter pronto a semana inteira, para você e para a lancheira das crianças.
      </>
    ),
    seloMeio: N,
    seloBaixo: 'lanches',
    banner: { legenda: 'Capa do livro + assadeira de salgados + lancheira aberta · 4:3' },
    figura: 'Fig. 01 — a semana pronta',
  },
  beneficios: {
    titulo: (
      <>
        A fome da tarde vai chegar. Deixe o <span className="italic">lanche</span> pronto antes dela.
      </>
    ),
    itens: [
      { t: 'Faz no domingo, come a semana', d: 'Salgados e doces que duram na geladeira e no freezer.' },
      { t: 'Sem fritura e sem açúcar refinado', d: 'Forno, airfryer e fruta para adoçar.' },
      { t: 'Lancheira resolvida', d: 'Lanches que as crianças comem e voltam vazios.' },
      { t: 'Calorias em cada receita', d: 'Para quem está de dieta e quer saber o que come.' },
      { t: 'Ingredientes de mercado', d: 'Nada de farinha cara ou produto importado.' },
      { t: 'Mais barato que o pacote', d: 'Um lote de salgados custa menos que uma semana de lanche pronto.' },
    ],
  },
  verde: {
    titulo: (
      <>
        Lanche saudável não precisa ter <span className="italic text-ochre">gosto de dieta</span>.
      </>
    ),
    texto: 'O lanche que você compra pronto é prático, mas cobra caro em açúcar e no bolso. Dentro do livro você vai preparar:',
    lista: [
      'Esfiha aberta de frango que vai do freezer ao forno em 10 minutos',
      'Bolo de banana sem açúcar que dura a semana',
      'Nuggets de forno que as crianças pedem de novo',
      'Bola proteica para a fome das 4 da tarde',
      'Pão de frigideira em 5 minutos',
      'Overnight oats montado na véspera',
    ],
    img: { legenda: 'Assadeira saindo do forno, mão pegando um salgado · 4:5' },
  },
  capitulos: {
    titulo: (
      <>
        Seis <span className="italic">capítulos</span>, do café da tarde à lancheira.
      </>
    ),
    texto: 'Salgados, doces, lanches proteicos e pães caseiros, organizados para você achar o que fazer em segundos.',
    itens: [
      { t: 'Salgados de Forno', s: 'Sem fritura' },
      { t: 'Doces sem Açúcar', s: 'Adoçados com fruta' },
      { t: 'Lancheira das Crianças', s: 'Aprovado pelos pequenos' },
      { t: 'Lanches Proteicos', s: 'Que seguram a fome' },
      { t: 'Pães e Massas Caseiras', s: 'Base para a semana' },
      { t: 'Lanches de Pote e para Congelar', s: 'Pega e leva' },
    ],
    galeria: 'Página do livro com o selo "congela X dias"',
  },
  bonus: {
    titulo: (
      <>
        Compre hoje e ganhe <span className="italic">R$ 111 em bônus.</span>
      </>
    ),
    itens: bonusLanches,
  },
  planos: [
    {
      tag: 'Edição essencial',
      nome: 'Lanches Saudáveis',
      features: featuresLanches,
      bonusFaltando: bonusLanches.map((b) => b.titulo),
      de: 'R$ 147', por: 'R$ 18,90', link: LINK_ESSENCIAL,
    },
    {
      tag: 'Edição completa',
      nome: 'Lanches Saudáveis + Lancheira da Semana',
      features: featuresLanches,
      bonus: [...bonusLanches.map((b) => b.titulo), 'Atualizações vitalícias'],
      de: 'R$ 247', por: 'R$ 29,90', link: LINK_COMPLETA, destaque: true,
    },
  ],
  porDentro: {
    titulo: (
      <>
        Abra o livro <span className="italic">antes</span> de comprar.
      </>
    ),
    paginas: [
      { legenda: 'Uma receita do livro' },
      { legenda: 'Uma semana da Lancheira' },
      { legenda: 'O preparo de domingo' },
    ],
    botao: 'Quero meus lanches',
  },
  faq: [
    { q: 'Serve para quem está de dieta?', a: 'Sim. Toda receita traz as calorias, e há um capítulo só de lanches proteicos.' },
    { q: 'As crianças vão comer?', a: 'O capítulo Lancheira das Crianças foi pensado para o gosto delas: formato pequeno, sabor conhecido e nada de verde à mostra.' },
    { q: 'Dá para congelar?', a: 'A maioria sim. Cada receita diz se pode e por quanto tempo.' },
    { q: 'Preciso de airfryer?', a: 'Não. Tudo funciona no forno comum; a airfryer é opcional.' },
    { q: 'Como recebo?', a: 'Por WhatsApp e e-mail, assim que o pagamento é confirmado.' },
    { q: 'E se eu não gostar?', a: 'Garantia incondicional de 30 dias. Devolvemos 100% pelo WhatsApp.' },
  ],
  rodape: {
    titulo: (
      <>
        Lanches
        <br />
        <span className="italic">saudáveis</span> <span className="text-ochre">para</span>
        <br />a semana.
      </>
    ),
  },
  sticky: 'Quero os lanches',
};

export const produtos: Record<string, Produto> = { canetinha, lanches };
