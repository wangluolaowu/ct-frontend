'use strict'
let HOST = process.argv.splice(2)[0] || 'test'
module.exports = {
  NODE_ENV: '"production"',
  HOST: '"' + HOST + '"'
}
