// addphases.js
const AV = require('../../libs/av-weapp-min.js')
var util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    errorMsg: '',
    showTopTips: false,
    userInfo: {},
    phasesList: null,
    disableflag: false,
    beginDate: '',
    endDate: '',
  },
  bindBeginDateChange: function (e) {
    this.setData({
      beginDate: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  formReset: function (e) {
    console.log('form发生了reset事件')
    this.setData({
      disableflag: false
    })
  },
  formSubmit: function (e) {

    if (e.detail.value.phaseName == "") {
      this.setData({
        showTopTips: true,
        errorMsg: '期次名称不能为空'
      })
      this.ohShitfadeOut();
      return;
    }
    if (e.detail.value.beginDate == "") {
      this.setData({
        showTopTips: true,
        errorMsg: '生效起始日期不能为空'
      })
      this.ohShitfadeOut();
      return;
    }
    if (e.detail.value.endDate == "") {
      this.setData({
        showTopTips: true,
        errorMsg: '生效截止日期不能为空'
      })
      this.ohShitfadeOut();
      return;
    }
    if (e.detail.value.endDate < e.detail.value.beginDate) {
      this.setData({
        showTopTips: true,
        errorMsg: '生效截止日期不能小于生效起始日期'
      })
      this.ohShitfadeOut();
      return;
    }
    new AV.Query('phases')
      .equalTo('phaseName', e.detail.value.phaseName)
      .first()
      .then((data => data ?
        wx.showModal({
          content: '期次已存在',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {

            }
          }
        })
        : this.addPhase(e))).catch(console.error)
    this.setData({
      disableflag: true
    })
  },
  addPhase(e) {
    //声明类型
    var Phases = AV.Object.extend('phases');
    //新建对象
    var phases = new Phases();
    //设置属性
    phases.set("phaseName", e.detail.value.phaseName);
    var beginDate = e.detail.value.beginDate
    beginDate = beginDate.replace(/-/g, '/')
    var endDate = e.detail.value.endDate
    endDate = endDate.replace(/-/g, '/')
    phases.set("beginDate", new Date(beginDate + " 00:00:00"));
    phases.set("endDate", new Date(endDate + " 23:59:59"));
    phases.set("publisher", this.data.userInfo.nickName);
    phases.save().then(function (phases) {
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
  queryPhases: function () {
    new AV.Query('phases').ascending('endDate')
      .find()
      .then((data => {
        if (data) {
          for (var i = 0, len = data.length; i < len; ++i) {
            data[i].set('beginDate', util.formatTime(data[i].get('beginDate')))
            data[i].set('endDate', util.formatTime(data[i].get('endDate')))
          }

        }
        this.setData({ phasesList: data })
      })).catch(console.error)
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
    that.queryPhases()
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
    this.queryPhases()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})