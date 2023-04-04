function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomPlayList(arr) {
  let _arr = arr.slice()
  for(let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function filterSetKeyWords (keyword, val, property) {
  let results = []
  const _val = val
  _val.map((item, index) => {
    if (keyword && keyword.length > 0) {
      // 匹配关键字正则
      let replaceReg = new RegExp(keyword, 'g')
      // 高亮替换v-html值
      let replaceString =
        `<i style="color: #3399EA">${keyword}</i>`
      _val[index][property] = item[property].replace(
        replaceReg,
        replaceString
      )
    }
  })
  results = _val
  return results
}