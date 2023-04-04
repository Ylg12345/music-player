<template>
  <div class="comment-list" v-if="comments.length>0">
    <div class="header">
      <p class="title">{{title}}</p>
      <span class="num"></span>
    </div>
    <div class="comment-content">
      <div class="item" v-for="item in comments">
        <div class="left-img">
          <img :src="item.user.avatarUrl">
        </div>
        <div class="right-info">
          <div class="top-info">
            <div class="data">
              <div class="nickname">{{item.user.nickname}}</div>
              <div class="time">{{timestampToTime(item.time / 1000)}}</div>
            </div>
            <div class="like">
              <span class="count">{{item.likedCount}}</span>
              <i class="iconfont icon-like"></i>
            </div>
          </div>
          <div class="content">{{item.content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '精彩评论' 
    },
    comments: {
      type: Array,
      default: []
    }
  },
  data() {
    return {

    }
  },
  methods: {
    timestampToTime(timestamp) {
          var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          var D = date.getDate() + ' ';
          var h = date.getHours() + ':';
          var m = date.getMinutes() + ':';
          var s = date.getSeconds();
          //return Y+M+D+h+m+s;
          return Y+M+D
      }
    }
}
</script>

<style lang="scss" scoped>
.comment-list {
  box-sizing: border-box;
  padding: 5px 11.5px;
  margin-top: 10px;
  .header {
    .title {
      font-size: 14px;
      font-weight: 700;
    }
    .num {
      font-size: 12px;
      color: #999;
    }
  }
  .comment-content {
    width: 100%;
    .item {
      display: flex;
      box-sizing: border-box;
      margin: 10px 0;
      padding-bottom: 15px;
      height: auto;
      border-bottom: .5px solid #ccc;
      .left-img {
        width: 30px;
        height: 0;
        padding-bottom: 30px;
        margin-right: 10px;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
      .right-info {
        width: 100%;
        .top-info {
          color: #999;
          line-height: 1.3;
          font-size: 12px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 6.5px;
          .data {
            .time {
              font-size: 10.5px;
            }
          }
          .like {
            .count {
              font-size: 13px;
            }
            .icon-like {
              margin-left: 5px;
              font-size: 16px;
              color: #ccc;
            }
          }
        }
        .content {
          line-height: 1.5;
          font-size: 13px;

        }
      }
    }
  }
}
</style>