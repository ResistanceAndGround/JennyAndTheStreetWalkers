/* Shared form lifecycle: explicit service configuration, no duplicate requests. */
window.JennyForms = {
  attach(form, label) {
    if (!form) return;
    const status = form.querySelector('[role="status"]');
    const button = form.querySelector('button[type="submit"]');
    const preview = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname) || location.hostname.endsWith('.github.io') || location.protocol === 'file:';
    const enabled = !preview && window.JENNY_SITE?.netlifyFormsEnabled === true;
    // Preview controls remain testable, but never send personal data.
    button.disabled = false;
    status.textContent = enabled ? '' : 'Preview only — online ' + label + ' is not enabled yet. Nothing will be sent.';
    let pending = false;
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (pending || !form.reportValidity()) return;
      if (!enabled) { status.textContent = 'Preview only — your information has not been sent.'; return; }
      pending = true;
      button.disabled = true;
      form.setAttribute('aria-busy', 'true');
      status.textContent = 'Sending…';
      try {
        const response = await fetch(location.pathname, {method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'}, body: new URLSearchParams(new FormData(form)).toString()});
        if (!response.ok) throw new Error('Submission failed');
        form.reset();
        status.textContent = 'Thank you! Your ' + label + ' has been received.';
      } catch {
        status.textContent = 'We could not send your ' + label + '. Your entries are still here; please try again.';
      } finally {
        pending = false;
        button.disabled = false;
        form.removeAttribute('aria-busy');
      }
    });
  }
};
