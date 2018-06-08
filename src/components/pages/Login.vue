<template>
  <v-container grid-list-md text-xs-center>
    <v-layout column>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Login</h3>
            </div>
          </v-card-title>
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-text-field label="Usuário" v-model="user" :rules="userRules" required></v-text-field>
                  <v-text-field name="password" label="Senha" hint="Mínimo 8 caracteres" v-model="password"
                                :append-icon="passLogin ? 'visibility' : 'visibility_off'"
                                :append-icon-cb="() => (passLogin = !passLogin)"
                                :type="passLogin ? 'password' : 'text'"
                                :rules="passwordRules" 
                                min="8" required></v-text-field>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-btn flat color="orange" @click="submit" :disabled="!valid">Entrar</v-btn>
            <v-btn flat color="orange" @click="clear">Limpar</v-btn>
            <v-btn flat color="orange" @click="forgetPassword">Esqueci minha senha</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      user: '',
      userRules: [
        v => !!v || 'Usuário necessário'
      ],
      password: '',
      passLogin: true,
      passwordRules: [
        v => !!v || 'Senha necessária'
      ]
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          // Chamar o serviço de autenticação.
        }
      },
      clear () {
        this.$refs.form.reset()
      },
      forgetPassword () {
      }
    }
  }
</script>
