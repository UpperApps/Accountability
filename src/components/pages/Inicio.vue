<template>
  <v-layout row >
    <v-flex xl10 offset-xl1 lg10 offset-lg1>
      <jumbotron-paginas :titulo="'Início'"></jumbotron-paginas>
      <dashboard-acoes :perfil="perfil"></dashboard-acoes>
      <card-menu></card-menu>
    </v-flex>
  </v-layout>
</template>

<script>
  import CardMenu from '../CardMenu/CardMenu'
  import DashboardAcoes from '../DashboardAcoes/DashboardAcoes'
  import JumbotronPaginas from '../layout/headerFooter/JumbotronPaginas'

  export default {
    components: {
      'card-menu': CardMenu,
      'dashboard-acoes': DashboardAcoes,
      'jumbotron-paginas': JumbotronPaginas
    },

    props: ['perfil']
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .imagem {
    width: 100%;
    height: 350px;
  }
</style>
