import {playMode} from './config'

const state = {
  prevpath: '',
  albumitem: [],
  playlist: [],
  sequencelist: [],
  fullScreen: false,
  playing: false,
  mode: playMode.sequence,
  currentIndex: -1,
  topcomments: {},
  loginshow: false,
  loginState: 0,
  accountUid: '',
  isRefresh: false,
  VideoList: []
}

export default state