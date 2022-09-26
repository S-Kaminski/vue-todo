<template>
    <div>
        <li v-for="(task, index) in $store.state.tasks" :key="task.id" :class="{'important': task.important}">
            <input type="checkbox" :value="task.id" v-model="checkedTasks" @change="sortSelectedTasks"/>
            <span> {{ (index+1)}}. {{ task.description }}</span>
            <button class="remover" @click="removeTask(task.id)">x</button>
        </li>
        <TheFooter @move-up="moveUp" @move-down="moveDown" @mark-important="markImportant" @remove-all-tasks="removeAllTasks"></TheFooter>
        {{checkedTasks}} <br>{{$store.state.tasks}}
        <!--{{consecutiveRanges(checkedIndexes)}} !-->
        
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
    
    checkedTasks:  [] = [] ;
    //checkedIndexes: number[] = [];

    //Methods
    public removeTask(taskId: string): void {
        if(confirm("Czy na pewno chcesz usunąć to zadanie?")){
            const index = this.$store.state.tasks.findIndex( (task: Task) => task.id === taskId);
            this.$store.state.tasks.splice(index,1);
        }
    }

    public sortSelectedTasks() {
        /** this.checkedIndexes.splice(0);
        this.checkedTasks.forEach( (task) => {
            this.checkedIndexes.push(this.$store.state.tasks.findIndex((t: Task) => t.id == task))
        })
        this.checkedTasks.sort();
        console.log("Updated order of selected tasks."); */
    }
    /**public consecutiveRanges(array) {
        let length = 1;

        if (array.length == 0) console.log("consecutiveRanges: return1");
        for (let index = 1; index < array.length; index++) {
            
            if (length == 1 || array[index] - array[index-1] != 1) {
                if(length == 1)
                    console.log("consecutiveRanges: condt1 " + array[index - length]);
                else 
                console.log("consecutiveRanges: condt2 " + array[index-length] + "->" + array[index - 1])
                length = 1;
            }
            else length++;
        }
    } */

    //Watch
    @Watch("movementUp") //TODO content
    public moveUp(value: Direction): void { 
        const checkedTasksIndexes: number[] = [];
        this.checkedTasks.forEach( (task) => {
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