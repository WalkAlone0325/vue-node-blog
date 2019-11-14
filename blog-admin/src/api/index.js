import axios from 'axios'
import Vue from 'vue'
// import router from '../router'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api',
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
  // console.log(err.response.data.message)
  if (err.response) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message || ''
    })
  }

})

export default http