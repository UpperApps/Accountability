<template>
  <div class="div-grafico">
    <doughnut-chart :chart-data="datacollection" :width="width" :height="height" :options="myOptions"> </doughnut-chart>
    <div class="titulo-grafico">
      <div v-if="titulo">
        <p class="fonte-titulo-a">{{ titulo }}</p>
        <p class="fonte-titulo-b">{{ totalAcao(diretoria, gerencia).length }}</p>
      </div>
      <div v-else-if="gerencia===undefined" >
        <p class="fonte-titulo-b">{{ diretoria.diretoria }}</p>
        <p class="fonte-titulo-c">{{ totalAcao(diretoria, gerencia).length }}</p>
      </div>
      <div v-else >
        <p class="fonte-titulo-b">{{ gerencia }}</p>
        <p class="fonte-titulo-c">{{ totalAcao(diretoria, gerencia).length }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import DoughnutChart from './DoughnutChart.js'
import ObjetivoService from '../../domain/servicos/ObjetivoService'
import { StatusIniciativas } from '../../domain/modelos/StatusIniciativas'

export default {
  props: ['diretoria', 'gerencia', 'width', 'height', 'titulo'],
  components: {
    'doughnut-chart': DoughnutChart
  },
  data: () => ({
    status: [],
    objetivos: [],
    datacollection: null,
    myOptions: {
      cutoutPercentage: 90,
      legend: {
        display: false
      }
    }
  }),
  methods: {
    totalAcao: function (diretoria, gerencia) {
      var resultTotalAcao = []
      resultTotalAcao = this.objetivos.reduce(function (preval, objetivo) {
        return preval.concat(objetivo.getAllAcao())
      }, [])
      if (gerencia) {
        resultTotalAcao = resultTotalAcao.filter(acao =>
          acao.responsaveis.includes(gerencia) || acao.intervenientes.includes(gerencia) ||
          acao.responsaveis.includes('Toda PREVI') || acao.intervenientes.includes('Toda PREVI')
        )
      } else if (diretoria) {
        resultTotalAcao = resultTotalAcao.filter(acao =>
          acao.responsaveis.find(responsavel => diretoria.gerencias.includes(responsavel)) ||
          acao.intervenientes.find(responsavel => diretoria.gerencias.includes(responsavel)) ||
          acao.responsaveis.find(responsavel => responsavel === 'Toda PREVI') ||
          acao.intervenientes.find(responsavel => responsavel === 'Toda PREVI')
        )
      }
      return resultTotalAcao.sort(function (a, b) { return a.getStatus().id - b.getStatus().id })
    },
    todosStatus: function (diretoria, gerencia) {
      return this.totalAcao(diretoria, gerencia).reduce(function (status, acao) {
        if (!status.includes(acao.status)) { status = status.concat(acao.status) }
        return status
      }, [])
    },
    pegarStatus: function (statusID) {
      return this.status.find(status => status.id === statusID)
    },
    acaoPorStatus: function (status, diretoria, gerencia) {
      return this.totalAcao(diretoria, gerencia).filter(acao => acao.status === status).length
    },
    totalAcaoPorStatus: function (diretoria, gerencia) {
      var resultTotalAcaoPorStatus = []
      this.todosStatus(diretoria, gerencia).forEach(statusId => {
        resultTotalAcaoPorStatus.push(this.acaoPorStatus(statusId, diretoria, gerencia))
      })
      return resultTotalAcaoPorStatus
    },
    fillData (diretoria, gerencia) {
      this.datacollection = {
        labels: [],
        datasets: [
          {
            label: [],
            backgroundColor: [],
            data: []
          }
        ]
      }
      this.$set(this.datacollection, 'labels', this.todosStatus(diretoria, gerencia).map(statusId => this.pegarStatus(statusId).status))
      this.$set(this.datacollection.datasets[0], 'label', this.todosStatus(diretoria, gerencia).map(statusId => this.pegarStatus(statusId).id))
      this.$set(this.datacollection.datasets[0], 'backgroundColor', this.todosStatus(diretoria, gerencia).map(statusId => this.pegarStatus(statusId).corChart))
      this.$set(this.datacollection.datasets[0], 'data', this.totalAcaoPorStatus(diretoria, gerencia))
    },
    calcValue: function (status, diretoria, gerencia) {
      return Number((this.acaoPorStatus(status, diretoria, gerencia) / this.totalAcao(diretoria, gerencia).length * 100).toFixed(0))
    },
    calcRotate: function (status, diretoria, gerencia) {
      return Number((this.acaoPorStatus(status, diretoria, gerencia) / this.totalAcao(diretoria, gerencia).length * 360).toFixed(0))
    }
  },
  mounted () {
    this.fillData(this.diretoria, this.gerencia)
  },
  created () {
    this.status = StatusIniciativas
    this.objetivoService = new ObjetivoService(this.$resource)

    this.objetivoService
      .lista()
      .then(objetivos => {
        this.objetivos = objetivos
        this.fillData(this.diretoria, this.gerencia)
      }, err => console.log(err))
  }
}
</script>

<style>
 .div-grafico {
    position: relative;
    z-index: 1;

  }

 .titulo-grafico {
   position: absolute;
   left: 0;
   top: 25%;
   width: 100%;
   text-align: center;
   color: #37474F;
   font-weight: lighter;
   z-index: -1;
 }

 .fonte-titulo-a {
   font-size: 75px;
 }

 .fonte-titulo-b {
   font-size: 40px;
 }

  .fonte-titulo-c {
   font-size: 30px;
 }
</style>