<template>
  <v-flex>
    <v-flex xl10 offset-xl1 lg10 offset-lg1>
      <jumbotron-paginas :titulo="'Apresentação'"></jumbotron-paginas>

      <v-container>
        <v-layout wrap>

          <v-flex xl12>
            <v-layout column text-xs-center>
              <span class="display-2 my-1 blue-grey--text text--darken-3"> A importância do Planejamento Estratégico </span>
            </v-layout>
          </v-flex>

          <v-flex xl12 class="py-5">
            <v-layout column align-center>
              <embed-stream></embed-stream>
            </v-layout> 
          </v-flex>

          <v-flex class="py-3" row xl12>
            <v-layout row wrap align-top>
              <v-flex xl4 v-for="fundamento of fundamentos" :key="fundamento.titulo">
                <card-apresentacao 
                  :titulo="fundamento.titulo"
                  :icone="fundamento.icone"
                  :descricao="fundamento.descricao"
                  :infoOQueMudou="fundamento.infoOQueMudou"
                  :infoSaibaMais="fundamento.infoSaibaMais">
                </card-apresentacao>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </v-flex>

          <v-flex xl12>
            <v-layout column text-xs-center>
              <span class="display-2 my-1 blue-grey--text text--darken-3"> O Planejamento Estratégico </span>
            </v-layout>
          </v-flex>

          <v-flex xl12 class="py-5" hidden-sm-and-down>
            <v-layout column align-center>
              <stepper-planejamento style="max-width:1000px"></stepper-planejamento>
            </v-layout>
          </v-flex>

          <v-flex class="py-3" row xl12>
            <v-layout row wrap align-top>
              <v-flex xl4 v-for="descricaoPET of descricoesPET" :key="descricaoPET.titulo">
                <card-apresentacao 
                  :titulo="descricaoPET.titulo"
                  :icone="descricaoPET.icone"
                  :descricao="descricaoPET.descricao"
                  :infoOQueMudou="descricaoPET.infoOQueMudou"
                  :infoSaibaMais="descricaoPET.infoSaibaMais">
                </card-apresentacao>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-flex>
</template>

<script>
import { Fundamentos } from '../../domain/modelos/Fundamentos'
import { DescricaoPET } from '../../domain/modelos/DescricaoPET'
import stepperPlanejamento from '../missaoVisaoValores/stepperPlanejamento'
import cardApresentacao from '../missaoVisaoValores/cardApresentacao'
import JumbotronPaginas from '../layout/headerFooter/JumbotronPaginas'
import tocaVideos from '../tocaVideos/tocaVideos'
import embedStream from '../tocaVideos/embedStream'

export default {
  components: {
    'stepper-planejamento': stepperPlanejamento,
    'jumbotron-paginas': JumbotronPaginas,
    'toca-videos': tocaVideos,
    'embed-stream': embedStream,
    'card-apresentacao': cardApresentacao
  },
  data: () => ({
    fundamentos: [],
    descricoesPET: []
  }),
  created () {
    this.fundamentos = Fundamentos
    this.descricoesPET = DescricaoPET
  }
}
</script>