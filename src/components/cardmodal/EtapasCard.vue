<template>
  <v-layout row d-flex>
    <v-flex lg12 d-flex>
      <v-layout column ma-0>
        <!--v-text-field
        append-icon="search"
        label="Buscar"
        single-line
        hide-details
        v-model="search"
      ></v-text-field-->
        <v-layout row style="max-height: 280px; overflow-y:auto;">
          <v-data-table 
            :headers="headers"
            :items="etapas"
            :search="search"
            class="elevation-0"
            item-key="id"
            hide-actions
            style="height:300px;"
          >
            <template slot="items" slot-scope="props">
              <td class="blue-grey--text text--darken-2 caption text-lg-justify">{{ props.item.id }}</td>
              <td class="blue-grey--text text--darken-2 caption text-lg-justify">{{ props.item.descricao }}</td>
              <td class="blue-grey--text text--darken-2 caption text-lg-justify">{{ props.item.inicio }}</td>
              <td class="blue-grey--text text--darken-2 caption text-lg-justify">{{ props.item.fim }}</td>
            </template>
            <template slot="no-data">
              <v-alert :value="true" color="error" icon="warning">
                Não encontradas etapas cadastradas
              </v-alert>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Sua busca por "{{ search }}" não trouxe resultados.
            </v-alert>
          </v-data-table>
        </v-layout>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: ['etapas'],
    data () {
      return {
        search: '',
        headers: [
          { text: 'ID', value: 'idT' },
          { text: 'Descrição', value: 'descricao' },
          { text: 'Data Início', value: 'inicioT' },
          { text: 'Data Fim', value: 'fimT' }
        ]
      }
    }
  }
</script>