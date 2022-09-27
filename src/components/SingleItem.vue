
<template>
    <div>
        <li> 
            <input type="checkbox"/>
            {{index}} . {{task.description}} 
            <button class="remover" @click="removeTask(task.id)">x</button>
        </li>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Task } from '../types'
    @Component
    export default class SingleItem extends Vue {
        //Props
        @Prop() readonly index!: number;
        @Prop() readonly task!: Task;
        //Data
        //Methods
        public removeTask(id: string): void {
        if(confirm("Czy na pewno chcesz usunąć to zadanie?")) {
            const index = this.$store.state.tasks.findIndex( (task: Task) => task.id === id );
            this.$store.state.tasks.splice(index,1);
        }
    }
        //Watch
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
