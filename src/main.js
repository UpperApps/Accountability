// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
// import authentication from '@/domain/servicos/autenticacao'
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import { faSpinner } from '@fortawesome/fontawesome-free-solid'
import VueSVGIcon from 'vue-svgicon'
import './compiled-icons'

fontawesome.library.add(brands, faSpinner)
Vue.use(Vuetify, {
  theme: {
    primary: colors.indigo.base,
    secondary: colors.blueGrey.lighten1,
    accent: colors.orange.base,
    error: colors.red.base,
    warning: colors.yellow.base,
    info: colors.blue.base,
    success: colors.green.base
  }
})

Vue.use(VueResource)
// Configura de forma centralizada o caminho (path) para o servidor.
var isAzure = process.env.NODE_ENV === 'production'
var endereco = window.location.href
var rootUrl = (isAzure) ? endereco + 'static/data' : 'http://127.0.0.1:3000'
Vue.http.options.root = rootUrl

Vue.use(VeeValidate)

Vue.use(VueSVGIcon)

Vue.config.productionTip = false
// Init adal authentication - then create Vue app.
// authentication.initialize().then(_ => {
//   /* eslint-disable no-new */
//   new Vue({
//     el: '#app',
//     router,
//     components: {
//       App
//     },
//     template: '<App/>'
//   })
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

const { detect } = require('detect-browser')
const browser = detect()

// handle the case where we don't detect the browser
switch (browser && browser.name) {
  case 'chrome':
    if (browser.version.split('.')[0] < 67) {
      router.push('/BrowserNaoSuportado')
    } else {
      router.push('/')
    }
    console.log(browser)
    break
  case 'firefox':
    if (browser.version.split('.')[0] < 60) {
      router.push('/BrowserNaoSuportado')
    } else {
      router.push('/')
    }
    console.log(browser)
    break
  case 'edge':
    if (browser.version.split('.')[0] < 16) {
      router.push('/BrowserNaoSuportado')
    } else {
      router.push('/')
    }
    console.log(browser)
    break
  case 'safari':
    if (browser.version.split('.')[0] < 5) {
      router.push('/BrowserNaoSuportado')
    } else {
      router.push('/')
    }
    console.log(browser)
    break
  default:
    router.push('/BrowserNaoSuportado')
    console.log(browser)
}
