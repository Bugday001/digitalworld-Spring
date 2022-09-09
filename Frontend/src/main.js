// author zhangwei on 2022.07.18
// - The first version is generated with vite. 
// - Add dependency of ElementPlus which support vue3.
//
// modified by xxxx on 2022.07.xx
// - Set Element Plus to small and to use Chinese.
// - Add error and warn handler.
//
// modified by xxxx on 2022.07.xx
// - (Add your own major modifications here as developing history)

import { createApp } from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
//import "element-plus/lib/theme-chalk/index.css"
import zh from 'element-plus/es/locale/lang/zh-cn'
import ElementPlus from "element-plus"
import {ElContainer,ElAside,ElHeader,ElMain,ElFooter} from "element-plus"
import {ElMenu,ElButton} from "element-plus"
//import {Router} from 'vue-router'
import {newRouter} from './router.js'
import App from './App.vue'

const app = createApp(App)
    .use(ElementPlus,{
        locale: zh, size: 'small'
      });
    // .use(ElContainer)
    // .use(ElAside)
    // .use(ElHeader)
    // .use(ElMain)
    // .use(ElFooter)
    // .use(ElMenu)
    // .use(ElButton);
    
//app.mount('#app');

//全局捕获错误，便于写入数据库，log文件什么的
app.config.errorHandler = (err, vm, info) => {
    // 处理错误
    // info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    console.log("mainjs:error: " + info);
    // err 显示具体错误位置
    console.log(err);
    // vm可以查看组件，文件路径什么的
}

//仅在开发环境起作用
app.config.warnHandler = function(msg, vm, trace) {
    // `trace` 是组件的继承关系追踪
    console.log("mainjs:warn: " + msg);
}  
    
app.use(newRouter()).mount('#app');