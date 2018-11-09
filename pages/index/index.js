//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    bannerList: [],
    productList: [],
    navList:[],
    activeId: 0
  },
  onLoad: function () {
    //获取产品类型
    this.getProType();
    //获取baner
    this.getBannerList();
    //获取产品数据
    this.getProductList(1);
  },
  getProType() {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/tz/shop/goods/category/all',
      data: {},
      success(res) {
        if(res.data.code == '0'){
          var list = res.data.data;
          list.unshift({
            name: '全部',
            id: 0
          })
          that.setData({
            navList: res.data.data
          })
        }
      }
    })
  },
  getBannerList() {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/tz/banner/list?key=mallName',
      data: {},
      success(res) {
        if(res.data.code == '0'){
          that.setData({
            bannerList: res.data.data
          })
          console.log(that.data.bannerList);
        }
        
      }
    })
  },
  getProductList(num, id, like) {
    var that = this;
    !id && (id=0);
    !like && (like='');
    wx.request({
      url: "https://api.it120.cc/tz/shop/goods/list",
      data: {
        categoryId: id,
        nameLike: like,
        page: num,
        pageSize: 20
      },
      success(res) {
        if(res.data.code == '0'){
          var list = res.data.data;
          that.setData({
            productList: list
          })
        }
      }
    })
  },
  tabClick(e) {
    var that = this;
    console.log(e)
    that.setData({
      activeId: e.currentTarget.id
    })
    that.getProductList(1, that.data.activeId);
  },
  onPullDownRefresh() {
    console.log('到底了')
  },
  onShareAppMessage(res) {
    return {
      title: '首页',
      path: '/page/page/index'
    }
  }
})
