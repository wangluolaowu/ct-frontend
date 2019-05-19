/*
  是否合法IP地址
 */
export function validateIP(rule, value, callback) {
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正确的IP地址'))
    } else {
      callback()
    }
  }
}

/*
 是否手机号码或者固话
 */
export function validatePhoneTwo(rule, value, callback) {
  const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正确的电话号码或者固话号码'))
    } else {
      callback()
    }
  }
}

/*

*/
export function isPassword(rule, value, callback) {
  const reg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])(.{10,})$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('密码由数字，字母(含大小写)，特殊字符组成（长度10位及以下）'))
    } else {
      callback()
    }
  }
}

// 验证是否整数
export function isInteger(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'))
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入正整数'))
    } else {
      const re = /^[1-9]*[1-9][0-9]{4,9}$/
      const rsCheck = re.test(value)
      if (!rsCheck) {
        callback(new Error('请输入5-9位正整数'))
      } else {
        callback()
      }
    }
  }, 0)
}

// 验证是否整数
export function isIntegerAlone(rule, value, callback) {
  if (value === '' || value === undefined || value === null) {
    callback()
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入正整数'))
    } else {
      const re = /^[0-9]*[1-9][0-9]*$/
      const rsCheck = re.test(value)
      if (!rsCheck) {
        callback(new Error('请输入正整数'))
      } else {
        callback()
      }
    }
  }, 1000)
}

// 验证是否整数
export function isMAC(rule, value, callback) {
  if (value === '' || value === undefined || value === null) {
    callback()
  }
  setTimeout(() => {
    const re = /^[A-Fa-f0-9]{1,2}\-[A-Fa-f0-9]{1,2}\-[A-Fa-f0-9]{1,2}\-[A-Fa-f0-9]{1,2}\-[A-Fa-f0-9]{1,2}\-[A-Fa-f0-9]{1,2}$/
    const rsCheck = re.test(value)
    if (!rsCheck) {
      callback(new Error('请输入正确的MAC地址'))
    } else {
      callback()
    }
  }, 1000)
}
