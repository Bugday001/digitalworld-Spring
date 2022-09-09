<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, reactive } from 'vue';
import WorldView from '../components/WorldView.vue';
import MapView from '../components/GridMap.vue';
import SolarView from '../components/SolarView.vue';

</script>

<template>
<h2>Merry Christmas</h2>
    <MapView></MapView>
    <br>
    
</template>

<style scoped>
h2 {
    text-align: center;
    font-family: 'Times New Roman', Times, serif;
    font-style: italic;
    font-size: 60px;
}
</style>
