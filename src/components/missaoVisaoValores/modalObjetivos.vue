<template>
  <v-card id="card" color="blue-grey lighten-5">
	<v-card-title>
      <v-layout column align-left class="title blue-grey--text text--darken-1">
        <v-flex xs11>
          <v-btn absolute right small fab @click.stop="fecharModal()"><v-icon color="pink">close</v-icon></v-btn>
		      <p class="headline">Objetivos - O que mudou?</p>
        </v-flex>
        <v-divider></v-divider>
      </v-layout>
    </v-card-title>
    <v-card-text class="text-xs-justify">
      <span class="subheading ml-3 blue-grey--text text--darken-2">Os objetivos estratégicos continuam sendo quatro, contudo houve ajustes para melhor adequação aos desafios que se colocam à Previ. As principais mudanças dizem respeito à definição clara do relacionamento com associados de acordo com os segmentos já identificados e ao aumento do foco no equilíbrio do passivo do Previ Futuro, além da maximização dos benefícios. No Plano 1, há um reforço no equilíbrio como grande meta, devendo a gestão de ativos e passivos estar alinhada a essa direção. No âmbito interno, a <strong>gestão eficiente e eficaz</strong> permanece como objetivo estratégico, focando a sustentabilidade administrativa e a inovação operacional.</span>
      <v-layout row wrap py-3 px-3>
        <v-flex md6 px-1 my-1>
          <v-card id="card" class="blue-grey--text text--darken-2">
              <v-card-title class="headline">DE:</v-card-title>
              <v-card-text class="subheading">
                <v-list three-line class="blue-grey--text text--darken-2"><v-divider></v-divider>
                  <p>Fortalecimento na relação com os associados com soluções adequadas a cada perfil</p><v-divider></v-divider>
                  <p>Gestão eficiente e eficaz</p><v-divider></v-divider>
                  <p>Balanceamento da gestão de investimentos com as necessidades do passivo do Plano 1</p><v-divider></v-divider>
                  <p>Maximização do benefício do participante do Plano Previ Futuro dado seu perfil de risco</p>
                </v-list>
              </v-card-text>
          </v-card>
        </v-flex>
        <v-flex md6 px-1 my-1>
          <v-card id="card" class="blue-grey--text text--darken-2">
            <v-card-title class="headline">PARA:</v-card-title>
            <v-card-text class="subheading">
              <v-list three-line class="blue-grey--text text--darken-2"><v-divider></v-divider>
                <p>Fortalecimento na relação com os associados com soluções adequadas a cada segmento</p><v-divider></v-divider>
                <p>Gestão eficiente e eficaz</p><v-divider></v-divider>
                <p>Balanceamento da gestão de ativos e passivos visando ao equilíbrio do Plano 1</p><v-divider></v-divider>
                <p>Maximização dos benefícios e equilíbrio do plano Previ Futuro</p>
              </v-list>
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