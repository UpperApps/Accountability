<template>
  <v-btn small flat round color="indigo" @click="submit()">Sair</v-btn>
</template>
<script>
import authentication from '@/domain/servicos/autenticacao'
export default {
  methods: {
    submit () {
      if (authentication.isAuthenticated()) {
        authentication.signOut()
      }
    }
  }
}
</script>

