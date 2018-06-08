<template>
  <v-stepper v-model="e1">
      <v-stepper-header>
        <template v-for="stepper in steppers">
          <v-stepper-step :key="`${stepper.numero}-step`" :step="stepper.numero" :complete="e1 > stepper.numero" editable edit-icon="check">
            {{ stepper.nome }}
          </v-stepper-step>
          <v-divider v-if="stepper.numero !== steppers.length" :key="stepper.numero"></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content v-for="stepper in steppers" :step="stepper.numero" :key="`${stepper.numero}-content`">
          <v-card id="card">
            <v-card-title>
              <v-container text-xs-center>
                <v-layout row wrap>
                  <v-flex mx-auto xs5>
                    <v-card id="card" dark color="indigo">
                      <v-card-text class="px-0 headline"> {{ stepper.titulo }} </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-title>

            <v-card-text>
              <v-layout column text-xs-justify>
                <v-flex hidden-md-only style="height: 160px;">
                  <span class="ml-3 subheading"> {{ stepper.descricao }}</span>
                </v-flex>
                <v-flex hidden-lg-and-up style="height: 180px;">
                  <span class="ml-3 subheading"> {{ stepper.descricao }}</span>
                </v-flex>
              </v-layout>
             
              <v-layout mt-5 row wrap>
                <v-flex xs6>
                  <v-btn v-if="stepper.numero !== 1" round left color="indigo" dark flat @click.native="e1 = stepper.numero - 1"><v-icon>keyboard_arrow_left</v-icon>ANTERIOR</v-btn>
                </v-flex>
                <v-flex xs6 text-xs-right>                  
                  <v-btn v-if="stepper.numero !== steppers.length" round right color="indigo" dark flat @click.native="e1 = stepper.numero + 1">PRÓXIMO<v-icon>keyboard_arrow_right</v-icon></v-btn>
                  <v-btn v-if="stepper.numero === steppers.length" round right color="indigo" dark flat @click.native="e1 = 1"><v-icon>settings_backup_restore</v-icon></v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
</template>

<script>
  export default {
    data () {
      return {
        e1: 0,
        steppers: [{
          numero: 1,
          nome: 'Construção',
          titulo: 'Construção',
          descricao: 'O horizonte do Plano é de 5 anos, mas ele é anualmente revisado. É importante ressaltar que nas revisões anuais são feitos ajustes para o período seguinte, mas a execução do Plano Estratégico e Tático é contínua. Participam diretamente da construção / revisão do Plano Estratégico e Tático: Diretoria Executiva, Conselho Deliberativo, Conselho Fiscal, Conselhos Consultivos, Assessores e Gerentes Executivos. Os Gerentes Executivos são responsáveis por trazerem a visão das áreas técnicas para o debate estratégico.'
        },
        {
          numero: 2,
          nome: 'O Estratégico',
          titulo: 'Para onde vamos',
          descricao: 'É composto por objetivos e diretrizes estratégicas, que são os grandes norteadores da atuação da PREVI. A estratégia considera o atual cenário previdenciário e macroeconômico e visa potencializar forças e endereçar fraquezas para tratarmos as ameaças e oportunidades mapeadas na construção do Plano.'
        },
        {
          numero: 3,
          nome: 'O Tático',
          titulo: 'Como iremos',
          descricao: 'É o desdobramento da estratégia em iniciativas táticas que materializarão os objetivos e diretrizes. As iniciativas têm gerências responsáveis e intervenientes, com metas, prazos e custos que se refletem no Acordo de Trabalho das equipes.'
        },
        {
          numero: 4,
          nome: 'Controle',
          titulo: 'Como estamos indo',
          descricao: 'As iniciativas táticas são acompanhadas de forma mais próxima nos Comitês Patrocinadores e Gerenciais que cuidam de cada um dos objetivos estratégicos da PREVI. Esses comitês se reúnem periodicamente para tratar da evolução e mensuração de cada iniciativa, da validação das entregas feitas e quaisquer outros assuntos que sejam pertinentes à execução do Plano Estratégico e Tático. As informações ali discutidas servem de insumo para os Fóruns Estratégicos e Táticos, que reúnem mensalmente diretoria, assessores e gerentes executivos para debater as iniciativas que estão sendo realizadas visando ao atingimento dos objetivos estratégicos, sendo que a cada mês um dos objetivos está em foco. Além disso, a cada três meses o Painel Integrado Estratégico e Tático é submetido ao conhecimento de Diretoria e Conselhos com a compilação dos dados de acompanhamento (status, indicadores, avaliações qualitativas) de todo o Plano.'
        }]
      }
    }
  }
</script>