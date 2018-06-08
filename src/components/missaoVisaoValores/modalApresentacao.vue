<template>
    <v-card  id="card" color="blue-grey lighten-5">
	<v-card-title>
        <v-layout column align-left class="title blue-grey--text text--darken-1">
          <v-btn absolute right small fab @click.stop="fecharModal()"><v-icon color="pink">close</v-icon></v-btn>
		  <p class="headline">{{ tit }} - O que mudou?</p>
          <v-divider></v-divider>
        </v-layout>
    </v-card-title>
    <v-card-text>
        <p class="blue-grey--text text--darken-2 text-lg-justify"> {{ desc }} </p>
        <v-layout row py-4>
            <v-flex lg6 px-1>
                <v-card id="card" class="blue-grey--text text--darken-2">
                    <v-card-title class="headline">DE:</v-card-title>
                    <v-card-text>
                        <v-list v-for="(listaDe, index) in infoOQueMudou.listaDe" :key="index" three-line class="blue-grey--text text--darken-2"><v-divider></v-divider>
                          <v-list-tile> {{ listaDe }} </v-list-tile>
                          <v-divider v-if="index !== listaDe.length"></v-divider>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex lg6 px-1>
                <v-card id="card" class="blue-grey--text text--darken-2">
                    <v-card-title class="headline">PARA:</v-card-title>
                    <v-card-text class="subheading">
                        <v-list v-for="(listaPara, index) in infoOQueMudou.listaPara" :key="index" three-line class="blue-grey--text text--darken-2"><v-divider></v-divider>
                          <v-list-tile> {{ listaPara }} </v-list-tile>
                          <v-divider v-if="index !== listaDe.length"></v-divider>
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
    props: ['tit', 'desc', 'listaDe', 'listaPara'],
    methods: {
      fecharModal () {
        this.$emit('clicked-fechar-modal')
        this.e1 = 0
      }
    }
  }
</script>