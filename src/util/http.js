import axios from 'axios'
import {Message, Loading} from 'element-ui'
const golbalData = require('./baseData')

let axiosInstance = axios.create({
  baseURL: golbalData.baseURL,
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': 'req.headers.origin || *',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
    'X-Powered-By': '3.2.1',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
})
axiosInstance.interceptors.request.use(config => {
  Loading.service({text: 'Loading...'})
  let token = sessionStorage.getItem('token')
  if (token && token !== '') {
    config.headers.Authorization = token
  }
  return config
}, err => {
  Message.error({message: '请求超时!'})
  // console.log('err.res==request==' + err.res)
  return Promise.reject(err)
})

axiosInstance.interceptors.response.use(res => {
  Loading.service().close()
 /* 在此处理请求返回内容 */
  let token = res.headers['Authorization']
  if (token && token !== '') {
    sessionStorage.setItem('token', token)
  }
  return res.data
}, err => {
  console.log('err====' + err)
  Loading.service().close()
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        Message.error({message: '请求错误(400),请稍后再试'})
        break
      case 401:
        Message.error({message: '未授权，请重新登录(401)'})
        break
      case 403:
        Message.error({message: '未授权，拒绝访问(403),请稍后再试'})
        break
      case 404:
        Message.error({message: '请求出错(404),请稍后再试'})
        break
      case 408:
        Message.error({message: '请求超时(408),请稍后再试'})
        break
      case 500:
        Message.error({message: '服务器错误(500),请稍后再试'})
        break
      case 501:
        Message.error({message: '服务未实现(501),请稍后再试'})
        break
      case 502:
        Message.error({message: '网络错误(502),请稍后再试'})
        break
      case 503:
        Message.error({message: '服务不可用(503),请稍后再试'})
        break
      case 504:
        Message.error({message: '网络超时(504),请稍后再试'})
        break
      case 505:
        Message.error({message: 'HTTP版本不受支持(505),请稍后再试'})
        break
      case 702:
        Message.error({message: '当前登录已过期，请重新登录！！！'})
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
        window.location.href = golbalData.loginUrl
        break
      case 703:
        Message.error({message: '当前用户没有该操作权限,请联系管理员稍后再试'})
        break
      default:
        err.message = `连接出错(${err.response.status})!`
        Message.error({message: err.message})  
    }
  } else {
    Message.error({message: '连接服务器失败!'})
  }
  return Promise.reject(err)
})
export default {
  post (url, data = {}) {
    return axiosInstance({
      method: 'post',
      url,
      data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; application/json;charset=UTF-8'
      }
    })
  },
  postD (url, data = {}) {
    return axiosInstance({
      method: 'post',
      url,
      data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; multipart/form-data;application/json;charset=UTF-8'
      },
      responseType: 'blob'
    })
  },
  delete (url, data = {}) {
    return axiosInstance({
      method: 'delete',
      url,
      data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  },
  get (url, params = {}) {
    return axiosInstance({
      method: 'GET',
      url,
      params // get 请求时带的参数
    })
  }
}
