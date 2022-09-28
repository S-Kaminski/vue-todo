
<template>
    <div>
        <li :class="{'important': task.important}"> 
            <input type="checkbox" :value="task.id" v-model="checkboxStatus"/>
            {{index}} . {{task.description}} 
            <button class="remover" @click="removeTask">x</button>
        </li>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
import { Task } from '../types'
    @Component
    export default class SingleItem extends Vue {
        //Props
        @Prop() readonly index!: number;
        @Prop() readonly task!: Task;
        //Data
        checkboxStatus = false;
        //Methods
        
        //Emit
        @Emit("task-selection")
        taskSelection(status: boolean): { taskId: string, taskStatus: boolean } {
            console.log("SingleItem component Emit -> selectedTask " + status + " <-");
            return { taskId: this.task.id, taskStatus: status};
        }
        @Emit("remove-task")
        public removeTask(): {taskId: string, taskStatus: boolean} { 
            console.log("SingleItem component emit -> removeItem " + this.task.id);
            return { taskId: this.task.id, taskStatus: this.checkboxStatus } 
        }

        //Watch
        @Watch("checkboxStatus")
        public clickCheckbox(): void {
            console.log("SingleItem component Watch -> selectionStatus changed");
                this.taskSelection(this.checkboxStatus);
        }
        
        //...
    }
        
</script>

<style scoped>
    li {
        padding: 10px;
        border-bottom: 1px solid #dddddd;
        list-style-type: none;
        clear: left;
        text-align: left;
    }
    li.important {
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
    button.remover:hover {
        background: #eee;
        color: red;
    }
    </style>
