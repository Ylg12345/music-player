import {request} from './index'

export function getProfileSubCount() {
  return request({
    url: '/user/subcount',
  })
}

//获取用户歌单
export function getProfilePlayList(uid) {
  return request({
    url: '/user/playlist',
    params: {
      uid
    }
  })
} 

//获取用户播放记录
export function getProfileRecord(uid, type) {
  return request({
    url: '/user/record',
    params: {
      uid,
      type
    }
  })
} 

//获取用户电台
export function getProfileRDj(uid) {
  return request({
    url: '/dj/sublist',
    params: {
      uid,
    }
  })
} 