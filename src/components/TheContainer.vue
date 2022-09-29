<template>
    <div>
      <TheHeader :count="$store.state.tasks.length"></TheHeader>
      <p>Lista zadań:</p>
      <span>
        <input 
          type="text" 
          placeholder="Opis zadania" 
          v-model.trim="taskDescription" 
          @keydown.enter="addNewTask"
        />
        <button @click="addNewTask">+ Dodaj</button>
      </span>
      <span>
        <input type="checkbox" v-model="taskImportance" />
        <label>Ważne</label>
      </span>  
        <SingleItem v-for="(task, index) in $store.state.tasks" 
          :key="task.id + index" 
          :index="index" :task="task"
          :status="selectedTasks.includes(task.id)"
          @task-selection="taskSelection" 
          @remove-task="removeSingleTask" >
        </SingleItem>
      <TheFooter
        @move-up="moveTasks"
        @move-down="moveTasks"
        @mark-important="markImportant" 
        @remove-all-tasks="removeAllTasks">
      </TheFooter>
      {{selectedTasks}}
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../types'
import ListItem from './ListItem.vue'
import SingleItem from './SingleItem.vue'
import TheFooter from './TheFooter.vue'
import TheHeader from './TheHeader.vue'

@Component({
  components: {
    TheHeader,
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

    public moveUp(): void {
      const checkedTasksIndexes: number[] = [];
        this.selectedTasks.forEach( (task) => {
            checkedTasksIndexes.push(this.$store.state.tasks.findIndex((t: Task) => t.id == task))
        })
        checkedTasksIndexes.sort();
        for(let i = 0; i < checkedTasksIndexes.length; i++){
            if(checkedTasksIndexes[i]>0)
            {
                const newPosition = checkedTasksIndexes[i]-1;
                const arrayElement = this.$store.state.tasks.splice(checkedTasksIndexes[i],1)[0];
                this.$store.state.tasks.splice(newPosition,0,arrayElement);
                checkedTasksIndexes[i] = -1;
            }
        }
    }

    public moveDown(): void { 
      const checkedTasksIndexes: number[] = [];
        this.selectedTasks.forEach( (task) => {
            checkedTasksIndexes.push(this.$store.state.tasks.findIndex((t: Task) => t.id == task))
        })
        checkedTasksIndexes.sort().reverse();
        for(let i = 0; i < checkedTasksIndexes.length; i++){
            if(checkedTasksIndexes[i]<this.$store.state.tasks.length-1)
            {
                const newPosition = checkedTasksIndexes[i]+1;
                const arrayElement = this.$store.state.tasks.splice(checkedTasksIndexes[i],1)[0];
                this.$store.state.tasks.splice(newPosition,0,arrayElement);
                checkedTasksIndexes[i] = -1;
            }
        }
    }
    //Computed
    //...
    //Emit
    //...
    //Watch
    @Watch("movementOfTasks")
    public moveTasks(value: string): void {
      if (this.selectedTasks.length) {
        switch (value) {
        case "Up":
          console.log("Move \"Up\" Signal")
          this.moveUp();
          break;
        case "Down":
          this.moveDown()
          console.log("Move \"Down\" Signal")
          break;
        }
      }
      
    }
    @Watch("taskSelected")
    public taskSelection(value: { taskId: string, taskStatus: boolean }): void {
      console.log("TheContainer received: { id: " + value.taskId + ", status: " + + value.taskStatus + "}");
      if (value.taskStatus && (this.selectedTasks.includes(value.taskId))) {
        console.log(this.selectedTasks + "includes? " + (this.selectedTasks.includes(value.taskId)));
      }
      else if(value.taskStatus && !(this.selectedTasks.includes(value.taskId))) {
        console.log("Selection: " + value.taskStatus + " adding to array. ");
        this.selectedTasks.push(value.taskId);
      }
       
      else this.selectedTasks.splice(this.selectedTasks.findIndex((i) => i == value.taskId),1)
    }
    @Watch("removeSingleTask")
    public removeSingleTask(value: {taskId: string, taskStatus: boolean}): void {
      if(confirm("Czy na pewno chcesz usunąć to zadanie?")) {
        const index = this.$store.state.tasks.findIndex( (task: Task) => task.id === value.taskId );
        console.log("Should remove => id:" + value.taskId + " checked?:"+value.taskStatus )
        if(value.taskStatus) this.selectedTasks.splice(this.selectedTasks.findIndex((i) => i == value.taskId),1)
        this.$store.state.tasks.splice(index,1);
        }
    }
    @Watch("markImportant")
    public markImportant(): void { //todo
        
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