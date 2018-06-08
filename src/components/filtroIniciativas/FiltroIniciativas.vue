<template>
  <v-container>
    <v-flex d-flex>
      <v-layout d-flex row>
        <v-flex d-flex>
          <v-card flat>
            <v-layout row wrap>
              <v-layout column align-center wrap>
                <v-card-text>
                  <p class="text-xs-center" style="font-size:1.3vmax;">Use os filtros por Diretoria e/ou por Gerência, para refinar sua busca pelos responsáveis/intervenientes </p>
                </v-card-text>
                <v-layout row wrap>
                  <v-flex d-flex style="border-radius: 10px;" indigo lighten-5 ma-1>
                    <v-card-text>
                      <v-select
                        :items="diretorias"
                        v-model="diretoriaSelecionada"
                        label="Diretoria"
                        item-text="diretoria"
                        return-object
                        autocomplete
                        @change="selecionarDiretoria"
                        clearable
                        open-on-clear
                      >
                        <template slot="selection" slot-scope="data">
                          <v-card>
                            {{ data.item.diretoria }}
                          </v-card>
                        </template>
                        <template slot="item" slot-scope="data">
                          <template v-if="typeof data.item.diretoria !== 'object'">
                            <v-list-tile-content v-text="data.item.diretoria"></v-list-tile-content>
                          </template>
                        </template>
                      </v-select>
                    </v-card-text>
                  </v-flex>
                  <v-flex d-flex style="border-radius: 10px;" indigo lighten-5 ma-1>
                    <v-card-text>
                        <v-select
                          :items="gerencias"
                          v-model="gerenciaSelecionada"
                          label="Gerência"
                          autocomplete
                          @change="selecionarGerencia"
                          clearable
                          open-on-clear
                        >
                          <template slot="selection" slot-scope="data">
                            <v-card>
                              {{ data.item }}
                            </v-card>
                          </template>
                        </v-select>
                    </v-card-text>
                  </v-flex>
                </v-layout>
              </v-layout>
              <v-layout column align-center wrap>
                <v-card-text>
                  <p class="text-xs-center" style="font-size:1.3vmax;">Use o filtro por Status, para refinar sua busca...</p>
                </v-card-text>
                <v-flex d-flex style="border-radius: 10px;" indigo lighten-5 ma-1>
                  <v-card-text>
                      <v-select
                        label="Status"
                        :items="status"
                        v-model="statusSelecionado"
                        autocomplete
                        @change="selecionarStatus"
                        clearable
                        open-on-clear
                      >
                        <template slot="selection" slot-scope="data">
                          <v-card >
                            {{ data.item.status }}
                          </v-card>
                          <v-spacer></v-spacer>
                          <v-avatar :class=data.item.cor size="20px"></v-avatar>
                        </template>
                        <template slot="item" slot-scope="data">
                          <template v-if="typeof data.item.status !== 'object'">
                            <v-list-tile-content v-text="data.item.status"></v-list-tile-content>
                            <v-avatar :class=data.item.cor size="20px"></v-avatar>
                          </template>
                        </template>
                      </v-select>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-container>
</template>

<script>
  import {UnidadeOrganizacional} from '../../domain/modelos/UnidadeOrganizacional'
  import {StatusIniciativas} from '../../domain/modelos/StatusIniciativas'
  
  export default {
    data () {
      return {
        diretoriaSelecionada: '',
        gerenciaSelecionada: '',
        statusSelecionado: '',
        diretorias: [],
        gerencias: [],
        status: [],
        select: [],
        items: []
      }
    },
    methods: {
      selecionarDiretoria: function (value) {
        if (value) {
          this.gerencias = this.diretorias.filter(unidade => unidade.diretoria === value.diretoria)
                                              .reduce((array, unidade) => { return array.concat(unidade.gerencias) }, [])
        } else {
          this.gerencias = this.diretorias.reduce((array, unidade) => { return array.concat(unidade.gerencias) }, [])
          this.gerenciaSelecionada = ''
        }
        this.diretorias.sort(function (a, b) {
          if (a.diretoria < b.diretoria) return -1
          if (a.diretoria > b.diretoria) return 1
          return 0
        })
        this.$emit('clicked-filter-diretorias', value)
      },
      selecionarGerencia: function (value) {
        if (!value) {
          this.gerencias = this.diretorias.reduce((array, unidade) => { return array.concat(unidade.gerencias) }, [])
        }
        this.gerencias.sort(function (a, b) {
          if (a < b) return -1
          if (a > b) return 1
          return 0
        })
        this.diretoriaSelecionada = this.diretorias.find(diretoria => diretoria.gerencias.includes(value))
        this.$emit('clicked-filter-gerencias', value, this.diretoriaSelecionada)
      },
      selecionarStatus: function (value) {
        this.$emit('clicked-filter-status', value)
      }
    },
    created () {
      this.diretorias = UnidadeOrganizacional
                        .sort(function (a, b) {
                          if (a.diretoria < b.diretoria) return -1
                          if (a.diretoria > b.diretoria) return 1
                          return 0
                        })
      this.gerencias = this.diretorias.reduce((array, unidade) => { return array.concat(unidade.gerencias) }, [])
                        .sort(function (a, b) {
                          if (a < b) return -1
                          if (a > b) return 1
                          return 0
                        })
      this.status = StatusIniciativas
    }
  }
</script>
