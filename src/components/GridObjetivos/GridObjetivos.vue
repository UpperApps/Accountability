<template>
  <v-container fluid grid-list-xs>
    <v-layout row wrap pa-0 ma-0>
      <v-flex mx-auto xl3 lg3 md5 xs9 v-for="objetivo of objetivosFiltrado" :key="objetivo.id" wrap>
          <card-objetivos :objetivo="objetivo">
          </card-objetivos>
      </v-flex>
    </v-layout>  
  </v-container>
</template>

<script>
  import CardObjetivos from './CardObjetivos.vue'

  export default {
    components: {
      'card-objetivos': CardObjetivos
    },
    props: ['objetivosFiltrado']
  }
</script>
