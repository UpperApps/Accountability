<template>
  <v-layout row wrap>
    <v-flex align-center d-flex v-for="(status, index) in StatusIniciativas" :key="index">
      <svgicon icon="barra-iniciativa" width="25" height="8" :color="corHexa(status.cor)"></svgicon>
      <v-flex class="caption ma-1">{{status.status}}</v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
import {StatusIniciativas} from '../../domain/modelos/StatusIniciativas'
import '../../compiled-icons/barra-iniciativa'
import aux from '@/components/funcoesAux'

export default {
  data () {
    return {
      StatusIniciativas: []
    }
  },
  created () {
    this.StatusIniciativas = StatusIniciativas
  },
  methods: {
    corHexa: function (string) {
      return aux.style_color(string)
    }
  }
}
</script>
