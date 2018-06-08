<template>
  <v-layout row>
    <v-flex d-flex xl10 offset-xl1 lg10 offset-lg1>
      <v-footer height="auto">
        <v-card flat tile class="white text--darken-2 text-xs-center">
          <v-card-text>
            <span style="font-style: italic; font-size:2vmin;">Apresentar aos funcionários da Previ o Planejamento Estratégico e Tático com uma visão interativa de todas as gerências, com foco na disseminação do conhecimento e no engajamento de todos para o atingimento dos objetivos estratégicos.</span>
          </v-card-text>
          <v-card-text>
            <img src="@/assets/logo-previ.png" >
            <v-flex text-xs-center style="font-size:2vmin;"> 
              &copy;{{new Date().getFullYear()}} PREVI - Todos os direitos reservados
            </v-flex>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-flex>
  </v-layout>
</template>