<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="e1 > 1">Início</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="e1 > 2">Horizonte</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3" :complete="e1 > 3">Participantes</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="4" :complete="e1 > 4">Fóruns</v-stepper-step>      
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card color="grey lighten-1" class="mb-5" height="400px">
        <v-card-text>
        Conheça como é feito o Planejamento Estratégico
        </v-card-text>
        </v-card>
        <v-card>
        <v-card-actions>
        <!--v-btn left color="primary" @click.native="e1 = e1 -1"><v-icon>keyboard_arrow_left</v-icon></v-btn-->
        <v-spacer></v-spacer>
        <v-btn right color="primary" @click.native="e1 = 2"><v-icon>keyboard_arrow_right</v-icon></v-btn>
        </v-card-actions>
        </v-card>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card color="grey lighten-1" class="mb-5" height="400px">
        <v-card-text>
          O horizonte do Plano é de 5 anos, mas ele é anualmente revisado. É importante ressaltar que na revisão anual são feitos ajustes para o período seguinte mas a execução do Plano Estratégico e Tático é contínua;
        </v-card-text>
        </v-card>
        <v-card>
        <v-card-actions>
        <v-btn left color="primary" @click.native="e1 = 1"><v-icon>keyboard_arrow_left</v-icon></v-btn>
        <v-spacer></v-spacer>
        <v-btn right color="primary" @click.native="e1 = 3"><v-icon>keyboard_arrow_right</v-icon></v-btn>
        </v-card-actions>
        </v-card>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-card color="grey lighten-1" class="mb-5" height="400px">
        <v-card-text>
        Participam diretamente da revisão/construção do Plano Estratégico e Tático: Diretoria Executiva, Conselho Deliberativo, Conselho Fiscal, Conselhos Consultivos, Gerentes Executivos e Assessores;
        </v-card-text>
        </v-card>
        <v-card>
        <v-card-actions>
        <v-btn left color="primary" @click.native="e1 = 2"><v-icon>keyboard_arrow_left</v-icon></v-btn>
        <v-spacer></v-spacer>
        <v-btn right color="primary" @click.native="e1 = 4"><v-icon>keyboard_arrow_right</v-icon></v-btn>
        </v-card-actions>
        </v-card>
      </v-stepper-content>
      <v-stepper-content step="4">
        <v-card color="grey lighten-1" class="mb-5" height="400px">
        <v-card-text>
        Durante o ano são realizados Fóruns de Acompanhamento Estratégico e Tático. Em cada Fórum é tratado um dos objetivos estratégicos e são apresentadas as ações/iniciativas que estão sendo executadas e os próximos passos. É  apresentado também um panorama geral do andamento das ações/iniciativas  de todos os objetivos estratégicos do plano. Os fóruns servem para colocar todas as gerências “na mesma página” do andamento da execução do plano. E os participantes têm o importante papel de difundir essas informações em suas áreas. Participam dos Fóruns: Diretores, Executivos e Assessores;
        </v-card-text>
        </v-card>
        <v-card>
        <v-card-actions>
        <v-btn left color="primary" @click.native="e1 = 3"><v-icon>keyboard_arrow_left</v-icon></v-btn>
        <v-spacer></v-spacer>
        <v-btn right color="primary" @click.native="e1 = 1"><v-icon>keyboard_arrow_right</v-icon></v-btn>
        </v-card-actions>
        </v-card>
      </v-stepper-content>      
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  export default {
    data () {
      return {
        e1: 0
      }
    }
  }
</script>