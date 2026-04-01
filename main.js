(function () {
  'use strict';

  var slides       = document.querySelectorAll('.hero-slide');
  var currentEl    = document.querySelector('.current-slide');
  var prevBtn      = document.querySelector('.hero-prev');
  var nextBtn      = document.querySelector('.hero-next');
  var sliderEl     = document.querySelector('.hero-slider');

  var total        = slides.length;
  var current      = 0;
  var autoInterval = null;
  var AUTO_DELAY   = 5000; // ms

  function goTo(index) {
    slides[current].classList.remove('active');
    current = (index + total) % total;
    slides[current].classList.add('active');
    if (currentEl) {
      currentEl.textContent = current + 1;
    }
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    stopAuto();
    autoInterval = setInterval(next, AUTO_DELAY);
  }

  function stopAuto() {
    if (autoInterval !== null) {
      clearInterval(autoInterval);
      autoInterval = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      stopAuto();
      next();
      startAuto();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      stopAuto();
      prev();
      startAuto();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { stopAuto(); next(); startAuto(); }
    if (e.key === 'ArrowLeft')  { stopAuto(); prev(); startAuto(); }
  });

  // Touch/swipe support
  var touchStartX = null;

  if (sliderEl) {
    sliderEl.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    sliderEl.addEventListener('touchend', function (e) {
      if (touchStartX === null) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        stopAuto();
        if (dx < 0) { next(); } else { prev(); }
        startAuto();
      }
      touchStartX = null;
    }, { passive: true });
  }

  // Start auto-play
  startAuto();
}());
