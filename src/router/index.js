import Vue from 'vue'
import Router from 'vue-router'
import LayoutMenu from '@/components/layout/LayoutMenu'
import Inicio from '@/components/pages/Inicio'
import Erro404 from '@/components/pages/Erro404'
import Iniciativas from '@/components/pages/Iniciativas'
import Radar from '@/components/pages/Radar'
import LinhaTempo from '@/components/pages/LinhaTempo'
import Apresentacao from '@/components/pages/Apresentacao'
import authentication from '@/domain/servicos/autenticacao'
import VueAnalytics from 'vue-analytics'
import BrowserNaoSuportado from '@/components/pages/BrowserNaoSuportado'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: LayoutMenu,
      meta: {
        requiresAuthentication: true
      },
      children: [
        { path: '', component: Inicio, name: 'inicio', title: 'Início', menu: true },
        { path: '/apresentacao', component: Apresentacao, name: 'apresentacao', title: 'Apresentação', menu: true },
        { path: '/iniciativas', component: Iniciativas, name: 'iniciativas', title: 'Conheças as Iniciativas', menu: true },
        { path: '/radar', component: Radar, name: 'radar', title: 'Radar da Previ', menu: true },
        { path: '/linha-tempo', component: LinhaTempo, name: 'linha-tempo', title: 'Linha do Tempo', menu: true },
        { path: '/BrowserNaoSuportado', component: BrowserNaoSuportado, name: 'browser-nao-suportado', title: 'Browser Não Suportado', menu: false }
      ]
    },
    { // Always leave this as last one
      path: '*',
      component: LayoutMenu,
      children: [
        { path: '', component: Erro404, name: 'erro404', title: 'Erro 404', menu: false }
      ]
    }
  ],
  mode: 'history' // Caso o servidor suporte, remove o # da URL da aplicação.
})
// Global route guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuthentication)) {
    // this route requires auth, check if logged in
    if (authentication.isAuthenticated()) {
      // only proceed if authenticated.
      next()
    } else {
      authentication.signIn()
    }
  } else {
    next()
  }
})

Vue.use(VueAnalytics, {
  id: ['UA-118908484-1', 'UA-118873840-1'],
  router
})
export default router
