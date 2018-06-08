<template>
    <v-card id="card" color="blue-grey lighten-5">
	<v-card-title>
        <v-layout column align-left class="title blue-grey--text text--darken-1">
          <v-flex xs10> 
            <v-btn absolute right small fab @click.stop="fecharModal()"><v-icon color="pink">close</v-icon></v-btn>
		    <p class="headline">Missão - O que mudou?</p>
          </v-flex>
          <v-divider></v-divider>  
        </v-layout>
    </v-card-title>
    <v-card-text class="text-xs-justify">
        <span class="ml-3 blue-grey--text text--darken-2 subheading">O Plano Estratégico 2018-2022 traz importantes atualizações nos direcionamentos estratégicos da Previ, entre elas a atualização da Missão e dos Valores da entidade. Para fortalecer o conceito do mutualismo, do “construir juntos”, que é parte fundamental da razão de ser da Previ, a Missão passa a ser “Garantir o pagamento de benefícios a todos nós, associados, de forma eficiente, segura e sustentável”.</span>
        <v-layout row wrap py-3>
            <v-flex md6 px-1 my-1>
                <v-card id="card" class="blue-grey--text text--darken-2">
                    <v-card-title class="headline">DE:</v-card-title>
                    <v-card-text class="subheading" style="height:150px; max-height: 150px; overflow-y:auto;">
                        <span> Garantir o pagamento de benefícios aos associados de forma eficiente, segura e sustentável. </span>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex md6 px-1 my-1>
                <v-card id="card" class="blue-grey--text text--darken-2">
                    <v-card-title class="headline">PARA:</v-card-title>
                    <v-card-text class="subheading" style="height:150px; max-height: 150px; overflow-y:auto;"   >
                        <span> Garantir o pagamento de benefícios <b>a todos nós,</b> associados, de forma eficiente, segura e sustentável. </span>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-card-text>
    </v-card>
</template>

<script>
  export default {
    methods: {
      fecharModal () {
        this.$emit('clicked-fechar-modal')
        this.e1 = 0
      }
    }
  }
</script>