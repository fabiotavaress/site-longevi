/* Longevi · interações leves do site (sem dependências) */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('menu');
  var waFloat = document.querySelector('.wa-float');

  /* Sombra do cabeçalho ao rolar */
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
    /* botão do WhatsApp só aparece depois de rolar a página */
    if (waFloat) waFloat.classList.toggle('is-visible', window.scrollY > 80);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Menu mobile */
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
  }
  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('is-open') && !header.contains(e.target)) setMenu(false);
  });

  /* Animação de entrada dos blocos */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Carrossel de avaliações: passa sozinho, pausa ao passar o mouse/tocar */
  document.querySelectorAll('.reviews-carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.rv-track');
    var cards = track.querySelectorAll('.rv-card');
    var delay = parseInt(carousel.getAttribute('data-autoplay'), 10) || 5000;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var timer = null, hovering = false, focused = false, inView = false;

    function stepSize() {
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return cards[0].getBoundingClientRect().width + gap;
    }
    function go(dir) {
      var max = track.scrollWidth - track.clientWidth;
      if (dir > 0 && track.scrollLeft >= max - 4) track.scrollTo({ left: 0, behavior: 'smooth' });
      else if (dir < 0 && track.scrollLeft <= 4) track.scrollTo({ left: max, behavior: 'smooth' });
      else track.scrollBy({ left: dir * stepSize(), behavior: 'smooth' });
    }
    function stop() { clearInterval(timer); timer = null; }
    function start() {
      stop();
      if (reduceMotion || hovering || focused || !inView || document.hidden) return;
      timer = setInterval(function () { go(1); }, delay);
    }

    carousel.querySelector('.rv-prev').addEventListener('click', function () { go(-1); });
    carousel.querySelector('.rv-next').addEventListener('click', function () { go(1); });
    carousel.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { hovering = true; stop(); } });
    carousel.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { hovering = false; start(); } });
    carousel.addEventListener('focusin', function () { focused = true; stop(); });
    carousel.addEventListener('focusout', function (e) {
      if (!carousel.contains(e.relatedTarget)) { focused = false; start(); }
    });
    track.addEventListener('touchstart', stop, { passive: true });
    track.addEventListener('touchend', start, { passive: true });
    document.addEventListener('visibilitychange', start);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        start();
      }, { threshold: 0.25 }).observe(carousel);
    } else {
      inView = true;
      start();
    }

    /* "Leia mais" só aparece quando o texto foi cortado */
    function updateMore() {
      cards.forEach(function (card) {
        var text = card.querySelector('.rv-text');
        var btn = card.querySelector('.rv-more');
        btn.hidden = !card.classList.contains('is-open') && text.scrollHeight <= text.clientHeight + 2;
      });
    }
    cards.forEach(function (card) {
      var btn = card.querySelector('.rv-more');
      btn.addEventListener('click', function () {
        var open = card.classList.toggle('is-open');
        btn.textContent = open ? 'Leia menos' : 'Leia mais';
        btn.setAttribute('aria-expanded', String(open));
      });
    });
    updateMore();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(updateMore);
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateMore, 150);
    });
  });

  /* Ano no rodapé */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
