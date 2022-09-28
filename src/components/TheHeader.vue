<template>
    <div>
        <span>Liczba zadań: </span> 
        <span>{{ count }}</span>
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

</style>