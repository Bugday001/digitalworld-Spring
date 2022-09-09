// Reference
// - 整体的 router.js 大概可以这样写，https://www.h3399.cn/201806/586152.html
// - 深入解析 Vue.JS 项目 API,Router 配置拆分实践，https://www.h3399.cn/201812/644978.html
//
// History
// author zhangwei on 2022.07.18
// - The first version is generated with vite. 
// - Add dependency of ElementPlus which support vue3.
//
// modified by xxxx on 2022.07.xx
// - (Add your own major modifications here as developing history)

import {createRouter,createWebHashHistory} from 'vue-router'
//import {JavaScriptPage} from './ui/UiJavaScriptPage.js'
import UiWelcome from './ui/UiWelcome.vue'
import UiWorldViewer from './ui/UiWorldViewer.vue'
import UiWorldAdmin from './ui/UiWorldAdmin.vue'
import UiAbout from './ui/UiAbout.vue'
import UiTest from './ui/UiTest.vue'
import UiViteApp from './ui/UiViteApp.vue'
import UiClockView from './ui/UiClockView.vue'
import UiGridMap from './ui/UiMapView.vue'

// These can be imported from other files
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

// const routes = {
//    mode: 'history',
//    // linkActiveClass: 'linkActive',
//    routes: [{
const routes = [{
        path: '/',
            redirect: '/home',
            name: 'home',
            component: UiWelcome,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/home',
            component: UiWelcome,
            beforeEnter: (to, from, next) => {
                // alert('hah')
                next();
            },
            meta: {
                keepAlive: true
            }
        }, {
            path: '/welcome',
            name: 'welcome',
            component: UiWelcome,
        }, 
        { path: '/viewer', component: UiWorldViewer },
        {
            path: '/admin',
            name: 'admin',
            component: UiWorldAdmin
        },
        { path: '/about', component: UiAbout },
        { path: '/test', component: UiTest },
        { path: '/clockview', component: UiClockView },
        { path: '/old', component: UiViteApp },
        {path: '/gridmap', component: UiGridMap},
      
    ];
//};

function newRouter()
{
    let router = null;
//    try{
        // 3. Create the router instance and pass the `routes` option
        // You can pass in additional options here, but let's
        // keep it simple for now.
        router = createRouter({
            // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
            history: createWebHashHistory(),
            //mode: 'history',
            //    // linkActiveClass: 'linkActive',
            routes: routes, // short for `routes: routes`
        });
    
        // 全局守卫 在路由进入之前进行一些操作, 例如判断是否登陆
        router.beforeEach((to, from, next) => {
            next();
        })
//    }
//    catch (err)
//    {
  //      console.warn(err);
    //}
    return router;
}

export {newRouter};