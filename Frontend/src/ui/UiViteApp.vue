<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
//
// This is the backup copy of the former App.vue generated by vite and updated in previous versions.
// Because we introduce vue-router from this version, so we changed a lot of App.vue.
//
// author zhangwei on 2022.07.23
// - First version
// - link: https://www.runoob.com/try/try.php?filename=html5-canvas-intro3
//
// modified by xxxx on 2022.07.xx
// - (Add your own major modifications here as developing history)export default {

import HelloWorld from "../components/HelloWorld.vue";
import TestView from "../components/TestView.vue";
import {ref,reactive} from 'vue';
import {test_run, load_table_data} from '../test/test.js';
import WorldView from '../components/WorldView.vue';
import ClockView from '../components/ClockView.vue';
import SolarView from '../components/SolarView.vue';


// test_run();
let tmpdata = load_table_data();
// Q: There's no difference to add ref(...) call here or not. who can answer this question?
const tableData = ref(tmpdata);
</script>

<template>
  <!-- 网格布局实现 -->
  <el-container class="layout grid grid-contain">
    <span class="layoutheader1"> WorldView </span>
    <span class="layoutheader2">
      TongJi University 2022
    </span>
    <el-header class="layoutheader3" style="text-align: right; font-size: 12px">
      <span>
        User: Zhang Wei
      </span>
    </el-header>
    <el-aside class="layoutnavigator">
      <!--
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index='1'>
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
        </el-submenu>
        <el-submenu index='2'>
          <template slot="title"><i class="el-icon-menu"></i>导航二</template>
        </el-submenu>
        <el-submenu index='3'>
          <template slot="title"><i class="el-icon-setting"></i>导航三</template>
        </el-submenu>
      </el-menu>
      -->
    </el-aside>
    <el-main class="layoutworkarea">
      <ClockView></ClockView>
      <br><p>fdsfsd</p><br>
      <WorldView></WorldView>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
          <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
      </div>
      <HelloWorld msg="Vite + Vue" />
      <TestView inputtext="test text" />
      <div>
        <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </div>
      <HelloWorld msg="Vite + Vue" />
    </el-main>
    <div class="layoutaction">
      <span>Action/Operation Panel</span>
    </div>
    <el-footer class="layoutfooter">
      Course Project Template, Dept.of Control, TongJi University, 2022 (Developed by Zhang Wei)
    </el-footer>
  </el-container>
</template>

<style scoped>
.grid-contain {
  margin-top: 2px;
}

.grid-contain {
  display: grid;
  /* width: 100%;*/
  width: calc(100vw - 20px);
  grid-template-rows: 32px auto 32px;
  /* calc(100vh - 20px); */
  grid-template-columns: 200px auto 200px;
}

.grid-contain .layoutheader1 {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 32px;
  grid-row-start: "1";
  grid-row-end: "2";
  grid-column-start: 1;
  grid-column-end: 2;
}
.grid-contain .layoutheader2 {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 32px;
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 2;
  grid-column-end: 3;
}

.grid-contain .layoutheader3 {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  /* text-align: center; */
  line-height: 32px;
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 3;
  grid-column-end: 4;
}

.grid-contain .layoutnavigator {
  background-color: gray;
  grid-row-start: 2;
  grid-row-end: 4;
  grid-column-start: 1;
  grid-column-end: 2;
}

.grid-contain .layoutworkarea {
  background-color: white;
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 2;
  grid-column-end: 3;
}

.grid-contain .layoutaction {
  background-color: lightyellow;
  grid-row-start: 2;
  grid-row-end: 4;
  grid-column-start: 3;
  grid-column-end: 4;
}

.grid-contain .layoutfooter {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  /* text-align: center; */
  line-height: 32px;
  grid-row-start: 3;
  grid-row-end: 4;
  grid-column-start: 2;
  grid-column-end: 3;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 32px;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 24px;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
