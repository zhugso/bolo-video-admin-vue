// src/utils/request.js
import { useTokenStore } from '@/stores/token'
import axios from 'axios'

const service = axios.create({
  baseURL: '/api', // 可通过环境变量配置
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // if (response.data.code !== '200') {
    //   // 假设业务状态码200为成功
    //   return Promise.reject(response.data)
    // }
    return response.data
  },
  (error) => {
    // 统一错误处理（示例）

    if (error.response.status === '601') {
      // 清除token
      const tokenStore = useTokenStore()
      tokenStore.setToken('')

      alert('登录过期，请重新登录')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default service
