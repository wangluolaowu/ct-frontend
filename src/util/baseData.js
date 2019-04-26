'use strict'

let baseURLTemp = ''
let wsURLTemp = ''
let loginUrlTemp = ''
let HOST = process.env.HOST
console.log('HOST======' + HOST)
if (HOST === 'test' || HOST === 'dev') {
  baseURLTemp = 'http://localhost:8080'
  wsURLTemp = 'ws://localhost:8080/pickManage/pickInfo/selectStopRestReceiveStatusExit'
  loginUrlTemp = 'http://localhost:8081/#/login'
}
if (HOST === 'uat') {
  baseURLTemp = 'https://bixi-test.cn.isn.corpintra.net/ct'
  wsURLTemp = 'wss://bixi-test.cn.isn.corpintra.net/ct/pickManage/pickInfo/selectStopRestReceiveStatusExit'
  loginUrlTemp = 'https://bixi-test.cn.isn.corpintra.net/ct/login'
}
if (HOST === 'prod') {
  baseURLTemp = 'https://bixi.cn.isn.corpintra.net/ct'
  wsURLTemp = 'wss://bixi.cn.isn.corpintra.net/ct/pickManage/pickInfo/selectStopRestReceiveStatusExit'
  loginUrlTemp = 'https://bixi.cn.isn.corpintra.net/ct/login'
}
if (HOST === 'wrt') {
  baseURLTemp = 'http://172.16.18.97:8080/'
  wsURLTemp = 'ws://172.16.18.97:8080/pickManage/pickInfo/selectStopRestReceiveStatusExit'
  loginUrlTemp = 'http://172.16.18.97:8080/#/login'
}
module.exports = {
  baseURL: baseURLTemp,
  wsURL: wsURLTemp,
  loginUrl: loginUrlTemp,
  // baseURL: 'https://bixi-test.cn.isn.corpintra.net/ct',
  // baseURL: 'https://bixi.cn.isn.corpintra.net/ct',
  // wsURL: 'ws://localhost:8080/pickManage/pickInfo/selectStopRestReceiveStatusExit',
  // wsURL: 'ws://localhost:8080/pickManage/pickInfo/selectStopRestReceiveStatusExit',
  // wsURL: 'wss://bixi-test.cn.isn.corpintra.net/ct/pickManage/pickInfo/selectStopRestReceiveStatusExit',
  // wsURL: 'wss://bixi.cn.isn.corpintra.net/ct/pickManage/pickInfo/selectStopRestReceiveStatusExit',
  // loginUrl: 'http://localhost:8081/#/login',
  // loginUrl: 'https://bixi-test.cn.isn.corpintra.net/ct/login',
  // loginUrl: 'https://bixi.cn.isn.corpintra.net/ct/login',
  // baseURL: 'http://172.16.18.97:8080/',
  // wsURL: 'ws://172.16.18.97:8080/pickManage/pickInfo/selectStopRestReceiveStatusExit',
  // loginUrl: 'http://172.16.18.97:8080/#/login',
  token: '',
  userSite: []
}
