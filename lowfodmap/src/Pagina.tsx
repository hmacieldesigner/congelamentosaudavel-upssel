import React, { useEffect, useState } from 'react';
import { ShieldCheck, Zap, Infinity as InfinityIcon, Plus, Minus, Check, X, Gift } from 'lucide-react';

/* ================================================================
   300 RECEITAS LOW FODMAP — conteúdo e links (edite aqui)
   ================================================================ */
const LINK_BASICO = 'https://pay.cakto.com.br/n2dki2v';     // ← checkout da Cakto do Básico (R$ 10)
const LINK_COMPLETO = 'https://pay.cakto.com.br/9r5znho'; // ← checkout da Cakto do Completo (R$ 17)

const BANNER = 'https://i.ibb.co/Z32SJW6/banner.jpg';
const IMG_INDISPENSAVEL = 'https://i.ibb.co/dJzWgbMd/capaindispensavel.jpg';

const BENEFICIOS = [
  'Receitas que aliviam estufamento, gases e desconforto',
  'Opções para café da manhã, lanche, almoço e jantar',
  'Fácil de fazer, mesmo para iniciantes',
  'Ideal para SII, SIBO e intestino irritável e microcolite',
  'Equilibra a alimentação com sabor de verdade',
  'Ajuda a melhorar a saúde intestinal de forma prática',
];

const CAPITULOS = [
  { t: 'Carnes & Frangos', s: 'Alto proteico' },
  { t: 'Peixes & Frutos do Mar', s: 'Low cal' },
  { t: 'Acompanhamentos', s: 'Nutritivos' },
  { t: 'Lanches & Snacks', s: 'Práticos' },
  { t: 'Temperos & Molhos', s: 'Coringa' },
  { t: 'Sobremesas Low FODMAP', s: 'Sem culpa' },
];

const GALERIA = [
  'https://i.ibb.co/G3MFN496/receitas-saudaveis-para-congelar-09.png',
  'https://i.ibb.co/JFtmzWcV/receitas-saudaveis-para-congelar-05.png',
  'https://i.ibb.co/mVMRNFnD/receitas-saudaveis-para-congelar-06.png',
  'https://i.ibb.co/nM05GLW6/receitas-saudaveis-para-congelar-07.png',
  'https://i.ibb.co/mFghrhgS/receitas-saudaveis-para-congelar-08.png',
  'https://i.ibb.co/r22DGNmF/receitas-saudaveis-para-congelar-04.png',
  'https://i.ibb.co/KpkJbfXP/receitas-saudaveis-para-congelar-03.png',
  'https://i.ibb.co/qF060dvY/images.jpg',
  'https://i.ibb.co/gZ21bfCB/receitas-saudaveis-para-congelar-01.png',
  'https://i.ibb.co/99QZWhwY/receitas-saudaveis-para-congelar.png',
  'https://i.ibb.co/YB4xqwRB/receitas-saudaveis-para-congelar-11.png',
  'https://i.ibb.co/m5GZ44gw/receitas-saudaveis-para-congelar-10.png',
];

const BONUS = [
  { t: 'Receitas Amigas do Intestino', img: 'https://i.ibb.co/G427DsrP/amigasdointestino.jpg' },
  { t: 'Guia Gastrite, Refluxo e H. pylori', img: 'https://i.ibb.co/GfwnKJwJ/gastriterefluxohpylori.jpg' },
  { t: 'Diário de Gatilhos + Hábitos Diários', img: 'https://i.ibb.co/YFJK9B0c/gatilhosdiarios.jpg' },
  { t: '+50 Receitas de Lanches e Snacks Low FODMAP', img: 'https://i.ibb.co/2YgxynZr/lanchesesnacks.jpg' },
  { t: 'Guia Completo de Substituições Low FODMAP', img: 'https://i.ibb.co/ZpFd9s0D/substituicoes.jpg' },
  { t: '+40 Receitas para Família e Crianças', img: 'https://i.ibb.co/0yDrtN6T/receitasparafamilia.jpg' },
  { t: 'Acesso ao Grupo VIP no WhatsApp', img: 'https://i.ibb.co/fV4LdqxS/WPP.jpg' },
  { t: 'Guia de Organização do Freezer', img: 'https://i.ibb.co/twY4ZwBb/organizacaodofreezer.jpg' },
];

const BASE = ['300 Receitas Low FODMAP', 'Suporte', 'Garantia', 'Acesso vitalício', 'Entrega imediata no e-mail e WhatsApp'];
const EXTRAS_COMPLETO = [
  'Atualizações',
  '+50 Lanches Low FODMAP',
  'Guia de Substituições',
  '+40 Receitas Família',
  'Extras Air Fryer',
  'Guia Gastrite, Refluxo e H. pylori',
  'Receitas Amigas do Intestino',
  'Diário de Gatilhos + Hábitos Diários',
];

/* Prints REAIS de comentários de compradores (links das imagens). Enquanto vazio, a seção não aparece. */
const PRINTS_COMENTARIOS: string[] = [];

const FAQ = [
  { q: 'Como recebo o acesso?', a: 'Assim que o pagamento é confirmado, você recebe o acesso por e-mail e WhatsApp. A entrega é digital e imediata.' },
  { q: 'Preciso saber cozinhar?', a: 'Não. As receitas foram pensadas para quem tem pouco tempo ou pouca experiência na cozinha, com passo a passo simples e ingredientes fáceis de achar.' },
  { q: 'É adequado para quem tem SII ou SIBO?', a: 'Sim. As receitas seguem a dieta low FODMAP, a mais usada por quem tem SII, SIBO e sensibilidades alimentares. O livro é um guia de receitas e não substitui o acompanhamento do seu médico ou nutricionista.' },
  { q: 'Posso usar qualquer ingrediente?', a: 'O ideal é seguir os ingredientes e as porções indicadas em cada receita, porque alguns alimentos só são low FODMAP até certa quantidade. O Guia de Substituições mostra o que usar no lugar de alho, cebola, leite e outros ingredientes que costumam dar desconforto.' },
];

/* ================================================================ */

const hoje = () => new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

const Botao: React.FC<{ texto?: string; className?: string }> = ({ texto = 'Quero as receitas', className = '' }) => (
  <a href="#ofertas" className={`btn-cta pulsa shimmer inline-flex items-center justify-center rounded-full px-8 py-4 font-display font-bold uppercase tracking-wide text-[15px] ${className}`}>
    {texto} <span className="ml-2">→</span>
  </a>
);

const Tarja = () => (
  <div className="fixed top-0 inset-x-0 z-50 bg-amarelo text-choco text-center text-[13px] sm:text-sm font-bold py-2 px-3 shadow">
    🔥 Essa promoção acaba hoje: <span className="underline decoration-2 underline-offset-2">{hoje()}</span>
  </div>
);

const Hero = () => (
  <section className="pt-14 pb-14 px-5 bg-creme">
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
      <div className="text-center lg:text-left">
        <h1 className="font-display font-extrabold leading-[1.02] text-[clamp(2.6rem,8vw,4.6rem)]">
          <span className="grad-texto">Receitas Low FODMAP Práticas e Deliciosas</span>
        </h1>
        <p className="mt-5 text-lg md:text-xl text-choco/75 font-medium max-w-xl mx-auto lg:mx-0">
          300 receitas de refeições saudáveis, para o intestino práticas e deliciosas para você cozinhar uma vez e comer bem a semana inteira.
        </p>
        <div className="mt-7 lg:hidden"><Banner /></div>
        <div className="mt-7 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center lg:justify-start">
          <div className="text-center sm:text-left leading-tight">
            <div className="text-choco/55 text-sm">De <s>R$ 97</s> por apenas</div>
            <div className="font-display font-extrabold text-5xl text-vermelho">R$ 10</div>
          </div>
          <Botao />
        </div>
        <div className="mt-8 flex justify-center lg:justify-start gap-5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-choco/60">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-laranja" /> Compra segura</span>
          <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-laranja" /> Entrega imediata</span>
          <span className="flex items-center gap-1.5"><InfinityIcon className="w-4 h-4 text-laranja" /> Acesso vitalício</span>
        </div>
      </div>
      <div className="hidden lg:block"><Banner /></div>
    </div>
  </section>
);

const Banner = () => (
  <div className="relative max-w-md mx-auto">
    <div className="absolute inset-0 grad-laranja rounded-3xl translate-x-3 translate-y-3 opacity-80" />
    <img src={BANNER} alt="300 Receitas Low FODMAP" className="relative w-full rounded-3xl shadow-2xl" fetchPriority="high" />
    <div className="absolute -top-5 -right-3 w-24 h-24 grad-laranja text-white rounded-full flex flex-col items-center justify-center rotate-tape shadow-xl">
      <span className="font-display font-extrabold text-2xl leading-none">300</span>
      <span className="text-[10px] font-bold uppercase tracking-widest">receitas</span>
    </div>
  </div>
);

const Beneficios = () => (
  <section className="py-16 px-5 bg-papel">
    <div className="max-w-6xl mx-auto">
      <h2 className="font-display font-extrabold text-[clamp(1.9rem,5vw,3rem)] leading-tight text-center">
        Benefícios para o seu <span className="grad-texto">corpo e intestino</span>
      </h2>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {BENEFICIOS.map((b, i) => (
          <div key={i} className="flex gap-3 items-start bg-creme rounded-2xl p-5">
            <span className="shrink-0 w-8 h-8 rounded-full grad-laranja text-white flex items-center justify-center"><Check className="w-4 h-4" strokeWidth={3} /></span>
            <p className="font-semibold leading-snug pt-1">{b}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Indispensavel = () => (
  <section className="py-16 px-5 bg-laranja text-white">
    <div className="max-w-4xl mx-auto text-center">
      <img src={IMG_INDISPENSAVEL} alt="Receitas Low FODMAP" className="w-full max-w-xl mx-auto rounded-3xl shadow-2xl mb-10" loading="lazy" />
      <h2 className="font-display font-extrabold text-[clamp(1.9rem,5vw,3.2rem)] leading-tight">O que torna esse livro indispensável na sua rotina?</h2>
      <p className="mt-6 text-lg md:text-xl font-medium text-white/90 max-w-2xl mx-auto">
        Se você sempre come os mesmos alimentos restritos ou tem medo de experimentar... está perdendo sabor e qualidade de vida na dieta!
      </p>
    </div>
  </section>
);

const Capitulos = () => (
  <section className="py-16 px-5 bg-creme">
    <div className="max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-display font-extrabold text-[clamp(1.9rem,5vw,3rem)] leading-tight">Seis <span className="grad-texto">capítulos</span> dentro do livro.</h2>
        <p className="mt-4 text-choco/70 text-lg">Receitas para o almoço da semana, jantar rápido, lanche saudável ou sobremesa sem culpa — organizadas por categoria.</p>
      </div>
      <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {CAPITULOS.map((c, i) => (
          <div key={i} className="group bg-papel rounded-2xl p-5 md:p-7 border border-choco/10 hover:grad-laranja hover:text-white transition-colors">
            <div className="text-vermelho group-hover:text-white font-display font-bold text-sm">Cap. {['I', 'II', 'III', 'IV', 'V', 'VI'][i]}</div>
            <h3 className="mt-3 font-display font-bold text-lg md:text-2xl leading-tight">{c.t}</h3>
            <p className="mt-1 text-xs md:text-sm uppercase tracking-widest font-bold opacity-60">{c.s}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center"><Botao /></div>
    </div>
  </section>
);

const Galeria = () => (
  <section className="py-16 px-5 bg-papel">
    <div className="max-w-6xl mx-auto">
      <h2 className="font-display font-extrabold text-[clamp(1.9rem,5vw,3rem)] leading-tight text-center">
        Veja o que você vai <span className="grad-texto">aprender!</span>
      </h2>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {GALERIA.map((src, i) => (
          <figure key={i} className="overflow-hidden rounded-2xl bg-creme shadow-sm">
            <img src={src} alt={`Receita ${i + 1}`} className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
          </figure>
        ))}
      </div>
    </div>
  </section>
);

const Bonus = () => (
  <section className="py-16 px-5 bg-choco text-white">
    <div className="max-w-6xl mx-auto">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 bg-amarelo text-choco font-bold text-xs uppercase tracking-[0.18em] px-3 py-1.5 rounded-full"><Gift className="w-4 h-4" /> Compre e ganhe</span>
        <h2 className="mt-4 font-display font-extrabold text-[clamp(1.9rem,5vw,3rem)] leading-tight">Compre hoje e ganhe <span className="text-amarelo">R$239 em bônus.</span></h2>
      </div>
      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {BONUS.map((b, i) => (
          <article key={i} className="relative bg-white/5 rounded-2xl overflow-hidden border border-white/10">
            <span className="absolute top-2 left-2 z-10 bg-vermelho text-white text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-full">Grátis hoje</span>
            <img src={b.img} alt={b.t} className="w-full aspect-square object-cover" loading="lazy" />
            <div className="p-3 md:p-4">
              <div className="text-amarelo text-[11px] font-bold uppercase tracking-wider">Bônus {String(i + 1).padStart(2, '0')}</div>
              <h3 className="mt-1 font-display font-semibold text-sm md:text-base leading-snug">{b.t}</h3>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const Ofertas = () => (
  <section id="ofertas" className="py-16 px-3 sm:px-5 bg-creme scroll-mt-12">
    <div className="max-w-5xl mx-auto">
      <h2 className="font-display font-extrabold text-[clamp(1.9rem,5vw,3rem)] leading-tight text-center px-2">
        Escolha o seu <span className="grad-texto">pacote</span>
      </h2>
      <div className="mt-10 grid grid-cols-2 gap-2 sm:gap-5 items-stretch">
        {/* Básico */}
        <article className="bg-papel rounded-2xl p-3.5 sm:p-7 flex flex-col border border-choco/10">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-laranja">Oferta básica</span>
          <h3 className="font-display font-extrabold text-xl sm:text-3xl mt-1">Básico</h3>
          <ul className="mt-4 space-y-2 text-[12.5px] sm:text-[15px] flex-1">
            {BASE.map((f) => <li key={f} className="flex gap-1.5"><Check className="w-4 h-4 text-verde shrink-0 mt-0.5" strokeWidth={3} />{f}</li>)}
            {EXTRAS_COMPLETO.map((f) => <li key={f} className="flex gap-1.5 opacity-40"><X className="w-4 h-4 shrink-0 mt-0.5" /><s>{f}</s></li>)}
          </ul>
          <div className="mt-5 pt-4 border-t border-choco/10 text-center">
            <div className="text-choco/50 text-xs sm:text-sm">De <s>R$ 97</s> por</div>
            <div className="font-display font-extrabold text-4xl sm:text-5xl">R$ 10</div>
            <a href={LINK_BASICO} className="mt-4 shimmer block w-full rounded-full bg-verde text-white font-display font-bold uppercase text-[12px] sm:text-sm tracking-wide py-3.5">Comprar agora</a>
          </div>
        </article>
        {/* Completo */}
        <article className="relative bg-papel rounded-2xl p-3.5 sm:p-7 flex flex-col border-[3px] border-laranja shadow-[0_18px_40px_-18px_hsl(var(--laranja)/0.7)]">
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 grad-laranja text-white text-[10px] sm:text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap shadow">Mais escolhido</span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-vermelho">Oferta completa</span>
          <h3 className="font-display font-extrabold text-xl sm:text-3xl mt-1">Completo</h3>
          <ul className="mt-4 space-y-2 text-[12.5px] sm:text-[15px] flex-1">
            {[...BASE, ...EXTRAS_COMPLETO].map((f) => <li key={f} className="flex gap-1.5"><Check className="w-4 h-4 text-laranja shrink-0 mt-0.5" strokeWidth={3} />{f}</li>)}
          </ul>
          <div className="mt-5 pt-4 border-t border-choco/10 text-center">
            <div className="text-choco/50 text-xs sm:text-sm">De <s>R$ 187</s> por</div>
            <div className="font-display font-extrabold text-4xl sm:text-5xl text-vermelho">R$ 17</div>
            <a href={LINK_COMPLETO} className="mt-4 btn-cta pulsa shimmer block w-full rounded-full font-display font-bold uppercase text-[12px] sm:text-sm tracking-wide py-3.5">Comprar agora</a>
          </div>
        </article>
      </div>
      <p className="mt-6 text-center text-xs sm:text-sm text-choco/60 font-semibold">🔒 Pagamento único · compra segura · entrega imediata no e-mail e WhatsApp</p>
    </div>
  </section>
);

/* Feed estilo Facebook — só com prints reais de compradores */
const Comentarios = () =>
  PRINTS_COMENTARIOS.length === 0 ? null : (
    <section className="py-16 px-5 bg-papel">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display font-extrabold text-[clamp(1.9rem,5vw,3rem)] leading-tight text-center">O que estão <span className="grad-texto">falando</span></h2>
        <div className="mt-8 space-y-3">
          {PRINTS_COMENTARIOS.map((src, i) => (
            <img key={i} src={src} alt="Comentário de compradora" className="w-full rounded-xl border border-choco/10 shadow-sm" loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );

const Perguntas = () => {
  const [aberto, setAberto] = useState<number | null>(0);
  return (
    <section className="py-16 px-5 bg-pastel">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display font-extrabold text-[clamp(1.9rem,5vw,3rem)] leading-tight text-center">Perguntas frequentes</h2>
        <div className="mt-8 space-y-3">
          {FAQ.map((f, i) => {
            const open = aberto === i;
            return (
              <div key={i} className="bg-papel rounded-2xl">
                <button onClick={() => setAberto(open ? null : i)} className="w-full flex items-center gap-4 text-left p-5">
                  <span className="flex-1 font-display font-semibold text-base md:text-lg">{f.q}</span>
                  {open ? <Minus className="w-5 h-5 text-laranja shrink-0" /> : <Plus className="w-5 h-5 text-laranja shrink-0" />}
                </button>
                {open && <p className="px-5 pb-5 -mt-1 text-choco/75 leading-relaxed">{f.a}</p>}
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center"><Botao /></div>
      </div>
    </section>
  );
};

const Rodape = () => (
  <footer className="bg-choco text-white/70 text-center px-5 pt-10 pb-28 md:pb-10 text-sm">
    <p className="font-display font-bold text-white">300 Receitas Low FODMAP</p>
    <p className="mt-1">Todos os direitos reservados – {new Date().getFullYear()}</p>
    <p className="mt-4 text-xs text-white/50 max-w-xl mx-auto">Este material é um livro de receitas e não substitui orientação médica ou nutricional.</p>
  </footer>
);

const StickyCTA = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const r = document.getElementById('ofertas')?.getBoundingClientRect();
      const naOferta = r ? r.top < window.innerHeight && r.bottom > 0 : false;
      setShow(window.scrollY > 600 && !naOferta);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={`md:hidden fixed bottom-0 inset-x-0 z-40 bg-papel/95 backdrop-blur border-t border-choco/10 px-4 py-3 flex items-center justify-between gap-3 transition-transform duration-300 ${show ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="leading-tight">
        <div className="text-[11px] text-choco/50">De <s>R$ 97</s> por</div>
        <div className="font-display font-extrabold text-2xl text-vermelho">R$ 10</div>
      </div>
      <a href="#ofertas" className="btn-cta shimmer rounded-full px-5 py-3 text-xs font-display font-bold uppercase tracking-wide">Quero as receitas →</a>
    </div>
  );
};

const Pagina = () => (
  <div className="min-h-screen">
    <Tarja />
    <Hero />
    <Beneficios />
    <Indispensavel />
    <Capitulos />
    <Galeria />
    <Bonus />
    <Ofertas />
    <Comentarios />
    <Perguntas />
    <Rodape />
    <StickyCTA />
  </div>
);

export default Pagina;
