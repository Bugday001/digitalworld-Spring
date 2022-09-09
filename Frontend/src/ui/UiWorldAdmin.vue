<template>
    <div>Admin</div>
    <div>
        <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
    </div>
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
import { test_run, load_table_data } from '../test/test.js';

// test_run();
let tmpdata = load_table_data();
// Q: There's no difference to add ref(...) call here or not. who can answer this question?
const tableData = ref(tmpdata);
</script>
