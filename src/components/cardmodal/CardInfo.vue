<template>
  <v-layout fill-height d-flex>
      <v-card id="card" v-if="objetivo" :style="'border-left: 10px solid ' + corHexa(objetivo.cor) + ' !important;'" flat>
        <v-flex lg11>
          <v-card-title>
            <v-layout column align-left class="title blue-grey--text text--darken-1" >
              <v-btn absolute right small fab @click.stop="fecharModal()"><v-icon :color="objetivo.cor">close</v-icon></v-btn>
              <v-layout row align-baseline wrap>
                <v-flex xs2 ma-2>{{acao.id}} </v-flex>
                <v-flex>
                  
                  <v-tooltip lazy debounce bottom>
                    <v-btn flat small fab icon :color="objetivo.cor" slot="activator"><v-icon >public</v-icon></v-btn>
                    <span>Objetivo {{objetivo.id}} - {{objetivo.nome}}</span>
                  </v-tooltip>
                  <v-tooltip lazy debounce bottom>
                    <v-btn flat small fab icon :color="objetivo.cor" slot="activator"><v-icon >near_me</v-icon></v-btn>
                    <span>Diretriz {{findDiretriz().id}} - {{findDiretriz().nome}}</span>
                  </v-tooltip>
                </v-flex>
              </v-layout>
              <v-flex ma-2>{{acao.nome}}</v-flex>
              <v-divider></v-divider>
            </v-layout>
          </v-card-title>
        </v-flex>
        <v-card-text style="height:300px; max-height: 300px; overflow-y:auto;">
          <info-card :acao="acao" v-if="e1===0"></info-card>
          <etapas-card :etapas="acao.etapas" v-if="e1===1"></etapas-card>
          <downloads-card :acao="acao" :objetivo="objetivo" v-if="e1===2"></downloads-card>
        </v-card-text>
        <v-card-actions>
          <v-bottom-nav
            light
            :value="true"
            :active.sync="e1"
          >
            <v-btn  flat :color="objetivo.cor">
              <span>Descrição</span>
              <v-icon >mdi-file-document</v-icon>
            </v-btn>
            <v-btn  flat :color="objetivo.cor">
              <span>Etapas</span>
              <v-icon >mdi-calendar-clock</v-icon>
            </v-btn>
            <v-btn  flat v-if="acao.arquivos" :color="objetivo.cor">
              <span>Links</span>
              <v-icon >mdi-link-variant</v-icon>
            </v-btn>
          </v-bottom-nav>
        </v-card-actions>
      </v-card>
  </v-layout>
</template>

<script>
  import InfoCard from './InfoCard'
  import EtapasCard from './EtapasCard'
  import DownloadsCard from './DownloadsCard'
  import aux from '@/components/funcoesAux'

  export default {
    components: {
      'info-card': InfoCard,
      'etapas-card': EtapasCard,
      'downloads-card': DownloadsCard
    },
    props: ['acao', 'objetivo'],
    data: function () {
      return {
        e1: 0,
        cor: 'indigo',
        show: false
      }
    },
    methods: {
      findDiretriz () {
        return this.objetivo.diretrizes.find(diretriz => diretriz.iniciativas
              .find(iniciativa => iniciativa.id === this.acao.id) || diretriz.projetos.find(projeto => projeto.id === this.acao.id))
      },
      fecharModal () {
        this.$emit('clicked-fechar-modal')
        this.e1 = 0
      },
      corHexa (str) {
        return str ? aux.style_color(str) : 'white'
      }
    },
    computed: {
      navColor () {
        switch (this.e1) {
          case 0: return 'blue'
          case 1: return 'teal'
          case 2: return 'green'
        }
      }
    }
  }
</script>
