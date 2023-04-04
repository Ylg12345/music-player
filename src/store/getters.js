
import state from "./state"

export const prevpath = state => state.prevpath

export const albumitem = state => state.albumitem

export const playlist = state => state.playlist

export const sequencelist = state => state.sequencelist

export const fullScreen = state => state.fullScreen

export const playing = state => state.playing

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = state => {
  return state.playlist[state.currentIndex] || {}
}

export const topcomments = state => state.topcomments

export const loginshow = state => state.loginshow

export const loginState = state => state.loginState

export const accountUid = state => state.accountUid

export const isRefresh = state => state.isRefresh

export const VideoList = state => state.VideoList