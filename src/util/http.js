import axios from 'axios'
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
  let token = sessionStorage.getItem('token')
  if (token && token !== '') {
    config.headers.Authorization = token
  }
  return config
}, err => {
  // console.log('err.res==request==' + err.res)
  return Promise.reject(err)
})

axiosInstance.interceptors.response.use(res => {
/* 在此处理请求返回内容 */
  let token = res.headers['Authorization']
  if (token && token !== '') {
    sessionStorage.setItem('token', token)
  }
  return res.data
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误(400)'
        break
      case 401:
        err.message = '未授权，请重新登录(401)'
        break
      case 403:
        err.message = '拒绝访问(403)'
        break
      case 404:
        err.message = '请求出错(404)'
        break
      case 408:
        err.message = '请求超时(408)'
        break
      case 500:
        err.message = '服务器错误(500)'
        break
      case 501:
        err.message = '服务未实现(501)'
        break
      case 502:
        err.message = '网络错误(502)'
        break
      case 503:
        err.message = '服务不可用(503)'
        break
      case 504:
        err.message = '网络超时(504)'
        break
      case 505:
        err.message = 'HTTP版本不受支持(505)'
        break
      case 702:
        // window.$message.warning('当前登录已过期，请重新登录！！！')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
        window.location.href = golbalData.loginUrl
        break
      default:
        err.message = `连接出错(${err.response.status})!`
    }
  } else {
    err.message = '连接服务器失败!'
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
