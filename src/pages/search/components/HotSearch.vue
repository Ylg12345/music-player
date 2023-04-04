<template>
  <div class="song-hot-search">
    <p class="hot-search-title">热搜榜</p>
      <ul>
        <li
          class="hot-search-list"
          v-for="(item, index) in hotSearchList"
          :key="index"
          @click="returnKey(item.searchWord)"
        >
          <span class="num">{{ index + 1 }}</span>
          <div class="song-info">
            <div class="song-info-title">
              <p class="song-name">{{ item.searchWord }}</p>
              <span class="num">{{ item.score }}</span>
              <img v-if="item.iconUrl" class="search-png" :src="item.iconUrl" />
            </div>
            <!-- 歌曲介绍 -->
            <div class="song-Introduced">{{ item.content }}</div>
          </div>
        </li>
      </ul>
  </div>
</template>

<script>



import { hotSearchList } from 'network/search'

export default {
  data () {
    return {
      hotSearchList: []
    }
  },
  created () {
    this._getList()
  },
  methods: {
    /**
     * 获取热搜榜单
     */
    _getList () {
      hotSearchList()
        .then(res => {
          if (res.code === 200) {
            this.hotSearchList = res.data
            this.$emit('childFn', false)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    /**
     * 通过点击热歌榜将关键字返回给父组件，父组件调用搜索组件的搜索功能
     */
    returnKey (key) {
      this.$emit('returnKey', key)
    }
  }
}
</script>

<style lang='scss' scoped>
.song-hot-search {
  box-sizing: border-box;
  padding: 0 11.5px;
  margin-top: 30px;
  .wrapper {
    overflow: hidden;
  }
  .hot-search-list {
    display: flex;
    margin: 10px 0;
    &:nth-of-type(1) > .num {
      color: #dd001b;
    }
    &:nth-of-type(2) > .num {
      color: #dd001b;
    }
    &:nth-of-type(3) > .num {
      color: #dd001b;
    }
    > .num {
      line-height: 50px;
      font-size: 13px;
    }
    .song-info {
      margin-left: 20px;
      height: 100%;
      .song-info-title {
        display: flex;
        line-height: 30px;
        .song-name {
          margin-right: 5px;
          font-size: 14px;
        }
        .num {
          font-size: 12px;
          color: #999;
        }
        .search-png {
          margin-left: 10px;
          // width: 0.3rem;
          height: 10px;
          margin-top: 10px;
        }
      }
    }
    .song-Introduced {
      font-size: 11.5px;
      color: #aaa;
    }
  }
}
</style>
