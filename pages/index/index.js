//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    enterFlag: true,
    bannerList: [1,2,3,4],
    pdList: [],
    refreshFlag:false,
    loadingFlag:true,
    pageNum:1
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getProductList(this.data.pageNum);
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onReady:function(){
    console.log("加载完成");
  },
  enterIndex:function(){
    this.setData({
      enterFlag: true
    })
    console.log(this.data.enterFlag)
  },
  getProductList(num) {
    let _this = this;
    _this.setData({loadingFlag: true})
    wx.request({
      url: "https://api.it120.cc/tz/shop/goods/list",
      data: {
        categoryId: "",
        nameLike: "",
        page: num,
        pageSize: 20
      },
      success(res) {
        if (res.data.code == '0') {
          let dataList = res.data.data;
          dataList.map((item) => {
            if (item.dateStart) {
              item.dateStart = item.dateStart.substring(0, 10);
            }
            return item;
          })
          let list = _this.data.pdList.concat(res.data.data);
          _this.setData({
            pdList: list,
            refreshFlag: false,
            loadingFlag: false
          })
        }else{
          wx.showToast({
            title: "没有更多数据了",
            icon: "none",
            duration: 2000
          });
          _this.data.pageNum--;
          _this.setData({
            refreshFlag: false,
            loadingFlag: false
          })
        }
      }
    })
  },
  onPullDownRefresh() {
    console.log("下拉刷新成功");
    this.setData({
      refreshFlag: true,
      loadingFlag: true,
      pageNum: 1
    })
    this.getProductList();
  },
  upper() {
    
  },
  lower() {
    console.log("滚动到底部了")
    this.data.pageNum++;
    this.getProductList(this.data.pageNum);
  }
})
