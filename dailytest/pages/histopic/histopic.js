// histopic.js
const AV = require('../../libs/av-weapp-min.js')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hisTopicList: null,
  },
  getHisTopic: function () {
    var now = new Date();
    var query = new AV.Query('topic');

    query.lessThan('endDate', now);

    query.descending('createdAt').find()
      .then((data => {
        if (data) {
          for (var i = 0, len = data.length; i < len; ++i) {
            data[i].set('beginDate', util.formatTime(data[i].get('beginDate')))
            data[i].set('endDate', util.formatTime(data[i].get('endDate')))
          }
        }
        this.setData({ hisTopicList: data })
        if (!data) {
          this.setData({ errorMsg: '还没有到期的题目，到答题页看看吧' })
        }
      })).catch(console.error)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getHisTopic()
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