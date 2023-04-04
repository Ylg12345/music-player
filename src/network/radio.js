import {request} from './index'

export function getRadioBanners() {
  return request({
    url: '/dj/banner'
  })
}

export function getRadioHot(limit) {
  return request({
    url: '/dj/today/perfered',
    params: {
      limit
    }
  })
}

export function getRadioRecommend(limit) {
  return request({
    url: '/dj/paygift',
    params: {
      limit
    }
  })
}

export function getRadioDetail(rid) {
  return request({
    url: '/dj/detail',
    params: {
      rid
    }
  })
}

export function getRadioProgram(rid, limit) {
  return request({
    url: '/dj/program',
    params: {
      rid,
      limit
    }
  })
}

export function getRadioSub(rid, t) {
  return request({
    url: '/dj/sublist',
    params: {
      rid,
      t
    }
  })
}