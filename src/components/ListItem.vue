<template>
    <div>
        <li v-for="(task, index) in $store.state.tasks" :key="task.id" :class="{'important': task.important}">
            <input type="checkbox"/>
            <span> {{ (index+1)}}. {{ task.description }}</span>
            <button class="remover">x</button>
        </li>
        
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
  export default class ListItem extends Vue {

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