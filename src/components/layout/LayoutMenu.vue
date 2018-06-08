<template>
  <v-app>
    <layout-header :req="req" :nomeLogon="nomeLogon()" :foto="perfil.foto"></layout-header>
    <v-divider></v-divider>
    <menunavigation :perfil="perfil"></menunavigation>
    <router-view :perfil="perfil"/>
    <v-divider></v-divider>
    <layoutFooter></layoutFooter>
  </v-app>
</template>

<script>
import LayoutHeader from './headerFooter/LayoutHeader'
import MenuNavigation from './headerFooter/MenuNavigation'
import LayoutFooter from './headerFooter/LayoutFooter'
import GraphService from '@/domain/servicos/microsoftGraph/graphService'

export default {
  data () {
    return {
      req: false,
      perfil: {},
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      dado: ''
    }
  },
  created () {
    this.graphService = new GraphService()
    this.graphService.getPerfil()
        .then(dados => {
          this.perfil = dados
          this.$ga.set('dimension1', this.perfil.gerencia)
          this.$ga.set('dimension2', this.perfil.gerencia)
          this.$ga.set('dimension3', this.perfil.gerencia)
          this.$ga.set('dimension4', this.perfil.gerencia)
          this.$ga.set('dimension5', this.perfil.gerencia)
          this.$ga.set('dimension6', this.perfil.diretoria)
          this.$ga.set('dimension7', this.perfil.nome)
          this.$ga.set('dimension8', this.perfil.nucleo)
        })
    this.graphService.getPerfilFoto()
        .then(dados => {
          var reader = new FileReader()
          reader.onload = function () {
            var x = document.querySelectorAll('#imagemFoto')
            var i
            for (i = 0; i < x.length; i++) {
              x[i].src = reader.result
            }
          }
          reader.readAsDataURL(dados.body)
          this.$set(this, 'req', true)
        })
  },
  components: {
    'layoutFooter': LayoutFooter,
    'layoutHeader': LayoutHeader,
    'menunavigation': MenuNavigation
  },
  methods: {
    nomeLogon: function () {
      this.nomeLogado = []
      this.nomeLogado[0] = (this.perfil.nome !== undefined) ? this.perfil.nome : ''
      this.nomeLogado[1] = (this.perfil.gerencia !== undefined) ? this.perfil.gerencia : ''
      return this.nomeLogado
    }
  },
  name: 'App'
}
</script>
