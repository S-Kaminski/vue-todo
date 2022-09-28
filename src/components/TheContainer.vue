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
      <SingleItem v-for="(task, index) in $store.state.tasks" :key="task.id + index" :index="index" :task="task" @task-selection="taskSelection" :checkboxStatus="selectedTasks.includes(task.id)"></SingleItem>
      <TheFooter @mark-important="markImportant" @remove-all-tasks="removeAllTasks"></TheFooter>
      <!-- <ListItem></ListItem>-->
      {{selectedTasks}}
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../types'
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
    selectedTasks: string[] = [];
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
    //Emit
    //...
    //Watch
    @Watch("taskSelected")
    taskSelection(value: { taskId: string, taskStatus: boolean }): void {
      console.log("TheContainer received: { id: " + value.taskId + ", status: " + + value.taskStatus + "}");
      if(value.taskStatus) this.selectedTasks.push(value.taskId);
      else this.selectedTasks.splice(this.selectedTasks.findIndex( (task: string) => task === value.taskId),1 );
    }
    @Watch("markImportant")
    public markImportant(): void {
        
        if (this.selectedTasks.length>0){
            if(confirm("Czy na pewno chcesz ustawić zaznaczone zadania na liście jako ważne?")) {
                for(let i = 0; i < this.selectedTasks.length; i++)
                {
                    const index = this.$store.state.tasks.findIndex((t: Task) => t.id == this.selectedTasks[i])
                    this.$store.state.tasks[index].important = true;
                }
                this.$store.state.tasks
                this.selectedTasks.splice(0);
                console.log("Marked as important")
            }
        }
    }
    @Watch("clearTasks")
    public removeAllTasks(): void {
        if(this.$store.state.tasks.length > 0) {
            if(confirm("Czy na pewno chcesz usunąć wszystkie zadania na liście?")) {
            this.$store.state.tasks.splice(0);
            this.selectedTasks.splice(0);
            console.log("Removed all tasks");
            }
        }
        else console.log("Task list is already empty")
        
    }
  }
</script>

<style scoped>

</style>