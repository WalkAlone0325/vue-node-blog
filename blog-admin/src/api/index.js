import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/admin/api',
  // baseURL: 'http://localhost:3000/admin/api',
  timeout: 5000
})

http.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + localStorage.token
  return config
}, err => {
  return Promise.reject(err)
})

http.interceptors.response.use(res => {
  return res
}, (err) => {
  if (err.response) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message || ''
    })
  }

})

export default http