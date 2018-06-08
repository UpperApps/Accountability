<template>
  <v-layout row v-scroll="onScroll">
    <v-layout hidden-sm-and-down>
    <v-flex d-flex xl2 offset-xl1 lg2 offset-lg1 md3 >
      <v-fab-transition>
        <v-btn v-show="!hidden" fixed fab right dark large absolute style="bottom: 20px;" color="indigo" @click="$vuetify.goTo(0)">
          <v-icon large dark>mdi-arrow-up</v-icon>
        </v-btn>
      </v-fab-transition>
      <v-layout row align-center class="indigo lighten-5 text-xl-center text-lg-center text-md-center" style="height: 120px;">
        <v-flex mx-auto>
          <router-link to="/" ><img src="@/assets/logo-previ.png"></router-link>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex d-flex xl5 lg4 md5>
     <v-layout row align-center class="white">
       <v-flex mx-auto>
          <v-subheader>
            <h2>PLANEJAMENTO ESTRATÉGICO E TÁTICO</h2>
          </v-subheader>
          <v-subheader class="teal--text">Visão 2018 - 2022</v-subheader>
       </v-flex>
     </v-layout>
    </v-flex>
    <v-flex d-flex xl3 lg4 md4>
          <v-layout  column align-right class="white">
            <v-flex lg12 v-if="req" >
              <v-layout row align-center fill-height >
                <v-layout column align-right mr-2>
                  <h4 v-for="(itens,index) in nomeLogon" :key="itens.nome" class="text-xs-right">{{nomeLogon[index]}}</h4>
                  <h6 class="text-xs-right">{{new Date().toLocaleString('pt-br')}}</h6>
                </v-layout>
                <v-avatar>
                  <img id="imagemFoto" src="" class="imagemFoto"/>
                </v-avatar>
                <botaosair></botaosair>
              </v-layout>
            </v-flex>
            <v-flex lg12 v-else mx-auto>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-progress-circular indeterminate color="primary" ></v-progress-circular>
            </v-flex>
            <v-layout column>
              <span class="caption teal--text mx-2 mt-1 text-xs-right"><strong>Versão BETA - Status atualizados em 03/05/2018</strong>
                <v-dialog v-model="abrirDialogBug" fullscreen hide-overlay transition="dialog-bottom-transition" >
                  <span slot="activator" class="red--text text--darken-3">Reporte um Erro <v-icon color="red darken-3">bug_report</v-icon></span>
                  <report-bug @clicked-fechar-modal-bug="clickedFecharModalBug"></report-bug>
                </v-dialog>
                  <!-- <router-link to="/reportBugs" >
                    <span>Reporte um Erro</span>
                    <v-icon color="red darken-2">bug_report</v-icon>
                  </router-link> -->
              </span>
            </v-layout>
          </v-layout>
    </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import BotaoSair from '../../BotaoSair/BotaoSair'
import ReportBugs from '../../pages/reportBugs'

export default {
  data: () => ({
    abrirDialogBug: false,
    hidden: true,
    offsetTop: 0
  }),
  components: {
    'botaosair': BotaoSair,
    'report-bug': ReportBugs
  },
  props: ['req', 'nomeLogon'],
  methods: {
    onScroll (e) {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
      if (this.offsetTop > 100) {
        this.hidden = false
      }
      if (this.offsetTop <= 100) {
        this.hidden = true
      }
    },
    clickedFecharModalBug: function () {
      this.abrirDialogBug = false
    }
  }
}
</script>