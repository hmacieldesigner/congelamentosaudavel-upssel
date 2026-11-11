/* ================================================================
   CONFIGURAÇÃO DO FUNIL — edite só este bloco
   ----------------------------------------------------------------
   Upsell 1 clique da Cakto: em cada produto, use o "Gerador de
   Upsell", copie o HTML gerado e cole dentro da <div class="cakto-slot">
   da página correspondente. Quando o slot tem conteúdo, os botões
   padrão desta página somem e valem os da Cakto.
   Se preferir links diretos de checkout, preencha "checkout" abaixo.
   ================================================================ */
window.FUNIL = {
  segundosParaBotao: 60,          // botão do upsell aparece aos 60s do vídeo
  ofertas: {
    upsell: { checkout: 'https://pay.cakto.com.br/jceiv4a',   recusa: '6-meses.html' },
    ds6:    { checkout: 'https://pay.cakto.com.br/7qyfs95', recusa: '3-meses.html' },
    ds3:    { checkout: 'https://pay.cakto.com.br/39j4qgb', recusa: '1-mes.html'   },
    ds1:    { checkout: 'https://pay.cakto.com.br/32vngww',   recusa: 'obrigado.html' }
  }
};

/* ---------------- não precisa mexer daqui pra baixo ---------------- */
(function () {
  // cada proposta sempre abre no topo
  try { history.scrollRestoration = 'manual'; } catch (e) {}
  function topo() { window.scrollTo(0, 0); document.documentElement.scrollTop = 0; document.body.scrollTop = 0; }
  topo();
  window.addEventListener('load', topo);
  window.addEventListener('pageshow', topo);

  var teste = /[?&]btn=1/.test(location.search);
  var qs = (location.search || '').replace(/([?&])btn=1(&|$)/, '$1').replace(/[?&]$/, '');
  function comParams(url) {
    if (!url || url.charAt(0) === '#' || !qs) return url;
    return url + (url.indexOf('?') > -1 ? '&' + qs.slice(1) : qs);
  }

  var etapa = document.body.getAttribute('data-oferta');
  var cfg = FUNIL.ofertas[etapa] || {};

  // liga botões e links de recusa (repassando UTMs/parâmetros da Cakto)
  document.querySelectorAll('[data-aceitar]').forEach(function (a) { a.href = comParams(cfg.checkout); });
  document.querySelectorAll('[data-recusar]').forEach(function (a) { a.href = comParams(cfg.recusa); a.addEventListener('click', topo); });

  // se o HTML da Cakto foi colado, esconde os botões padrão
  var slot = document.querySelector('.cakto-slot');
  if (slot && slot.innerHTML.trim().replace(/<!--[\s\S]*?-->/g, '').trim()) {
    document.querySelectorAll('.padrao').forEach(function (el) { el.classList.add('oculto'); });
  }

  // ---------- carregamento entre propostas ----------
  var ld = document.querySelector('.loader');
  if (ld) {
    var itens = ld.querySelectorAll('li');
    var barra = ld.querySelector('.trilho2 i');
    var total = 3800;
    document.body.style.overflow = 'hidden';
    topo();
    barra.style.transitionDuration = (total - 300) + 'ms';
    setTimeout(function () { barra.style.width = '100%'; }, 50);
    itens.forEach(function (li, i) {
      setTimeout(function () { li.classList.add('ok'); }, 700 + i * ((total - 1200) / itens.length));
    });
    setTimeout(function () {
      topo();
      ld.classList.add('some');
      document.body.style.overflow = '';
      setTimeout(function () { ld.remove(); }, 450);
    }, total);
  }

  // ---------- VSL ----------
  var box = document.querySelector('.video');
  if (!box) return;
  var v = box.querySelector('video');
  var som = box.querySelector('.som');
  var trilho = box.querySelector('.trilho i');
  var chave = 'rango_upsell_liberado';
  var liberado = false;
  var escondidos = document.querySelectorAll('[data-revelar]');

  function revelar() {
    if (liberado) return;
    liberado = true;
    escondidos.forEach(function (el) { el.classList.remove('oculto'); el.classList.add('aparece'); });
    try { localStorage.setItem(chave, '1'); } catch (e) {}
  }
  try { if (localStorage.getItem(chave) === '1') revelar(); } catch (e) {}
  if (teste) revelar();

  v.muted = true;
  var p = v.play(); if (p && p.catch) p.catch(function () {});

  som.addEventListener('click', function () {
    v.currentTime = 0; v.muted = false; v.play();
    som.remove(); som = null;
  });
  v.addEventListener('click', function () {
    if (som) return;
    if (v.paused) { v.play(); box.classList.remove('pausado'); }
    else { v.pause(); box.classList.add('pausado'); }
  });
  box.querySelector('.pausa').addEventListener('click', function () { v.play(); box.classList.remove('pausado'); });

  v.addEventListener('timeupdate', function () {
    // barra de progresso "acelerada" no começo (padrão de VSL)
    var r = v.currentTime / (v.duration || 138);
    trilho.style.width = (Math.pow(r, 0.6) * 100) + '%';
    if (v.currentTime >= FUNIL.segundosParaBotao) revelar();
  });
  v.addEventListener('ended', function () { revelar(); box.classList.add('pausado'); });
})();
