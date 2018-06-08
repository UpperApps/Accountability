<template>
  <v-layout row>
    <v-flex xl10 offset-xl1 lg10 offset-lg1 mx-auto class="grey lighten-5">
      <jumbotron-paginas :titulo="'Linha do Tempo'"></jumbotron-paginas>

    <v-flex hidden-xs-only>
      <v-menu ref="pickerMesLarge" lazy v-model="pickerMesLarge" :close-on-click="false" :close-on-content-click="false" transition="slide-y-transition" offset-y full-width :nudge-right="10" max-width="290px" min-width="290px" :return-value.sync="scrollmesLarge">
        <v-btn fixed fab right dark large absolute bottom style="bottom: 110px;" color="blue" slot="activator" @click="pickerMesLarge = true">
          <v-tooltip top>
            <v-icon slot="activator" large dark>event</v-icon>
            <span>Selecione um mês e filtre a Linha do Tempo</span>
          </v-tooltip>
        </v-btn>
        <v-date-picker type="month" v-model="scrollmesLarge" @input="$vuetify.goTo('#mes' + scrollmesLarge , scrollOptions) ; pickerMesLarge = false" locale="pt-br" scrollable color="blue" light min="2018-01" max="2022-12" no-title>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="pickerMesLarge = false">Cancelar</v-btn>
        </v-date-picker>
      </v-menu>
    </v-flex>
    
    <v-flex hidden-sm-and-up>
      <v-menu ref="pickerMesSmall" lazy v-model="pickerMesSmall" :close-on-click="false" :close-on-content-click="false" transition="slide-y-transition" offset-y full-width :nudge-right="10" max-width="290px" min-width="290px" :return-value.sync="scrollmesSmall">
      <v-btn fixed fab right dark absolute bottom style="bottom: 90px;" color="blue" slot="activator" @click="pickerMesSmall = true"><v-icon dark>event</v-icon></v-btn>
        <v-date-picker type="month" v-model="scrollmesSmall" @input="$vuetify.goTo('#mes' + scrollmesSmall , scrollOptions) ; pickerMesSmall = false" locale="pt-br" scrollable color="blue" light min="2018-01" max="2022-12" no-title>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="pickerMesSmall = false">Cancelar</v-btn>
        </v-date-picker>
      </v-menu>
    </v-flex>

      <v-layout row justify-end>
        <v-flex d-flex lg5 mt-3>
            <v-layout row wrap>
              <v-flex align-center d-flex v-for="(status, index) in StatusIniciativas" :key="index">
                <v-icon :color="status.cor">{{status.icone}}</v-icon>
                <v-flex class="caption ma-1">{{status.status}}</v-flex>
              </v-flex>
            </v-layout>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-snackbar 
          color='success'
          :timeout="3000"
          :bottom="true"
          v-model="snackbar"
          style="top: 85%;"
        >
          {{snackbarText}}
        </v-snackbar>
        <v-layout row>
          <v-flex lg6 offset-lg3 md10 offset-md1 pt-3 pb-5>
            <v-expansion-panel expand>
              <v-expansion-panel-content>
                <div slot="header"><v-layout row ma-0 pa-0 align-center><v-icon :color="(this.diretoria || this.gerencia || this.status) ? 'blue darken-3' : 'grey lighten-1'">mdi-filter</v-icon>{{snackbarText}}</v-layout></div>
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
      <v-layout row justify-center pb-4>
        <span class="indigo--text text--darken-4 px-auto" style="font-size:1vmax;">Linha do tempo por data de entrega das iniciativas</span>
      </v-layout>
      <!--v-container fluid ma-0 pa-0 class="timeline" v-for="ano in anosAcoes()" :key="ano"-->
      <v-container fluid ma-0 pa-0 class="timeline" v-for="ano in anosTimeline" :key="ano">
        <ul class="timeline-ul" v-for="mes in 12" :key="mes" >
          <v-layout row justify-center>
            <span :id="'mes' + ano + '-' + pad(mes)"></span>
            <span class="display-1 indigo--text text--darken-4">{{getMesLongo(mes).mesLongo}}</span>
          </v-layout>
          <v-layout row justify-center>
            <span class="body-2 indigo--text text--darken-4"> {{ano}}</span>
          </v-layout>
          <v-layout pb-3>
          </v-layout>
          <li class="timeline-li" v-for="acao in todasAcoes()" :key="acao.id" v-if="acao.getDataFim().getMonth() + 1 === mes && acao.getDataFim().getFullYear() === ano"  @click.stop="abrirModal(acao)">
            <v-layout column class="timeline-card body-2 blue-grey--text text--darken-3" transition="scale-transition" pt-3 >
                <v-flex hidden-sm-and-down><b>{{acao.id}} - {{acao.nome}}</b></v-flex>
                <v-flex hidden-md-and-up>
                  <v-layout column wrap align-right >
                    <v-tooltip lazy debounce bottom>
                      <h4 class="caption" slot="activator" style="z-index:999;">{{acao.id}} <br/>{{acao.nome.substr(0,15).concat('...')}}</h4>
                      <span>{{acao.id}} - {{acao.nome}}</span>
                    </v-tooltip>
                  </v-layout>
                </v-flex>
                <v-flex><v-btn class="timeline-saiba-mais" round small flat absolute color="indigo" @click.stop="abrirModal(acao)" transition="scale-transition"><v-icon>mdi-information-variant</v-icon> SAIBA MAIS</v-btn></v-flex>
            </v-layout>
            <time class="timeline-data blue-grey--text text--darken-3">{{acao.fim}}</time>
            <v-avatar class="timeline-icone" :color="acao.getStatus().cor" size="30">
              <v-icon color="white">{{acao.getStatus().icone}}</v-icon>
            </v-avatar>
          </li>
        </ul>
      </v-container>
      <v-layout row justify-center pt-4 pb-5>
        <v-icon color="black" @click="abrirCreditos = !abrirCreditos">mdi-flag-checkered</v-icon>          
      </v-layout>

    </v-flex>
    <v-dialog  v-model="abrirDialog" max-width="700px" full-width>
      <cardinfo :acao="acaoSelecionada" :objetivo="objetivoSelecionado" @clicked-fechar-modal="clickedFecharModal"></cardinfo>
    </v-dialog>
    <v-dialog v-model="abrirCreditos" fullscreen transition="dialog-bottom-transition">
      <v-card color="black">
        <v-toolbar dark color="black">
          <v-spacer></v-spacer>
            <v-btn icon dark @click.native="abrirCreditos = false">
              <v-icon color="blue lighten-4">close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-layout wrap>
          <creditos></creditos>
        </v-layout>
      </v-card>
    </v-dialog>    
  </v-layout>
</template>

<script>
import ObjetivoService from '../../domain/servicos/ObjetivoService'
import CardInfo from '../cardmodal/CardInfo'
import FiltroIniciativas from '../filtroIniciativas/FiltroIniciativas'
import Objetivo from '../../domain/modelos/Objetivo'
import {Meses} from '../../domain/modelos/Meses'
import JumbotronPaginas from '../layout/headerFooter/JumbotronPaginas'
import chipStatusIniciativa from '../chipStatusIniciativa/chipStatusIniciativa.vue'
import CardMenu from '../CardMenu/CardMenu'
import BarraIniciativas from '../BarraIniciativas/BarraIniciativas.vue'
import Creditos from '../creditos/creditos'
import {StatusIniciativas} from '../../domain/modelos/StatusIniciativas'
import aux from '@/components/funcoesAux'

export default {
  components: {
    'cardinfo': CardInfo,
    'card-menu': CardMenu,
    'filtro-iniciativas': FiltroIniciativas,
    'jumbotron-paginas': JumbotronPaginas,
    'chip-status-iniciativa': chipStatusIniciativa,
    'barra-iniciativas': BarraIniciativas,
    'creditos': Creditos
  },

  data: () => ({
    objetivos: [],
    // Buscar período do PET no json > Alteração prevista para a fase de aceleração
    anosTimeline: [2018, 2019, 2020, 2021, 2022],
    acaoSelecionada: undefined,
    objetivoSelecionado: undefined,
    abrirDialog: false,
    abrirCreditos: false,
    snackbar: false,
    snackbarText: 'Filtre a sua Linha do Tempo',
    objetivosFiltrado: [],
    scrollmesLarge: null,
    scrollmesSmall: null,
    pickerMesSmall: false,
    pickerMesLarge: false,
    offsetTop: 0,
    show: false,
    diretoria: undefined,
    gerencia: undefined,
    status: undefined
  }),
  computed: {
    scrollOptions () {
      return {
        duration: 2000,
        offset: -100,
        easing: 'easeInOutCubic'
      }
    }
  },
  methods: {
    corHexa: function (string) {
      return aux.style_color(string)
    },
    todasAcoes: function () {
      return this.objetivosFiltrado.reduce(function (preval, objetivo) {
        preval = preval.concat(objetivo.getAllAcao())
        return preval
      }, []).sort(function (a, b) { return a.getDataFim() - b.getDataFim() })
    },
    anosAcoes: function () {
      return this.todasAcoes().reduce(function (preval, acao) {
        if (!preval.includes(acao.getDataFim().getFullYear())) {
          preval.push(acao.getDataFim().getFullYear())
        }
        return preval
      }, [])
    },
    getMesLongo: function (mes) {
      return Meses.find(m => m.mes === mes)
    },
    pad: function (n) {
      return (n < 10) ? ('0' + n) : n
    },
    snackbarActive: function () {
      this.snackbar = true
      let filtros = []
      if (this.gerencia) { filtros.push(' Gerência: ' + this.gerencia) }
      if (this.diretoria) { filtros.push(' Diretoria: ' + this.diretoria.diretoria) }
      if (this.status) { filtros.push(' Status: ' + this.status.status) }
      if (filtros.length === 0) {
        this.snackbarText = 'Filtro Vazio'
      } else {
        this.snackbarText = 'Filtro realizado por: ' + filtros.toString()
      }
    },
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    },
    abrirModal: function (acao) {
      this.acaoSelecionada = acao
      this.objetivoSelecionado = this.objetivosFiltrado.find(objetivo => objetivo.diretrizes
          .find(diretriz => diretriz.iniciativas
          .find(iniciativa => iniciativa.id === acao.id) || diretriz.projetos.find(projeto => projeto.id === acao.id)))
      this.abrirDialog = true
    },
    clickedFilterDiretorias: function (value) {
      this.diretoria = value
      this.gerencia = undefined
      this.filtrandoObjetivos()
    },
    clickedShowDetailModal: function (acao, objetivo) {
      this.$emit('clicked-show-detail', acao, objetivo)
    },
    clickedFecharModal: function () {
      this.abrirDialog = false
      this.abrirDialogIndicadores = false
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
              projeto.responsaveis.find(responsavel => responsavel === 'Toda PREVI') ||
              projeto.intervenientes.find(responsavel => responsavel === 'Toda PREVI')
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
    this.StatusIniciativas = StatusIniciativas

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

<style scoped>

.timeline .timeline-ul {
  background: inherit; 
  padding-top: 10px;
}

.timeline .timeline-ul .timeline-li {
  list-style-type: none;
  position: relative;
  width: 3px;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 100px;
  background: #B0BEC5;
  border-top: 10px;
  border-color: transparent;  
  cursor: pointer;
}

.timeline .timeline-ul .timeline-li::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  top: 20px;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #FAFAFA;
  z-index: 0;
}

.timeline .timeline-ul .timeline-li .timeline-card {
  position: relative;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  padding: 0px;
}


.timeline .timeline-ul .timeline-li:nth-child(odd) .timeline-card {
  left: 45px;
  width: 400px;
  text-align: left;
}

.timeline .timeline-ul .timeline-li:nth-child(odd) .timeline-data {
  left: -120px;
  top: 33px;
  position: absolute;
  background: transparent;
}

.timeline .timeline-ul .timeline-li:nth-child(odd) .timeline-saiba-mais {
  left: -10px;
  align: left;
}

.timeline .timeline-ul .timeline-li:nth-child(odd) .timeline-icone {
  left: -14px;
  top: 30px;
  position: absolute;
  z-index: 2;
}

.timeline .timeline-ul .timeline-li:nth-child(even) .timeline-card {
  left: -439px;
  width: 400px;
  max-width: 400px;
  align-items:flex-end;
}

.timeline .timeline-ul .timeline-li:nth-child(even) .timeline-data {
  left: 35px;
  top: 33px;
  position: absolute;
  background: transparent;
}

.timeline .timeline-ul .timeline-li:nth-child(even) .timeline-saiba-mais {
  left: 300px;
  align: right;
}

.timeline .timeline-ul .timeline-li:nth-child(even) .timeline-icone {
  left: -14px;
  top: 30px;
  position: absolute;
  background: transparent;
  z-index: 2;
}

time {
  display: block;
  font-size: 1.2rem;
  /*font-weight: bold;*/
  margin-bottom: 0px;
}
</style>