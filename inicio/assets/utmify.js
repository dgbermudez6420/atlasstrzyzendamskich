(() => {
  const KEY = 'schnittatlas_marketing_consent_v1';
  const panel = document.getElementById('cookie-panel');
  let loaded = false;
  function choice() { try { return localStorage.getItem(KEY); } catch { return null; } }
  function save(value) { try { localStorage.setItem(KEY, value); } catch {} }
  function loadMarketing() {
    if (loaded) return;
    loaded = true;
    window.pixelId = '6adcf30e0a3295fab49502f5';
    for (const [src, utms] of [['https://cdn.utmify.com.br/scripts/pixel/pixel.js', false], ['https://cdn.utmify.com.br/scripts/utms/latest.js', true]]) {
      const script = document.createElement('script');
      script.src = src; script.async = true; script.defer = true;
      if (utms) script.setAttribute('data-utmify-prevent-subids', '');
      document.head.append(script);
    }
  }
  function openSettings() { panel.hidden = false; document.getElementById('cookie-title').focus(); }
  document.getElementById('cookie-accept').addEventListener('click', () => {
    save('accepted'); panel.hidden = true; loadMarketing();
  });
  document.getElementById('cookie-reject').addEventListener('click', () => {
    save('rejected'); panel.hidden = true;
    if (loaded) location.reload();
  });
  document.getElementById('cookie-settings').addEventListener('click', openSettings);
  window.addEventListener('storage', event => {
    if (event.key === KEY && loaded && event.newValue !== 'accepted') location.reload();
  });
  if (choice() === 'accepted') { panel.hidden = true; loadMarketing(); }
  else if (choice() === 'rejected') panel.hidden = true;
})();
