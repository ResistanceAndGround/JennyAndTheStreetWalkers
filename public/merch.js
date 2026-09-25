(() => {
  'use strict';
  const config = window.JENNY_CHECKOUT || {};
  const allowed = ['buy.stripe.com', 'square.link', 'checkout.square.site', 'www.paypal.com', 'paypal.com', 'www.paypal.me', 'paypal.me'];
  function checkoutUrl(value) {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && allowed.includes(url.hostname) && !url.username && !url.password ? url.href : null;
    } catch { return null; }
  }
  const available = Object.values(config).some(item => typeof item === 'string' ? !!checkoutUrl(item) : item && Object.values(item).some(value => !!checkoutUrl(value)));
  document.querySelectorAll('[data-product]').forEach(card => {
    const variant = card.querySelector('[data-variant]');
    const button = card.querySelector('.checkout');
    const notice = card.querySelector('.availability');
    function update() {
      const item = config[card.dataset.product];
      const url = checkoutUrl(variant ? item?.[variant.value] : item);
      if (variant) card.querySelector('[data-price]').textContent = '$' + variant.selectedOptions[0].dataset.price;
      button.hidden = !url;
      if (url) {
        button.href = url;
        button.setAttribute('aria-label', 'Buy ' + card.querySelector('h2').textContent + (variant ? ' — ' + variant.selectedOptions[0].textContent : ''));
        notice.textContent = 'Choose available options and complete payment at secure checkout.';
      } else {
        button.removeAttribute('href');
        notice.textContent = 'Online ordering coming soon';
      }
    }
    variant?.addEventListener('change', update);
    update();
  });
  if (available) document.getElementById('shop-notice').textContent = 'Shop securely with Square. Choose your options at checkout, where current availability, delivery details and your final total are shown.';
})();

const bundleChoice=document.querySelector("#bundle-choice");
const bundleCheckout=document.querySelector("#bundle-checkout");
bundleChoice?.addEventListener("change",()=>{bundleCheckout.hidden=!bundleChoice.value;if(bundleChoice.value){bundleCheckout.href=bundleChoice.value;bundleCheckout.textContent="Shop "+bundleChoice.selectedOptions[0].textContent.split(" — ")[0]+" ↗";}else bundleCheckout.removeAttribute("href");});
