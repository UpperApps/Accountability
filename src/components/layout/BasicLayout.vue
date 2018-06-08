<template>
  <v-app>
    <v-toolbar app>
      <v-avatar>
        <img src="@/assets/avatar-garagem.jpg">
      </v-avatar>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'Vue Seed Project'
    }
  }
}
</script>