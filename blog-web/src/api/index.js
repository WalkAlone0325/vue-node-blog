import axios from 'axios'
// import Vue from 'vue'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api',
  // baseURL: 'http://localhost:3000/web/api',
  timeout: 5000
})

export default http
