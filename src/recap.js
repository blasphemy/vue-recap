const recap = {
  install: (Vue, options) => {
    let o = {
      ready: false,
      key: options.Key,
      execute: function (arg) {
        let self = this
        return new Promise((resolve, reject) => {
          let w = function () {
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
    let doWait = function () {
      setTimeout(function () {
        if (typeof window.grecaptcha.execute === 'undefined') {
          doWait()
        } else {
          o.ready = true
        }
      }, 100)
    }
    let init = function () {
      if (options.autoInject) {
        let script = document.createElement('script')
        script.src = 'https://www.google.com/recaptcha/api.js?render=' + options.Key
        script.async = true
        script.onload = doWait
        document.head.appendChild(script)
        Vue.prototype.$recap = o
      } else {
        doWait()
      }
    }
    init()
  }
}

export default recap