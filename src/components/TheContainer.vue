<template>
    <div>
      <p>Lista zadań:</p>
      <span>
        <input type="text" v-model="taskDescription"/>
        <button @click="addNewTask()">+ Dodaj</button>
      </span>
      <span>
        <input type="checkbox" v-model="taskImportance" />
        <label>Ważne</label>
      </span>
      {{$store.state.tasks}}
      <ListItem></ListItem>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { v4 as uuidv4 } from 'uuid';
import ListItem from './ListItem.vue'

@Component({
  components: {
    ListItem
  },
})

  export default class TheContainer extends Vue {
    //Data
    taskDescription = "";
    taskImportance = false;
    
    public addNewTask(): void{
      this.$store.commit('addNewTask',{
        id: uuidv4() as string,
        description: this.taskDescription,
        important: this.taskImportance
      })
    } 
  }
</script>

<style scoped>

</style>