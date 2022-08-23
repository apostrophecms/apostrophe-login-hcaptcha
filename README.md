# apostrophe-login-hcaptcha

## Usage

```javascript
const apos = require('apostrophe')({
  modules: {
    'apostrophe-login-hcaptcha': {
      hcaptchaSite: 'site-key-from-hcaptcha',
      hcaptchaSecret: 'site-secret-from-hcaptcha'
    }
  }
});
```

## Benefits

The login page will always display an [hCAPTCHA](https://docs.hcaptcha.com) prompt, requiring the user to prove they are human before logging in.

## Warnings

If you have extensively overridden the `login.html` template in your project in the past, this module will make a good faith attempt to figure it out. However, if it does not work, you may need to add a `data-apos-login-form` attribute to the form and a `data-apos-login-submit-button` attribute to the submit button. Future overrides will likely include these since they are now in the `loginBase.html` template of Apostorphe.

### Content security headers

If your site has a content security policy, including if you use the [Apostrophe Security Headers](https://www.npmjs.com/package/apostrophe-security-headers) module, you will need to add additional configuration to use this module. This module adds a script tag to the site's `head` tag fetching hCaptcha code, so we need to allow resources from that domain.

**If you are using the Apostrophe Security Headers module**, add the following policy configuration for that module:

```javascript
module.exports = {
  options: {
    policies: {
      'login-hcaptcha': {
        'script-src': 'hcaptcha.com *.hcaptcha.com',
        'frame-src': 'hcaptcha.com *.hcaptcha.com',
        'style-src': 'hcaptcha.com *.hcaptcha.com',
        'connect-src': 'hcaptcha.com *.hcaptcha.com'
      },
      // Any other policies...
    }
  }
};
```

**If your content security policy is configured some other way**, add `hcaptcha.com  *.hcaptcha.com` to the `script-src`, `frame-src`, `style-src` and `connect-src` directives.

Please refer to the list at https://docs.hcaptcha.com/#content-security-policy-settings for any additional settings.
