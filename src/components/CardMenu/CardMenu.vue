<template>
  <v-container grid-list-md>
    <v-layout column>
      <v-flex md12>
        <v-card>
          <v-card-title> <span class="display-1">Fique Ligado</span></v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-layout row wrap align-top>
                <v-flex lg3 md3 sm6>
                <v-card flat to="/apresentacao" hover>
                  <v-card-title>
                    <v-layout row align-center>
                      <v-icon large color="pink">mdi-presentation</v-icon><span class="headline indigo--text pa-2">Apresentação</span>
                    </v-layout>
                  </v-card-title>
                  <v-card-text>
                    <v-layout row>
                      <v-flex lg11 text-lg-justify>
                        <span class="ma-3"> Saiba como funciona o Planejamento na Previ e os principais conceitos utilizados.</span>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                  <v-card-actions>
                    <v-flex lg12 text-lg-right>
                    <v-btn icon to="/apresentacao"><v-icon small color="pink">add</v-icon></v-btn>
                    </v-flex>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <v-flex lg3 md3 sm6>
                <v-card flat to="/iniciativas" hover>
                  <v-card-title>
                    <v-layout row align-center>
                      <v-icon large color="pink">mdi-lightbulb-on-outline</v-icon><span class="headline indigo--text pa-2">Conheça as Iniciativas</span>
                    </v-layout>
                  </v-card-title>
                  <v-card-text>
                    <v-layout row >
                      <v-flex lg11 text-lg-justify>
                        <span class="ma-3"> A partir dos Objetivos e Diretrizes, veja Iniciativas relacionadas e seus responsáveis, intervenientes, prazos e status. Você pode filtrar por diretoria, gerência ou status.</span>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                  <v-card-actions>
                    <v-flex lg12 text-lg-right>
                      <v-btn icon to="/iniciativas"><v-icon small color="pink">add</v-icon></v-btn>
                    </v-flex>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <v-flex lg3 md3 sm6>
                <v-card flat to="/radar" hover>
                  <v-card-title>
                    <v-layout row align-center>
                      <v-icon large color="pink">settings</v-icon><span class="headline indigo--text pa-2">Radar da Previ</span>
                    </v-layout>
                  </v-card-title>
                  <v-card-text>
                    <v-layout row >
                      <v-flex lg11 text-lg-justify>
                        <span class="ma-3"> Gráficos com os status das Iniciativas, considerando a visão geral da Previ e por diretorias e respectivas gerências.</span>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                  <v-card-actions>
                    <v-flex lg12 text-lg-right>
                      <v-btn icon to="/radar"><v-icon small color="pink">add</v-icon></v-btn>
                    </v-flex>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <v-flex lg3 md3 sm6>
                <v-card flat to="/linha-tempo" hover>
                  <v-card-title>
                    <v-layout row align-center>
                      <v-icon large color="pink">fas fa-tasks</v-icon><span class="headline indigo--text pa-2">Linha do Tempo</span>
                    </v-layout>
                  </v-card-title>
                  <v-card-text>
                    <v-layout row >
                      <v-flex lg11 text-lg-justify>
                        <span class="ma-3"> Todas as Iniciativas dispostas em ordem cronológica pela data prevista para conclusão. Você pode filtrar por diretoria, gerência ou status.</span>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                  <v-card-actions>
                    <v-flex lg12 text-lg-right>
                      <v-btn icon to="/linha-tempo"><v-icon small color="pink">add</v-icon></v-btn>
                    </v-flex>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card-text>
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
