import * as types from './mutations-types'

const mutations = {
  [types.SET_PREV_PATH](state, prevpath) {
    state.prevpath = prevpath
  },
  [types.SET_ALBUM_ITEM](state, albumitem) {
    state.albumitem = albumitem
  },
  [types.SET_PLAY_LIST](state, playlist) {
    state.playlist = playlist
  },
  [types.SET_SEQUENCE_LIST](state, sequencelist) {
    state.sequencelist = sequencelist
  },
  [types.SET_FULL_SCREEN](state, fullScreen) {
    state.fullScreen = fullScreen
  },
  [types.SET_PLAYING](state, playing) {
    state.playing = playing
  },
  [types.SET_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, currentIndex) {
    state.currentIndex = currentIndex
  },
  [types.SET_TOP_COMMENTS](state, topcomments) {
    state.topcomments = topcomments
  },
  [types.SET_LOGIN_SHOW](state, loginshow) {
    state.loginshow = loginshow
  },
  [types.SET_LOGIN_STATE](state, loginState) {
    state.loginState = loginState
  },
  [types.SET_ACCOUNT_UID](state, accountUid) {
    state.accountUid = accountUid
  },
  [types.SET_IS_REFRESH](state, isRefresh) {
    state.isRefresh = isRefresh
  },
  [types.SET_VIDEO_LIST](state, VideoList) {
    state.VideoList = VideoList
  },
}

export default mutations