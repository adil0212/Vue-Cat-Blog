import axios from 'axios'
import { ElMessage } from 'element-plus'
import { diffTokenTime } from '@/utils/auth'
import store from '@/store'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) {
      if (diffTokenTime()) {
        store.dispatch('app/logout')
        return Promise.reject(new Error('token 失效了'))
      }
    }
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

service.interceptors.response.use(
  (response) => {
    const data = response.data
    console.log(data.code)
    if (data.code === 200) {
      return data
    } else {
      ElMessage.error(data.msg)
      return Promise.reject(new Error(data.msg))
    }
  },
  (error) => {
    console.log(error.response)
    error.response && ElMessage.error(error.response.data)
    console.log(error.response.data)
    return Promise.reject(new Error(error.response.data))
  }
)
export default service
