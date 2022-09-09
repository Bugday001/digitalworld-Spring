<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import {ref,reactive} from 'vue';
// import Router from 'vue-router'
//import {JavaScriptPage} from './ui/JavaScriptPage.js'
import UiWelcome from './ui/UiWelcome.vue'
import UiClockView from './ui/UiClockView.vue'
import UiAbout from './ui/UiAbout.vue'
import UiWorldViewer from './ui/UiWorldViewer.vue'
import UiWorldAdmin from './ui/UiWorldAdmin.vue'
// import {newRouter} from './router.js'

// test_run();

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
    <el-aside class="layoutnavigator" style="color: red; font-size: 14px">
      <p>
        <!-- use the router-link component for navigation. -->
        <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
        <!--
          -->
        <router-link to="/">Home </router-link><br/>
        <router-link to="/welcome">Welcome</router-link><br/>
        <router-link to="/viewer">World Viewer </router-link><br/>
        <router-link to="/admin">Management</router-link><br/>
        <router-link to="/about">About</router-link><br/>
        <router-link to="/test">Test</router-link><br/>
        <router-link to="/old">ViteApp(Old)</router-link><br/>
        <router-link to="/clockview">Clock Canvas Demo</router-link><br/>
      </p>
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
      <router-link to="./p/ViteVuePage.vue"></router-link>
      <router-link to="./p/ClockViewPage.vue"></router-link>
      <router-view></router-view>
      -->
    </el-aside>
    <el-main class="layoutworkarea">
      <!-- route outlet -->
      <!-- component matched by the route will render here -->
      <div>
        <router-view></router-view>
      </div>
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
  font-size: large;
  color: white;
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
  /* color: var(--el-text-color-primary); */
  color: white;
  text-align: center;
  line-height: 32px;
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
