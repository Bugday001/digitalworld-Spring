<template>
  <el-container class="layout-container-demo" style="height: auto">
    <el-aside width="180px">
      <el-scrollbar>
        <!--
        <el-menu :default-openeds="['1', '3']" router>
        -->
        <el-menu :default-openeds="['/viewer', '']" router>
          <el-menu-item index="/">
           <el-icon><icon-menu /></el-icon>
          <span>Welcome</span>
          </el-menu-item>

          <el-menu-item index="/viewer">
            <template #title>
              <el-icon><icon-menu /></el-icon>World Viewer
            </template>
          </el-menu-item>

          <el-sub-menu index="1">
            <template #title>
              <el-icon><message /></el-icon>World Management
            </template>
            <el-menu-item index="admin">Management</el-menu-item>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="1-1">Option 1</el-menu-item>
              <el-menu-item index="1-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="1-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>Option4</template>
              <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>Settings
            </template>
            <el-menu-item index="/welcome">Welcome</el-menu-item>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="2-1">Option 1</el-menu-item>
              <el-menu-item index="2-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="2-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>Option 4</template>
              <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><setting /></el-icon>Learn & Test
            </template>
            <el-menu-item index="/test">Test</el-menu-item>
            <el-menu-item index="/old">ViteAppPage(Old)</el-menu-item>
            <el-menu-item index="clockview">clockview</el-menu-item>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="3-1">Test</el-menu-item>
              <el-menu-item index="3-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="3-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="3-4">
              <template #title>Option 4</template>
              <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="/about">
            <template #title>
              <el-icon><icon-menu /></el-icon>World Viewer
            </template>
          </el-menu-item>
        </el-menu>
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
        <router-link to="/gridmap">gridmap</router-link><br/>
      </p>

      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right;">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
              ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Viewer for Digital World</span>
        </div>
      </el-header>

      <el-main>
        <router-view></router-view>
          <!-- <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="address" label="Address" />
          </el-table> -->
        <!--
        <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="address" label="Address" />
          </el-table>
        </el-scrollbar>
        -->
      </el-main>

      <el-footer style="text-align: right;">
        <div class="toolbar">
          <span>.. <br />
          </span>
        </div>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
//import 'element-plus/dist/index.css'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

<style scoped>
.layout-container-demo {
  /* font-family: Inter, Avenir, Helvetica, Arial, sans-serif; */
  font-size: 90%; /* 75% or 16pt */  
  line-height: 18px;
  font-weight: 200;
  text-rendering: optimizeLegibility;
  height: auto;
}

.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-9);
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-7);
}

.layout-container-demo .el-menu {
  border-right: none;
  background-color: var(--el-color-primary-light-7);
}

.layout-container-demo .el-main {
  padding: 5px;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
