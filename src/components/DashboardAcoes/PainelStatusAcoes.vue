<template>
  <v-container>
    <v-layout row>
      <v-flex lg12>
        <v-flex color="white" elevation-1>
          <v-layout column fill-height>
            <v-layout row wrap>
              <v-layout column ma-2>
                <v-flex>
                <h1 v-if="perfil.gerencia !== undefined" class="headline black--text">{{capitaliza(perfil.gerencia)}}</h1>
                <div class="subheading text-lg-left">
                  <v-layout row align-baseline wrap>
                    <v-flex d-flex mx-auto ma-1>Iniciativas por mês - ano</v-flex>
                    <v-flex d-flex><v-select  :items="listaAnos" v-model="ano" dense flat hide-details></v-select></v-flex>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                  </v-layout>
                </div>
                <div class="caption">Iniciativas e Projetos em que a área é responsável e/ou interveniente</div>
                </v-flex>
              </v-layout>
              <v-layout ma-1>
                <v-spacer></v-spacer>
                <v-flex d-flex>
                <barra-iniciativas></barra-iniciativas>
                </v-flex>
              </v-layout>
            </v-layout>
            <v-layout column hidden-xs-only>
            <v-layout row style="height: 305px" pa-1>
              <div><v-btn small fab flat icon @click="ano = ano - 1" :disabled="esquerda()"><v-icon>mdi-chevron-left</v-icon></v-btn></div>
              <v-flex lg1 id="mes"  v-for="mes in meses" :key="mes.id" d-flex align-end class="grey lighten-4" ma-2 elevation-2>
                <v-layout column>
                  <div v-for="iniciativa in listaMes(mes.id,ano)" :key="iniciativa.id" class="text-xs-center">
                    <v-tooltip bottom>
                      <div style="cursor: pointer" slot="activator" ma-0 pa-0  @click="abrirModal(iniciativa)">
                        <svgicon icon="barra-iniciativa" width="35" height="12" :color="corHexa(iniciativa.getStatus().cor)"></svgicon>
                      </div>
                      <span>{{iniciativa.id}} - {{iniciativa.nome}} <br /></span>
                      <span>Situação: {{iniciativa.getStatus().status}}, termina em {{iniciativa.fim}}.</span>
                    </v-tooltip>
                  </div>
                  <div class="caption text-xs-center">
                  {{mes.mesAbreviado}}
                </div>
                </v-layout>
              </v-flex>
              <div><v-btn small fab flat icon @click="ano = ano + 1" :disabled="direita()"><v-icon>mdi-chevron-right</v-icon></v-btn></div>
            </v-layout>
            <v-flex d-flex mx-auto class="body-1">{{ano}}</v-flex>
            </v-layout>
            <v-layout column pa-1 hidden-sm-and-up align-left>
              <v-flex d-flex mx-auto class="body-1">{{ano}}</v-flex>
              <v-flex d-flex mx-auto><v-btn center small fab flat icon @click="ano = ano - 1" :disabled="esquerda()"><v-icon>mdi-chevron-up</v-icon></v-btn></v-flex>
              <v-flex lg1 id="mes"  v-for="mes in meses" :key="mes.id" d-flex align-end class="grey lighten-4" mb-1 elevation-2>
                <v-layout row align-center>
                  <div class="caption text-xs-center ma-1">
                    {{mes.mesAbreviado}}
                  </div>
                  <v-layout row wrap>
                  <div v-for="iniciativa in listaMes(mes.id,ano)" :key="iniciativa.id" class="text-xs-center">
                    <v-tooltip bottom>
                      <div style="cursor: pointer" slot="activator" ma-0 pa-0  @click="abrirModal(iniciativa)">
                        <v-icon small :color="iniciativa.getStatus().cor">lens</v-icon>
                      </div>
                      <span>{{iniciativa.id}} - {{iniciativa.nome}} <br /></span>
                      <span>Situação: {{iniciativa.getStatus().status}}, termina em {{iniciativa.fim}}.</span>
                    </v-tooltip>
                  </div>
                  </v-layout>
                </v-layout>
              </v-flex>
              <v-flex d-flex mx-auto><v-btn small fab flat icon @click="ano = ano + 1" :disabled="direita()"><v-icon>mdi-chevron-down</v-icon></v-btn></v-flex>
            </v-layout>
          </v-layout>
        </v-flex>
      </v-flex>
    </v-layout>
    <v-dialog v-model="abrirDialog" width="650px">
        <cardinfo :acao="acaoSelecionada" :objetivo="buscaObjetivo(acaoSelecionada)" @clicked-fechar-modal="clickedFecharModal"></cardinfo>
    </v-dialog>
  </v-container>
</template>

<script>
import {Meses} from '../../domain/modelos/Meses'
import CardInfo from '../cardmodal/CardInfo'
import BarraIniciativas from '../BarraIniciativas/BarraIniciativas'
import aux from '@/components/funcoesAux'

export default {
  props: ['objetivos', 'perfil', 'gerencias'],
  components: {
    'cardinfo': CardInfo,
    'barra-iniciativas': BarraIniciativas
  },
  data () {
    return {
      meses: Meses,
      ano: new Date().getFullYear(),
      acaoSelecionada: {},
      abrirDialog: false,
      active: false
    }
  },
  computed: {
    listaAnos: function () {
      var anos = this.objetivos
                  .reduce((preval, objetivo) => preval.concat(objetivo.getListaAnos()), [])
      return [...new Set(anos)]
    }
  },
  methods: {
    corHexa: function (string) {
      return aux.style_color(string)
    },
    capitaliza: function (string) {
      return aux.capitaliza(string)
    },
    buscaObjetivo: function (acao) {
      return this.objetivos.find(obj => obj.diretrizes.find(diretriz => diretriz.iniciativas
      .find(iniciativa => iniciativa.id === acao.id) || diretriz.projetos.find(projeto => projeto.id === acao.id)))
    },
    listaMes: function (mes, ano) {
      var gerenciasFiltrada = this.gerencias.filter(unidade => unidade.diretoria === this.perfil.gerencia)
        .reduce((array, unidade) => { return array.concat(unidade.gerencias) }, [])
      var iniciativas = []
      iniciativas = this.objetivos.reduce(function (preval, objetivo) {
        return preval.concat(objetivo.getAllAcao())
      }, [])
      .filter(iniciativa => (iniciativa.getDataFim().getMonth() === mes && iniciativa.getDataFim().getFullYear() === ano &&
        ((iniciativa.responsaveis.includes(this.perfil.gerencia) || iniciativa.intervenientes.includes(this.perfil.gerencia)) ||
        (iniciativa.responsaveis.find(responsavel => gerenciasFiltrada.includes(responsavel)) ||
        iniciativa.intervenientes.find(responsavel => gerenciasFiltrada.includes(responsavel))) ||
        iniciativa.responsaveis.includes('Toda PREVI') || iniciativa.intervenientes.includes('Toda PREVI'))))
      .sort(function (a, b) {
        var x = a.status
        var y = b.status
        if (x < y) { return -1 }
        if (x > y) { return 1 }
        return 0
      })
      return iniciativas
    },
    esquerda: function () {
      return this.ano === Math.min(...this.listaAnos)
    },
    direita: function () {
      return this.ano === Math.max(...this.listaAnos)
    },
    abrirModal: function (acao) {
      this.acaoSelecionada = acao
      this.abrirDialog = true
    },
    clickedFecharModal: function () {
      this.abrirDialog = false
    },
    mouseOver: function () {
      this.active = !this.active
    }
  }
}
</script>

<style scoped>
#mes {
  border-radius: 5px 5px 5px 5px;
}
</style>
