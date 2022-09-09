import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    proxy:{
	    // Forware HTTP request "/api/*" to "https://localhost:8080/api/"
      // '/api': 'https://api.*.com/'
      '/api': {   // 匹配请求路径，localhost:5173/api
        target: 'http://localhost:8080', // 代理的目标地址
        changeOrigin: true // 开发模式，默认的origin是真实的 origin:localhost:5173 代理服务会把origin修改为目标地址
        // secure: true, // 是否https接口
        // ws: true, // 是否代理websockets
        // rewrite target目标地址 + '/abc'，如果接口是这样的，那么不用重写
        // rewrite: (path) => path.replace(/^\/snow/, '') // 路径重写，本项目不需要重写
      }
    }
  }
})

/*
import { defineConfig, loadEnv } from 'vite'
export default defineConfig(({ mode }) => {
  // 获取当前环境的配置
  const config = loadEnv(mode, './')
  return {
    server: {
      proxy: {
        '/basice': {
          target: config.VITE_BASIC_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/basice/, '')
        }
      }
    },
  }
})
*/