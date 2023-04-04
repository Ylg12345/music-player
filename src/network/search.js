import { request } from './index'


// 默认搜索关键词
export function defaultSearch() {
  return request({
    url: '/search/default'
  })
}

// 搜索建议

export function suggestSearch(keywords, type = 'mobile') {
  return request({
    url: '/search/suggest',
    params: {
      keywords,
      type
    }
  })
}

export function hotSearchList() {
  return request({
    url: '/search/hot/detail',
  })
}

export function Search(keywords, limit = 30, offset = 0, type = 1018) {
  return request({
    url: '/search',
    params: {
      keywords,
      limit,
      offset,
      type
    }
  })
}