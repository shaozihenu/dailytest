// white.js
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
    disableflag:false
  },
  formReset: function (e) {
    console.log('form发生了reset事件')
    this.setData({
      disableflag: false
    })
  },
  formSubmit: function (e) {

    if (e.detail.value.userid == "") {
      this.setData({
        showTopTips: true,
        errorMsg: '用户ID不能为空'
      })
      this.ohShitfadeOut();
      return;
    }
    if (e.detail.value.username == "") {
      this.setData({
        showTopTips: true,
        errorMsg: '微信昵称不能为空'
      })
      this.ohShitfadeOut();
      return;
    }
    new AV.Query('whiteList')
      .equalTo('userId', e.detail.value.userid)
      .first()
      .then((data => data ? 
        wx.showModal({
          content: '白名单已存在',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              
            }
          }
        })
       : this.addWhite(e))).catch(console.error)
    this.setData({
      disableflag: true
    })
  },
  addWhite(e) {
    //声明类型
    var WhiteList = AV.Object.extend('whiteList');
    //新建对象
    var whiteList = new WhiteList();
    //设置属性
    whiteList.set("userId", e.detail.value.userid);
    whiteList.set("userName", e.detail.value.username);

    whiteList.save().then(function (whiteList) {
      wx.showToast({
        title: '已完成',
        icon: 'success',
        duration: 3000
      });
    }, function (error) {
      // 异常处理
      console.error(error);
    });
  },
  ohShitfadeOut() {
    var fadeOutTimeout = setTimeout(() => {
      this.setData({ showTopTips: false, errorMsg: '' });
      clearTimeout(fadeOutTimeout);
    }, 3000);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log('white onLoad')
    const user = AV.User.current()
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        userId: user.get('username')
      })
    })
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