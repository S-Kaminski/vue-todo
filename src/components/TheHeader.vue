<template>
    <div>
        <span>Liczba zadań: </span> 
        <span id="counter">{{ count }}</span>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
  export default class TheHeader extends Vue {
    @Prop() readonly count!: number;
  }
</script>

<style scoped>
div {
  min-width: 60vw;
  margin-bottom: 10px;
  border: solid 1px;
  display: inline-block;
  text-align: right;
  padding: 20px;
  font-size: 20px;
}
span#counter {
  font-weight: bold;
}
</style>