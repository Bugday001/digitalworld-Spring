<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<script setup>
// author zhangwei on 2022.07.18
// - First version
// modified by xxxx on 2022.07.xx
// - (Add your own major modifications here as developing history)export default {
export default{
  data() {
    return {
      greeting: 'Hello World!'
    }
  }
}
</script>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>