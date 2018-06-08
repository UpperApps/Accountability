<template>
  <v-flex xl12 lg12 md12 >
    <v-layout row align-center justify-center wrap>
      <v-flex lg8 >
          <painel-status-acoes :objetivos="objetivos" :perfil="perfil" :gerencias="gerencias" ></painel-status-acoes>
      </v-flex>
      <v-flex lg4>
        <painel-totais-acoes :objetivos="objetivos" :perfil="perfil" :gerencias="gerencias" ></painel-totais-acoes>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
  // Modelo
  import ObjetivoService from '../../domain/servicos/ObjetivoService'
  import {UnidadeOrganizacional} from '../../domain/modelos/UnidadeOrganizacional'

  // Componentes
  import PainelStatusAcoes from './PainelStatusAcoes'
  import PainelTotaisAcoes from './PainelTotaisAcoes'

  export default {
    props: ['perfil'],
    components: {
      'painel-status-acoes': PainelStatusAcoes,
      'painel-totais-acoes': PainelTotaisAcoes
    },
    data () {
      return {
        objetivos: [],
        gerencias: []
      }
    },
    created () {
      this.gerencias = UnidadeOrganizacional
      this.objetivoService = new ObjetivoService(this.$resource)

      this.objetivoService
        .lista()
        .then(objetivosPrevi => {
          this.objetivos = objetivosPrevi
        }, err => console.log(err))
    }
  }
</script>
