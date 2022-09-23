<template>
  <div id="app">
    <TheHeader></TheHeader>
    <TheContainer></TheContainer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TheHeader from './components/TheHeader.vue';
import TheContainer from './components/TheContainer.vue'

@Component({
  components: {
    TheHeader,
    TheContainer,

  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
