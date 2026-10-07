/* Shared Formspree lifecycle: validated submissions, no duplicate requests. */
window.JennyForms = {
  attach(form, label) {
    if (!form || form.dataset.formAttached) return;
    form.dataset.formAttached = 'true';
    const status = form.querySelector('[role="status"]');
    const button = form.querySelector('button[type="submit"]');
    let pending = false;
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (pending || !form.reportValidity()) return;
      const endpoint = form.action;
      if (!window.JENNY_SITE?.formEndpoints.includes(endpoint)) {
        status.textContent = 'This form is temporarily unavailable. Your entries have not been sent.';
        return;
      }
      if (form.elements.namedItem('_gotcha')?.value) {
        status.textContent = 'We could not send your ' + label + '. Please try again.';
        return;
      }
      pending = true;
      button.disabled = true;
      form.setAttribute('aria-busy', 'true');
      status.textContent = 'Sending…';
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {'Accept': 'application/json'},
          body: new FormData(form)
        });
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
