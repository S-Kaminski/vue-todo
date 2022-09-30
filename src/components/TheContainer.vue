<template>
    <div>
      <TheHeader :count="$store.state.tasks.length"></TheHeader>
      <div id="main">
        <p id="label">Lista zadań:</p>
        <p id="error"></p>
        <span>
          <input 
            type="text" 
            placeholder="Opis zadania"
            id="task-description" 
            v-model.trim="taskDescription" 
            @keydown.enter="addNewTask"
          />
          <button 
            @click="addNewTask"
            id="task-adder"
            :disabled="!(taskDescription.length>0)">
              + Dodaj
            </button>
        </span>
        <span id="important">
          <input type="checkbox" v-model="taskImportance" value="important-cb"/>
          <label for="important-cb">Ważne</label>
        </span>
        <ul v-if="$store.state.tasks.length">  
          <SingleItem v-for="(task, index) in $store.state.tasks" 
            :key="task.id + index" 
            :index="index" :task="task"
            :status="selectedTasks.includes(task.id)"
            @task-selection="taskSelection" 
            @remove-task="removeSingleTask" >
            x
          </SingleItem>
        </ul>
        <ul v-else>Brak zadań do wyświetlenia</ul>
      </div>
      <TheFooter
        @move-up="moveTasks"
        @move-down="moveTasks"
        @mark-important="markImportant" 
        @remove-all-tasks="removeAllTasks">
      </TheFooter>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../types'
import SingleItem from './SingleItem.vue'
import TheFooter from './TheFooter.vue'
import TheHeader from './TheHeader.vue'

@Component({
  components: {
    TheHeader,
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
      if(this.taskDescription.length)
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
        for(let i = 0; i < checkedTasksIndexes.length; i++) {
            if(checkedTasksIndexes[i]<this.$store.state.tasks.length-1)
            {
                const newPosition = checkedTasksIndexes[i]+1;
                const arrayElement = this.$store.state.tasks.splice(checkedTasksIndexes[i],1)[0];
                this.$store.state.tasks.splice(newPosition,0,arrayElement);
                checkedTasksIndexes[i] = -1;
            }
        }
    }

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

    public taskSelection(value: { taskId: string, taskStatus: boolean }): void {
      console.log("TheContainer received: { id: " + value.taskId + ", status: " + + value.taskStatus + "}");
      if(value.taskStatus && !(this.selectedTasks.includes(value.taskId))) {
        console.log("Selection: " + value.taskStatus + " adding to array. ");
        this.selectedTasks.push(value.taskId); 
      }
      else if (!value.taskStatus && (this.selectedTasks.includes(value.taskId))) {
        this.selectedTasks.splice(this.selectedTasks.findIndex((i) => i == value.taskId),1)
      }
    }

    public removeSingleTask(value: {taskId: string, taskStatus: boolean}): void {
      if(confirm("Czy na pewno chcesz usunąć to zadanie?")) {
        const index = this.$store.state.tasks.findIndex( (task: Task) => task.id === value.taskId );
        console.log("Should remove => id:" + value.taskId)
        if(this.selectedTasks.includes(value.taskId)) this.selectedTasks.splice(this.selectedTasks.findIndex((i) => i == value.taskId),1)
        this.$store.state.tasks.splice(index,1);
        }
    }

    public markImportant(): void { //todo
        if (this.selectedTasks.length>0) {
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
    //Computed
    //...
    //Emit
    //...
    //Watch
    
  }
</script>

<style scoped>
div#main {
  min-width: 60vw;
  margin-bottom: 10px;
  border: solid 1px;
  display: inline-block;
  text-align: left;
  padding: 20px;
}
div p#label {
  text-decoration: underline;
  text-align: left;
  display: block;
  font-size: 15px;
}

input#task-description {
  padding: 10px;
  margin: 10px 0;
  border: 2px solid rgb(199, 199, 199);
  width: 30%;
  font-size:15px;
  border-radius: 4px;    
}
button#task-adder {
  padding: 10px;
  margin: 10px 0;
  margin-left: 10px;
  border: 2px solid rgb(199, 199, 199);
  font-size:15px;
  border-radius: 4px;
}
button:enabled#task-adder:hover {
  background-color:#98a3e2;
  border: 2px solid rgb(0, 0, 0);
  color:#fff;
}
span#important {
  display:block;
  margin: 0 auto;
  margin: 10px 10px;
  padding-bottom: 15px;
  border-bottom: 1px solid #dddddd;
}
ul { 
  margin: 0;
  padding: 0;
}
</style>