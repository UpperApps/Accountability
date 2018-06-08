<template>
  <v-layout row >
    <v-flex xl10 offset-xl1 lg10 offset-lg1>
      <jumbotron-paginas :titulo="'ERRO 404'"></jumbotron-paginas>
      <v-layout align-center>
        <v-flex >
          <span class="title">Não achamos a sua página. Acho melhor voltar para o início</span>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import JumbotronPaginas from '../layout/headerFooter/JumbotronPaginas'

export default {
  components: {
    'jumbotron-paginas': JumbotronPaginas
  },
  props: ['perfil']
}
</script>

  