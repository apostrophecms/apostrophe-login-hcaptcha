# apostrophe-login-hcaptcha

<div align="center">
  <img src="https://raw.githubusercontent.com/apostrophecms/apostrophe/main/logo.svg" alt="ApostropheCMS logo" width="80" height="80">

  <h1>Apostrophe Login hCaptcha</h1>
  <p>
    <a aria-label="Apostrophe logo" href="https://v2.docs.apostrophecms.org">
      <img src="https://img.shields.io/badge/MADE%20FOR%20Apostrophe%203-000000.svg?style=for-the-badge&logo=Apostrophe&labelColor=6516dd">
    </a>
    <a aria-label="Test status" href="https://github.com/apostrophecms/apostrophe-login-hcaptcha/actions">
      <img alt="GitHub Workflow Status (branch)" src="https://img.shields.io/github/workflow/status/apostrophecms/apostrophe-login-hcaptcha/Tests/main?label=Tests&labelColor=000000&style=for-the-badge">
    </a>
    <a aria-label="Join the community on Discord" href="http://chat.apostrophecms.org">
      <img alt="" src="https://img.shields.io/discord/517772094482677790?color=5865f2&label=Join%20the%20Discord&logo=discord&logoColor=fff&labelColor=000&style=for-the-badge&logoWidth=20">
    </a>
    <a aria-label="License" href="https://github.com/apostrophecms/apostrophe-login-hcaptcha/blob/main/LICENSE.md">
      <img alt="" src="https://img.shields.io/static/v1?style=for-the-badge&labelColor=000000&label=License&message=MIT&color=3DA639">
    </a>
  </p>
</div>

## Installation

To install the module, use the command line to run this command in an Apostrophe project's root directory:

```
npm install apostrophe-login-hcaptcha
```

## Usage

Configure the `apostrophe-login-hcaptcha` module in the `app.js` file:

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

The login page will always display an [hCaptcha](https://docs.hcaptcha.com) prompt, requiring the user to prove they are human before logging in.

## Warnings

If you have extensively overridden the `login.html` template in your project in the past, this module will make a good faith attempt to figure it out. However, if it does not work, you may need to add a `data-apos-login-form` attribute to the form and a `data-apos-login-submit-button` attribute to the submit button. Future overrides will likely include these since they are now in the `loginBase.html` template of Apostrophe.

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
