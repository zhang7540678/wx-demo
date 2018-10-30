//定义data数据
let toastData = {
  "_toast_.isHide": false,
  "_toast_.content": ""
}

//控制组件方法的结合
let comFn = {
  show(data) {
    this.setData({
      "_toast_.isHide": true,
      "_toast_.content": data
    })
    setTimeout(()=>{
      this.setData({
        "_toast_.isHide": false
      })
    }, 2000)
  }
}

//构造函数
function ToastPannel() {
  let pages = getCurrentPages();
  let curPage = pages[pages.length-1];
  Object.assign(curPage, comFn);
  curPage.setData(toastData);
}

module.exports={
  ToastPannel
}