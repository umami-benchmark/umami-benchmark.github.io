/* The Code link appears only after a real anonymous repository URL is configured. */
(() => {
  const script = document.currentScript;
  const configUrl = new URL('site-config.json', script.src);
  const link = document.getElementById('code-repository-link');
  if (!link) return;
  fetch(configUrl, {credentials: 'same-origin'})
    .then(response => response.ok ? response.json() : null)
    .then(config => {
      const value = config?.anonymousCodeUrl?.trim();
      if (!value) return;
      const url = new URL(value);
      if (url.protocol !== 'https:' || url.username || url.password) return;
      link.href = url.href;
      link.setAttribute('aria-label', 'UMAMI anonymous code repository (opens in a new tab)');
      link.hidden = false;
    })
    .catch(() => { /* An unavailable optional link must not interrupt the dataset viewer. */ });
})();
