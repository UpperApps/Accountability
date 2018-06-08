<template>
    <v-layout row wrap>
      <v-flex lg4 pa-3 v-for="acao in acoes" :key="acao.id">
      <v-flex id="cardIniciativas" elevation-2 :style="'border-left: 10px solid ' + (objetivo === undefined ? '#FFFFFF' : corHexa(objetivo.cor)) + ' !important;'">
        <v-layout column fill-height>
        <v-container>
          <v-flex d-flex mx-auto id="cardIniciativas" absolute :style="'background:' + (objetivo === undefined ? '#FFFFFF' : corHexa(objetivo.cor + ' lighten-5'))"><span class="subheading text-xs-center blue-grey--text text--darken-3" >{{ acao.id }}</span></v-flex>
          <v-layout row align-center wrap ma-1>
            <v-flex class="title blue-grey--text text-lg-center" >{{ acao.nome }}</v-flex>
          </v-layout>
          <v-layout column align-left>
            <v-divider></v-divider>
            <v-layout align-center>
              <v-flex lg4>
                <span class="blue-grey--text text--lighten-1">Responsáveis:</span>
              </v-flex>
              <v-flex lg8>
                <v-chip color="white" label small class="ml-0 blue-grey--text text--darken-1" v-for="responsavel in acao.responsaveis" :key="responsavel">{{capitaliza(responsavel)}}</v-chip>
              </v-flex>
            </v-layout>
            <v-layout row align-baseline>
              <v-flex lg4>
                <span class="blue-grey--text text--lighten-1">Intervenientes:</span>
              </v-flex>
              <v-flex lg8>
                <template v-for="interveniente in acao.intervenientes">
                <v-tooltip :key="interveniente" bottom>
                <v-chip color="white" label small class="ma-0 blue-grey--text text--darken-1" slot="activator">{{resumo(capitaliza(interveniente))}}</v-chip>
                <span>{{interveniente}}</span>
                </v-tooltip>
                </template>
              </v-flex>
            </v-layout>
            <v-layout wrap align-center>
              <v-flex lg4>
                <span class="blue-grey--text text--lighten-1">Status:</span>
              </v-flex>
              <v-flex lg8>
                <v-chip color="white" label small light flat :text-color="acao.getStatus().cor"><v-icon :color="acao.getStatus().cor">{{acao.getStatus().icone}}</v-icon><span class="ma-1">{{acao.getStatus().status}}</span></v-chip>
              </v-flex>
            </v-layout>
          </v-layout>
        </v-container>
        <v-layout row ma-1>
          <v-btn flat small round color="indigo" @click.stop="abrirModal(acao, objetivo)"><v-icon color="indigo darken-1">mdi-information-variant</v-icon> <span ml-1 class="indigo--text text--darken-1">Saiba Mais</span></v-btn>
        </v-layout>
        </v-layout>
        </v-flex>
      </v-flex>
    </v-layout>
</template>

<script>
import aux from '@/components/funcoesAux'

export default {
  props: ['acoes', 'objetivo'],
  data: function () {
    return {
      acaoSelecionada: {}
    }
  },
  methods: {
    abrirModal: function (acao, objetivo) {
      this.acaoSelecionada = acao
      this.$emit('clicked-show-detail', acao, objetivo)
    },
    corHexa: function (string) {
      return string === undefined ? '#FFFFFF' : aux.style_color(string)
    },
    resumo: function (string) {
      return aux.resumo(string, 30)
    },
    capitaliza: function (string) {
      return aux.capitaliza(string)
    }
  }
}
</script>
<style scoped>
#cardIniciativas {
  border-radius: 10px;
  border-left: 10px;
  background-color: white
}

</style>
