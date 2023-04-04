<template>
  <div class="singer">
    <div class="header">
      <div class="option-one">
        <div class="item" v-for="(item, index) in areaClassification" @click="selectOptionOne(item, index)" :class="{active: currentIndexOne === index}">
          {{item.name}}
        </div>
      </div>
      <div class="option-two">
        <div class="item" v-for="(item, index) in sexClassification" @click="selectOptionTwo(item, index)" :class="{active: currentIndexTwo === index}">
          {{item.name}}
        </div>
      </div>
      <p class="list-group-title">热门歌手</p>
    </div>
    <div class="content">
      <scroll class="wrapper" ref="wrapper">
        <ul>
          <li v-for="item in artists" 
          class="list-group-item"
          @click="selectItem(item)">
            <img class="avator" v-lazy="item.picUrl">
            <span class="name">{{item.name}}</span>
            <i class="iconfont icon-singer"></i>
            <div class="right" v-show="!subed" @click.prevent="addSinger(item)">
              <svg
                t="1571198266501"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1753"
                width="14"
                height="14"
              >
              <path
                d="M737.792 910.6944a57.2416 57.2416 0 0 1-26.7264-6.656l-197.5296-103.8336-197.5296 103.8336a57.2416 57.2416 0 0 1-83.0464-60.3648l37.6832-220.16L110.848 467.968a57.2928 57.2928 0 0 1 31.744-97.6896L363.52 338.2272 462.1824 138.24a56.832 56.832 0 0 1 51.2-31.8976 56.9344 56.9344 0 0 1 51.2 31.8976l98.7648 200.1408 220.8256 32.0512A57.2928 57.2928 0 0 1 916.48 467.968l-159.7952 155.7504 37.7344 220.16a57.3952 57.3952 0 0 1-56.32 67.0208zM159.8464 430.08l155.2896 151.3984a57.2416 57.2416 0 0 1 16.4352 50.688l-36.6592 213.5552 192-100.9152a57.088 57.088 0 0 1 53.2992 0L732.16 845.7216l-36.6592-213.76a57.344 57.344 0 0 1 16.4352-50.688L867.2768 430.08l-214.6304-31.1808a57.2928 57.2928 0 0 1-43.1104-31.3344l-96-194.56-96 194.56a57.2416 57.2416 0 0 1-43.1104 31.3344z m715.6736 1.024zM509.7984 165.2736z"
                fill="#ffffff"
                p-id="1754"
              />
              </svg>订阅
            </div>
            <div class="right1" v-show="subed" @click.prevent="deleteSinger(item)">
              <svg
                t="1571203188806"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2523"
                width="14"
                height="14"
              >
              <path
                d="M926.037333 224.256c-22.016-22.016-57.685333-22.016-79.701333 0L384.853333 685.738667 179.370667 480.256c-22.016-22.016-57.685333-22.016-79.701334 0-22.016 22.016-22.016 57.685333 0 79.701333l239.786667 239.786667c12.458667 12.458667 29.184 17.749333 45.397333 16.213333 16.213333 1.536 32.938667-3.754667 45.397334-16.213333l495.786666-495.786667c22.016-22.016 22.016-57.685333 0-79.701333z"
                fill="#ffffff"
                p-id="2524"
              />
              </svg>已订阅
            </div>
          </li>
        </ul>
      </scroll>
    </div>
  </div>
</template>

<script>

import {mapMutations, mapGetters} from 'vuex'
import {getArtistList, getTopArtist, getArtistSub} from 'network/singer'
import {ERR_OK} from 'network/config'
import Scroll from 'components/common/scroll/Scroll'

export default {
  components: {
    Scroll
  },
  data() {
    return {
      areaClassification: [
        {name: '华语', area: 7}, 
        {name: '欧美', area: 96}, 
        {name: '日本', area: 8}, 
        {name: '韩国', area: 16}, 
        {name: '其它', area: 0}
        ],
      sexClassification: [
        {name: '男', type: 1},
        {name: '女', type: 2},
        {name: '乐队/组合', type: 3},
       ],
      type: -1,
      area: -1,
      artists: [],
      subed: false,
      currentIndexOne: -1,
      currentIndexTwo: -1,
    }
  },
  created() {
    this._getArtistList()
    this._getTopArtist()
  },
  computed: {
    ...mapGetters([
      'isRefresh'
    ])
  },
  methods: {
    ...mapMutations({
      setalbumitem: 'SET_ALBUM_ITEM',
      setisRefresh: 'SET_IS_REFRESH'
    }),
    _getArtistList() {
      let limit = 100
      getArtistList(limit, this.type, this.area).then(res => {
        if(res.code === ERR_OK) {
          this.artists = res.artists
        }
      })
    },
    _getTopArtist() {
      getTopArtist().then(res => {
        if(res.code === ERR_OK) {
          this.artists = res.list.artists
        }
      })
    },
    selectItem(item) {
      this.setalbumitem(item)
      this.$router.push(
         '/songlist/' + item.id,

      )
    },
    addSinger(item) {
/*       let id = item.id
      getArtistSub(id, 1).then(res => {
        if(res.code === ERR_OK) {
           localStorage.setItem(id, JSON.stringify({
            name: item.name,
            id: item.id,
            t: 1
          }))
          this.subed = true
        }  
      }) */
    },
    deleteSinger(item) {
/*       let id = item.id
      getArtistSub(id, 0).then(res => {
        if(res.code === ERR_OK) {
          this.subed = false
        }
      }) */
    },
    selectOptionOne(item, index) {
      console.log(item)
      this.currentIndexOne = index
      this.area = item.area
      this._getArtistList()
    },
    selectOptionTwo(item, index) {
      this.currentIndexTwo = index
      this.type = item.type
      this._getArtistList()
    }
  },
  watch: {
    isRefresh() {
      if(this.isRefresh === true) {
        this.$refs.wrapper.refresh()
        this.setisRefresh(false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 44px;
  bottom: 0;
  .header {
    width: 100%;
    padding: 0 11.5px;
    box-sizing: border-box;
    font-size: 13px;
    color: rgb(82, 73, 73);
    .option-one {
      width: 80%;
      display: flex;
      justify-content: space-between;
      margin: 15px 0 15px 5px;
      .active {
        color: #dd001b;
      }
    }
    .option-two {
      width: 50%;
      display: flex;
      justify-content: space-between;
      margin: 15px 0 15px 10px;
      .active {
        color: #dd001b;
      }
    }
    .list-group-title {
      height: 25px;
      line-height: 25px;
      font-size: 12px;
      letter-spacing: 1px;
      font-weight: 500;
    }
  }
  .content {
    width: 100%;
    padding: 0 11.5px;
    box-sizing: border-box;
    .wrapper {
      width: 100%;
      height: calc(100vh - 125px);
      overflow: hidden;
      ul {
        .list-group-item {
          position: relative;
          display: flex;
          align-items: center;
          padding: 15px 0;
          border-bottom: .3px solid #ccc;
          .avator {
            width: 50px;
            height: 50px;
            border-radius: 50%
          }
          .name {
            margin-left: 20px;
            font-size: 14px;
          }
          .icon-singer {
            color:#dd001b;
            font-size: 20px;
            margin-left: 10px;
          }
          .right {
            position: absolute;
            box-sizing: border-box;
            display: flex;
            padding: 0 11.5px;
            height: 25px;
            align-items: center;
            justify-content: center;
            color: #fff;
            background-color: #dd001b;
            border-radius: 20px;
            font-size: 13.5px;  
            right: 0;
            .icon {
              margin-right: 5px;
            }  
          }
          .right1 {
            position: absolute;
            box-sizing: border-box;
            display: flex;
            padding: 0 11.5px;
            height: 25px;
            align-items: center;
            justify-content: center;
            color: #fff;
            border-radius: 20px;
            border: 1px solid #ccc;
            font-size: 13.5px;
            right: 0;
            background: #ccc;
            .icon {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
</style>