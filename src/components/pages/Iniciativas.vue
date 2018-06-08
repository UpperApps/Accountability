<template>
  <v-layout row >
    <v-flex xl10 offset-xl1 lg10 offset-lg1 >
      <jumbotron-paginas :titulo="'Conheça as Iniciativas'"></jumbotron-paginas>
      <v-container>
        <v-layout row>
          <v-snackbar color='success' :timeout="3000" :bottom="true" v-model="snackbar" style="bottom: 20px;">
            {{snackbarText}}
          </v-snackbar>
          <v-layout row>
            <v-flex lg6 offset-lg3 md10 offset-md1>
              <v-expansion-panel expand>
                <v-expansion-panel-content>
                  <div slot="header"><v-layout row ma-0 pa-0 align-center ><v-icon :color="(this.diretoria || this.gerencia || this.status) ? 'blue darken-3' : 'grey lighten-1'">mdi-filter</v-icon>{{snackbarText}}</v-layout></div>
                  <filtro-iniciativas 
                    @clicked-filter-diretorias="clickedFilterDiretorias"
                    @clicked-filter-gerencias="clickedFilterGerencias"
                    @clicked-filter-status="clickedFilterStatus"
                  ></filtro-iniciativas>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-container>
      <v-container fluid>
        <v-flex xl12 lg12 sm12 xs12 mx-auto>
        <v-flex ml-2>
        <span class="indigo--text text--darken-4 ma-4" style="font-size:1.3vmax;">Selecione um ou mais objetivos para filtrar as diretrizes</span></v-flex>
        <grid-objetivos :objetivosFiltrado="objetivosFiltrado"></grid-objetivos>
    </v-flex>
      </v-container>
      <v-container fluid>
        <v-flex xl10 lg10 md11 mx-auto>
        <v-flex ml-3>
        <v-layout row justify-end>
          <span class="indigo--text text--darken-4" style="font-size:1.3vmax;">Selecione uma diretriz para conhecer as iniciativas</span>
          <v-spacer></v-spacer>
          <v-btn flat small round color="indigo" @click.native="expandirDiretrizes = true" 
            v-show="!expandirDiretrizes" transition="slide-x-transition">Expandir Tudo</v-btn>
          <v-btn flat small round color="indigo" @click.native="expandirDiretrizes = false" 
            v-show="expandirDiretrizes" transition="slide-x-reverse-transition">Retrair Tudo</v-btn>
        </v-layout></v-flex>
        <v-flex>
          <lista-diretrizes :expandirDiretrizes="expandirDiretrizes"
            v-for="objetivo in objetivosFiltrado.filter(objetivo => objetivo.selecionado)"
            :objetivo="objetivo"
            :key="objetivo.id"
            @clicked-show-detail="clickedShowDetailModal"
            @clicked-modal-indicadores="clickedModalIndicadores" >
          </lista-diretrizes>
        </v-flex>
        </v-flex>
      </v-container> 

      <v-dialog  v-model="abrirDialog" max-width="700px" full-width>
        <cardinfo :acao="acaoSelecionada" :objetivo="objetivoSelecionado" @clicked-fechar-modal="clickedFecharModal"></cardinfo>
      </v-dialog>

      <v-dialog  v-model="abrirDialogIndicadores" max-width="700px" full-width>
        <card-indicadores :diretriz="diretrizSelecionada" :objetivo="objetivoSelecionado" @clicked-fechar-modal="clickedFecharModal"></card-indicadores>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import ObjetivoService from '../../domain/servicos/ObjetivoService'
import GridObjetivos from '../GridObjetivos/GridObjetivos.vue'
import ListaDiretrizes from '../ListaDiretrizes/ListaDiretrizes'
import CardInfo from '../cardmodal/CardInfo'
import CardIndicadores from '../cardmodal/CardIndicadores'
import FiltroIniciativas from '../filtroIniciativas/FiltroIniciativas'
import Objetivo from '../../domain/modelos/Objetivo'
import JumbotronPaginas from '../layout/headerFooter/JumbotronPaginas'

export default {
  components: {
    'grid-objetivos': GridObjetivos,
    'lista-diretrizes': ListaDiretrizes,
    'cardinfo': CardInfo,
    'card-indicadores': CardIndicadores,
    'filtro-iniciativas': FiltroIniciativas,
    'jumbotron-paginas': JumbotronPaginas
  },
  data: () => ({
    objetivos: [],
    objetivosFiltrado: [],
    acaoSelecionada: undefined,
    objetivoSelecionado: undefined,
    abrirDialog: false,
    diretrizSelecionada: [],
    abrirDialogIndicadores: false,
    diretoria: undefined,
    gerencia: undefined,
    status: undefined,
    snackbar: false,
    snackbarText: 'Filtre a sua busca',
    expandirDiretrizes: false,
    pets: []
  }),
  methods: {
    clickedFecharModal: function () {
      this.abrirDialog = false
      this.abrirDialogIndicadores = false
    },
    snackbarActive: function () {
      this.snackbar = true
      let filtros = []
      if (this.gerencia) { filtros.push(' Gerência: ' + this.gerencia) }
      if (this.diretoria) { filtros.push(' Diretoria: ' + this.diretoria.diretoria) }
      if (this.status) { filtros.push(' Status: ' + this.status.status) }
      if (filtros.length === 0) {
        this.snackbarText = 'Filtre a sua busca'
      } else {
        this.snackbarText = 'Filtro realizado por ' + filtros.toString()
      }
    },
    clickedShowDetailModal: function (acao, objetivo) {
      this.objetivoSelecionado = objetivo
      this.acaoSelecionada = acao
      this.abrirDialog = true
    },
    clickedModalIndicadores: function (diretriz, objetivo) {
      this.objetivoSelecionado = objetivo
      this.diretrizSelecionada = diretriz
      this.abrirDialogIndicadores = true
    },
    clickedFilterDiretorias: function (value) {
      this.diretoria = value
      this.gerencia = undefined
      this.filtrandoObjetivos()
    },
    clickedFilterGerencias: function (value, diretoria) {
      this.diretoria = diretoria
      this.gerencia = value
      this.filtrandoObjetivos()
    },
    clickedFilterStatus: function (value) {
      this.status = value
      this.filtrandoObjetivos()
    },
    filtrandoObjetivos: function () {
      this.objetivosFiltrado = this.objetivos.map(dado => new Objetivo(dado))
      if (this.gerencia) {
        this.objetivosFiltrado.forEach(objetivoFiltrado => {
          objetivoFiltrado.diretrizes.forEach(diretriz => {
            diretriz.iniciativas = diretriz.iniciativas.filter(iniciativa =>
              iniciativa.responsaveis.includes(this.gerencia) || iniciativa.intervenientes.includes(this.gerencia) ||
              iniciativa.responsaveis.includes('Toda PREVI') || iniciativa.intervenientes.includes('Toda PREVI')
            )
            diretriz.projetos = diretriz.projetos.filter(projeto =>
              projeto.responsaveis.includes(this.gerencia) || projeto.intervenientes.includes(this.gerencia) ||
              projeto.responsaveis.includes('Toda PREVI') || projeto.intervenientes.includes('Toda PREVI')
            )
          })
          objetivoFiltrado.diretrizes = objetivoFiltrado.diretrizes.filter(diretriz => diretriz.iniciativas.length > 0 || diretriz.projetos.length > 0)
        })
        this.objetivosFiltrado.forEach(objetivo => {
          if (objetivo.diretrizes.length > 0) {
            objetivo.selecionavel = true
            objetivo.selecionado = true
          } else {
            objetivo.selecionavel = false
            objetivo.selecionado = false
          }
        })
      } else if (this.diretoria) {
        this.objetivosFiltrado.forEach(objetivoFiltrado => {
          objetivoFiltrado.diretrizes.forEach(diretriz => {
            diretriz.iniciativas = diretriz.iniciativas.filter(iniciativa =>
              iniciativa.responsaveis.find(responsavel => this.diretoria.gerencias.includes(responsavel)) ||
              iniciativa.intervenientes.find(responsavel => this.diretoria.gerencias.includes(responsavel)) ||
              iniciativa.responsaveis.find(responsavel => responsavel === 'Toda PREVI') ||
              iniciativa.intervenientes.find(responsavel => responsavel === 'Toda PREVI')
            )
            diretriz.projetos = diretriz.projetos.filter(projeto =>
             projeto.responsaveis.find(responsavel => this.diretoria.gerencias.includes(responsavel)) ||
             projeto.intervenientes.find(responsavel => this.diretoria.gerencias.includes(responsavel)) ||
             projeto.responsaveis.find(responsavel => this.diretoria.gerencias.includes('Toda PREVI')) ||
             projeto.intervenientes.find(responsavel => this.diretoria.gerencias.includes('Toda PREVI'))
            )
          })
          objetivoFiltrado.diretrizes = objetivoFiltrado.diretrizes.filter(diretriz => diretriz.iniciativas.length > 0 || diretriz.projetos.length > 0)
        })
        this.objetivosFiltrado.forEach(objetivo => {
          if (objetivo.diretrizes.length > 0) {
            objetivo.selecionavel = true
            objetivo.selecionado = true
          } else {
            objetivo.selecionavel = false
            objetivo.selecionado = false
          }
        })
      }
      if (this.status) {
        this.objetivosFiltrado.forEach(objetivoFiltrado => {
          objetivoFiltrado.diretrizes.forEach(diretriz => {
            diretriz.iniciativas = diretriz.iniciativas.filter(iniciativa => iniciativa.status === this.status.id)
            diretriz.projetos = diretriz.projetos.filter(projeto => projeto.status === this.status.id)
          })
          objetivoFiltrado.diretrizes = objetivoFiltrado.diretrizes.filter(diretriz => diretriz.iniciativas.length > 0 || diretriz.projetos.length > 0)
        })
        this.objetivosFiltrado.forEach(objetivo => {
          if (objetivo.diretrizes.length > 0) {
            objetivo.selecionavel = true
            objetivo.selecionado = true
          } else {
            objetivo.selecionavel = false
            objetivo.selecionado = false
          }
        })
      }
      this.snackbarActive()
    }
  },
  created () {
    this.objetivoService = new ObjetivoService(this.$resource)

    this.objetivoService
      .lista()
      .then(objetivos => {
        this.objetivos = objetivos
        this.objetivosFiltrado = objetivos.map(dado => new Objetivo(dado))
      }, err => console.log(err))
  }
}
</script>
