<template>
  <v-layout column>
    <span :id="'objetivo' + objetivo.id"></span>
    <v-flex v-for="diretriz in objetivo.diretrizes" :key="diretriz.id" ma-2>
    <v-expansion-panel expand >
      <v-expansion-panel-content :value="expandirDiretrizes" expand-icon="mdi-arrow-down-drop-circle-outline">
        <div slot="header">
          <v-layout row align-center>
            <v-flex lg10 ml-1 hidden-xs-only>
              <v-btn :color="objetivo.cor + ' lighten-1'" small fab absolute style="left:-20px; top:25%;">
                <svgicon icon="card-check" height="16" width="13" color="white"></svgicon>
              </v-btn>
              <div><span class="title text-lg-left ma-0 indigo--text text--darken-1">{{diretriz.id}}</span><span class="subheading text-lg-left ma-0 indigo--text"> - {{diretriz.nome}}</span></div>
              <span class="grey--text text--darken-3">Responsáveis: 
              <v-chip flat small class="ml-0 blue-grey--text text--darken-2" v-for="responsavel in diretriz.responsaveis" :key="responsavel">{{responsavel}}</v-chip></span>
            </v-flex>
            <v-flex xs10 ml-1 hidden-sm-and-up>
              <v-btn :color="objetivo.cor + ' lighten-1'" small fab absolute style="left:-20px;top:4vw;">
                <svgicon icon="card-check" height="16" width="13" color="white"></svgicon>
              </v-btn>
              <div><span class="body-1 text-lg-left ma-0 indigo--text text--darken-1">{{diretriz.id}}</span><span class="caption text-lg-left ma-0 indigo--text"> - {{diretriz.nome.substr(0,30).concat('...')}}</span></div>
            </v-flex>
            <v-spacer></v-spacer>
            <v-layout column align-end wrap>
            <v-flex align-content-end hidden-xs-only>
              <v-layout row>
                <span v-for="status in statusIniciativas" :key="status.id" v-if="countStatus(diretriz, status) > 0" class="ma-1">
                  <v-tooltip top :color="status.cor"> 
                    <v-avatar  size="25" :color="status.cor" slot="activator">
                      <span :class="status.cor_texto + '--text'">{{countStatus(diretriz, status)}}</span>
                    </v-avatar>
                    <span :class="status.cor_texto + '--text'">{{status.status}}</span>
                  </v-tooltip>
                </span>
              </v-layout>
            </v-flex>
          </v-layout>
          </v-layout>
            <v-layout row align-content-end hidden-sm-and-up>
                <span v-for="status in statusIniciativas" :key="status.id" v-if="countStatus(diretriz, status) > 0">
                  <v-layout column align-right mx-1 pa-0 lighten-4>
                    <v-tooltip top :color="status.cor"> 
                      <v-avatar  size="18" :color="status.cor" slot="activator">
                        <span :class="status.cor_texto + '--text caption'">{{countStatus(diretriz, status)}}</span>
                      </v-avatar>
                      <span :class="status.cor_texto + '--text caption'">{{status.status}}</span>
                    </v-tooltip>
                  </v-layout>
                </span>
          </v-layout>
        </div>
        <v-btn flat color='primary' @click.stop="abrirModalIndicadores(diretriz, objetivo)">
          <v-icon color="indigo darken-1">mdi-chart-line</v-icon> <span class="indigo--text text--darken-1 ml-1">Indicadores da diretriz</span>
        </v-btn>
        <v-flex grey lighten-4 >
          <v-divider v-if="diretriz.iniciativas.length > 0"></v-divider>
          <v-subheader v-if="diretriz.iniciativas.length > 0">Iniciativas</v-subheader>
          <painel-acoes :acoes="diretriz.iniciativas" :objetivo="objetivo" @clicked-show-detail="clickedShowDetailModal"></painel-acoes>
          <v-divider v-if="diretriz.projetos.length > 0"></v-divider>
          <v-subheader v-if="diretriz.projetos.length > 0">Projetos</v-subheader>
          <painel-acoes :acoes="diretriz.projetos" :objetivo="objetivo" @clicked-show-detail="clickedShowDetailModal"></painel-acoes>
        </v-flex>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-divider></v-divider>
    </v-flex>
  </v-layout>
</template>

<script>
import PainelAcoes from '../PainelAcoes/PainelAcoes'
import {StatusIniciativas} from '../../domain/modelos/StatusIniciativas'

export default {
  components: {
    'painel-acoes': PainelAcoes
  },
  props: [ 'objetivo', 'expandirDiretrizes' ],
  data: function () {
    return {
      statusIniciativas: StatusIniciativas
    }
  },
  methods: {
    countStatus: function (diretriz, status) {
      let somaIniciativa = diretriz.iniciativas.reduce(function (prevVal, elem) {
        if (elem.status === status.id) {
          return prevVal + 1
        }
        return prevVal
      }, 0)
      let somaProjetos = diretriz.projetos.reduce(function (prevVal, elem) {
        if (elem.status === status.id) {
          return prevVal + 1
        }
        return prevVal
      }, 0)
      return somaProjetos + somaIniciativa
    },
    clickedShowDetailModal: function (acao, objetivo) {
      this.$emit('clicked-show-detail', acao, objetivo)
    },
    abrirModalIndicadores: function (diretriz, objetivo) {
      this.$emit('clicked-modal-indicadores', diretriz, objetivo)
    }
  }
}
</script>

<style scoped>
  .divider{
    color: lightgray;
    background-color: lightgray;
    border-color: lightgray;
  }
</style>