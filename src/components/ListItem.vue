<template>
    <div>
        <li v-for="(task, index) in $store.state.tasks" :key="task.id" :class="{'important': task.important}">
            <input type="checkbox" :value="checkedTask(index,task.id)" v-model="checkedTasks"/>
            <span> {{ (index+1)}}. {{ task.description }}</span>
            <button class="remover" @click="removeTask(task.id)">x</button>
        </li>
        <TheFooter @move-up="moveUp" @move-down="moveDown" @mark-important="markImportant" @remove-all-tasks="removeAllTasks"></TheFooter>
        {{checkedTasks}}
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Direction, Task } from '../types'
import TheFooter from './TheFooter.vue'

@Component({
    components: {
        TheFooter
    }
})
  export default class ListItem extends Vue {
    //Data
    checkedTasks: [] = [];
    index = -1;

    public checkedTask(i: number, id: string){
        return {
            index: i,
            id: id
        }
    }


    public removeTask(taskId: string): void {
        if(confirm("Czy na pewno chcesz usunąć to zadanie?")){
            const index = this.$store.state.tasks.findIndex( (task: Task) => task.id === taskId);
            this.$store.state.tasks.splice(index,1);
        }
    }

    @Watch("movementUp")
    public moveUp(value: Direction): void { 
        //this.checkedTasks.sort(() = > )
        console.log(value);
    }
    @Watch("movementDown")
    public moveDown(value: Direction): void {
        console.log(value);
    }
    @Watch("changeImportance")
    public markImportant(): void {
        
        if (this.checkedTasks.length>0){
            if(confirm("Czy na pewno chcesz ustawić zaznaczone zadania na liście jako ważne?")) {
                for(let i = 0; i < this.checkedTasks.length; i++)
                {
                    const index = this.$store.state.tasks.findIndex((t: Task) => t.id == this.checkedTasks[i])
                    this.$store.state.tasks[index].important = true;
                }
                this.$store.state.tasks
                this.checkedTasks.splice(0);
                console.log("Marked as important")
            }
        }
    }
    @Watch("clearList")
    public removeAllTasks(): void {
        if(this.$store.state.tasks.length > 0){
            if(confirm("Czy na pewno chcesz usunąć wszystkie zadania na liście?")) {
            this.$store.state.tasks.splice(0);
            console.log("Removed all tasks");
            }
        }
        else console.log("Task list is already empty")
        
    }
  }
</script>

<style scoped>
li{
    padding: 10px;
    border-bottom: 1px solid #dddddd;
    list-style-type: none;
    clear: left;
    text-align: left;
}
li.important{
    color:red;
}
button.remover {
    border: none;
    background-color: inherit;
    padding: 6px 10px;
    font-size: 16px;
    cursor: pointer;
    display: inline-block;
}
button.remover:hover{
    background: #eee;
    color: red;
}
</style>