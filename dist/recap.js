'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var recap = {
  install: function install(Vue, options) {
    var o = {
      ready: false,
      key: options.Key,
      execute: function execute(arg) {
        var self = this;
        return new Promise(function (resolve, reject) {
          var w = function w() {
            setTimeout(function () {
              if (!self.ready) {
                w();
              } else {
                resolve(window.grecaptcha.execute(self.key, arg));
              }
            }, 100);
          };
          w();
        });
      }
    };
    var doWait = function doWait() {
      setTimeout(function () {
        if (typeof window.grecaptcha.execute === 'undefined') {
          doWait();
        } else {
          o.ready = true;
        }
      }, 100);
    };
    var init = function init() {
      if (options.autoInject) {
        var script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?render=' + options.Key;
        script.async = true;
        script.onload = doWait;
        document.head.appendChild(script);
        Vue.prototype.$recap = o;
      } else {
        doWait();
      }
    };
    init();
  }
};

exports.default = recap;
