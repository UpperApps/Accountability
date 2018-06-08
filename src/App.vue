<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>
<style>
@font-face {
  font-family: OpenSans;
  src: url('./assets/OpenSans-Light.ttf') format('truetype');
}
#app {
  font-family: 'OpenSans' !important;
}
#card {
  border-radius: 10px;
  border-left: 10px;
  background-color: white
}
</style>
