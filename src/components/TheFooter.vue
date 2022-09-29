<template>
    <div class="buttons">

       <button @click="moveUp">W górę</button>
       <button @click="moveDown">W dół</button>
       <button @click="markImportant">Oznacz jako ważne</button>
       <button @click="removeAllTasks">Wyczyść</button>

    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit} from 'vue-property-decorator';

@Component({})
  export default class TheFooter extends Vue {

    @Emit("move-up")
    moveUp(){ return "Up"; }
    @Emit("move-down")
    moveDown(){ return "Down"; }
    @Emit("mark-important")
    markImportant(){ return true; }
    @Emit("remove-all-tasks")
    removeAllTasks(){ return true; }
  }
</script>

<style scoped>
div.buttons {
  min-width: 60vw;
  max-width: 60vw;
  display: inline-block;
  background-color: white;
  border: solid 1px;
  padding: 20px;
  position: sticky;
  bottom: 0;
}
</style>