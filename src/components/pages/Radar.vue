<template>
  <v-layout row>
      <v-flex xl10 offset-xl1 lg10 offset-lg1 mx-auto>
        <jumbotron-paginas :titulo="'Radar da Previ'"></jumbotron-paginas>
        <v-layout row justify-end>
          <v-flex d-flex xl7 lg7 md12 sm12 xs12 mt-3>
            <barra-iniciativas> </barra-iniciativas>
          </v-flex>
        </v-layout>
         <v-layout row align-left wrap>
          <!-- GRÁFICO DE ROSCA MAIOR -->
          <v-flex v-if="unidadeSelecionada==='PREVI'" d-flex>
            <v-layout column align-center ma-1>
              <doughnut :titulo="unidadeSelecionada" :width="320" :height="320" ></doughnut>
            </v-layout>
          </v-flex>
          <v-flex style="cursor: pointer" v-if="unidadeSelecionada===diretoria.diretoria" d-flex v-for="(diretoria) in this.diretorias" :key="diretoria.id" >
            <v-layout column align-center ma-1>
              <doughnut @click.native="unidadeSelecionada = 'PREVI'" :titulo="unidadeSelecionada" :diretoria="diretoria" :width="320" :height="320" ></doughnut>
              <v-btn round flat color="indigo" @click.native="unidadeSelecionada = 'PREVI'">Voltar</v-btn>
            </v-layout>
          </v-flex>
          <v-flex style="cursor: pointer" v-if="unidadeSelecionada===gerencia" d-flex v-for="(gerencia) in this.gerencias" :key="gerencia" >
            <v-layout column align-center ma-1>
              <doughnut @click.native="unidadeSelecionada = voltarDiretoria(gerencia)" :titulo="unidadeSelecionada" :gerencia="gerencia" :width="320" :height="320" ></doughnut>
              <v-btn round flat color="indigo" @click.native="unidadeSelecionada = voltarDiretoria(gerencia)">Voltar</v-btn>
            </v-layout>
          </v-flex>
          <!-- GRÁFICOS DE ROSCA MENORES -->
          <v-flex d-flex lg8 md7 sm12 xs12>
            <v-container grid-list-xs>
              <v-layout row wrap>
                <v-flex style="cursor: pointer" d-flex lg4 xl3 v-if="unidadeSelecionada==='PREVI'" v-for="(diretoria) in this.diretorias" :key="diretoria.id" >
                  <v-layout column align-center ma-1>
                    <doughnut @click.native="unidadeSelecionada = diretoria.diretoria" :diretoria="diretoria" :width="200" :height="200"></doughnut>
                  </v-layout>
                </v-flex>
                <v-flex style="cursor: pointer" d-flex lg4 xl3 v-else-if="unidadeSelecionada===diretoria.diretoria" v-for="(gerencia) in diretoria.gerencias" :key="gerencia" >
                  <v-layout column align-center ma-1>
                    <doughnut @click.native="gerenciaSelecionada(gerencia, diretoria)" :gerencia="gerencia" :width="200" :height="200"></doughnut>
                    <!-- <doughnut :gerencia="gerencia" :width="200" :height="200"></doughnut> -->
                  </v-layout>
                </v-flex>
                <lista-acao-mapa v-if="verificarGerencia()" :gerencia="unidadeSelecionada"
                  @clicked-show-detail="clickedShowDetailModal"></lista-acao-mapa>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>     
      </v-flex>
      <v-dialog  v-model="abrirDialog" max-width="700px" full-width>
        <cardinfo :acao="acaoSelecionada" :objetivo="objetivoSelecionado" @clicked-fechar-modal="clickedFecharModal"></cardinfo>
      </v-dialog>
  </v-layout>
</template>

<script>
import { UnidadeOrganizacional } from '../../domain/modelos/UnidadeOrganizacional'
import Doughnut from '../MapaGraficos/Doughnut'
import JumbotronPaginas from '../layout/headerFooter/JumbotronPaginas'
import BarraIniciativas from '../BarraIniciativas/BarraIniciativas.vue'
import ListaAcaoMapa from '../MapaGraficos/ListaAcaoMapa'
import CardInfo from '../cardmodal/CardInfo'

export default {
  components: {
    'cardinfo': CardInfo,
    'doughnut': Doughnut,
    'jumbotron-paginas': JumbotronPaginas,
    'barra-iniciativas': BarraIniciativas,
    'lista-acao-mapa': ListaAcaoMapa
  },
  data: () => ({
    gerencias: [],
    diretorias: [],
    unidadeSelecionada: 'PREVI',
    acaoSelecionada: undefined,
    objetivoSelecionado: undefined,
    abrirDialog: false
  }),
  methods: {
    clickedShowDetailModal: function (acao, objetivo) {
      this.objetivoSelecionado = objetivo
      this.acaoSelecionada = acao
      this.abrirDialog = true
    },
    clickedFecharModal: function () {
      this.abrirDialog = false
      this.abrirDialogIndicadores = false
    },
    verificarGerencia () {
      return this.gerencias.find(gerencia => gerencia === this.unidadeSelecionada)
    },
    voltarDiretoria (gerencia) {
      return this.diretorias.find(diretoriaf => diretoriaf.gerencias.includes(gerencia)).diretoria
    },
    gerenciaSelecionada (gerencia, diretoria) {
      this.unidadeSelecionada = gerencia
      this.gerencias = this.diretorias.find(diretoriaf => diretoriaf.diretoria === diretoria.diretoria).gerencias
    }
  },
  created () {
    this.diretorias = UnidadeOrganizacional
  }
}
</script>