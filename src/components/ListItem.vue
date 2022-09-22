<template>
    <div>
        <li v-for="task in $store.state.tasks" :key="task.id" :class="{'important': task.important}">
            <input type="checkbox"/>
            <span>{{ task.description }} => </span>
            <span>{{ task.important }}</span>
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
li.important{
    color:red;
}
</style>