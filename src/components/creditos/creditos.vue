<template>
<v-container>
<div class='wrapper'>
  <div class='movie'>garagem apresenta</div>
  <div class='name'></div>
  <div class='name'></div>
  <div class='job'>P.E.T.</div>
  <div class='name'>planejamento estratégico e tático</div>
  <div class='job'>produzido por</div>
  <div class='name'>garagem / Infor</div>
  <div class='job'>Equipe de desenvolvimento</div>
  <div class='name2'>André Hideo Miyazaki</div>
  <div class='name2'>Brunno Alves dos Santos</div>
  <div class='name2'>Eduardo Manso Sayão</div>
  <div class='name2'>Luiz Felipe "JR" soares da silva</div>
  <div class='name'>Rodrigo da Silva Melo</div>
  <div class='job'>P.O.</div>
  <div class='name'>Helton Castricini Brito</div>
  <div class='job'>facilitadores DA GARAGEM</div>
  <div class='name2'>Aline Bonfietti Frederico</div>
  <div class='name2'>Anderson "ming" MONTEIRO</div>
  <div class='name2'>Bruno Jaques DE SOUSA COSTA</div>
  <div class='name'>Eduardo "SALSICHA" Sayão</div>
  <div class='job'>Equipe fase de design</div>
  <div class='name2'>Brunno Alves dos Santos</div>
  <div class='name2'>Helton Castricini Brito</div>
  <div class='name2'>Luiz Felipe "JR" soares da silva</div>
  <div class='name2'>Rocino CRISPIM DA SILVA</div>
  <div class='name'>Rosana CORREA FERREIRA</div>
  <div class='job'>TECNOLOGIAS UTILIZADAS</div>
  <div class='name2'>NODE</div>
  <div class='name2'>VUE JS</div>
  <div class='name2'>JAVASCRIPT/ES6</div>
  <div class='name2'>CSS</div>
  <div class='name'>HTML</div>
  <div class='job'>BIBLIOTECA DE COMPONENTES</div>
  <div class='name'>VUETIFY</div>
  <div class='job'>COMPONENTES UTILIZADOS</div>
  <div class='name2'>VUE CHARTS JS</div>
  <div class='name2'>VUE SIMPLE TIMELINE</div>
  <div class='name'>VUE VIDEO PLAYER</div>
  <div class='job'>FONTES</div>
  <div class='name2'>OPEN SANS</div>
  <div class='name'>ROBOTO</div>
  <div class='job'>ÍCONES</div>
  <div class='name2'>MATERIAL DESIGN ICONS</div>
  <div class='name'>FONT AWESOME ICONS</div>
  <div class='job'>INFRAESTRUTURA</div>
  <div class='name2'>MICROSOFT AZURE</div>
  <div class='name'>APACHE WEB SERVER</div>
  <div class='name'></div>
  <div class='name'></div>
  <div class='job'>PRODUZIDO ORGULHOSAMENTE NA GARAGEM</div>
</div>
</v-container>
</template>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300);
* {
  margin: 0;
  padding: 0;
  box-sizing: max-widht;
}

html, body {
  height: 100vh;
  overflow: hidden;
  background: radial-gradient(circle at top center, #333 40%, #111 100%);     
}

.wrapper {
  position: absolute;
  top: 100%;
  left: 50%;
  width: 700px;
  margin-left: -350px;
  font: 300 30px/1 'Open Sans Condensed', sans-serif;
  text-align: center;
  text-transform: uppercase;
  color: #BBDEFB;
  animation: 60s credits linear infinite;
}

.movie {
  margin-bottom: 50px;
  font-size: 50px;
}

.job {
  margin-bottom: 5px;
  font-size: 18px;
}

.name {
  margin-bottom: 50px;
  font-size: 35px;
}

.name2 {
  font-size: 35px;
}

@keyframes credits {
  0% {
    top: 100%;
  }
  100% {
    top: -500%;
  }
}
</style>
