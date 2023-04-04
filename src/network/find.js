import {request} from './index'

//find页面请求
export function getFindSlider(type) {
  return request({
    url: '/banner',
    params: type
  })
}


export function getDiscList(limit) {
  return request({
    url: '/personalized',
    params: {
      limit
    }
  })
}

export function getNewSongs(type) {
  return request({
    url: '/top/song',
    params: {
      type
    }
  })
}

export function getNewAlbums(limit) {
  return request({
    url: '/top/album',
    params: {
      limit
    }
  })
}


//recommend页面请求

export function getCatList() {
  return request({
    url: '/playlist/catlist',
  })
} 

export function getHotCatList(cat, limit) {
  return request({
    url: '/top/playlist',
    params: {
      cat,
      limit,
    }
  })
} 

//rank页面请求

export function getRankList() {
  return request({
    url: '/toplist'
  })
}

export function getRankListDetail(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

//歌曲请求

export function getPlayerSong(id) {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
} 

//歌词请求

export function getSongLyric(id) {
  return request({
    url: '/lyric',
    params: {
      id
    }
  })
}

//私人FM

export function getSongListFM() {
  return request({
    url: '/personal_fm'
  })
}