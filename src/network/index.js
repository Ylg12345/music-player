import axios from 'axios'

axios.defaults.withCredentials = true

export function request(config) {
  //创建axios的实例
  const instance = axios.create({
    //baseURL: 'api',
    //baseURL: 'http://localhost:3500',
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 8000
  })


  //axios的拦截器
  //请求拦截
  instance.interceptors.request.use(config => {
    //比如config的信息不符合服务器的要求

    //比如每次发送网络请求时 都希望在页面中显示一个请求的图标
    
    //某些网络请求 比如登陆 必须携带一些特殊的信息
    return config
  },err => {
    console.log(err)
  })


  //响应拦截
  instance.interceptors.response.use(res => {
    if(res.data.bindings) {
      return res
    }else {
      return res.data
    }
  },err => {
    console.log(err)
  })

  //发送真正的网络请求
  return instance(config)
}