import {request} from 'network/index'

//获取视频标签
/* export function getVideoGroupList() {
  return request({
    url: '/video/group/list',
  })
}  */

//获取视频分类列表
export function getVideoCategoryList() {
  return request({
    url: '/video/category/list',
  })
} 

//获取推荐视频
export function getVideoRecommendList(offset) {
  return request({
    url: '/video/timeline/recommend',
    params: {
      offset
    }
  })
}

//获取分类下的视频
export function getVideoGroup(id, offset) {
  return request({
    url: '/video/group',
    params: {
      id,
      offset
    }
  })
}

//获取视频播放地址
export function getVideoUrl(id) {
  return request({
    url: '/video/url',
    params: {
      id,
    }
  })
}

//获取MV播放地址
export function getMVUrl(id) {
  return request({
    url: '/mv/url',
    params: {
      id,
    }
  })
}

//获取视频详情
export function getVideoDetail(id) {
  return request({
    url: '/video/detail',
    params: {
      id,
    }
  })
}

//获取相关视频
export function getRelatedAllVideo(id) {
  return request({
    url: '/related/allvideo',
    params: {
      id,
    }
  })
}

//获取视频评论
export function getCommentVideo(id, limit, offset) {
  return request({
    url: '/comment/video',
    params: {
      id,
      limit,
      offset
    }
  })
}

//获取MV评论
export function getCommentMV(id, limit, offset) {
  return request({
    url: '/comment/mv',
    params: {
      id,
      limit,
      offset
    }
  })
}