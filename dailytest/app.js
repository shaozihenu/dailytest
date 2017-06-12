//app.js
const AV = require('./libs/av-weapp-min.js')
AV.init({
  appId: 'bRi7KiCevT2LXaSgQPnfmyDB-gzGzoHsz',
  appKey: 'nJp0hI7J5V6wEfgObYmd4yrv',
})

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)     
            }
          })
          AV.User.loginWithWeapp().then((user) => {
            that.globalData.user = user.toJSON();
          }).catch(console.error)
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    user: null
  }
})