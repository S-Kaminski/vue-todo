<template>
    <div>
      <p>Lista zadań:</p>
      <span>
        <input type="text" placeholder="Opis zadania" v-model.trim="taskDescription" />
        <button @click="addNewTask()">+ Dodaj</button>
      </span>
      <span>
        <input type="checkbox" v-model="taskImportance" />
        <label>Ważne</label>
      </span>      
      <SingleItem v-for="(task, index) in $store.state.tasks" :key="task.id + index" :index="index" :task="task"></SingleItem>
      <TheFooter></TheFooter>
      <!-- <ListItem></ListItem>-->
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { v4 as uuidv4 } from 'uuid';
import ListItem from './ListItem.vue'
import SingleItem from './SingleItem.vue'
import TheFooter from './TheFooter.vue'

@Component({
  components: {
    ListItem,
    SingleItem,
    TheFooter
  },
})

  export default class TheContainer extends Vue {
    //Props
    //..
    //Data
    taskDescription = "";
    taskImportance = false;
    //Methods
    public addNewTask(): void {
      if(this.taskDescription.length > 0)
      {
        this.$store.commit('addNewTask', {
          id: uuidv4() as string,
          description: this.taskDescription,
          important: this.taskImportance
        });
        this.taskDescription = "";
      }
    } 
  }
</script>

<style scoped>

</style>