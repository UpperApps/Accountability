<template>
  <v-layout column mt-3 mb-2>
    <v-layout row wrap>
      <v-flex lg1 v-for="acao in acoesDaGerencia()" :key="acao.id" ma-2>
        <v-tooltip bottom> 
          <v-btn fab large outline slot="activator"
          :style="'cursor: pointer;border: 2px solid; border-bottom: 15px solid; ' + acao.getStatus().corChart + ' !important;'" :color="acao.getStatus().cor" class="elevation-4" @click.stop="abrirModal(acao)">
            <v-layout column align-center>
              <v-layout row align-center>
                <span class="blue-grey--text text--darken-2 subheading text-xs-center mb-2"><strong>{{acao.id}}</strong></span>
              </v-layout>
            </v-layout>
          </v-btn> 
          <span>{{acao.nome}}</span>
        </v-tooltip>
      </v-flex>    
    </v-layout>
  </v-layout>
</template>

<script>
import ObjetivoService from '../../domain/servicos/ObjetivoService'
import { StatusIniciativas } from '../../domain/modelos/StatusIniciativas'

export default {
  props: ['gerencia'],
  data: () => ({
    status: [],
    objetivos: []
  }),
  methods: {
    acoesDaGerencia () {
      var resultTotalAcao = []
      resultTotalAcao = this.objetivos.reduce(function (preval, objetivo) {
        return preval.concat(objetivo.getAllAcao())
      }, [])
      resultTotalAcao = resultTotalAcao.filter(acao =>
        acao.responsaveis.includes(this.gerencia) || acao.intervenientes.includes(this.gerencia) ||
        acao.responsaveis.includes('Toda PREVI') || acao.intervenientes.includes('Toda PREVI')
      )
      resultTotalAcao.sort(function (a, b) { return a.getStatus().id - b.getStatus().id })
      return resultTotalAcao
    },
    pegarObjetivo (acao) {
      return this.objetivos.find(objetivo => objetivo.getAllAcao().includes(acao))
    },
    abrirModal: function (acao) {
      this.acaoSelecionada = acao
      this.$emit('clicked-show-detail', acao, this.pegarObjetivo(acao))
    }
  },
  created () {
    this.status = StatusIniciativas
    this.objetivoService = new ObjetivoService(this.$resource)

    this.objetivoService
      .lista()
      .then(objetivos => {
        this.objetivos = objetivos
      }, err => console.log(err))
  }
}
</script>
