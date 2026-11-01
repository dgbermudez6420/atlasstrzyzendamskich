(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const gallery = document.querySelector('.compact-gallery');
  const track = gallery.querySelector('.compact-track');
  const originals = [...track.querySelectorAll('.compact-card')];
  const pause = gallery.querySelector('.compact-pause');
  let paused = false;
  function copyCard(card) {
    const copy = card.cloneNode(true);
    copy.dataset.clone = 'true';
    copy.setAttribute('aria-hidden', 'true');
    return copy;
  }
  function fillTrack() {
    const group = document.createElement('div');
    group.className = 'compact-group';
    originals.forEach(card => group.append(card));
    const cardWidth = window.innerWidth <= 600 ? 160 : 190;
    const gap = window.innerWidth <= 600 ? 16 : 20;
    const sets = Math.max(1, Math.ceil((window.innerWidth + cardWidth) / (originals.length * (cardWidth + gap))));
    for (let set = 1; set < sets; set++) originals.forEach(card => group.append(copyCard(card)));
    const duplicate = group.cloneNode(true);
    duplicate.classList.add('compact-duplicate');
    duplicate.setAttribute('aria-hidden', 'true');
    track.replaceChildren(group, duplicate);
  }
  fillTrack();
  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(fillTrack, 120); });
  pause.addEventListener('click', () => {
    paused = !paused;
    gallery.classList.toggle('is-paused', paused);
    pause.textContent = paused ? 'Wznów galerię' : 'Zatrzymaj galerię';
    pause.setAttribute('aria-pressed', String(paused));
  });
  gallery.addEventListener('keydown', event => { if (event.key === 'Tab') gallery.classList.add('is-keyboard'); });
  gallery.addEventListener('focusin', event => { if (event.target.matches(':focus-visible')) gallery.classList.add('is-keyboard'); });
  gallery.addEventListener('focusout', () => { setTimeout(() => { if (!gallery.contains(document.activeElement)) gallery.classList.remove('is-keyboard'); }, 0); });
  document.addEventListener('visibilitychange', () => gallery.classList.toggle('is-hidden', document.hidden));
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }); }, { threshold: .08 });
    reveals.forEach(el => observer.observe(el));
  } else reveals.forEach(el => el.classList.add('is-visible'));
})();
