<template>
    <div>
      <p>Lista zadań:</p>
      <span>
        <input type="text"/>
        <button>+ Dodaj</button>
      </span>
      <span>
        <input type="checkbox"/>
        <label>Ważne</label>
      </span>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
  export default class TheContainer extends Vue {
  
  }
</script>

<style scoped>

</style>