<template>
  <v-layout row>
    <v-btn absolute right small fab @click.stop="fecharModal()"><v-icon color="red">close</v-icon></v-btn>
    <v-layout>
      <iframe width="100%" height="1000px"
        src= "https://forms.office.com/Pages/ResponsePage.aspx?id=8DylKBgrl0uc95GDi4pyl84JaagNMS1AuXYYzWFxqgRUMDJCQjRYQ05DMDc2SzZCSTcwTktFM0dKQy4u&embed=true" 
        frameborder= "0" marginwidth= "0" marginheight= "0" style= "border: none; max-width:100%; max-height:100%" 
        allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen>
      </iframe>
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  methods: {
    fecharModal () {
      this.$emit('clicked-fechar-modal-bug')
    }
  }
}
</script>
