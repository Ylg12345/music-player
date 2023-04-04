<template>
  <div class="comments">
    <div class="top-comments">
      <div class="back">
        <i class="iconfont icon-back" @click="back"></i>
        <span>评论({{topcomments.commentCount}})</span>
      </div>
      <div class="avotar">
        <div class="left">
          <img :src="topcomments.coverImgUrl">
        </div>
        <div class="right">
          <p class="name">{{topcomments.name}}</p>
          <div class="nickname">
            <span>by</span>
            <p>{{topcomments.nickname}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="split"></div>
    <scroll 
    class="wrapper"     
    :pullUpLoad=true 
    ref="scroll"
    @scrollToEnd="scrollToEnd" 
    :listenScroll=true 
    :scrollEnd=true
    >
      <comment-list :comments="hotComments"></comment-list>
      <comment-list :comments="totalComments" title="最新评论"></comment-list>
    </scroll>
    <div class="input">
      <div class="input-search">
        <div class="input-body">
          <input type="text" v-model="message">
        </div>
        <div class="send">
          <span :class="disable">发送</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import {ERR_OK} from 'network/config'
import {getPlaylistComment} from 'network/albumpage'

import Scroll from 'components/common/scroll/Scroll'
import CommentList from 'components/content/commentlist/CommentList'

export default {
  components: {
    Scroll,
    CommentList,
  },
  data() {
    return {
      comments: [],
      hotComments: [],
      totalComments: [],
      message: '',
      limit: 20,
      offset: 0,
    }
  },
  created() {
    //this._getPlaylistComment(this.$route.params.id)
    if(!this.topcomments.name) {
      this.$router.push('/albumpage')
    }
  },
  activated() {
    this.offset = 0
    this.totalComments = []
    this.hotComments = []
    this._getPlaylistComment(this.$route.params.id)
  },
  computed: {
    ...mapGetters([
      'topcomments',
    ]),
    disable() {
      return this.message ? '' : 'disable'
    }
  },
  methods: {
    _getPlaylistComment(id) {
      getPlaylistComment(id, this.limit, this.offset).then(res => {
        if(res.code === ERR_OK) {
          this.comments = res.comments
          //最新评论数组拼接
          this.totalComments = this.totalComments.concat(this.comments)
          if(!res.hotComments.length) {
            return
          }else {
            this.hotComments = res.hotComments
          }
        }
      })
    },
    back() {
      this.$router.push('/albumpage')
    },
    scrollToEnd() {
      this.pullingUp()
    },
    pullingUp() {
      this.offset++
      this._getPlaylistComment(this.topcomments.id)
      this.$refs.scroll.scroll.finishPullUp()
      this.$refs.scroll.refresh()
    },
  },
  watch: {
    message() {
      console.log(this.message)
    }
  }
}
</script>

<style lang="scss" scoped>
.comments{
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 10;
  background: #fff;
  .top-comments {
    width: 100%;
    height: 140px;
    box-sizing: border-box;
    padding: 0 11.5px;
    .back {
      width: 100%;
      height: 50px;
      display: flex;
      justify-items: center;
      margin-top: 10px;
      .icon-back {
        font-size: 25px;
        margin-right: 5px;
      }
      span {
        display: inline-block;
        font-size: 18px;
        line-height: 25px;
      }
    }
    .avotar {
      height: 90px;
      display: flex;
      align-items: center;
      .left {
        width: 75px;
        height: 0;
        padding-bottom: 75px;
        margin-right: 15px;
        img {
          width: 75px;
          height: 75px;
          border-radius: 5px;
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        .name {
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 13.5px;
          line-height: 1.5;
        }
        .nickname {
          display: flex;
          flex-direction: row;
          font-size: 12px;
          line-height: 1.5; 
          margin-top: 5px; 
          p {
            margin-left: 10px;
            color: #328ffe;
          }
        }
      }
    }
  }
  .split {
    width: 100%;
    height: 6.5px;
    background-color: #eee;
    margin: 15px 0;
  }
  .wrapper {
    width: 100%;
    height: calc(100% - 148px);
    overflow: hidden;
  }
  .input {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
    height: 50px;
    background: #fff;
    .input-search {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 5px 0 2px 11.5px;
      display: flex;
      align-items: center;
      .input-body {
        width: 88%;
        height: 70%;
        background-color: #f7f8fa;
        input {
          background:none;  
          outline:none;  
          border:none;
          width: 100%;
          height: 100%;
          font-size: 13px;
          border-radius: 3px;
        }
      }
      .send {
        position: absolute;
        right: 0;
        padding: 0 8px;
        color: #323233;
        font-size: 14px;
        line-height: 34px;
        cursor: pointer;
        user-select: none;
        .disable {
          color: #ccc;
        }
      }
    }
  }
}
</style>