<template>
    <div>
        <span>Liczba zadań: </span> 
        <span>{{ $store.state.tasks.length }}</span>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
  export default class TheHeader extends Vue {

  }
</script>

<style scoped>

</style>