<template>
    <div>TestPage</div>
    <TestView inputtext="test text" />
    <button type="button" @click="getUserInfo">Axios test</button>
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
//
// author zhangwei on 2022.07.23
// - First version
// - link: Element Plus
// modified by xxxx on 2022.07.xx
// - (Add your own major modifications here as developing history
//
import { ref, reactive } from 'vue';
import TestView from "../components/TestView.vue";
import {agent_find, agent_get, agent_addnew, agent_remove, agent_update} from '../foundation/agent-api'

function getUserInfo() {
	const params = {
		id: 0
	}
	agent_get(params).then((res) => {
		console.log(res)
	}).catch((res) => {
        console.log(res)
  })
}


</script>
