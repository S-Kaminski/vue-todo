<template>
    <div>

       <button @click="moveUp">W górę</button>
       <button @click="moveDown">W dół</button>
       <button>Oznacz jako ważne</button>
       <button>Wyczyść</button>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit} from 'vue-property-decorator';

@Component({})
  export default class TheFooter extends Vue {

    @Emit("move-up")
    moveUp(){ return "Up" }
    @Emit("move-down")
    moveDown(){ return "Down" }
  }
</script>

<style scoped>

</style>