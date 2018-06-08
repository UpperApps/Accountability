<template>
    <v-card id="card" color="blue-grey lighten-5">
	<v-card-title>
        <v-layout column align-left class="title blue-grey--text text--darken-1">
          <v-flex xs10>
            <v-btn absolute right small fab @click.stop="fecharModal()"><v-icon color="pink">close</v-icon></v-btn>
  		    <p class="headline">Valores - O que mudou?</p>
          </v-flex>
          <v-divider></v-divider>          
        </v-layout>        
    </v-card-title>
    <v-card-text class="text-xs-justify">
        <span class="subheading ml-3 blue-grey--text text--darken-2">No caso dos Valores da entidade, houve alteração no valor “Foco no associado”, que passa a ser “Foco do associado”. O valor “Respeito” passa a ser considerado dentro de “Ética” e dois novos valores foram acrescidos: “Inovação” e “Eficiência”. As mudanças refletem o momento da Previ no que se refere ao <strong>relacionamento segmentado</strong> e à <strong>gestão eficiente e eficaz</strong>.</span>
        <v-layout hidden-xs-only mt-3 row wrap>
            <v-flex class="text-xs-center">
              <svgicon icon="barra-iniciativa" width="25" height="8" color="red darken-4"></svgicon>
              <span class="caption ma-1"> Valor retirado </span>
              <svgicon icon="barra-iniciativa" width="25" height="8" color="blue darken-3"></svgicon>
              <span class="caption ma-1"> Valor mantido </span>
              <svgicon icon="barra-iniciativa" width="25" height="8" color="#689F38"></svgicon>
              <span class="caption ma-1"> Valor incluído </span>
            </v-flex>
        </v-layout>
        <v-layout hidden-sm-and-up align-center mt-3 column wrap>
            <v-flex>
              <svgicon icon="barra-iniciativa" width="25" height="8" color="red darken-4"></svgicon>
              <span class="caption ma-1"> Valor retirado </span>
            </v-flex>
            <v-flex>
              <svgicon icon="barra-iniciativa" width="25" height="8" color="blue darken-3"></svgicon>
              <span class="caption ma-1"> Valor mantido </span>
            </v-flex>
            <v-flex>
              <svgicon icon="barra-iniciativa" width="25" height="8" color="#689F38"></svgicon>
              <span class="caption ma-1"> Valor incluído </span>
            </v-flex>
        </v-layout>     
        <v-layout row wrap py-4 px-3 class="text-xs-center">
            <v-flex md6 px-1 my-1>
                <v-card id="card" class="blue-grey--text text--darken-2">
                    <v-card-title class="headline">DE:</v-card-title>
                    <v-card-text class="subheading">
                        <v-chip round text-color="white" color="red darken-4">Foco no Associado</v-chip>
                        <v-chip round text-color="white" color="blue darken-3">Ética</v-chip>
                        <v-chip round text-color="white" color="red darken-4">Respeito</v-chip>
                        <v-chip round text-color="white" color="blue darken-3">Transparência</v-chip>
                        <v-chip round text-color="white" color="blue darken-3">Comprometimento</v-chip>
                        <v-chip round text-color="white" color="blue darken-3">Excelência</v-chip>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex md6 px-1 my-1>
                <v-card id="card" class="blue-grey--text text--darken-2">
                    <v-card-title class="headline">PARA:</v-card-title>
                    <v-card-text class="subheading">
                        <v-chip round text-color="white" color="light-green darken-2">Foco do Associado</v-chip>
                        <v-chip round text-color="white" color="blue darken-3">Ética</v-chip>
                        <v-chip round text-color="white" color="blue darken-3">Transparência</v-chip>
                        <v-chip round text-color="white" color="blue darken-3">Comprometimento</v-chip>
                        <v-chip round text-color="white" color="blue darken-3">Excelência</v-chip>
                        <v-chip round text-color="white" color="light-green darken-2">Inovação</v-chip>
                        <v-chip round text-color="white" color="light-green darken-2">Eficiência</v-chip>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-card-text>
    </v-card>
</template>

<script>
  import '../../compiled-icons/barra-iniciativa'
  import aux from '@/components/funcoesAux'

  export default {
    methods: {
      fecharModal () {
        this.$emit('clicked-fechar-modal')
        this.e1 = 0
      },
      corHexa: function (string) {
        return aux.style_color(string)
      }
    }
  }
</script>