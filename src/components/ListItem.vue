<template>
    <div>
        <li v-for="(task, index) in $store.state.tasks" :key="task.id" :class="{'important': task.important}">
            <input type="checkbox"/>
            <span> {{ (index+1)}}. {{ task.description }}</span>
            <button class="remover" @click="removeTask(task.id)">x</button>
        </li>
        <TheFooter @move-up="moveUp" @move-down="moveDown"></TheFooter>
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
    private removeTask(taskId: string): void{
        if(confirm("Czy na pewno chcesz usunąć to zadanie?")){
            const index = this.$store.state.tasks.findIndex( (task: Task) => task.id === taskId);
            this.$store.state.tasks.splice(index,1);
        }
    }

    @Watch("direction")
    public moveUp(value: Direction): void{
        console.log(value);
    }
    @Watch("direction")
    public moveDown(value: Direction): void{
        console.log(value);
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