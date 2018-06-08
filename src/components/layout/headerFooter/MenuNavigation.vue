<template>
  <v-layout row wrap>
    <v-flex xl10 offset-xl1 lg10 offset-lg1 hidden-sm-and-down>        
        <v-tabs v-model="tab">
          <v-tabs-slider color="teal"></v-tabs-slider>
          <v-tab v-for="item in items" :key="item.title" :to="item.link">
            {{ item.title }}
          </v-tab>
        </v-tabs>
    </v-flex>
    <v-flex hidden-md-and-up color="white">
      <v-fab-transition>
        <v-btn v-show="!hidden" fixed fab right dark absolute style="bottom: 20px;" color="indigo" @click="$vuetify.goTo(0)">
          <v-icon dark>mdi-arrow-up</v-icon>
        </v-btn>
      </v-fab-transition>
      <v-card flat>
        <v-card-title>
        <img id="logo" src="@/assets/logo-previ.png"/>
        <v-spacer></v-spacer>
        <v-btn icon flat color="indigo" @click.stop="dialog = true"><v-icon>mdi-menu</v-icon></v-btn>
      </v-card-title>
      </v-card>
       <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
          <v-card>
            <v-toolbar height="80" light color="white">
          <v-toolbar-title>
            <img id="logo" src="@/assets/logo-previ.png"/></v-toolbar-title>
          <v-spacer></v-spacer>
            <v-btn icon flat color="indigo" @click.native="dialog = false">
              <v-icon round >close</v-icon>
            </v-btn>
        </v-toolbar>
            <v-list class="pt-0" dense>
              <v-divider></v-divider>
              <v-list-tile v-for="item in items" :key="item.title" :to="item.link" @click.native="dialog = false">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-toolbar flat class="transparent">
              <v-list class="pa-0">
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <img  id="imagemFoto" class="imagemFoto" src="" >
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{perfil.nome}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              <botaosair></botaosair>
            </v-toolbar>  
          </v-card>
       </v-dialog>
      <v-layout column white>
        <span class="body-1 grey--text text--darken-2 ml-2">Planejamento Estratégico e Tático - V.Beta 03/05/2018</span>
        <span class="caption teal--text ml-2">Visão 2018 - 2022</span>
      </v-layout>
    </v-flex>
  </v-layout>    
</template>

<script>
import BotaoSair from '../../BotaoSair/BotaoSair'
export default {
  props: ['perfil'],
  components: {
    'botaosair': BotaoSair
  },
  data () {
    return {
      dialog: false,
      tab: null,
      hidden: true,
      offsetTop: 0,
      items: [
        {
          title: 'INÍCIO',
          link: '/',
          icone: 'mdi-source-commit-start'
        },
        {
          title: 'APRESENTAÇÃO',
          link: '/apresentacao',
          icone: 'mdi-presentation-play'
        },
        {
          title: 'CONHEÇA AS INICIATIVAS',
          link: '/iniciativas',
          icone: 'mdi-lightbulb-on-outline'
        },
        {
          title: 'RADAR DA PREVI',
          link: '/radar',
          icone: 'settings'
        },
        {
          title: 'LINHA DO TEMPO',
          link: '/linha-tempo',
          icone: 'fas fa-tasks'
        }
      ]
    }
  },
  methods: {
    onScroll (e) {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
      if (this.offsetTop > 100) {
        this.hidden = false
      }
      if (this.offsetTop <= 100) {
        this.hidden = true
      }
    }
  }
}
</script>
<style scoped>
  #logo {
    width: 140px;
    height: auto;
}
</style>
