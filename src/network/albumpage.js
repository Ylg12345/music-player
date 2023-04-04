import {request} from './index'

//获取歌单评论
export function getPlaylistComment(id, limit, offset) {
/*   const timestamp = +new Date() */
  return request({
    url: '/comment/playlist',
    params: {
      id,
      limit,
      offset,
      /* timestamp, */
    }
  })
}

export function getSongDetail(ids) {
  return request({
    url: '/song/detail',
    params: {
      ids
    }
  })
}