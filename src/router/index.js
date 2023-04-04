import Vue from 'vue'
import Router from 'vue-router'

const Find = () => import('views/find/Find')
const CloudVilage = () => import('views/cloudvilage/CloudVilage')
const MVideo = () => import('views/mvideo/MVideo')
const Profile = () => import('views/profile/Profile')
const Recommend = () => import('pages/recommend/Recommend')
const dataRecommend = () => import('pages/datarecommend/DataRecommend')
const Radio = () => import('pages/radio/Radio')
const RadioDetailPage = () => import('pages/radio/RadioDetailPage')
const Rank = () => import('pages/rank/Rank')
const DiscList = () => import('components/content/disclist/DiscList')
const AlbumPage = () => import('pages/albumpage/AlbumPage')
const Comments = () => import('pages/comments/Comments')
const LoginIndex = () => import('pages/loginIndex/Index')
const phoneAccount = () => import('pages/loginIndex/childComponents/phoneAccount')
const phonePwd = () => import('pages/loginIndex/childComponents/phonePwd')
const phoneVerify = () => import('pages/loginIndex/childComponents/phoneVerify')
const MusicList = () => import('components/content/musiclist/MusicList')
const VideoDetail = () => import('views/mvideo/childComponents/VideoDetail')
const Rencently = () => import('pages/rencently/Rencently')
const SubDj = () => import('pages/subdj/SubDj')
const Search = () => import('pages/search/Search')
const composite = () => import('pages/searchResults/composite/composite')
const searchResults = () => import('pages/searchResults/index')

Vue.use(Router)
const routes = [
  {
    path: '/',
    redirect: '/find'
  },
  {
    path: '/find',
    component: Find
  },
  {
    path: '/singer',
    component: CloudVilage
  },
  {
    path: '/mvideo',
    component: MVideo
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: DiscList
      }
    ]
  },
  {
    path: '/datarecommend',
    component: dataRecommend,
  },
  {
    path: '/radio',
    component: Radio,
  },
  {
    path: '/radiodetailpage',
    component: RadioDetailPage,
  },
  {
    path: '/rank',
    component: Rank,
  },
  {
    path: '/albumpage',
    component: AlbumPage
  },
  {
    path: '/comments/:id',
    component: Comments
  },
  {
    path: '/login',
    component: LoginIndex
  },
  {
    path: '/phone',
    component: phoneAccount
  },
  {
    path: '/pwd',
    name: '/pwd',
    component: phonePwd
  }, 
  {
    path: '/verify',
    name: '/verify',
    component: phoneVerify
  },
  {
    path: '/songlist/:id',
    component: MusicList
  },
  {
    path: '/videodetail',
    component: VideoDetail
  },
  {
    path: '/rencently',
    component: Rencently
  },
  {
    path: '/subdj',
    component: SubDj
  },
  {
    path: '/search',
    component: Search
  },
  {
    // 搜索展示页面
    path: '/searchResults/:id',
    component: searchResults,
    redirect: '/composite/:id',
    children: [
      {
      // 综合页面
      path: '/composite/:id',
      component: composite
      }
    ]
  },
]

const router = new Router({
  routes,
  //mode: 'history',
  //base: process.env.BASE_URL,
})

export default router 

//代码跳转路由 连点多次报错解决方法
const originalPush = Router.prototype.push
   Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
