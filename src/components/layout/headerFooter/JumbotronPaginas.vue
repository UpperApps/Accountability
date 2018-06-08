<template>
    <v-jumbotron gradient='to right, #01579B, #00796B' dark height="150px">
        <v-container fill-height>
        <v-layout align-center>
            <v-flex text-xs-left offset-lg2 hidden-xs-only>
                <p class="display-1">{{titulo}}</p>
                <p>{{randomQuote()}}</p>
            </v-flex>
             <v-flex text-xs-left offset-lg2 hidden-sm-and-up>
                <p class="headline">{{titulo}}</p>
            </v-flex>
        </v-layout>
        </v-container>
    </v-jumbotron>  
</template>
<script>

export default {
  data () {
    return {
      quotes: [
        'Sem um planejamento estratégico competente, ninguém sobreviverá nesses tempos globalizados - Michael Porter',
        'Assumir uma atitude responsável perante o futuro sem uma compreensão do passado é ter um objetivo sem conhecimento. Compreender o passado sem um comprometimento com o futuro é ter conhecimento sem objetivo - Ronald T. Laconte',
        'O planejamento é um instrumento para raciocinar agora sobre os trabalhos e ações que serão necessários hoje para merecermos um futuro. O produto final do planejamento não é a informação: é sempre o trabalho - Peter Drucker',
        'É importante ter metas, mas também é fundamental planejar cuidadosamente cada passo para atingi-las - Bernardinho',
        'Planejamento estratégico é um processo de selecionar oportunidades e obter vantagens da empresa com os desafios do ambiente, além de projetar e construir o futuro - Pascale',
        'Planejamento de longo prazo não lida com decisões futuras, mas com o futuro das decisões presentes - Peter Drucker',
        'Planejamento é o desenvolvimento sistemático de programas de ação destinados a alcançar objetivos de negócio estabelecidos de comum acordo por meio de análise da avaliação e da seleção das oportunidades previstas - Certo',
        'Quando a empresa traça objetivos e metas, e busca alcançá-los, ela tem claramente definido do porque ela existe, o que e como faz, e onde quer chegar - Peter Drucker',
        'O segredo das empresas bem-sucedidas no mercado se deve ao fato de praticarem frequentemente a arte do planejamento estratégico - Kotler',
        'O planejamento é a primeira das funções administrativas e é a que determina antecipadamente quais são os objetivos a serem atingidos e como alcançá-los - Chiavenato',
        'Sem planejamento as decisões organizacionais ficam ao capricho do acaso e de escolhas de última hora - Faria',
        'O ontem é diferente do hoje que será diferente do amanhã, portanto planejar essas diferenças é uma forma de se adiantar os fatos desconhecidos e incertos, ou seja, planejar é uma estratégia para sobreviver - Tiffany e Peterson',
        'O objetivo de um plano é assegurar-nos de que os recursos contribuam positivamente para se atingirem os objetivos da organização [...] - Megginson, Mosley e Pietri Jr.'
      ]
    }
  },
  methods: {
    randomQuote: function () {
      return this.quotes[Math.floor(Math.random() * this.quotes.length)]
    }
  },

  props: ['titulo']
}
</script>