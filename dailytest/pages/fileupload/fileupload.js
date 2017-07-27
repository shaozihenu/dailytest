// fileupload.js
const AV = require('../../libs/av-weapp-min.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    errorMsg: '',
    showTopTips: false,
    userInfo: {},
    userId: null,
    disableflag: false
  },
  formSubmit: function (e) {

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePath = res.tempFilePaths[0];
        new AV.File('file-name', {
          blob: {
            uri: tempFilePath,
          },
        }).save().then(
          file => {
            wx.showToast({
              title: '已完成',
              icon: 'success',
              duration: 3000
            })
            console.log(file.url())}
          
          ).catch(console.error);
      }
    });
    this.setData({
      disableflag: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // const user = AV.User.current()
    // var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo,
    //     userId: user.get('username')
    //   })
    // })
    console.log(that.data.userInfo)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})