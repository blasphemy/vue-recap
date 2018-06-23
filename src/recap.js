const recap = {
  install: (Vue, Key) => {
    var o = {
      ready: false,
      key: '',
      execute: function (arg) {
        var self = this
        return new Promise((resolve, reject) => {
          var w = function () {
            setTimeout(function () {
              if (!self.ready) {
                w()
              } else {
                resolve(window.grecaptcha.execute(self.key, arg))
              }
            }, 100)
          }
          w()
        })
      }
    }
    var doWait = () => {
      setTimeout(() => {
        if (typeof window.grecaptcha.execute === 'undefined') {
          doWait()
        } else {
          o.ready = true
        }
      }, 100)
    }
    var insertScript = () => {
      var script = document.createElement('script')
      script.src = 'https://www.google.com/recaptcha/api.js?render=' + Key
      script.async = true
      script.onload = doWait
      document.head.appendChild(script)
      o.key = Key
      Vue.prototype.$recap = o
    }
    insertScript()
  }
}

export default recap