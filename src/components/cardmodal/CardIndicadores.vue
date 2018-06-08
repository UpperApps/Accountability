<template>
  <v-layout fill-height d-flex>
   <v-card id="card" v-if="objetivo" :style="'border-left: 10px solid ' + corHexa(objetivo.cor) + ' !important;'" flat>
      <v-btn small absolute right fab @click.stop="fecharModal()"><v-icon color="pink">close</v-icon></v-btn>
      <v-card-title >
        <v-layout column class="title blue-grey--text text--darken-1" >
          <v-flex ma-2 style="font-size: 18px; font-weight: bolder"> Indicadores da diretriz </v-flex>
          <v-flex ma-1 style="font-size: 16px"> {{diretriz.id}} {{diretriz.nome}} </v-flex>
          <v-divider></v-divider>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="diretriz.indicadores"
          class="elevation-0"
          hide-actions
          
        >
          <template slot="items" slot-scope="props">
            <td class="blue-grey--text text--darken-2 caption text-lg-justify">>{{ props.item.nome }}</td>
            <td class="blue-grey--text text--darken-2 caption text-lg-justify">>{{ props.item.target }}</td>
            <td class="blue-grey--text text--darken-2 caption text-lg-justify">>{{ props.item.atual }}</td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
  import aux from '@/components/funcoesAux'

  export default {
    props: ['diretriz', 'objetivo'],
    methods: {
      fecharModal () {
        this.$emit('clicked-fechar-modal')
      },
      corHexa (str) {
        return str ? aux.style_color(str) : 'white'
      }
    },
    data () {
      return {
        headers: [
          { text: 'Indicador', value: 'nome' },
          { text: 'Target', sortable: false, value: 'target' },
          { text: 'Atual', sortable: false, value: 'atual' }
        ],
        items: []
      }
    }
  }
</script>