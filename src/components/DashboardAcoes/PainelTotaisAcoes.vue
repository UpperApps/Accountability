<template>
    <v-container grid-list-lg >
    <v-layout row wrap>
      <v-flex lg12 d-flex>
        <v-card color="indigo darken-1" class="white--text">
          <v-card-title primary-title>
            <v-icon large color="yellow darken-1">mdi-lightbulb-on-outline</v-icon><span class="subheading ma-2">Iniciativas/Projetos</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-layout row wrap justify-space-around v-if="perfil.gerencia !== undefined">
              <div>
                <span class="display-3">{{ totalIniciativasGerencia }}</span><span > na {{capitaliza(perfil.gerencia)}}</span>
              </div>
              <div>
                <span class="display-3">{{ totalIniciativasPrevi }}</span><span > da Previ</span>
              </div>
            </v-layout>
            <v-layout v-else>
              <v-flex lg2>
                <v-progress-circular indeterminate color="primary" ></v-progress-circular>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex lg12 d-flex>
        <v-card color="purple darken-4" class="white--text">
          <v-card-title primary-title>
            <v-icon large color="pink">mdi-compass-outline</v-icon><span class="subheading ma-2">Diretrizes</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-layout row wrap justify-space-around v-if="perfil.gerencia !== undefined">
              <div>
                <span class="display-3">{{ totalDiretrizesGerencia }}</span><span > na {{capitaliza(perfil.gerencia)}}</span>
              </div>
              <div>
                <span class="display-3">{{ totalDiretrizesPrevi }}</span><span > da Previ</span>
              </div>
            </v-layout>
            <v-layout v-else>
              <v-flex lg2>
                <v-progress-circular indeterminate color="primary" ></v-progress-circular>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Objetivo from '../../domain/modelos/Objetivo'
import aux from '@/components/funcoesAux'

export default {
  props: ['objetivos', 'usuario', 'perfil', 'gerencias'],
  methods: {
    capitaliza: function (str) {
      return aux.capitaliza(str)
    }
  },
  computed: {
    totalDiretrizesPrevi: function () {
      this.objetivosTmp = this.objetivos.map(dado => new Objetivo(dado))
      return this.objetivosTmp
        .map(objetivo => objetivo.diretrizes.length)
        .reduce((sum, diretriz) => sum + diretriz, 0)
    },
    totalDiretrizesGerencia: function () {
      var gerenciasFiltrada = this.gerencias.filter(unidade => unidade.diretoria === this.perfil.gerencia)
        .reduce((array, unidade) => { return array.concat(unidade.gerencias) }, [])
      this.objetivosTmp = this.objetivos.map(dado => new Objetivo(dado))
      this.sumarizado = this.objetivosTmp
        .map(objetivo => objetivo.diretrizes)
        .reduce((preval, diretrizes) => preval.concat(diretrizes), [])
      this.sumarizado
        .forEach(diretriz => {
          diretriz.iniciativas = diretriz.iniciativas
            .filter(iniciativa => iniciativa.responsaveis.includes(this.perfil.gerencia) || iniciativa.intervenientes.includes(this.perfil.gerencia) ||
            iniciativa.responsaveis.find(responsavel => gerenciasFiltrada.includes(responsavel)) ||
            iniciativa.intervenientes.find(responsavel => gerenciasFiltrada.includes(responsavel)) ||
            iniciativa.responsaveis.includes('Toda PREVI') || iniciativa.intervenientes.includes('Toda PREVI'))
          diretriz.projetos = diretriz.projetos
            .filter(projeto => projeto.responsaveis.includes(this.perfil.gerencia) || projeto.intervenientes.includes(this.perfil.gerencia) ||
            projeto.responsaveis.find(responsavel => gerenciasFiltrada.includes(responsavel)) ||
            projeto.intervenientes.find(responsavel => gerenciasFiltrada.includes(responsavel)) ||
            projeto.responsaveis.includes('Toda PREVI') || projeto.intervenientes.includes('Toda PREVI'))
        })
      return this.sumarizado
          .filter(diretriz => diretriz.iniciativas.length > 0 || diretriz.projetos.length > 0)
          .length
    },
    totalIniciativasPrevi: function () {
      this.objetivosTmp = this.objetivos.map(dado => new Objetivo(dado))
      return this.objetivosTmp
        .map(objetivo => objetivo.diretrizes)
        .reduce((preval, diretrizes) => preval.concat(diretrizes), [])
        .map(diretriz => diretriz.iniciativas)
        .reduce((preval, iniciativas) => preval.concat(iniciativas), [])
        .length + this.objetivosTmp
        .map(objetivo => objetivo.diretrizes)
        .reduce((preval, diretrizes) => preval.concat(diretrizes), [])
        .map(diretriz => diretriz.projetos)
        .reduce((preval, projetos) => preval.concat(projetos), [])
        .length
    },
    totalIniciativasGerencia: function () {
      var gerenciasFiltrada = this.gerencias.filter(unidade => unidade.diretoria === this.perfil.gerencia)
        .reduce((array, unidade) => { return array.concat(unidade.gerencias) }, [])
      this.objetivosTmp = this.objetivos.map(dado => new Objetivo(dado))
      return this.objetivosTmp
        .map(objetivo => objetivo.diretrizes)
        .reduce((preval, diretrizes) => preval.concat(diretrizes), [])
        .map(diretriz => diretriz.iniciativas)
        .reduce((preval, iniciativas) => preval.concat(iniciativas), [])
        .filter(iniciativa => (iniciativa.responsaveis.includes(this.perfil.gerencia) || iniciativa.intervenientes.includes(this.perfil.gerencia) ||
          iniciativa.responsaveis.find(responsavel => gerenciasFiltrada.includes(responsavel)) ||
          iniciativa.intervenientes.find(responsavel => gerenciasFiltrada.includes(responsavel)) ||
          iniciativa.responsaveis.includes('Toda PREVI') || iniciativa.intervenientes.includes('Toda PREVI')))
        .length + this.objetivosTmp
        .map(objetivo => objetivo.diretrizes)
        .reduce((preval, diretrizes) => preval.concat(diretrizes), [])
        .map(diretriz => diretriz.projetos)
        .reduce((preval, projetos) => preval.concat(projetos), [])
        .filter(projeto => (projeto.responsaveis.includes(this.perfil.gerencia) || projeto.intervenientes.includes(this.perfil.gerencia) ||
          projeto.responsaveis.find(responsavel => gerenciasFiltrada.includes(responsavel)) ||
          projeto.intervenientes.find(responsavel => gerenciasFiltrada.includes(responsavel)) ||
          projeto.responsaveis.includes('Toda PREVI') || projeto.intervenientes.includes('Toda PREVI')))
        .length
    }
  }
}
</script>

<style scoped>

</style>

