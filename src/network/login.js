import {request} from './index'

export function phoneRegistered(phone) {
  return request({
    url: '/cellphone/existence/check',
    params: {
      phone
    }
  })
}

export function userDetail(uid) {
  return request({
    url: '/user/detail',
    params: {
      uid
    }
  })
}

export function phoneLogin(phone, password) {
  return request({
    url: '/login/cellphone',
    params: {
      phone: phone || '',
      password: password || ''
    },
  })
}

export function loginStatusFn() {
  return request({
    url: '/login/status',
/*     params: {
      uid: 1326836835
    } */
  })
}

export function logoutFn() {
  return request({
    url: '/logout'
  })
}