<template>
  <v-layout row>
    <v-flex lg10 md10 sm12 xs12 d-flex>
          <v-layout column align-left class="blue-grey--text text--lighten-1">
            <v-layout align-baseline>
              <v-flex lg3 md3 sm3 xs5>Condução:</v-flex>
              <v-flex>
                <v-container fluid grid-list-xs>
                  <v-flex v-for="(conducao, index) in acao.conducao" :key="index">
                    <v-avatar>
                      <img v-if="!conducao.email" class="imagemCond" :src="require('@/assets/blankProfile.jpg')"/>
                      <img v-if="conducao.email" src="" :id="'imagemCond'+index" :class="'imagemCond'+index"/>
                    </v-avatar>{{conducao.email ? carregaFoto(conducao.email,index) : null}}
                    <v-chip color="white" label small class="ml-0 blue-grey--text text--darken-1">{{conducao.nome ? conducao.nome.toUpperCase() : conducao.toUpperCase()}}</v-chip>
                  </v-flex>
                </v-container>
              </v-flex>
            </v-layout>
            <v-layout wrap align-baseline>
              <v-flex lg3 md3 sm3 xs5>
                <span>Responsáveis:</span>
              </v-flex>
              <v-flex>
                <v-chip color="white" label small class="ml-0 blue-grey--text text--darken-1" v-for="responsavel in acao.responsaveis" :key="responsavel">{{capitaliza(responsavel)}}</v-chip>
              </v-flex>
            </v-layout>
            <v-layout row align-baseline>
              <v-flex lg3 md3 sm3 xs5>
                <span>Intervenientes:</span>
              </v-flex>
              <v-flex>
                <v-chip color="white" label small class="ma-0 blue-grey--text text--darken-1" v-for="interveniente in acao.intervenientes" :key="interveniente">{{capitaliza(interveniente)}}</v-chip>
              </v-flex>
            </v-layout>
            <v-layout wrap align-baseline>
              <v-flex lg3 md3 sm3 xs5>
                <span>Status:</span>
              </v-flex>
              <v-flex>
                <v-chip color="white" label small light flat ml-1 :text-color="acao.getStatus().cor"><v-icon :color="acao.getStatus().cor">{{acao.getStatus().icone}}</v-icon><span class="ma-1">{{acao.getStatus().status}}</span></v-chip>
              </v-flex>
            </v-layout>
            <v-layout row align-baseline>
              <v-flex lg3 md3 sm3 xs5>
                Data Início:
              </v-flex> 
              <v-flex>
                <v-chip color="white" label small class="ma-0 blue-grey--text text--darken-1">{{acao.inicio}}</v-chip>
              </v-flex>
            </v-layout>
            <v-layout row v-if="acao.fim" align-baseline>
              <v-flex lg3 md3 sm3 xs5>
                Data Fim:
              </v-flex>
              <v-flex>
                <v-chip color="white" label small class="ma-0 blue-grey--text text--darken-1">{{acao.fim}}</v-chip>
              </v-flex>
            </v-layout>
            <v-layout row v-if="acao.entregasAtb1" align-baseline>
              <v-flex lg3 md3 sm3 xs5>
                Entrega ATB 1º Sem.:
              </v-flex>
              <v-flex>
                <v-chip color="white" label small class="ma-0 blue-grey--text text--darken-1"> {{acao.entregasAtb1.toString()}} </v-chip>
              </v-flex>
            </v-layout>
            <v-layout row v-if="acao.entregasAtb2" align-baseline>
              <v-flex lg3 md3 sm3 xs5>
                Entrega ATB 2º Sem.:
              </v-flex>
              <v-flex>
                <v-chip color="white" label small class="ma-0 blue-grey--text text--darken-1"> {{acao.entregasAtb2.toString()}} </v-chip>
              </v-flex>
            </v-layout>
            </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import aux from '@/components/funcoesAux'
  import GraphService from '@/domain/servicos/microsoftGraph/graphService'
  export default {
    props: ['acao'],
    created () {
      this.graphService = new GraphService()
    },
    methods: {
      capitaliza: function (str) {
        return aux.capitaliza(str)
      },
      carregaFoto (email, index) {
        this.graphService.getFoto(email)
        .then(dados => {
          var reader = new FileReader()
          reader.onload = function () {
            var x = document.querySelectorAll('#imagemCond' + index)
            var i
            for (i = 0; i < x.length; i++) {
              x[i].src = reader.result
            }
          }
          reader.readAsDataURL(dados.body)
        })
        .catch(error => {
          console.log('Erro requisição foto condutores => status: ' + error.status + ' | mensagem: ' + error.statusText)
          var z = document.querySelectorAll('#imagemCond' + index)
          var i
          for (i = 0; i < z.length; i++) {
            z[i].src = require('@/assets/blankProfile.jpg')
          }
        })
      }
    }
  }
</script>