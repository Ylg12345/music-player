import {request} from './index'

//歌手分类列表
export function getArtistList(limit, type, area) {
  return request({
    url: '/artist/list',
    params: {
      limit,
      type,
      area,
    }
  })
}

//歌手排行榜
export function getTopArtist() {
  return request({
    url: '/toplist/artist',
  })
}

//收藏或者取消收藏歌手
export function getArtistSub(id, t) {
  return request({
    url: '/artist/sub',
    params: {
      id,
      t
    }
  })
}

//歌手全部歌曲
export function getArtistSongList(id, order, limit, offset) {
  return request({
    url: '/artist/songs',
    params: {
      id,
      order,
      limit,
      offset
    }
  })
}