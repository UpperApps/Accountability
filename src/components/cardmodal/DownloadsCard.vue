<template>
  <v-layout row d-flex>
    <v-flex lg12 d-flex>
      <v-card flat>
        <v-card-text>
          <v-list>
            <v-list-tile avatar v-for="(arquivo, index) in acao.arquivos" :key="index" >
              <v-list-tile-action>
                <a v-bind:href="arquivo.link" target="_tab"><v-icon :color="objetivo.cor">mdi-chevron-right</v-icon>{{arquivo.descricao}}</a>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: ['acao', 'objetivo']
  }
</script>