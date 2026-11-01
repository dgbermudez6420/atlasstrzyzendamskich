(() => {
  // Remove only selections made by the former on-landing picker, on this origin.
  // Checkout-origin storage, attribution and unrelated stored data are untouched.
  try {
    const key = 'impultienda_upsells';
    const legacyIds = new Set([
      '8facfc72-9954-4b34-a95a-8418e37bf989',
      '5bc2de96-6bf5-4e7e-9e8a-ae209809851e'
    ]);
    const stored = JSON.parse(sessionStorage.getItem(key) || '[]');
    if (Array.isArray(stored)) {
      const kept = stored.filter(id => !legacyIds.has(id));
      if (kept.length !== stored.length) {
        if (kept.length) sessionStorage.setItem(key, JSON.stringify(kept));
        else sessionStorage.removeItem(key);
      }
    }
  } catch (_) { /* Storage can be unavailable; never block the checkout link. */ }
  // The official embed owns live prices and checkout attribution.

  const offer = document.querySelector('#live-offer');
  const status = document.querySelector('#price-status');
  const mainPrice = document.querySelector('[data-main-price]');
  let completed = false;
  const money = value => typeof value === 'number' && Number.isFinite(value) && value > 0;
  const show = (selector, visible) => { document.querySelector(selector).hidden = !visible; };
  function unavailable() {
    if (completed) return;
    offer.setAttribute('aria-busy', 'false');
    mainPrice.textContent = 'Cena dostępna w kasie';
    status.textContent = 'Nie udało się pobrać ceny. Aktualną cenę sprawdzisz po przejściu do kasy.';
  }
  const timeout = window.setTimeout(unavailable, 12000);
  document.addEventListener('impultienda:upsells-ready', event => {
    const data = event.detail || {};
    const main = data.main;
    if (!main || !money(main.price) || !main.price_formatted) { unavailable(); return; }
    completed = true;
    clearTimeout(timeout);
    offer.setAttribute('aria-busy', 'false');
    const discount = money(main.original_price) && main.original_price > main.price && money(main.savings);
    show('#main-original-row', discount);
    show('#main-savings-row', discount);
    const currency = data.store && data.store.currency;
    if (typeof currency === 'string' && /^[A-Z]{3}$/.test(currency)) {
      document.querySelector('#live-currency').textContent = currency;
      show('#currency-row', true);
    }
    status.textContent = 'Aktualna cena z kasy. Zamówienie sprawdzisz przed płatnością.';
  });
})();
