apos.define('apostrophe-login-hcaptcha', {
  construct: function(self, options) {
    var $form = $('[data-apos-login-form]');

    if (!$form.length) {
      // Fallback for old templates
      $form = $('.apos-login-page form');
      if ($form.length) {
        if (!$form.attr('action').match(/\/login$/)) {
          $form = [];
        }
      }
    }
    if (!$form.length) {
      // Probably not a login page
      return;
    }

    var $button = $form.find('[data-apos-login-submit-button]');
    if (!$button.length) {
      // Fallback for old templates
      $button = $form.find('input[type="submit"]');
      if (!$button.length) {
        // Template is too far off our standard
        return;
      }
    }
    var $hcaptcha = $('<div></div>');
    $hcaptcha.attr('id', 'aposLoginHcaptcha');
    $hcaptcha.attr('data-size', 'compact');
    $button.before($hcaptcha);

    window.aposLoginRenderHcaptcha = renderCaptcha;
    addHcaptchaScript();

    function addHcaptchaScript () {
      if (document.querySelector('[data-apos-hcaptcha-script]')) {
        renderCaptcha();
        return;
      }
      var refreshable = document.querySelector('[data-apos-refreshable]');
      var hcaptchaScript = document.createElement('script');
      hcaptchaScript.src = 'https://js.hcaptcha.com/1/api.js?onload=aposLoginRenderHcaptcha&render=explicit';
      hcaptchaScript.setAttribute('data-apos-hcaptcha-script', '');
      hcaptchaScript.setAttribute('async', '');
      hcaptchaScript.setAttribute('defer', '');
      refreshable.appendChild(hcaptchaScript);
    }

    function renderCaptcha () {
      window.hcaptcha.render('aposLoginHcaptcha', {
        sitekey: options.hcaptchaSite
      });
    }
  }
});
