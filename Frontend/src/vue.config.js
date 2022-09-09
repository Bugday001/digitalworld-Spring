// vue configu file.
//
// Q: Vue 3 [Vue warn]: Component provided template option but runtime compilation is not supported in ...
// https://www.jianshu.com/p/4b0d7701103b
// This article gives two method, one is to use vue.esm-bundler and the other is to use render()
// other than tempalte element. I configured "runtimeCompiler" to true.
//
// Reference
// vue3 使用第三方插件问题 bundler to alias “vue“ to “vue/dist/vue.esm-bundler.js
// https://blog.csdn.net/qq_41499782/article/details/112505665
//
// Component provided template option but runtime compilation is not supported in this build of Vue #8
// https://github.com/fengyuanchen/vue-feather/issues/8
//
// In short, use:
//	import { createApp } from 'vue/dist/vue.esm-bundler';
// instead of :
//	import { createApp } from 'vue/dist/vue.runtime.esm-bundler';
//
// https://github.com/vuejs/vue-cli/issues/2754
// https://cli.vuejs.org/config/#runtimecompiler
// https://github.com/vuejs-templates/webpack/issues/215
//
// author zhangwei on 2022.07.18
// - Create this config file and set "runtimeCompiler" to true.
//
// modified by xxxx on 2022.07.xx
// - (Add your own major modifications here as developing history)
//
module.exports ={
    // chainWebpack: config =>{
    //      config.resolve.alias.set('vue','vue/dist/vue.esm-bundler.js')
    // },
    runtimeCompiler: true
  }