import React, { useEffect, useState } from 'react';
import { ShieldCheck, RefreshCw, Infinity as InfinityIcon, Plus, Minus } from 'lucide-react';
import { produtos, type Img } from './conteudo';

const p = produtos[import.meta.env.PRODUTO as string] ?? produtos.canetinha;
const pad = (i: number) => String(i + 1).padStart(2, '0');

/* Foto real quando existir; até lá, um espaço marcado com o que vai entrar ali. */
const Foto: React.FC<{ img: Img; className?: string; prioridade?: boolean }> = ({ img, className = '', prioridade }) =>
  img.src ? (
    <img src={img.src} alt={img.legenda} className={`w-full h-full object-cover ${className}`} loading={prioridade ? 'eager' : 'lazy'} decoding="async" />
  ) : (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center gap-2 p-4 bg-secondary border-2 border-dashed border-terracotta/50 ${className}`}>
      <span className="text-[10px] uppercase tracking-[0.25em] text-terracotta font-semibold">Foto a entrar</span>
      <span className="text-xs text-ink/60 leading-snug max-w-[16rem]">{img.legenda}</span>
    </div>
  );

const Seta = () => <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>;

const PromoBar = () => {
  const loop = [...p.promo, ...p.promo, ...p.promo, ...p.promo];
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-ink text-cream border-b border-ink/40 overflow-hidden">
      <div className="flex whitespace-nowrap ticker py-2 text-[11px] md:text-xs uppercase tracking-[0.25em] font-medium">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center px-6">
            <span className="text-terracotta mr-6">✦</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

const Selo: React.FC<{ grande?: boolean }> = ({ grande }) => (
  <div className={`absolute bg-terracotta text-cream rounded-full flex items-center justify-center text-center rotate-tape shadow-xl ${grande ? '-top-6 -right-6 md:-right-10 w-28 h-28 md:w-32 md:h-32' : '-top-4 -right-3 w-20 h-20'}`}>
    <div>
      <div className="font-display italic text-xs">novo</div>
      <div className={`font-display leading-none ${grande ? 'text-2xl' : 'text-xl'}`}>{p.hero.seloMeio}</div>
      <div className="text-[9px] uppercase tracking-[0.2em] mt-1">{p.hero.seloBaixo}</div>
    </div>
  </div>
);

const Hero = () => (
  <section className="relative pt-8 md:pt-16 pb-16 bg-cream grain overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-7 relative text-center lg:text-left">
          <h1 className="mt-[20px] font-display font-light text-ink leading-[0.95] text-[clamp(3.2rem,9vw,8rem)]">{p.hero.titulo}</h1>
          <p className="mt-8 md:mt-12 max-w-xl mx-auto lg:mx-0 text-base md:text-xl text-ink/75 leading-relaxed font-light">{p.hero.subtitulo}</p>

          <div className="mt-5 relative aspect-[4/3] max-w-sm mx-auto lg:hidden">
            <div className="absolute inset-0 bg-sage/20 translate-x-3 translate-y-3" />
            <div className="relative w-full h-full"><Foto img={p.hero.banner} prioridade /></div>
            <Selo />
          </div>

          <div className="mt-6 md:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6">
            <a href="#ofertas" className="shimmer group inline-flex items-center bg-forest text-cream px-8 py-4 hover:bg-terracotta transition-colors duration-300">
              <span className="text-sm uppercase tracking-[0.25em] font-medium mr-3">{p.hero.botao}</span>
              <Seta />
            </a>
            <div className="flex items-baseline gap-2">
              <span className="text-ink/50 line-through text-sm">R$ 147</span>
              <span className="font-display text-3xl text-ink">R$ 18,90</span>
              <span className="text-xs text-ink/60 italic">à vista</span>
            </div>
          </div>

          <p className="mt-5 max-w-xl mx-auto lg:mx-0 text-base md:text-lg text-ink/75 leading-relaxed font-light">{p.hero.abaixo}</p>

          <div className="mt-8 flex flex-nowrap items-center justify-between gap-2 sm:gap-6 text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-ink/65 border-t border-ink/15 pt-5">
            <span className="flex items-center gap-1.5 sm:gap-2"><ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-terracotta shrink-0" /> Compra segura</span>
            <span className="flex items-center gap-1.5 sm:gap-2"><RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-terracotta shrink-0" /> Garantia 30 dias</span>
            <span className="flex items-center gap-1.5 sm:gap-2"><InfinityIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-terracotta shrink-0" /> Acesso vitalício</span>
          </div>
        </div>

        <div className="lg:col-span-5 relative hidden lg:block">
          <div className="relative aspect-[4/3] max-w-md mx-auto">
            <div className="absolute inset-0 bg-sage/20 translate-x-4 translate-y-4" />
            <div className="relative w-full h-full"><Foto img={p.hero.banner} prioridade /></div>
            <Selo grande />
            <p className="absolute -bottom-10 left-0 text-[11px] uppercase tracking-[0.25em] text-ink/55">{p.hero.figura}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Beneficios = () => (
  <section className="py-14 md:py-20 px-6 md:px-10 bg-cream grain border-t border-ink/15">
    <div className="max-w-7xl mx-auto">
      <h2 className="mt-[30px] mb-8 md:mb-12 font-display font-light text-ink leading-[1.02] text-[clamp(2rem,5vw,4rem)]">{p.beneficios.titulo}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 md:gap-y-8">
        {p.beneficios.itens.map((b, i) => (
          <div key={i} className="border-t border-ink/25 pt-3">
            <span className="font-display italic text-terracotta text-xs">{pad(i)}</span>
            <h3 className="font-display text-xl text-ink mt-1 mb-1.5">{b.t}</h3>
            <p className="text-ink/70 leading-snug text-sm">{b.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const BlocoVerde = () => (
  <section className="py-24 px-6 md:px-10 bg-forest text-cream grain relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] max-w-md">
            <div className="absolute inset-0 bg-terracotta/40 -translate-x-3 -translate-y-3" />
            <div className="relative w-full h-full"><Foto img={p.verde.img} /></div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <h2 className="font-display font-light text-cream leading-[1.02] text-[clamp(2.5rem,6vw,5rem)]">{p.verde.titulo}</h2>
          <p className="mt-6 text-cream/75 text-lg leading-relaxed font-light max-w-xl">{p.verde.texto}</p>
          <ul className="mt-10 max-w-2xl">
            {p.verde.lista.map((f, i) => (
              <li key={i} className="flex items-baseline gap-6 py-5 border-t border-cream/15 last:border-b">
                <span className="font-display italic text-ochre text-sm shrink-0">{pad(i)}</span>
                <span className="text-cream/90 leading-snug">{f}</span>
              </li>
            ))}
          </ul>
          <a href="#ofertas" className="group mt-10 inline-flex items-center bg-cream text-ink px-8 py-4 hover:bg-ochre transition-colors">
            <span className="text-sm uppercase tracking-[0.25em] font-medium mr-3">Quero meu exemplar</span>
            <Seta />
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Capitulos = () => (
  <section className="py-24 px-6 md:px-10 bg-cream grain border-t border-ink/15">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-12 gap-10 mb-16 items-end">
        <h2 className="md:col-span-6 font-display font-light text-ink leading-[1.02] text-[clamp(2.5rem,6vw,5rem)]">{p.capitulos.titulo}</h2>
        <p className="md:col-span-6 md:col-start-7 text-ink/70 text-lg leading-relaxed font-light">{p.capitulos.texto}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-ink/15 mb-24">
        {p.capitulos.itens.map((c, i) => (
          <div key={i} className="group border-r border-b border-ink/15 p-8 hover:bg-ink hover:text-cream transition-colors duration-300">
            <div className="font-display italic text-terracotta group-hover:text-ochre text-sm mb-6">Cap. {['I', 'II', 'III', 'IV', 'V', 'VI'][i]}</div>
            <h3 className="font-display text-3xl mb-2 leading-tight">{c.t}</h3>
            <p className="text-sm uppercase tracking-[0.2em] opacity-60">{c.s}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-ink/15 pt-16">
        <div className="flex items-end justify-between mb-10">
          <h3 className="font-display font-light text-ink text-3xl md:text-4xl max-w-xl leading-tight">Um aperitivo do que você vai cozinhar.</h3>
          <span className="hidden md:block text-[11px] uppercase tracking-[0.3em] text-ink/55">Galeria · 12 páginas</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <figure key={i} className="relative overflow-hidden aspect-[4/5]">
              <Foto img={{ legenda: `${p.capitulos.galeria} · ${pad(i)}` }} />
            </figure>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Bonus = () => (
  <section className="py-24 px-6 md:px-10 bg-secondary grain border-t border-ink/15">
    <div className="max-w-7xl mx-auto">
      <h2 className="mb-16 font-display font-light text-ink leading-[1.02] text-[clamp(2.5rem,6vw,5rem)]">{p.bonus.titulo}</h2>
      <div className="grid md:grid-cols-3 gap-px bg-ink/15">
        {p.bonus.itens.map((b, i) => (
          <article key={i} className="bg-cream p-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className="font-display italic text-terracotta text-sm">Bônus {pad(i)}</span>
              <span className="text-[10px] uppercase tracking-[0.25em] border border-ink px-2 py-1">Grátis hoje</span>
            </div>
            <div className="relative aspect-[4/3] mb-6 overflow-hidden"><Foto img={b.img} /></div>
            <h3 className="font-display text-2xl text-ink leading-tight mb-4">{b.titulo}</h3>
            <ul className="text-sm text-ink/70 leading-relaxed space-y-2 mb-6 flex-1">
              {b.itens.map((item, k) => (
                <li key={k} className="flex gap-3"><span className="text-terracotta">—</span><span>{item}</span></li>
              ))}
            </ul>
            <div className="border-t border-ink/15 pt-4 flex items-baseline justify-between">
              <span className="text-[11px] uppercase tracking-[0.25em] text-ink/55">Valor</span>
              <span className="line-through text-ink/50 font-display text-lg">{b.valor}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const Precos = () => (
  <section id="ofertas" className="py-24 px-6 md:px-10 bg-cream grain border-t border-ink/15">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="font-display font-light text-ink leading-[1.02] text-[clamp(2.5rem,6vw,5rem)]">
          Escolha sua <span className="italic">edição</span>.
        </h2>
        <p className="mt-5 text-ink/70 text-lg font-light">Pagamento único, acesso vitalício, garantia incondicional de 30 dias.</p>
      </div>
      <div className="grid grid-cols-2 gap-px bg-ink/20 border border-ink/20 mt-8">
        {p.planos.map((plan) => {
          const d = plan.destaque;
          const marca = d ? 'text-ochre' : 'text-terracotta';
          return (
            <article key={plan.nome} className={`relative p-3.5 sm:p-8 md:p-12 flex flex-col ${d ? 'bg-forest text-cream ring-2 ring-ochre shadow-2xl z-[1] md:scale-[1.02]' : 'bg-cream text-ink'}`}>
              {d && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 text-[9px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] bg-terracotta text-cream px-3 py-1 whitespace-nowrap shadow-md">
                  Mais escolhido
                </span>
              )}
              <span className={`text-[10px] md:text-[11px] uppercase tracking-[0.25em] md:tracking-[0.3em] mb-3 ${marca}`}>{plan.tag}</span>
              <h3 className="font-display text-xl sm:text-2xl md:text-4xl leading-tight mb-6 md:mb-8">{plan.nome}</h3>
              <ul className="space-y-2.5 md:space-y-3 mb-6 md:mb-8">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex gap-2 md:gap-3 text-[13px] md:text-[15px] leading-snug">
                    <span className={marca}>—</span>
                    <span className={d ? 'text-cream/85' : 'text-ink/80'}>{f}</span>
                  </li>
                ))}
              </ul>
              {plan.bonus && (
                <>
                  <div className={`text-[10px] md:text-[11px] uppercase tracking-[0.25em] md:tracking-[0.3em] mb-3 ${marca}`}>+ Bônus inclusos</div>
                  <ul className="space-y-2.5 md:space-y-3 mb-6 md:mb-8">
                    {plan.bonus.map((f, i) => (
                      <li key={i} className="flex gap-2 md:gap-3 text-[13px] md:text-[15px] leading-snug">
                        <span className={marca}>✦</span>
                        <span className={d ? 'text-cream/85' : 'text-ink/80'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {plan.bonusFaltando && (
                <>
                  <div className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] md:tracking-[0.3em] mb-3 text-ink/40">+ Bônus inclusos</div>
                  <ul className="space-y-2.5 md:space-y-3 mb-6 md:mb-8">
                    {plan.bonusFaltando.map((f, i) => (
                      <li key={i} className="flex gap-2 md:gap-3 text-[13px] md:text-[15px] leading-snug opacity-50">
                        <span className="text-ink/40">×</span>
                        <span className="line-through text-ink/60">{f}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <div className={`mt-auto pt-6 md:pt-8 border-t ${d ? 'border-cream/20' : 'border-ink/20'}`}>
                <div className="flex flex-wrap items-baseline justify-center gap-x-2 md:gap-x-3 gap-y-1 mb-5 md:mb-6 text-center">
                  <span className={`line-through text-sm md:text-base ${d ? 'text-cream/40' : 'text-ink/40'}`}>{plan.de}</span>
                  <span className="font-display text-4xl sm:text-5xl md:text-7xl whitespace-nowrap">{plan.por}</span>
                  <span className={`text-[10px] md:text-xs italic ${d ? 'text-cream/60' : 'text-ink/60'}`}>pagamento único</span>
                </div>
                <a
                  href={plan.link}
                  className={`group inline-flex items-center justify-center w-full px-3 md:px-8 py-3 md:py-4 transition-colors ${d ? 'shimmer bg-ochre text-ink hover:bg-terracotta hover:text-cream' : 'bg-ink text-cream hover:bg-terracotta'}`}
                >
                  <span className="text-[11px] md:text-sm uppercase tracking-[0.18em] md:tracking-[0.25em] font-medium mr-2 md:mr-3">Comprar agora</span>
                  <Seta />
                </a>
                <p className={`text-[9px] md:text-[11px] uppercase tracking-[0.15em] md:tracking-[0.2em] mt-3 md:mt-4 text-center ${d ? 'text-cream/55' : 'text-ink/55'}`}>Compra segura · garantia 30 dias</p>
              </div>
            </article>
          );
        })}
      </div>
      <div className="flex justify-center mt-12">
        <div className="relative w-32 h-32 md:w-36 md:h-36 text-terracotta">
          <svg viewBox="0 0 100 100" className="absolute inset-0 seal-spin">
            <defs><path id="sealPath" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
            <text fontSize="8.5" letterSpacing="2.6" fill="currentColor" style={{ textTransform: 'uppercase' }}>
              <textPath href="#sealPath">Garantia incondicional · 30 dias ·</textPath>
            </text>
          </svg>
          <div className="absolute inset-[22%] rounded-full border-2 border-terracotta border-dashed flex flex-col items-center justify-center rotate-tape">
            <span className="font-display text-3xl leading-none">30</span>
            <span className="text-[9px] uppercase tracking-[0.2em]">dias</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* No lugar dos depoimentos: páginas reais do livro, até chegarem prints de compradores. */
const PorDentro = () => (
  <section className="py-24 px-6 md:px-10 bg-secondary grain border-t border-ink/15">
    <div className="max-w-7xl mx-auto">
      <h2 className="mb-16 font-display font-light text-ink leading-[1.02] text-[clamp(2.5rem,6vw,5rem)]">{p.porDentro.titulo}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {p.porDentro.paginas.map((pg, i) => (
          <figure key={i}>
            <div className="aspect-[4/5] overflow-hidden"><Foto img={pg} /></div>
            <figcaption className="mt-3 font-display italic text-ink/70">
              <span className="text-terracotta mr-2">{pad(i)}</span>
              {pg.legenda}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="text-center mt-16">
        <a href="#ofertas" className="group inline-flex items-center bg-ink text-cream px-8 py-4 hover:bg-terracotta transition-colors">
          <span className="text-sm uppercase tracking-[0.25em] font-medium mr-3">{p.porDentro.botao}</span>
          <Seta />
        </a>
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [aberto, setAberto] = useState<number | null>(null);
  return (
    <section className="py-24 px-6 md:px-10 bg-cream grain border-t border-ink/15">
      <div className="max-w-5xl mx-auto">
        <h2 className="mb-12 font-display font-light text-ink leading-[1.02] text-[clamp(2.5rem,6vw,5rem)]">
          Perguntas <span className="italic">frequentes.</span>
        </h2>
        <div className="border-t border-ink/25">
          {p.faq.map((f, i) => {
            const open = aberto === i;
            return (
              <div key={i} className="border-b border-ink/25">
                <button onClick={() => setAberto(open ? null : i)} className="w-full py-6 flex items-center gap-6 text-left group">
                  <span className="font-display italic text-terracotta text-sm w-10 shrink-0">{pad(i)}</span>
                  <span className="font-display text-xl md:text-2xl text-ink flex-1 group-hover:text-terracotta transition-colors">{f.q}</span>
                  {open ? <Minus className="w-5 h-5 text-ink shrink-0" /> : <Plus className="w-5 h-5 text-ink shrink-0" />}
                </button>
                {open && (
                  <div className="pb-8 pl-16 pr-6">
                    <p className="text-ink/75 text-base leading-relaxed font-light max-w-2xl">{f.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Rodape = () => (
  <footer className="bg-ink text-cream pt-20 pb-28 md:pb-10 px-6 md:px-10 grain">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-12 gap-10 pb-16 border-b border-cream/15">
        <div className="md:col-span-6">
          <h3 className="font-display font-light text-cream leading-[1] text-[clamp(2.5rem,6vw,5rem)]">{p.rodape.titulo}</h3>
        </div>
        <div className="md:col-span-3">
          <div className="text-[11px] uppercase tracking-[0.3em] text-ochre mb-4">Autoria</div>
          <p className="text-cream/80 leading-relaxed">
            Maria Maciel
            <br />
            <span className="text-cream/55 text-sm">Receitas Práticas</span>
          </p>
        </div>
        <div className="md:col-span-3">
          <div className="text-[11px] uppercase tracking-[0.3em] text-ochre mb-4">Acesso</div>
          <p className="text-cream/80 leading-relaxed text-sm">Entrega digital imediata por e-mail e WhatsApp. Acesso vitalício, garantia incondicional de 30 dias.</p>
        </div>
      </div>
      {p.rodape.aviso && <p className="pt-8 text-sm text-cream/70">{p.rodape.aviso}</p>}
      <div className="pt-8 flex flex-col md:flex-row justify-between gap-4 text-[11px] uppercase tracking-[0.25em] text-cream/55">
        <span>© 2026 — Maria Maciel</span>
        <span>São Paulo · BR</span>
      </div>
    </div>
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
    <div className={`md:hidden fixed bottom-0 inset-x-0 z-40 bg-cream/95 backdrop-blur border-t border-ink/15 px-4 py-3 flex items-center justify-between gap-3 transition-transform duration-300 ${show ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="leading-tight">
        <div className="text-[11px] text-ink/50 line-through">R$ 147</div>
        <div className="font-display text-2xl text-ink">R$ 18,90</div>
      </div>
      <a href="#ofertas" className="shimmer bg-forest text-cream px-5 py-3 text-xs uppercase tracking-[0.2em] font-medium">{p.sticky} →</a>
    </div>
  );
};

const Pagina = () => (
  <div className="min-h-screen">
    <PromoBar />
    <Hero />
    <Beneficios />
    <BlocoVerde />
    <Capitulos />
    <Bonus />
    <Precos />
    <PorDentro />
    <FAQ />
    <Rodape />
    <StickyCTA />
  </div>
);

export default Pagina;
