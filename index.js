const request = require('request-promise');

module.exports = {
  afterConstruct: function(self) {
    self.pushAssets();
  },
  construct: function(self, options) {
    self.pushAssets = function() {
      self.pushAsset('script', 'user', {
        when: 'user'
      });
      self.pushAsset('stylesheet', 'user', {
        when: 'user'
      });
    };
    self.checkCaptcha = async function (req, hcaptcha) {
      const hcaptchaSecret = self.getOption(req, 'hcaptchaSecret');
      if (!hcaptchaSecret) {
        self.apos.utils.warnDev('You forgot to configure the hcaptchaSecret option for the apostrophe-login-hcaptcha module.');
      }
      if (!hcaptcha) {
        throw 'Please check the box to confirm you are a human being.';
      }
      const uri = 'https://hcaptcha.com/siteverify';
      const hcaptchaResponse = JSON.parse(await request({
        method: 'POST',
        uri,
        form: {
          response: hcaptcha,
          secret: hcaptchaSecret
        },
        headers: {}
      }));

      if (!hcaptchaResponse.success) {
        throw 'Please check the box to confirm you are a human being.';
      }
    };
    self.on('apostrophe-login:before', 'checkCaptchaOnLoginAttempt', function(req) {
      return self.checkCaptcha(req, req.body['h-captcha-response']);
    });
    self.on('apostrophe-pages:beforeSend', 'createLoginCaptchaSingleton', function(req) {
      self.pushCreateSingleton(req, 'user');
    });
    self.getCreateSingletonOptions = function(req) {
      if (!self.options.hcaptchaSite) {
        self.apos.utils.warnDev('You forgot to configure the hcaptchaSite option for the apostrophe-login-hcaptcha module.');
      }
      return {
        hcaptchaSite: self.options.hcaptchaSite
      };
    };
  }
};
