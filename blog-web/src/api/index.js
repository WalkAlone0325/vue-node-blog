import axios from 'axios'
// import Vue from 'vue'

const http = axios.create({
  baseURL: 'http://localhost:3000/web/api',
  timeout: 5000
})

// axios.interceptors.request.use(config => {
//   // Vue.
// })

export default http
