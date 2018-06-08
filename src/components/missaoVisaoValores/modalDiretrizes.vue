<template>
  <v-card id="card" color="blue-grey lighten-5">
	  <v-card-title>
      <v-layout column align-left class="title blue-grey--text text--darken-1">
        <v-flex xs11>
          <v-btn absolute right small fab @click.stop="fecharModal()"><v-icon color="pink">close</v-icon></v-btn>
          <p class="headline">Diretrizes - O que mudou?</p>
        </v-flex>
        <v-divider></v-divider>
      </v-layout>
    </v-card-title>
    <v-card-text>
      <span class="ml-3 body-1 text-xs-justify subheading blue-grey--text text--darken-2">Sob cada um dos objetivos houve diversas mudanças nas diretrizes estratégicas, com a inclusão de novos direcionamentos como educação financeira, prospecção de novos públicos e planos, melhoria contínua da governança e controles, estruturação das obrigações da parte BD do Previ Futuro, entre outras atividades.</span>
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