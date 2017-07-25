// add.js
const AV = require('../../libs/av-weapp-min.js')
const base64 = require("../../libs/base64");
const user = AV.User.current();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    whiteListFlag: false,
    icon20: base64.icon20,
    icon60: base64.icon60,
    imagePath:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获得当前登录用户
    var that = this
    console.log('add', user.toJSON());
    // 调用小程序 API，得到用户信息
    wx.getUserInfo({
      success: ({userInfo}) => {
        // 更新当前用户的信息
        user.set(userInfo).save().then(user => {
          // 成功，此时可在控制台中看到更新后的用户信息
        }).catch(console.error);
      }
    });

  },
  qryWhiteUser(user) {
    /*//声明类型
    var WhiteList = AV.Object.extend('whiteList');
    //新建对象
    var whiteList = new WhiteList();
    //设置属性
    whiteList.set("userId", user.username);*/
    console.log('username', user.get('username'));
    new AV.Query('whiteList')
      .equalTo('userId', user.get('username'))
      .first()
      .then((data => this.setData({ whiteListFlag: data ? true : false, imagePath: data ? null : '../../image/qidai.png' }))).catch(console.error)

    /*var query = new AV.Query('whiteList');
    query.equalTo('userId', user.get('username'));
    query.first().then(function (data) {
      // data 就是符合条件的第一个 AV.Object
      if (data == undefined) {
        console.log("不是白名单用户");
        return;
      }
      this.setData({
        whiteListFlag:true
      })
      console.log('whiteListFlag', whiteListFlag);
    }, function (error) {
    });*/
  },
  setWhiteList(data) {

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
    var that = this
    new AV.Query('dict')
      .equalTo('name', 'whitelistswitch')
      .first()
      .then((data =>
        data.get('value') == '0' ? that.setData({ whiteListFlag: true }) : that.qryWhiteUser(user))).catch(console.error)
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