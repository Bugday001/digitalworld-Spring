// Foundation layer.
//
// author zhangwei on 2022.07.18
// - First version
// modified by xxxx on 2022.07.xx
// - (Add your own major modifications here as developing history)

import axios from 'axios'

// VITE_API_URL: defined in ".env.development" or ".env.production"
const requests = axios.create({
  // baseURL: '/api',
  baseURL: import.meta.env.VITE_API_URL, //从环境中获取远程服务器地址,在.env.development中配置
  timeout: 5000
});

// axios.defaults.baseURL = "http://localhost:5173";

export { requests };
