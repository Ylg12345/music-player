import {request} from './index'

export function getRecommendSongs() {
  return request({
    url: '/recommend/songs',
  })
}