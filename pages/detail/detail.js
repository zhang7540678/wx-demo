//获取应用实例
const app = getApp();

Page({
  data: {

  },
  onLoad() {
    new app.ToastPannel();
  },
  onReady() {

  },
  onShow() {

  },
  onHide() {

  },
  onError() {

  },
  showToast() {
    this.show("正在加载中。。。");
  }
})