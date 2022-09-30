<template>
    <div class="buttons">
      <span class="left">
        <button @click="moveUp">W górę</button>
        <button @click="moveDown">W dół</button>
      </span>
      <span class="right">
        <button @click="markImportant">Oznacz jako ważne</button>
        <button @click="removeAllTasks">Wyczyść</button>
      </span>
       

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
span.left {
  text-align: left;
  float:left;
}
span.right {
  text-align: right;
  float:right;
}
button {
  padding: 10px;
  margin: 10px 0;
  margin-left: 10px;
  border: 2px solid rgb(199, 199, 199);
  font-size:15px;
  border-radius: 4px;
}
button:enabled:hover {
  background-color:#98a3e2;
  border: 2px solid rgb(0, 0, 0);
  color:#fff;
}
</style>