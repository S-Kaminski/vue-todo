<template>
        <li :class="{'important': task.important}"> 
            <input type="checkbox" :value="task.id" v-model="computedStatus"/>
            {{index+1}} . {{task.description}} 
            <button 
                class="remover" 
                @click="removeTask">
                    <slot></slot>
            </button>
        </li>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { Task } from '../types'
    @Component
    export default class SingleItem extends Vue {
        //Props
        @Prop() readonly index!: number;
        @Prop() readonly task!: Task;
        @Prop() readonly status!: boolean;

        //Data

        //Methods

        //Computed
        get computedStatus(){
            return this.status;
        }
        set computedStatus(val: boolean)
        {
            console.log("Update computed" )
            this.taskSelection(val)
        }
        //Emit
        @Emit("task-selection")
        taskSelection(status: boolean): { taskId: string, taskStatus: boolean } {
            console.log("SingleItem component Emit -> selectedTask " + status + " <-");
            return { taskId: this.task.id, taskStatus: status};
        }
        @Emit("remove-task")
        public removeTask(): string { 
            console.log("SingleItem component emit -> removeItem " + this.task.id);
            return this.task.id;
        }
    }
        
</script>

<style scoped>
    li {
        padding: 10px;
        border-bottom: 1px solid #dddddd;
        list-style-type: none;
        
    }
    li.important {
        color:red;
        background: rgb(238, 238, 238);
    }
    button.remover {
        border: none;
        background-color: inherit;
        color: red;
        padding: 0px 10px;
        font-size: 16px;
        cursor: pointer;
        float: right;
    }
    button.remover:hover {
        background: #eee;
        color: black;
    }
    </style>
