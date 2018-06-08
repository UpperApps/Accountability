<template>
  <v-layout row >
    <v-flex xl10 offset-xl1 lg10 offset-lg1>
      <jumbotron-paginas :titulo="'Browser Não Suportado'"></jumbotron-paginas>
      <v-layout align-center>
        <v-flex >
          <span class="title">Este site funciona melhor nos Navegadores abaixos:</span>
          <v-list two-line subheader>
            <v-list-tile >
              <v-list-tile-avatar>
                <img src="@/assets/logo-firefox.png" >
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Firefox</v-list-tile-title>
                <v-list-tile-sub-title>Versão: 60.0.1</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile >
              <v-list-tile-avatar>
                <img src="@/assets/logo-edge.png" >
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Edge</v-list-tile-title>
                <v-list-tile-sub-title>Versão: 16.16299</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile >
              <v-list-tile-avatar>
                <img src="@/assets/logo-chrome.png" >
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Chrome</v-list-tile-title>
                <v-list-tile-sub-title>Versão: 66.0.3359</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile >
              <v-list-tile-avatar>
                <img src="@/assets/logo-safari.png" >
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Safari</v-list-tile-title>
                <v-list-tile-sub-title>Versão: 11.1</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import JumbotronPaginas from '../layout/headerFooter/JumbotronPaginas'

export default {
  components: {
    'jumbotron-paginas': JumbotronPaginas
  },
  props: ['perfil']
}
</script>

  