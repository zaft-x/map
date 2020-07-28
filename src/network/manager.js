import axios from "axios"
console.log('process.env.NODE_ENV',process.env.NODE_ENV)
axios.defaults.withCredentials = false;
const request= axios.create({
  baseURL: "http://111.231.93.196:43667",
  //请求超时时间
 
})

request.interceptors.request.use(
	//config 代表是你请求的一些信息
    config => {
        // 在请求发送之前的操作
        return config
    },
    error => {
        // 对错误请求的处理
        // 弹出错误请求消息
     
        return Promise.reject(error)
    }
)

//  response拦截器 响应拦截器 请求之后的操作
request.interceptors.response.use(
  config => {
      return config
  },
  error => {
      return Promise.reject(error)
  }
)

export default request;
