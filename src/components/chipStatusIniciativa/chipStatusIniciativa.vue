<template>
    <v-chip small :color="acao.getStatus().cor" :text-color="acao.getStatus().cor_texto">
        <v-avatar>
            <v-icon>{{acao.getStatus().icone}}</v-icon>
        </v-avatar>
        {{acao.getStatus().status}}
    </v-chip>
</template>
<script>
  export default {
    props: ['acao']
  }
</script>