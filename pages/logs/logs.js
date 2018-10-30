//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }, 
  onPageScroll: function ({scrollTop}) {
    console.log(scrollTop);
  },
  onPullDownRefresh: function(){
    console.log('下拉刷新');
    wx.startPullDownRefresh();
  }
})
