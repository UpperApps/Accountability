<template>
<v-layout ma-0 pa-0 wrap>
    <v-snackbar color='success' :timeout="3000" :bottom="true" v-model="snackbar" style="bottom: 20px;">
      {{snackbarText}}
    </v-snackbar>
    <v-flex ma-0 hidden-sm-and-down>
      <v-layout column mr-3 ml-3>
      <v-card height="100" card dark :style="'background: linear-gradient(180deg,' + corHexa(objetivoAtivo + ' darken-2') + ',' + corHexa(objetivoAtivo + ' lighten-1') + ')'">
        <v-layout row align-baseline wrap>
          <v-flex ma-0>
            <h2 class="subheading text-xs-center ml-2 mt-2" style="font-size: 1vmax;">{{objetivo.id}} - {{objetivo.nome}} </h2>
          </v-flex>
        </v-layout>
        <v-btn :color="objetivoAtivo + ' lighten-1'" small fab absolute style="left: -30px; top: 5%;" @click="$vuetify.goTo('#objetivo' + objetivo.id)">
        <svgicon icon="card-check" height="16" width="13" color="white"></svgicon>
        </v-btn>
      </v-card>
      <v-card height="100px" dark :color="cor" @click.native="filtra()" hover>
        <v-card-text>
          <h1 class="text-lg-left caption"><span :class="!switch1 ? 'blue-grey--text' : objetivoAtivo+'--text'"><strong>Macro:</strong> {{objetivo.indicadorMacro.nome}}</span></h1>
          <h1 class="text-lg-left mb-2 caption" ><span :class="!switch1 ? 'blue-grey--text' : objetivoAtivo+'--text'"><strong>Meta:</strong> {{objetivo.indicadorMacro.target}}</span></h1>
        </v-card-text>
      </v-card>
      <v-flex mx-auto>
        <v-btn style="top:-20px;" small round color="indigo" @click.native="filtra()" v-model="switch1" :disabled="switchObjetivo"><v-icon small color="white">{{switch1 ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank'}}</v-icon><span class="white--text ml-1">Visualizar</span></v-btn>
      </v-flex>
      </v-layout>
    </v-flex>
    <v-layout column hidden-md-and-up my-1>
      <v-card card dark :style="'background: linear-gradient(180deg,' + corHexa(objetivoAtivo + ' darken-2') + ',' + corHexa(objetivoAtivo + ' lighten-1') + ')'">
        <v-layout column mt-1>
          <v-flex>
            <h3 class="text-sm-center caption ml-3" >{{objetivo.id}} - {{objetivo.nome.substr(0,28).concat('...')}}</h3>
          </v-flex>
          <v-layout row mx-auto>
            <v-btn :color="objetivoAtivo + ' lighten-1'" small fab absolute style="left: -30px; top: 10px;" @click="$vuetify.goTo('#objetivo' + objetivo.id)">
              <svgicon icon="card-check" height="16" width="13" color="white"></svgicon>
            </v-btn>
            <v-tooltip bottom v-model="show">
              <v-btn icon small slot="activator" @click.native="show = !show">
                <v-icon small>mdi-dots-horizontal</v-icon>
              </v-btn>
              <span>{{objetivo.nome}} <br/>
                <strong>Macro:</strong> {{objetivo.indicadorMacro.nome}}<br/>
                <strong>Meta:</strong> {{objetivo.indicadorMacro.target}}
              </span>
            </v-tooltip>
            
            <!-- <v-btn flat icon small @click.native="filtra()" v-model="switch1" :disabled="switchObjetivo"> -->
              <v-btn icon small @click.native="filtra()"  v-model="switch1" :disabled="switchObjetivo">
              <v-icon small>{{switch1 ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank'}}</v-icon>
            </v-btn> 
          </v-layout>
        </v-layout>
      </v-card>
        </v-layout>
</v-layout>
</template>

<script>
import aux from '@/components/funcoesAux'

export default {
  props: ['objetivo'],
  data () {
    return {
      cor: '',
      switch1: true,
      switchObjetivo: false,
      show: false,
      snackbar: false,
      snackbarText: '',
      snackColor: 'success'
    }
  },
  computed: {
    objetivoAtivo: function () {
      if (this.objetivo.selecionavel) {
        this.cor = 'white' // this.objetivo.cor + ' lighten-5'
        this.switchObjetivo = false
        return this.objetivo.cor
      } else {
        this.cor = 'grey'
        this.switchObjetivo = true
        return 'grey'
      }
    }
  },
  methods: {
    snackbarActive: function () {
      this.snackbar = true
      let filtros = []
      if (this.switch1) { filtros.push(' Objetivo Selecionado: ' + this.objetivo.nome) }
      if (!this.switch1) { filtros.push(' Objetivo Deselecionado: ' + this.objetivo.nome) }
      this.snackbarText = filtros.toString()
    },
    filtra () {
      if (this.objetivo.selecionavel) {
        this.$set(this.objetivo, 'selecionado', !this.objetivo.selecionado)
        if (this.objetivo.selecionado) {
          this.cor = 'white'// this.objetivo.cor + ' lighten-5'
          this.switch1 = true
        } else {
          this.cor = 'grey'
          this.switch1 = false
        }
        this.snackbarActive()
      }
    },
    corHexa: function (string) {
      return aux.style_color(string)
    }
  }
}
</script>

<style>
</style>