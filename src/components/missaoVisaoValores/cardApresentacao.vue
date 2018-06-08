<template>
  <v-container fluid grid-list-md>
    <v-layout>
      <v-flex xl2 lg1 xs3 hidden-md-and-down>
        <v-btn color="white" fab large dark @click.native="saibaMais = !saibaMais">
          <v-icon color="pink darken-1"> {{ icone }} </v-icon>
        </v-btn>
      </v-flex>
      <v-flex md1 xs3 hidden-lg-and-up hidden-sm-and-down class="mr-3">
        <v-btn color="white" fab large dark @click.native="saibaMais = !saibaMais">
          <v-icon color="pink darken-1"> {{ icone }} </v-icon>
        </v-btn>
      </v-flex>

      <v-flex class="pl-3" xl12>
        <v-layout hidden-sm-and-up align-center> 
          <v-btn class="mx-auto" color="white" fab large dark @click.native="saibaMais = !saibaMais">
            <v-icon color="pink darken-1"> {{ icone }} </v-icon>
          </v-btn>          
        </v-layout>
        <v-flex hidden-sm-and-up text-xs-center>
          <span class="display-1 blue-grey--text text--darken-3"> {{ titulo }} </span>
        </v-flex>
        <v-flex hidden-xs-only>
          <span class="display-1 blue-grey--text text--darken-3"> {{ titulo }} </span>
        </v-flex>

        <v-flex v-if="titulo==='Valores'" class="pt-3">
          <v-layout row wrap class="body-1 blue-grey--text text--darken-3">
            <v-flex class="text-xs-center">
              <v-chip v-for="(descricao, index) of descricao" :key="index" outline round color="indigo lighten-1"> {{ descricao }} </v-chip>
            </v-flex>
          </v-layout>            
        </v-flex>          
        <v-flex v-else class="pt-3 text-xs-justify">
          <span class="ml-2 body-1 blue-grey--text text--darken-3"> {{ descricao }} </span>
        </v-flex>        

        <v-flex text-xs-right mt-2>
          <v-btn v-if="infoOQueMudou" round flat class="blue-grey lighten-5 indigo--text" @click.native.stop="oQueMudou = true">O Que Mudou<v-icon small color="gray">mdi-help</v-icon></v-btn>
          <v-btn v-if="infoSaibaMais" round flat class="blue-grey lighten-5 indigo--text" @click.native="saibaMais = !saibaMais" >Saiba Mais<v-icon medium color="gray">{{ !saibaMais ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon></v-btn>
        </v-flex>

        <v-slide-y-transition v-if="infoSaibaMais!==undefined">
          <v-card id="card">
            <v-card-text v-show="saibaMais" class="body-2 blue-grey--text text--darken-3 text-xs-justify" style="font-style: italic;">
              <span class="ml-2"> {{ infoSaibaMais }} </span>
            </v-card-text>
          </v-card>
        </v-slide-y-transition>
      </v-flex>
    </v-layout>

    <v-dialog v-model="oQueMudou" max-width="900px">
      <v-layout row>
        <modal-missao v-if="titulo==='Missão'" @clicked-fechar-modal="clickedFecharModal"></modal-missao>
        <modal-valores v-if="titulo==='Valores'" @clicked-fechar-modal="clickedFecharModal"></modal-valores>
        <modal-objetivos v-if="titulo==='Objetivos Estratégicos'" @clicked-fechar-modal="clickedFecharModal"></modal-objetivos>
        <modal-diretrizes v-if="titulo==='Diretrizes'" @clicked-fechar-modal="clickedFecharModal"></modal-diretrizes>
        <!--modal-apresentacao v-if="titulo!=='Valores'" @clicked-fechar-modal="clickedFecharModal"
          :tit="titulo"
          :desc="infoOQueMudou.descricao"
          :listaDe="infoOQueMudou.listaDe"
          :listaPara="infoOQueMudou.listaPara">
        </modal-apresentacao-->
      </v-layout>
    </v-dialog>         
  </v-container>  
</template>

<script>
import modalMissao from '../missaoVisaoValores/modalMissao'
import modalValores from '../missaoVisaoValores/modalValores'
import modalObjetivos from '../missaoVisaoValores/modalObjetivos'
import modalDiretrizes from '../missaoVisaoValores/modalDiretrizes'

export default {
  props: ['titulo', 'icone', 'descricao', 'infoOQueMudou', 'infoSaibaMais'],
  data: () => ({
    saibaMais: false,
    oQueMudou: false
  }),
  components: {
    'modal-missao': modalMissao,
    'modal-valores': modalValores,
    'modal-objetivos': modalObjetivos,
    'modal-diretrizes': modalDiretrizes
  },
  methods: {
    clickedFecharModal: function () {
      this.oQueMudou = false
    }
  }
}
</script>